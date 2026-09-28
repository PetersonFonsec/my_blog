const fs = require('node:fs/promises');
const path = require('node:path');
const prismic = require('@prismicio/client');

const snapshotPath = path.join(__dirname, '..', '.generated', 'posts.json');
const slugOf = (document) => document.slugs?.[0] || document.uid || document.id;

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
    const content = data.content || [];
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
      }),
      reference: /^https?:\/\//i.test(data.references?.url || '') ? data.references.url : null,
    };
  });
  await fs.mkdir(path.dirname(snapshotPath), { recursive: true });
  await fs.writeFile(`${snapshotPath}.tmp`, JSON.stringify(posts));
  await fs.rename(`${snapshotPath}.tmp`, snapshotPath);
  console.log(`[Prismic] ${posts.length} post(s) baixado(s) para geração estática.`);
}

module.exports = { syncPosts };
