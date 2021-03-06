import Link from "next/link";
import CardInfo from "../../Cards/CardInfo/index";
import { List, Item, ButtonShowMore } from "./style";
import { projects } from "./models";

const Projects = [
  {
    title: "Sindsep",
    description: "Sindsep - Sindicato dos Servidores Municipais de São Paulo",
    date: "21/06/1999",
    thumb: "/projects/sindsep-share.png",
  },
  {
    title: "Sua Breja",
    description: "Cervejas Artesanais Personalizadas",
    date: "21/06/1999",
    thumb: "/projects/suabreja-share.png",
  },
  {
    title: "Sítio Sassafraz",
    description:
      "A Família Vanini preserva uma história de dedicação e amor no interior de São Paulo. Essa é a sua chance de sair da cidade e aproveitar um dia inesquecível perto da natureza!",
    date: "21/06/1999",
    thumb: "/projects/sitio-share.png",
  },
  {
    title: "Docloc",
    description: "Seu consultório em qualquer lugar.",
    date: "21/06/1999",
    thumb: "/projects/docloc-share.png",
  },
  {
    title: "Guitars",
    description: "Agora falta pouco para você tocar!",
    date: "21/06/1999",
    thumb: "/projects/guitars-share.png",
  },
];

function ListProjects() {
  return (
    <>
      <List>
        {projects.map((project, i) => {
          if (i > 4) return;

          return (
            <Item key={i}>
              <CardInfo {...project} />
            </Item>
          );
        })}
      </List>

      <Link href="/projetos">
        <ButtonShowMore as="a">Ver Mais</ButtonShowMore>
      </Link>
    </>
  );
}

export default ListProjects;
