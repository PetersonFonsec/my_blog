// Leitura e gravação dos posts direto no repositório pela API do GitHub.
// Cada salvamento vira um commit na branch de produção, e a Vercel publica sozinha.
const repo = () => process.env.CMS_GITHUB_REPO || "PetersonFonsec/my_blog";
const branch = () => process.env.CMS_GITHUB_BRANCH || "main";

async function github(method, endpoint, body) {
  const response = await fetch(`https://api.github.com/repos/${repo()}${endpoint}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.CMS_GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body && { "Content-Type": "application/json" }),
    },
    body: body && JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  });
  if (response.status === 404 && method === "GET") return null;
  if (!response.ok) {
    const error = new Error(`GitHub respondeu ${response.status} em ${method} ${endpoint}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

const encodePath = (filePath) => filePath.split("/").map(encodeURIComponent).join("/");

// Lista um diretório; devolve [] se ele ainda não existir.
export async function listFiles(dir) {
  const entries = await github("GET", `/contents/${encodePath(dir)}?ref=${encodeURIComponent(branch())}`);
  return Array.isArray(entries) ? entries.filter((entry) => entry.type === "file") : [];
}

// Conteúdo de um arquivo de texto, ou null se ele não existir.
export async function readTextFile(filePath) {
  const file = await github("GET", `/contents/${encodePath(filePath)}?ref=${encodeURIComponent(branch())}`);
  return file ? Buffer.from(file.content, "base64").toString("utf8") : null;
}

// Grava vários arquivos em um único commit (um único deploy na Vercel).
// files: [{ path, content: string }] ou [{ path, base64 }] para binários.
export async function commitFiles(files, message, attempt = 1) {
  const ref = await github("GET", `/git/ref/heads/${encodeURIComponent(branch())}`);
  const parent = ref.object.sha;
  const { tree: baseTree } = await github("GET", `/git/commits/${parent}`);
  const tree = await Promise.all(files.map(async (file) => {
    const blob = await github("POST", "/git/blobs", file.base64 !== undefined
      ? { content: file.base64, encoding: "base64" }
      : { content: file.content, encoding: "utf-8" });
    return { path: file.path, mode: "100644", type: "blob", sha: blob.sha };
  }));
  const newTree = await github("POST", "/git/trees", { base_tree: baseTree.sha, tree });
  const commit = await github("POST", "/git/commits", { message, tree: newTree.sha, parents: [parent] });
  try {
    await github("PATCH", `/git/refs/heads/${encodeURIComponent(branch())}`, { sha: commit.sha });
  } catch (error) {
    // Outro commit entrou na branch no meio do caminho: refaz sobre o novo topo.
    if (error.status === 422 && attempt < 3) return commitFiles(files, message, attempt + 1);
    throw error;
  }
  return commit.sha;
}
