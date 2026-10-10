import { checkPassword, clearedCookie, cmsConfigured, isLoggedIn, sessionCookie } from "../../../lib/cms-auth.mjs";

// GET: estado da sessão · POST { password }: entra · DELETE: sai.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") {
    return res.status(200).json({ configured: cmsConfigured(), loggedIn: isLoggedIn(req) });
  }
  if (req.method === "POST") {
    if (!cmsConfigured()) return res.status(503).json({ error: "CMS não configurado: defina CMS_PASSWORD e CMS_GITHUB_TOKEN na Vercel." });
    if (!checkPassword(req.body?.password)) {
      // Atrasa tentativas erradas para dificultar chutes em sequência.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.status(401).json({ error: "Senha incorreta." });
    }
    res.setHeader("Set-Cookie", sessionCookie());
    return res.status(200).json({ loggedIn: true });
  }
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearedCookie());
    return res.status(200).json({ loggedIn: false });
  }
  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "Método não permitido." });
}
