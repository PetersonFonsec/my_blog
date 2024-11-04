import Prismic from "prismic-javascript";
import { client } from "./client";

function formatAbout(about) {
  return {
    content: about.data.content,
  };
}

export async function getAbout() {
  const results = await client.query(
    Prismic.Predicates.at("document.type", "about")
  );

  return results.results.map((profile) => formatAbout(profile))[0];
}
