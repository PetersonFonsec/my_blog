// Login do editor (/admin): uma senha só (CMS_PASSWORD) e um cookie assinado com ela.
// Trocar a senha na Vercel derruba todas as sessões abertas.
import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "cms_session";
const maxAgeSeconds = 60 * 60 * 24 * 30;

const sign = (value) => createHmac("sha256", process.env.CMS_PASSWORD).update(value).digest("base64url");

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

export const cmsConfigured = () => Boolean(process.env.CMS_PASSWORD && process.env.CMS_GITHUB_TOKEN);

export function checkPassword(password) {
  return Boolean(process.env.CMS_PASSWORD) && safeEqual(password || "", process.env.CMS_PASSWORD);
}

export function sessionCookie() {
  const expires = String(Date.now() + maxAgeSeconds * 1000);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${cookieName}=${expires}.${sign(expires)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAgeSeconds}${secure}`;
}

export const clearedCookie = () => `${cookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;

export function isLoggedIn(req) {
  if (!process.env.CMS_PASSWORD) return false;
  const [expires, signature] = (req.cookies?.[cookieName] || "").split(".");
  return Boolean(expires && signature) && Number(expires) > Date.now() && safeEqual(signature, sign(expires));
}

// Responde 401/503 e devolve false quando a requisição não pode seguir.
export function requireLogin(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!cmsConfigured()) {
    res.status(503).json({ error: "CMS não configurado: defina CMS_PASSWORD e CMS_GITHUB_TOKEN na Vercel." });
    return false;
  }
  if (!isLoggedIn(req)) {
    res.status(401).json({ error: "Sessão expirada. Entre de novo." });
    return false;
  }
  return true;
}
