import Prismic from "prismic-javascript";
import { client } from "./client";

//TODO pesquisar uma forma da api já entregar o campo nesse formato
function formatProfile(profile) {
  const getText = (field) => field[0]?.text;

  return {
    name: getText(profile.data?.name),
    role: getText(profile.data?.role),
    avatar: profile.data?.avatar,
    contact: profile.data?.contact,
    cv: profile.data?.cv,
  };
}

export async function getProfile() {
  const results = await client.query(
    Prismic.Predicates.at("document.type", "prof")
  );

  return results.results.map((profile) => formatProfile(profile))[0];
}
