import { readFile } from "node:fs/promises";
import path from "node:path";

// Imported only by getStaticPaths/getStaticProps; never shipped to the browser.
export async function getBlog() {
  return JSON.parse(await readFile(path.join(process.cwd(), ".generated", "posts.json"), "utf8"));
}

export function articleSummary({ html, reference, ...summary }) {
  return summary;
}
