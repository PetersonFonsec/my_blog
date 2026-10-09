# CLAUDE.md — my_blog (petersonsimiao.com.br)

Site pessoal do Peterson Simião: portfólio + diário de estudos com estética de jogo de plataforma em pixel art.
**Todo o conteúdo e a interface são em português (pt-BR).** Escreva textos, mensagens de erro e commits em português, seguindo o estilo existente.

## Fluxo de trabalho (importante)

- A branch `main` publica **automaticamente em produção** na Vercel (https://petersonsimiao.com.br) a cada push.
- **Nunca faça commit ou push direto na `main`.** Trabalhe sempre em uma branch (`feat/...`, `fix/...`) e abra um PR.
- Mensagens de commit seguem o padrão `tipo: descrição` (ex.: `feat: ...`, `fix: ...`).
- Não crie nem commite segredos. `.env*.local` e `.env` estão no `.gitignore`.

## Stack e ambiente

- Next.js 16 (**Pages Router**, não App Router), React 19, `@prismicio/client` 7.
- **Node.js 22.x** (campo `engines` do `package.json`; `.nvmrc` local com `22`).
- npm com `package-lock.json` (lockfileVersion 3) → instale com `npm ci`.
- JavaScript puro (sem TypeScript). CSS global em `styles/site.css`.
- Estilo de código (`.editorconfig`): 2 espaços, LF, UTF-8.

## Comandos

| Comando | O que faz |
|---|---|
| `npm ci` | Instala as dependências exatamente como no lockfile |
| `npm run dev` | `next dev` em http://localhost:3000 (baixa os posts do Prismic ao iniciar) |
| `npm run build` | `next build`: baixa os posts do Prismic e gera o site estático |
| `npm start` | `next start`: serve o build de produção |

Não há scripts de lint, testes nem Storybook no `package.json`.

## Como o conteúdo do Prismic entra no build

- `next.config.js` exporta uma função: nas fases `PHASE_PRODUCTION_BUILD` e `PHASE_DEVELOPMENT_SERVER` chama `syncPosts()` de `scripts/sync-posts.cjs` (uma vez por processo, controlado por `__PRISMIC_BUILD_SNAPSHOT_READY`).
- `syncPosts()` busca todos os documentos publicados do tipo `posts` (com paginação, todos os idiomas, mais recentes primeiro, timeout de 30s) no repositório Prismic `peterson-site` e grava `.generated/posts.json` (escrita atômica via `.tmp` + rename).
- `.generated/` está no `.gitignore` e **nunca deve ser versionado**.
- `services/blog.js` (`getBlog`) lê esse snapshot; é usado só em `getStaticPaths`/`getStaticProps` de `pages/posts/`.
- Sem ISR, sem fallback e sem consulta ao Prismic no navegador: slug ausente no build → 404.
- Erro de API, post sem título ou slug inválido/duplicado **interrompem o build** (de propósito).
- Slug = `slugs[0]` → `uid` → `id`. Tags que começam com a palavra `Projeto`/`Projetos` (ex.: `Projeto Pessoal`) → tipo `projeto`; com `Estudo(s)`/`Leitura(s)` → `estudo`; o resto → `post`.
- Cada post do snapshot tem `slug`, `title`, `type`, `category`, `excerpt` (até 180 caracteres), `readingTime` (200 palavras/min), `html` e `reference` (só URLs `http(s)`). `articleSummary()` remove `html` e `reference` para a listagem em `/posts`.
- Em dev, o snapshot só é atualizado ao iniciar `npm run dev`; reinicie para ver mudanças do CMS.
- Variáveis **opcionais** (não há nenhuma obrigatória; o `.env.example` ainda não lista estas duas):
  - `PRISMIC_REPOSITORY`: outro repositório/endpoint (padrão `peterson-site`).
  - `PRISMIC_ACCESS_TOKEN`: token para repositório privado (nunca com prefixo `NEXT_PUBLIC_`).
  - `ANALYTICS_PUBLIC_MEASUREMENT_ID`: ID do GA4 (`G-...`); sem ela o GA não carrega.
- Publicar/despublicar no Prismic dispara um Deploy Hook da Vercel (branch `main`). A URL do hook não fica no Git.

## Estrutura de pastas

- `pages/`: rotas (Pages Router)
  - `index.js` (home), `sobre.js` (/sobre), `posts/index.js` (/posts), `posts/[slug].js` (post)
  - `_app.js`, `_document.js`, `api/hello.js` (rota de exemplo do template)
- `components/`: `SiteChrome.js` (header/footer) e `Seo.js` são os usados pelas páginas atuais.
  As demais pastas (`Badge`, `Banners`, `Buttons`, `Cards`, `Carousels`, `CmsContent`, `Forms`, `Layouts`, `Lists`, `Socials`) são de uma versão antiga, usam `styled-components` (não instalado) e têm `stories.js` do Storybook.
  `GoogleAnalytics/index.jsx` carrega o GA4 em `_app.js` quando `ANALYTICS_PUBLIC_MEASUREMENT_ID` está definida (exposta ao navegador via `env` do `next.config.js`). Cliques são rastreados por `lib/analytics.js` em elementos com `data-ga-event` (+ `data-ga-*` como parâmetros); veja a seção Google Analytics do README.
- `services/`: `blog.js` (lê o snapshot) é o único em uso. `client.js`, `about.js`, `profile.js` e `project.js` são legados e usam `prismic-javascript` (não instalado): não os importe sem reinstalar/migrar.
- `scripts/sync-posts.cjs`: download do Prismic → `.generated/posts.json`.
- `data/`: `about.js` (conteúdo de `/sobre`, em uso). `articles.js` é legado (posts antigos em código) e não é importado; os posts vêm só do Prismic.
- `styles/`: `site.css` (em uso) e `global.js`/`theme.js`/`variaves.js` (legado styled-components).
- `public/`: imagens, favicons (`favicon/`, com `?v=pixel-2` para quebrar cache) e `share.png`/`sprites.png`. `sw.js` e `workbox-*.js` são sobras de um PWA antigo: nenhuma página registra o service worker.
- `next.config.js`: redirects (`/about` → `/#sobre`, `/blog` e `/projetos` → `/posts`) + sync do Prismic.

## Ferramentas incompletas (não assuma que funcionam)

- **Husky**: existe `.husky/pre-push`, mas o arquivo está **vazio** e `husky` não está no `package.json` (nem script `prepare`). Nenhum hook roda.
- **Storybook**: existe `.storybook/` (`main.js`, `preview.js`), mas nenhum pacote `@storybook/*` está instalado, não há script `storybook`, e o `preview.js` importa `styled-components`, `swiper` e `styles/theme` (legado). Não funciona sem reinstalar/migrar.

## Validação antes de abrir PR

1. `npm ci`
2. `npm run build` (precisa de acesso à internet para o Prismic; deve logar `[Prismic] N post(s) baixado(s)...`)
3. `npm run dev` e conferir `/`, `/posts`, `/sobre` e um `/posts/<slug>`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
