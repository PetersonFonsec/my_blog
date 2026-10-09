# Peterson Simião — site pessoal

Portfólio e diário de estudos com estética inspirada em jogos de plataforma em pixel art. O site apresenta minha atuação profissional, projetos pessoais e artigos que combinam teoria e prática.

## Tecnologias

- React 19
- Next.js 16 (Pages Router)
- CSS responsivo, animações por scroll e camadas com parallax
- Conteúdo estático preparado para publicação na Vercel

## Desenvolvimento local

Requer Node.js 22.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validação de produção

```bash
npm run build
npm start
```

## Integração contínua

Todo pull request para `main` roda o workflow `.github/workflows/ci.yml`:

- **Lint:** `npm run lint` (ESLint com `eslint-config-next`, sem warnings).
- **Build e smoke test:** `npm run build` e `npm run test:smoke`, que sobe o
  `next start` e confere o status de `/`, `/sobre`, `/posts`, de cada post do
  snapshot, das páginas 404 e dos redirects.

O build do CI consulta o Prismic como a Vercel faz, então um conteúdo publicado
com erro (título ausente, slug duplicado) também falha o PR. Para repositórios
privados, cadastre o secret `PRISMIC_ACCESS_TOKEN` (e, se necessário, a variável
`PRISMIC_REPOSITORY`) em Settings → Secrets and variables → Actions.

Para rodar localmente:

```bash
npm run lint
npm run build && npm run test:smoke
```

## Posts do Prismic no build

Todo `next build` (incluindo `npm run build` no deploy) consulta o Prismic,
baixa todos os documentos publicados do tipo `posts`, seguindo a paginação,
e cria um snapshot local em `.generated/posts.json`. Esse arquivo é regenerado
em cada build e não deve ser versionado.

`getStaticPaths` e `getStaticProps` usam esse snapshot para gerar o HTML de
`/posts` e de cada `/posts/[slug]`. Não há ISR, geração sob demanda ou consulta
ao Prismic no navegador. Slugs ausentes no build retornam 404. Os filtros usam
apenas os resumos já presentes na página; o conteúdo completo dos outros posts
não é enviado na listagem. O prefetch dos links de artigos está desativado.
O Next.js ainda carrega seus arquivos estáticos e dados de navegação quando
necessário; imagens e embeds presentes nos posts podem fazer requisições próprias.

O mesmo passo gera `public/sitemap.xml` e `public/llms.txt` com as páginas fixas
e todos os posts do snapshot (`scripts/generate-seo-files.cjs`). Os dois arquivos
também são regenerados em cada build e não são versionados; `public/robots.txt`
aponta para o sitemap.

O conteúdo usa os campos existentes `title`, `content`, `references` e as tags.
O slug editorial (`slugs[0]`) é preferido ao UID, mantendo URLs legíveis.
Tags que começam com a palavra `Projeto`/`Projetos` (ex.: `Projeto Pessoal`) classificam projetos e as que começam com `Estudo(s)`/`Leitura(s)` classificam estudos e leituras; os demais são posts. As tags não diferenciam maiúsculas/minúsculas.
Erros de API, títulos ausentes ou slugs duplicados interrompem o build.
Não há fallback silencioso para os artigos de exemplo.

O repositório padrão é `peterson-site`. Variáveis opcionais no ambiente de build:

- `PRISMIC_REPOSITORY`: nome ou endpoint de outro repositório.
- `PRISMIC_ACCESS_TOKEN`: token para um repositório privado (sem prefixo `NEXT_PUBLIC_`).

Publicar, editar ou excluir um post no Prismic exige um novo build/deploy para
atualizar o site. O webhook `Vercel — publicação do site` no Prismic aciona o Deploy Hook
`Prismic — publicações` do projeto Vercel `my-blog`, branch `main`, quando um
documento é publicado (incluindo atualizações) ou despublicado. Eventos de
rascunhos, alterações de releases e criação/exclusão de tags não disparam builds.
O gatilho se aplica aos documentos do repositório; o build importa apenas `posts`.
A URL privada do hook fica somente nos painéis dos serviços e não no Git.

Para verificar a integração, use o teste do webhook no Prismic e confira a nova
implantação em Deployments na Vercel. O conteúdo entra no ar após o build concluir.
O código precisa estar na branch `main` remota, pois o hook usa essa versão.
Em desenvolvimento, o snapshot é atualizado ao iniciar `npm run dev`; reinicie
o processo para buscar alterações do CMS.

Cada push para a branch `main` gera uma nova publicação na Vercel configurada para este repositório.

## Google Analytics

Defina `ANALYTICS_PUBLIC_MEASUREMENT_ID` (ex.: `G-XXXXXXXXXX`) nas variáveis de
ambiente da Vercel. Sem ela, o script do GA não é carregado (ex.: localmente).

Page views, inclusive navegações no cliente, vêm da medição otimizada do GA4
(opção "Mudanças de página com base em eventos do histórico do navegador",
ativa por padrão). Cliques são enviados por um listener único em `_app.js`
para qualquer elemento com `data-ga-event`; os demais atributos `data-ga-*`
viram parâmetros do evento (`data-ga-content-id` → `content_id`).

Eventos:

- `select_content` — clique em um post (`content_type=post`, `content_id` = slug, `label`, `location`).
- `cta_click` — botões de CTA e links do menu (`label`, `location`, `link_url`).
- `filter_posts` — filtros da listagem de publicações (`label`).

Para ver os parâmetros nos relatórios, registre `label`, `location` e
`content_id` como dimensões personalizadas (escopo de evento) no GA4 e marque
`select_content` e `cta_click` como eventos-chave.
