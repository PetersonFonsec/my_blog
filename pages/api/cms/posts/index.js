import { requireLogin } from "../../../../lib/cms-auth.mjs";
import { listFiles, readTextFile } from "../../../../lib/cms-github.mjs";
import { parsePostFile, postsDir } from "../../../../lib/markdown-posts.mjs";

// GET: posts em Markdown do repositório (inclui rascunhos), mais recentes primeiro.
export default async function handler(req, res) {
  if (!requireLogin(req, res)) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método não permitido." });
  }
  try {
    const files = (await listFiles(postsDir)).filter((file) => file.name.endsWith(".md"));
    const posts = await Promise.all(files.map(async (file) => {
      const slug = file.name.slice(0, -3);
      try {
        const { title, date, tags, draft } = parsePostFile(await readTextFile(file.path));
        return { slug, title, date, tags, draft };
      } catch {
        return { slug, title: `${slug} (arquivo inválido)`, date: "", tags: [], draft: true };
      }
    }));
    posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("[CMS]", error);
    return res.status(502).json({ error: "Não consegui ler os posts no GitHub." });
  }
}
