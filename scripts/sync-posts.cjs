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

const classify = (tags) => (tags.some((tag) => /^projetos?(\s|$)/i.test(tag)) ? 'projeto'
  : tags.some((tag) => /^(estudos?|leituras?)(\s|$)/i.test(tag)) ? 'estudo' : 'post');

function summarize({ slug, title, tags, text, html, toc, publishedAt, updatedAt, reference }) {
  const type = classify(tags);
  return {
    slug, title, type,
    category: tags.join(' / ') || ({ projeto: 'Projeto', estudo: 'Estudo', post: 'Post' })[type],
    excerpt: text.length > 180 ? `${text.slice(0, 177)}…` : text,
    readingTime: `${Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200))} min de leitura`,
    html,
    toc,
    publishedAt: publishedAt || null,
    updatedAt: updatedAt || null,
    reference: /^https?:\/\//i.test(reference || '') ? reference : null,
  };
}

// PRISMIC_REPOSITORY=none desliga o Prismic (quando todos os posts já estiverem em Markdown).
async function prismicPosts() {
  const repository = process.env.PRISMIC_REPOSITORY || 'peterson-site';
  if (repository === 'none') return [];
  const client = prismic.createClient(repository, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetch: (url, options) => fetch(url, { ...options, signal: AbortSignal.timeout(30000) }),
  });
  // getAllByType follows pagination, using the published master ref.
  const documents = await client.getAllByType('posts', {
    lang: '*',
    orderings: [{ field: 'document.first_publication_date', direction: 'desc' }],
  });
  return documents.map((document) => {
    const slug = slugOf(document);
    if (!slug || /[/?#]/.test(slug)) throw new Error(`Slug inválido no Prismic: ${slug}`);
    const { data, tags = [] } = document;
    const content = normalizeContent(data.content || []);
    const { toc, ids } = tableOfContents(content);
    const title = prismic.asText(data.title || []);
    if (!title) throw new Error(`Post sem título: ${document.id}`);
    return summarize({
      slug, title, tags, toc,
      text: prismic.asText(content),
      html: prismic.asHTML(content, {
        linkResolver: (linked) => linked.type === 'posts' ? `/posts/${slugOf(linked)}` : null,
        serializer: {
          heading2: ({ node, children }) => ids.has(node) ? `<h2 id="${ids.get(node)}">${children}</h2>` : `<h2>${children}</h2>`,
          heading3: ({ node, children }) => ids.has(node) ? `<h3 id="${ids.get(node)}">${children}</h3>` : `<h3>${children}</h3>`,
        },
      }),
      publishedAt: document.first_publication_date,
      updatedAt: document.last_publication_date,
      reference: data.references?.url,
    });
  });
}

// Posts do CMS próprio: content/posts/<slug>.md, publicados pelo editor em /admin.
async function markdownPosts() {
  const { postsDir, parsePostFile, validatePost, renderMarkdown } = await import('../lib/markdown-posts.mjs');
  const dir = path.join(__dirname, '..', postsDir);
  const files = (await fs.readdir(dir).catch(() => [])).filter((file) => file.endsWith('.md')).sort();
  const posts = [];
  for (const file of files) {
    const slug = file.slice(0, -3);
    const post = parsePostFile(await fs.readFile(path.join(dir, file), 'utf8'));
    validatePost(slug, post);
    if (post.draft) continue;
    const { html, toc, text } = renderMarkdown(post.body);
    posts.push(summarize({
      slug, html, toc, text,
      title: post.title.trim(),
      tags: post.tags,
      publishedAt: new Date(post.date).toISOString(),
      updatedAt: new Date(post.updatedAt || post.date).toISOString(),
      reference: post.reference,
    }));
  }
  return posts;
}

async function syncPosts() {
  const [fromPrismic, fromMarkdown] = await Promise.all([prismicPosts(), markdownPosts()]);
  // O Markdown substitui o post do Prismic com o mesmo slug (migração post a post).
  const local = new Set(fromMarkdown.map(({ slug }) => slug));
  const slugs = new Set();
  const posts = [...fromMarkdown, ...fromPrismic.filter(({ slug }) => !local.has(slug))]
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
  for (const { slug } of posts) {
    if (slugs.has(slug)) throw new Error(`Slug duplicado: ${slug}`);
    slugs.add(slug);
  }
  await fs.mkdir(path.dirname(snapshotPath), { recursive: true });
  await fs.writeFile(`${snapshotPath}.tmp`, JSON.stringify(posts));
  await fs.rename(`${snapshotPath}.tmp`, snapshotPath);
  await generateSeoFiles(posts);
  console.log(`[Posts] ${fromPrismic.length} do Prismic e ${fromMarkdown.length} em Markdown; ${posts.length} post(s) para geração estática.`);
}

module.exports = { syncPosts };
