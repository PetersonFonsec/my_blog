// Posts escritos em Markdown no próprio repositório (content/posts/<slug>.md).
// Usado pelo build (scripts/sync-posts.cjs) e pelas rotas do editor (/api/cms/*).
import { Marked } from "marked";

export const postsDir = "content/posts";
export const uploadsDir = "public/uploads";
export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugify = (text) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Front matter simples: uma linha "chave: valor" por campo, tags separadas por vírgula.
//   ---
//   title: Meu post
//   date: 2026-10-10T12:00:00.000Z
//   tags: Estudo, Next.js
//   reference: https://exemplo.com
//   draft: false
//   ---
export function parsePostFile(source) {
  const match = source.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("Arquivo sem front matter (bloco entre ---).");
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return {
    title: fields.title || "",
    date: fields.date || "",
    updatedAt: fields.updated || "",
    tags: (fields.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    reference: fields.reference || "",
    draft: fields.draft === "true",
    body: match[2].replace(/^\s*\n/, ""),
  };
}

const oneLine = (value = "") => String(value).replace(/\s+/g, " ").trim();

export function serializePostFile({ title, date, updatedAt, tags = [], reference, draft, body = "" }) {
  const lines = [
    "---",
    `title: ${oneLine(title)}`,
    `date: ${oneLine(date)}`,
    updatedAt && `updated: ${oneLine(updatedAt)}`,
    `tags: ${tags.map((tag) => oneLine(tag).replace(/,/g, "")).filter(Boolean).join(", ")}`,
    reference && `reference: ${oneLine(reference)}`,
    `draft: ${draft ? "true" : "false"}`,
    "---",
  ].filter(Boolean);
  return `${lines.join("\n")}\n\n${body.replace(/\r\n/g, "\n").trim()}\n`;
}

// Mesmos critérios dos posts do Prismic: erro aqui interrompe o build ou o salvamento.
export function validatePost(slug, post) {
  if (!slugPattern.test(slug)) throw new Error(`Slug inválido: ${slug}`);
  if (!oneLine(post.title)) throw new Error(`Post sem título: ${slug}`);
  if (Number.isNaN(Date.parse(post.date))) throw new Error(`Data inválida no post ${slug}: ${post.date || "(vazia)"}`);
  if (post.reference && !/^https?:\/\//i.test(post.reference)) throw new Error(`Referência deve começar com http(s):// no post ${slug}`);
}

const siteOrigin = /^https?:\/\/(?:www\.)?petersonsimiao\.com\.br(?=\/|$)/i;
const escapeAttribute = (value) => value.replace(/[&"<>]/g, (char) => ({ "&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;" })[char]);
const decodeEntities = (text) => text.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, name) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " })[name]);

// Converte o Markdown no mesmo formato que o build gera a partir do Prismic:
// h1 vira h2 (o título já é o <h1>), h2/h3 ganham ids para o sumário e
// links externos abrem em nova aba.
export function renderMarkdown(body, { imageSrc = (src) => src } = {}) {
  const used = new Map();
  const toc = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const level = Math.max(2, depth);
        const html = this.parser.parseInline(tokens);
        const text = decodeEntities(html.replace(/<[^>]+>/g, "")).trim();
        if (level > 3 || !text) return `<h${level}>${html}</h${level}>\n`;
        const base = slugify(text) || "secao";
        const count = used.get(base) || 0;
        used.set(base, count + 1);
        const id = count ? `${base}-${count + 1}` : base;
        toc.push({ id, text, level });
        return `<h${level} id="${id}">${html}</h${level}>\n`;
      },
      link({ href, title, tokens }) {
        const url = href.replace(siteOrigin, "") || "/";
        const external = /^https?:\/\//i.test(url);
        const attributes = [
          `href="${escapeAttribute(url)}"`,
          title && `title="${escapeAttribute(title)}"`,
          external && 'target="_blank" rel="noopener noreferrer"',
        ].filter(Boolean).join(" ");
        return `<a ${attributes}>${this.parser.parseInline(tokens)}</a>`;
      },
      image({ href, title, text }) {
        const attributes = [
          `src="${escapeAttribute(imageSrc(href))}"`,
          `alt="${escapeAttribute(text || "")}"`,
          title && `title="${escapeAttribute(title)}"`,
          'loading="lazy"',
        ].filter(Boolean).join(" ");
        return `<img ${attributes}>`;
      },
    },
  });
  const html = marked.parse(body || "");
  // Fim de bloco vira espaço; tags inline somem sem separar a palavra da pontuação.
  const text = decodeEntities(html.replace(/<\/(?:p|h\d|li|pre|blockquote|td|th)>|<br\s*\/?>/g, " ").replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ").trim();
  return { html, toc, text };
}
