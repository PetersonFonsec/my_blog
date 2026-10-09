const fs = require('node:fs/promises');
const path = require('node:path');
const prismic = require('@prismicio/client');
const { generateSeoFiles } = require('./generate-seo-files.cjs');

const snapshotPath = path.join(__dirname, '..', '.generated', 'posts.json');
const slugOf = (document) => document.slugs?.[0] || document.uid || document.id;

// Texto em Markdown colado no Prismic chega como parágrafos com "#", "- ", "1. " ou "1 - "
// literais. Converte esses parágrafos nos blocos equivalentes do Rich Text e
// descarta parágrafos vazios (sobras de linhas em branco no texto colado).
const markdownBlocks = [
  [/^(#{1,6})\s+/, (match) => `heading${Math.max(2, match[1].length)}`],
  [/^[-*]\s+/, () => 'list-item'],
  [/^\d{1,2}(?:[.)]|\s+-)\s+/, () => 'o-list-item'],
];

const siteOrigin = /^https?:\/\/(?:www\.)?petersonsimiao\.com\.br(?=\/|$)/i;
const markdownLink = /\[([^\]\n]+)\]\(((?:https?:\/\/|\/)[^\s)]+)\)/g;

// Converte "[texto](url)" literal em um span de link do Rich Text, reposicionando
// os spans existentes (negrito, itálico...) para o texto sem a sintaxe Markdown.
// Links para o próprio site viram caminhos relativos; os externos abrem em nova aba.
function inlineLinks(block) {
  const text = block.text || '';
  if (block.type === 'preformatted' || !text.includes('](')) return block;
  const positions = [];
  const links = [];
  let output = '';
  let last = 0;
  const copy = (from, to) => {
    for (let i = from; i < to; i++) positions[i] = output.length + i - from;
    output += text.slice(from, to);
  };
  for (const match of text.matchAll(markdownLink)) {
    const [whole, label, url] = match;
    copy(last, match.index);
    positions[match.index] = output.length;
    const start = output.length;
    copy(match.index + 1, match.index + 1 + label.length);
    for (let i = match.index + 1 + label.length; i < match.index + whole.length; i++) positions[i] = output.length;
    const local = url.replace(siteOrigin, '') || '/';
    const external = !local.startsWith('/');
    links.push({
      start, end: output.length, type: 'hyperlink',
      data: { link_type: 'Web', url: local, ...(external && { target: '_blank' }) },
    });
    last = match.index + whole.length;
  }
  if (!links.length) return block;
  copy(last, text.length);
  positions[text.length] = output.length;
  const spans = (block.spans || [])
    .map((span) => ({ ...span, start: positions[span.start], end: positions[span.end] }))
    .filter((span) => span.end > span.start);
  return { ...block, text: output, spans: [...spans, ...links] };
}

function normalizeContent(content) {
  return content.map(inlineLinks).flatMap((block) => {
    if (block.type !== 'paragraph') {
      // O título do post já é o <h1> da página.
      return [block.type === 'heading1' ? { ...block, type: 'heading2' } : block];
    }
    const text = block.text || '';
    if (!text.trim()) return [];
    for (const [pattern, typeOf] of markdownBlocks) {
      // Ignora negrito/itálico aplicado sobre o marcador (ex.: "**## Título**").
      const match = text.match(pattern);
      if (!match) continue;
      const cut = match[0].length;
      const spans = (block.spans || [])
        .map((span) => ({ ...span, start: Math.max(0, span.start - cut), end: span.end - cut }))
        .filter((span) => span.end > span.start);
      return [{ ...block, type: typeOf(match), text: text.slice(cut).trimEnd(), spans }];
    }
    return [block];
  });
}

const slugify = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'secao';

// Gera ids únicos para os h2/h3 do post e devolve o sumário na mesma ordem.
function tableOfContents(content) {
  const used = new Map();
  const ids = new Map();
  const toc = [];
  for (const block of content) {
    if (block.type !== 'heading2' && block.type !== 'heading3') continue;
    const text = block.text.trim();
    if (!text) continue;
    const base = slugify(text);
    const count = used.get(base) || 0;
    used.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    ids.set(block, id);
    toc.push({ id, text, level: block.type === 'heading2' ? 2 : 3 });
  }
  return { toc, ids };
}

async function syncPosts() {
  const client = prismic.createClient(process.env.PRISMIC_REPOSITORY || 'peterson-site', {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetch: (url, options) => fetch(url, { ...options, signal: AbortSignal.timeout(30000) }),
  });
  // getAllByType follows pagination, using the published master ref.
  const documents = await client.getAllByType('posts', {
    lang: '*',
    orderings: [{ field: 'document.first_publication_date', direction: 'desc' }],
  });
  const slugs = new Set();
  const posts = documents.map((document) => {
    const slug = slugOf(document);
    if (!slug || /[/?#]/.test(slug) || slugs.has(slug)) {
      throw new Error(`Slug inválido ou duplicado no Prismic: ${slug}`);
    }
    slugs.add(slug);
    const { data, tags = [] } = document;
    const content = normalizeContent(data.content || []);
    const { toc, ids } = tableOfContents(content);
    const text = prismic.asText(content);
    const title = prismic.asText(data.title || []);
    if (!title) throw new Error(`Post sem título: ${document.id}`);
    const type = tags.some((tag) => /^projetos?$/i.test(tag)) ? 'projeto' : 'estudo';
    return {
      slug, title, type,
      category: tags.join(' / ') || (type === 'projeto' ? 'Projeto' : 'Estudo'),
      excerpt: text.length > 180 ? `${text.slice(0, 177)}…` : text,
      readingTime: `${Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200))} min de leitura`,
      html: prismic.asHTML(content, {
        linkResolver: (linked) => linked.type === 'posts' ? `/posts/${slugOf(linked)}` : null,
        serializer: {
          heading2: ({ node, children }) => ids.has(node) ? `<h2 id="${ids.get(node)}">${children}</h2>` : `<h2>${children}</h2>`,
          heading3: ({ node, children }) => ids.has(node) ? `<h3 id="${ids.get(node)}">${children}</h3>` : `<h3>${children}</h3>`,
        },
      }),
      toc,
      updatedAt: document.last_publication_date || null,
      reference: /^https?:\/\//i.test(data.references?.url || '') ? data.references.url : null,
    };
  });
  await fs.mkdir(path.dirname(snapshotPath), { recursive: true });
  await fs.writeFile(`${snapshotPath}.tmp`, JSON.stringify(posts));
  await fs.rename(`${snapshotPath}.tmp`, snapshotPath);
  await generateSeoFiles(posts);
  console.log(`[Prismic] ${posts.length} post(s) baixado(s) para geração estática.`);
}

module.exports = { syncPosts };
