import Prismic from "prismic-javascript";
import { client } from "./client";

function formatBlog(result) {
  const getText = (field) => field[0]?.text;

  return {
    title: getText(result.data.title),
    description: "",
    stack: null,
    link: {
      url: "/blog/" + result.slugs[0],
      target: "_self",
    },
    thumb: result.data.thumb,
    content: getText(result.data.content),
    reference: result.data.references.url,
    tags: result.tags,
    id: result.id,
    slug: result.slugs[0],
    publicationDate: result.first_publication_date,
  };
}

export async function getBlog() {
  const results = await client.query(
    Prismic.Predicates.at("document.type", "posts")
  );

  return results.results.map((blog) => formatBlog(blog));
}
