// Starts the production build (`next start`) and checks the main routes.
// Run after `npm run build`: `npm run test:smoke`.
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const port = process.env.PORT || '4173';
const baseUrl = `http://127.0.0.1:${port}`;

const posts = JSON.parse(await readFile(new URL('../.generated/posts.json', import.meta.url), 'utf8'));

// React escapes these characters when rendering text.
const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;',
})[char]);

const checks = [
  { path: '/', status: 200 },
  { path: '/sobre', status: 200 },
  { path: '/posts', status: 200 },
  { path: '/pagina-que-nao-existe', status: 404 },
  { path: '/posts/slug-que-nao-existe', status: 404 },
  { path: '/about', status: 308, location: '/#sobre' },
  { path: '/blog', status: 308, location: '/posts' },
  { path: '/projetos', status: 308, location: '/posts' },
  ...posts.map((post) => ({ path: `/posts/${encodeURIComponent(post.slug)}`, status: 200, contains: escapeHtml(post.title) })),
];

const server = spawn('npx', ['next', 'start', '-p', port, '-H', '127.0.0.1'], { stdio: 'inherit' });

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`next start saiu com código ${server.exitCode}`);
    try {
      await fetch(baseUrl, { redirect: 'manual' });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Servidor não respondeu em ${timeoutMs / 1000}s`);
}

let failures = 0;
try {
  await waitForServer();
  for (const check of checks) {
    const response = await fetch(baseUrl + check.path, { redirect: 'manual' });
    const errors = [];
    if (response.status !== check.status) errors.push(`status ${response.status}, esperado ${check.status}`);
    if (check.location && response.headers.get('location') !== check.location) {
      errors.push(`location ${response.headers.get('location')}, esperado ${check.location}`);
    }
    if (check.contains && !(await response.text()).includes(check.contains)) {
      errors.push(`HTML não contém "${check.contains}"`);
    }
    failures += errors.length ? 1 : 0;
    console.log(`${errors.length ? '✗' : '✓'} ${check.path}${errors.length ? ` — ${errors.join('; ')}` : ''}`);
  }
} catch (error) {
  failures += 1;
  console.error(error.message);
} finally {
  server.kill();
}

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam.`);
  process.exit(1);
}
console.log(`\n${checks.length} verificações passaram.`);
