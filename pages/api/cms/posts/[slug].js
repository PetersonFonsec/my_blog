import { requireLogin } from "../../../../lib/cms-auth.mjs";
import { commitFiles, readTextFile } from "../../../../lib/cms-github.mjs";
import { parsePostFile, postsDir, serializePostFile, slugPattern, validatePost } from "../../../../lib/markdown-posts.mjs";

// Fotos chegam já reduzidas pelo navegador; a Vercel aceita até 4,5 MB por requisição.
export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

const imagePath = /^\/uploads\/\d{4}\/\d{2}\/[a-z0-9-]+\.(?:jpe?g|png|webp|gif)$/;

// Um post do Prismic com o mesmo slug seria substituído pelo novo: confere no site publicado.
async function publishedOnSite(req, slug) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  try {
    const response = await fetch(`${protocol}://${req.headers.host}/posts/${slug}`, { method: "HEAD", signal: AbortSignal.timeout(10000) });
    return response.status === 200;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (!requireLogin(req, res)) return;
  const { slug } = req.query;
  if (!slugPattern.test(slug)) return res.status(400).json({ error: "Endereço inválido: use letras minúsculas, números e hífens." });
  const filePath = `${postsDir}/${slug}.md`;

  try {
    if (req.method === "GET") {
      const source = await readTextFile(filePath);
      if (source === null) return res.status(404).json({ error: "Post não encontrado." });
      return res.status(200).json({ slug, post: parsePostFile(source) });
    }

    if (req.method === "PUT") {
      const { isNew, title, tags, reference, draft, body, images = [] } = req.body || {};
      const source = await readTextFile(filePath);
      if (isNew && (source !== null || await publishedOnSite(req, slug))) {
        return res.status(409).json({ error: "Já existe um post com esse endereço. Mude o slug." });
      }
      if (!isNew && source === null) return res.status(404).json({ error: "Post não encontrado." });

      const previous = source === null ? null : parsePostFile(source);
      const now = new Date().toISOString();
      // A data de publicação é a da primeira vez que o post sai do rascunho.
      const firstPublish = !draft && (!previous || previous.draft);
      const post = {
        title: String(title || "").trim(),
        date: firstPublish || !previous ? now : previous.date,
        updatedAt: previous && !firstPublish ? now : "",
        tags: Array.isArray(tags) ? tags.map(String) : [],
        reference: String(reference || "").trim(),
        draft: Boolean(draft),
        body: String(body || ""),
      };
      try {
        validatePost(slug, post);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      if (!Array.isArray(images) || images.length > 10
        || images.some((image) => !imagePath.test(image?.path || "") || typeof image.base64 !== "string")) {
        return res.status(400).json({ error: "Imagens inválidas." });
      }

      const action = post.draft ? "salva rascunho" : firstPublish ? "publica" : "atualiza";
      await commitFiles([
        { path: filePath, content: serializePostFile(post) },
        ...images.map((image) => ({ path: `public${image.path}`, base64: image.base64 })),
      ], `conteudo: ${action} "${post.title}"`);
      return res.status(200).json({ slug, post, published: !post.draft });
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Método não permitido." });
  } catch (error) {
    console.error("[CMS]", error);
    return res.status(502).json({ error: "Falha ao falar com o GitHub. Tente de novo." });
  }
}
