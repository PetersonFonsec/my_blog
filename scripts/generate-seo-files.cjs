const fs = require('node:fs/promises');
const path = require('node:path');

const origin = 'https://petersonsimiao.com.br';
const publicDir = path.join(__dirname, '..', 'public');

const pages = [
  { path: '/', title: 'Início', description: 'Apresentação, projetos em destaque e contato.' },
  { path: '/sobre', title: 'Sobre mim', description: 'Atuação como desenvolvedor full stack sênior, forma de trabalhar e estudos.' },
  { path: '/posts', title: 'Estudos e projetos', description: 'Arquivo com todos os artigos de estudos e projetos pessoais.' },
];

const escapeXml = (value) => value.replace(/[<>&'"]/g, (char) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[char]};`);
const oneLine = (value) => value.replace(/\s+/g, ' ').trim();

function buildSitemap(posts) {
  const newest = posts.map((post) => post.updatedAt).filter(Boolean).sort().at(-1);
  const urls = [
    ...pages.map((page) => ({ loc: `${origin}${page.path}`, lastmod: page.path === '/posts' ? newest : null })),
    ...posts.map((post) => ({ loc: `${origin}/posts/${encodeURIComponent(post.slug)}`, lastmod: post.updatedAt })),
  ];
  const entries = urls.map(({ loc, lastmod }) => [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod && `    <lastmod>${lastmod.slice(0, 10)}</lastmod>`,
    '  </url>',
  ].filter(Boolean).join('\n'));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

function buildLlmsTxt(posts) {
  const list = (items) => items.length ? items.join('\n') : '- Nenhuma publicação no momento.';
  const postLine = (post) => `- [${oneLine(post.title)}](${origin}/posts/${encodeURIComponent(post.slug)}): ${oneLine(post.excerpt) || post.category}`;
  return `# Peterson Simião

> Site pessoal de Peterson Simião, desenvolvedor full stack sênior. Reúne portfólio, projetos pessoais e um diário de estudos com artigos que combinam teoria e prática em desenvolvimento de software. Conteúdo em português (pt-BR).

Peterson atua do planejamento à implementação, conectando frontend e backend, e é referência em frontend no seu time. Os próximos estudos focam em cloud e inteligência artificial.

## Páginas

${pages.map((page) => `- [${page.title}](${origin}${page.path}): ${page.description}`).join('\n')}

## Estudos

${list(posts.filter((post) => post.type === 'estudo').map(postLine))}

## Projetos

${list(posts.filter((post) => post.type === 'projeto').map(postLine))}

## Optional

- [GitHub](https://github.com/PetersonFonsec): Repositórios e código-fonte.
- [LinkedIn](https://www.linkedin.com/in/peterson-fonseca-759203174/): Perfil profissional.
- [Sitemap](${origin}/sitemap.xml): Lista completa de URLs do site.
`;
}

async function generateSeoFiles(posts) {
  await Promise.all([
    fs.writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemap(posts)),
    fs.writeFile(path.join(publicDir, 'llms.txt'), buildLlmsTxt(posts)),
  ]);
  console.log('[SEO] sitemap.xml e llms.txt gerados em public/.');
}

module.exports = { generateSeoFiles };
