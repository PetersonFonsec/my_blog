import Link from "next/link";
import CardInfo from "../../Cards/CardInfo/index";
import { List, Item, ButtonShowMore } from "./style";
import { projects } from "./models";

function getProjects(number) {
  return projects.map((project, i) => {
    if (i > number) return;

    return (
      <Item key={i}>
        <CardInfo {...project} />
      </Item>
    );
  });
}

function ListProjects() {
  return (
    <>
      <List>{getProjects(4)}</List>

      <Link href="/projetos">
        <ButtonShowMore as="a">Ver Mais</ButtonShowMore>
      </Link>
    </>
  );
}

export default ListProjects;
