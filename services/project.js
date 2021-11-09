import Prismic from "prismic-javascript";
import { client } from "./client";

//TODO pesquisar uma forma da api já entregar o campo nesse formato
function formatProject(project) {
  const getText = (field) => field[0]?.text;

  return {
    title: getText(project.data?.title),
    description: getText(project.data?.description),
    stack: getText(project.data?.stack),
    thumb: project.data.thumb,
    link: project.data.link,
  };
}

export async function getProjects() {
  const results = await client.query(
    Prismic.Predicates.at("document.type", "projects")
  );

  return results.results.map((project) => formatProject(project));
}
