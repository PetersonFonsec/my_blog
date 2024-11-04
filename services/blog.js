import Prismic from "prismic-javascript";
import { client } from "./client";

function formatBlog(blog) {
  const getText = (field) => field[0]?.text;

  return {
    name: getText(blog.data?.name),
    role: getText(blog.data?.role),
    avatar: blog.data?.avatar,
    contact: blog.data?.contact,
    cv: blog.data?.cv,
  };
}

export async function getBlog() {
  const results = await client.query(
    Prismic.Predicates.at("document.type", "post")
  );

  return results.results.map((blog) => formatBlog(blog))[0];
}
