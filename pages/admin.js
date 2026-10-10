import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderMarkdown, slugify } from "../lib/markdown-posts.mjs";

// Editor de posts pensado para o celular. Salvar faz um commit em content/posts/
// pela API do GitHub; a Vercel publica o site sozinha em seguida.

const emptyPost = { title: "", tags: "", reference: "", body: "", draft: true };
const draftKey = (slug) => `cms-draft:${slug || "novo"}`;

function readLocalDraft(slug) {
  try {
    return JSON.parse(localStorage.getItem(draftKey(slug)) || "null");
  } catch {
    return null;
  }
}

function writeLocalDraft(slug, value) {
  try {
    if (value) localStorage.setItem(draftKey(slug), JSON.stringify(value));
    else localStorage.removeItem(draftKey(slug));
  } catch {
    // Sem armazenamento local (aba anônima): o texto só fica na tela.
  }
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body && JSON.stringify(options.body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || `Erro ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}

// Reduz a foto da câmera (vários MB) para no máximo 1600 px em JPEG.
async function resizeImage(file) {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", 0.82);
}

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/cms/session", { method: "POST", body: { password } });
      onLogin();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="cms-panel cms-login" onSubmit={submit}>
      <label htmlFor="cms-password">Senha</label>
      <input id="cms-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      {error && <p className="cms-error" role="alert">{error}</p>}
      <button className="button primary" type="submit" disabled={busy}>{busy ? "Entrando…" : "Entrar"}</button>
    </form>
  );
}

function PostList({ onOpen, onLogout }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/cms/posts").then((data) => setPosts(data.posts)).catch((failure) => setError(failure.message));
  }, []);

  return (
    <div className="cms-panel">
      <div className="cms-row">
        <button className="button primary" type="button" onClick={() => onOpen(null)}>+ Novo post</button>
        <button className="cms-link" type="button" onClick={onLogout}>Sair</button>
      </div>
      {error && <p className="cms-error" role="alert">{error}</p>}
      {!posts && !error && <p className="cms-muted">Carregando posts…</p>}
      {posts?.length === 0 && <p className="cms-muted">Nenhum post em Markdown ainda. Os posts antigos continuam no Prismic.</p>}
      <ul className="cms-list">
        {posts?.map((post) => (
          <li key={post.slug}>
            <button type="button" onClick={() => onOpen(post.slug)}>
              <strong>{post.title}</strong>
              <small>{post.draft ? "RASCUNHO" : new Date(post.date).toLocaleDateString("pt-BR")}{post.tags.length > 0 && ` · ${post.tags.join(", ")}`}</small>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Editor({ slug: initialSlug, onBack, onExpired }) {
  const isNew = !initialSlug;
  const [slug, setSlug] = useState(initialSlug || "");
  const [slugEdited, setSlugEdited] = useState(false);
  // O editor só existe no navegador (depois de checar a sessão), então dá para ler o localStorage aqui.
  const [post, setPost] = useState(() => (isNew ? readLocalDraft(null) || emptyPost : undefined));
  const [saved, setSaved] = useState(null);
  const [images, setImages] = useState({});
  // Fotos já enviadas continuam na prévia (o site só as tem depois do deploy), mas não são reenviadas.
  const [uploaded, setUploaded] = useState(() => new Set());
  const [tab, setTab] = useState("escrever");
  const [status, setStatus] = useState({ kind: "", text: "" });
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  // Carrega o post (ou o texto guardado no aparelho, se for mais novo).
  useEffect(() => {
    if (isNew) return;
    const local = readLocalDraft(initialSlug);
    api(`/api/cms/posts/${initialSlug}`).then(({ post: remote }) => {
      const loaded = { ...remote, tags: remote.tags.join(", ") };
      setSaved(loaded);
      setPost(local || loaded);
      if (local) setStatus({ kind: "info", text: "Recuperei uma edição não salva deste post." });
    }).catch((failure) => {
      if (failure.status === 401) onExpired();
      setStatus({ kind: "error", text: failure.message });
    });
  }, [initialSlug, isNew, onExpired]);

  // Guarda o texto no aparelho a cada mudança: sinal ruim na rua não apaga nada.
  // Depois do primeiro salvamento, um post novo passa a ser guardado pelo slug.
  const storageSlug = saved ? slug : initialSlug;
  useEffect(() => {
    if (post && post !== saved) writeLocalDraft(storageSlug, post);
  }, [storageSlug, post, saved]);

  const update = (field) => (event) => {
    const value = field === "draft" ? event.target.checked : event.target.value;
    setPost((current) => ({ ...current, [field]: value }));
    if (field === "title" && isNew && !slugEdited) setSlug(slugify(value));
  };

  function insert(before, after = "", placeholder = "") {
    const textarea = bodyRef.current;
    const { selectionStart: start, selectionEnd: end, value } = textarea;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    setPost((current) => ({ ...current, body: next }));
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  async function addPhotos(event) {
    const files = [...event.target.files];
    event.target.value = "";
    if (!files.length) return;
    setStatus({ kind: "info", text: "Preparando fotos…" });
    try {
      const now = new Date();
      const folder = `/uploads/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
      const added = {};
      let markdown = "";
      for (const file of files) {
        const name = `${slug || "foto"}-${Math.random().toString(36).slice(2, 8)}`;
        const path = `${folder}/${name}.jpg`;
        added[path] = await resizeImage(file);
        markdown += `\n\n![Descrição da foto](${path})\n\n`;
      }
      setImages((current) => ({ ...current, ...added }));
      insert(markdown);
      setStatus({ kind: "info", text: "Foto adicionada. Troque a descrição entre colchetes." });
    } catch {
      setStatus({ kind: "error", text: "Não consegui ler essa foto." });
    }
  }

  async function save(draft) {
    setBusy(true);
    setStatus({ kind: "info", text: draft ? "Salvando rascunho…" : "Publicando…" });
    const usedImages = Object.entries(images)
      .filter(([path]) => !uploaded.has(path) && post.body.includes(path))
      .map(([path, dataUrl]) => ({ path, base64: dataUrl.split(",")[1] }));
    try {
      const result = await api(`/api/cms/posts/${slug}`, {
        method: "PUT",
        body: {
          isNew: isNew && !saved,
          title: post.title,
          tags: post.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          reference: post.reference,
          draft,
          body: post.body,
          images: usedImages,
        },
      });
      const stored = { ...result.post, tags: result.post.tags.join(", ") };
      writeLocalDraft(initialSlug, null);
      setUploaded((current) => new Set([...current, ...usedImages.map(({ path }) => path)]));
      setSaved(stored);
      setPost(stored);
      setStatus({
        kind: "ok",
        text: result.published
          ? "Publicado! O site atualiza em alguns minutos, depois do deploy da Vercel."
          : "Rascunho salvo no repositório. Ele não aparece no site.",
      });
    } catch (failure) {
      if (failure.status === 401) onExpired();
      setStatus({ kind: "error", text: failure.message });
    } finally {
      setBusy(false);
    }
  }

  const preview = useMemo(() => (tab === "previa" && post
    ? renderMarkdown(post.body, { imageSrc: (src) => images[src] || src }).html
    : ""), [tab, post, images]);

  const handleBack = useCallback(() => {
    if (post && saved !== post && post !== emptyPost && !window.confirm("Sair sem salvar? O texto continua guardado neste aparelho.")) return;
    onBack();
  }, [post, saved, onBack]);

  if (post === undefined) {
    return <div className="cms-panel"><p className={status.kind === "error" ? "cms-error" : "cms-muted"}>{status.text || "Carregando…"}</p><button className="cms-link" type="button" onClick={onBack}>← Voltar</button></div>;
  }

  const published = saved && !saved.draft;
  const canSave = !busy && post.title.trim() && slug;

  return (
    <div className="cms-panel cms-editor">
      <button className="cms-link" type="button" onClick={handleBack}>← Posts</button>
      <label htmlFor="cms-title">Título</label>
      <input id="cms-title" value={post.title} onChange={update("title")} placeholder="Título do post" />
      <label htmlFor="cms-slug">Endereço</label>
      <div className="cms-slug">
        <span>/posts/</span>
        <input id="cms-slug" value={slug} disabled={!isNew || Boolean(saved)} autoCapitalize="none" onChange={(event) => { setSlugEdited(true); setSlug(slugify(event.target.value)); }} />
      </div>
      <label htmlFor="cms-tags">Tags <small>separadas por vírgula; comece com Estudo ou Projeto para escolher o tipo</small></label>
      <input id="cms-tags" value={post.tags} onChange={update("tags")} placeholder="Estudo, Next.js" />
      <label htmlFor="cms-reference">Referência <small>opcional</small></label>
      <input id="cms-reference" type="url" inputMode="url" value={post.reference} onChange={update("reference")} placeholder="https://" />

      <div className="cms-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "escrever"} onClick={() => setTab("escrever")}>Escrever</button>
        <button type="button" role="tab" aria-selected={tab === "previa"} onClick={() => setTab("previa")}>Prévia</button>
      </div>
      {tab === "escrever" ? (
        <>
          <div className="cms-toolbar" aria-label="Formatação">
            <button type="button" onClick={() => insert("\n## ", "\n", "Seção")}>T</button>
            <button type="button" onClick={() => insert("**", "**", "negrito")}><b>B</b></button>
            <button type="button" onClick={() => insert("_", "_", "itálico")}><i>I</i></button>
            <button type="button" onClick={() => insert("[", "](https://)", "link")}>link</button>
            <button type="button" onClick={() => insert("\n- ", "", "item")}>• lista</button>
            <button type="button" onClick={() => insert("\n```\n", "\n```\n", "código")}>{"</>"}</button>
            <label className="cms-photo">📷 foto<input type="file" accept="image/*" multiple onChange={addPhotos} hidden /></label>
          </div>
          <textarea ref={bodyRef} className="cms-body" value={post.body} onChange={update("body")} placeholder="Escreva em Markdown…" aria-label="Texto do post" />
        </>
      ) : (
        <div className="cms-content cms-preview" dangerouslySetInnerHTML={{ __html: preview || "<p>Nada escrito ainda.</p>" }} />
      )}

      {status.text && <p className={`cms-status cms-status--${status.kind}`} role="status">{status.text}</p>}
      {published && <p className="cms-muted"><a href={`/posts/${slug}`} target="_blank" rel="noreferrer">Ver no site ↗</a></p>}
      <div className="cms-actions">
        <button className="button" type="button" disabled={!canSave} onClick={() => save(true)}>{published ? "Despublicar" : "Salvar rascunho"}</button>
        <button className="button primary" type="button" disabled={!canSave} onClick={() => save(false)}>{published ? "Atualizar" : "Publicar"}</button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [editing, setEditing] = useState(undefined);

  const refresh = useCallback(() => {
    api("/api/cms/session").then(setSession).catch(() => setSession({ configured: false, loggedIn: false, offline: true }));
  }, []);
  useEffect(refresh, [refresh]);

  const expire = useCallback(() => setSession((current) => ({ ...current, loggedIn: false })), []);

  async function logout() {
    await api("/api/cms/session", { method: "DELETE" }).catch(() => {});
    setEditing(undefined);
    refresh();
  }

  return (
    <>
      <Head>
        <title>Escrever — Peterson Simião</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="manifest" href="/admin.webmanifest" key="manifest" />
      </Head>
      <main className="cms">
        <header className="cms-header">
          <span className="brand">Peterson<span>.</span></span>
          <span className="eyebrow">Editor de posts</span>
        </header>
        {!session && <p className="cms-muted">Carregando…</p>}
        {session?.offline && <p className="cms-error">Sem conexão com o site. O texto que você já escreveu continua salvo neste aparelho.</p>}
        {session && !session.offline && !session.configured && <p className="cms-error">CMS não configurado: defina CMS_PASSWORD e CMS_GITHUB_TOKEN nas variáveis da Vercel.</p>}
        {session?.configured && !session.loggedIn && <Login onLogin={refresh} />}
        {session?.loggedIn && editing === undefined && <PostList onOpen={setEditing} onLogout={logout} />}
        {session?.loggedIn && editing !== undefined && <Editor key={editing || "novo"} slug={editing} onBack={() => setEditing(undefined)} onExpired={expire} />}
      </main>
    </>
  );
}
