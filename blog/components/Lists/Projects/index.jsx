import CardInfo from "../../Cards/CardInfo/index";
import { List, Item } from "./style";

const Projects = [
  {
    title: "Sindsep",
    description: "Sindsep - Sindicato dos Servidores Municipais de São Paulo",
    date: "21/06/1999",
    thumb: "https://sindicalizacao.sindsep-sp.org.br/images/share.png",
  },
  {
    title: "Sua Breja",
    description: "Cervejas Artesanais Personalizadas",
    date: "21/06/1999",
    thumb: "https://suabreja.com/img/share.png",
  },
  {
    title: "Sítio Sassafraz",
    description:
      "A Família Vanini preserva uma história de dedicação e amor no interior de São Paulo. Essa é a sua chance de sair da cidade e aproveitar um dia inesquecível perto da natureza!",
    date: "21/06/1999",
    thumb:
      "https://reservas.sitiosassafraz.com.br/assets/images/sitio-sassafraz.png",
  },
  {
    title: "Docloc",
    description: "Seu consultório em qualquer lugar.",
    date: "21/06/1999",
    thumb:
      "https://core.docloc.com.br/images/metatags/0c30206d-bc59-4492-9f9a-e2cfbb4d96c2",
  },
  {
    title: "Guitars",
    description: "Agora falta pouco para você tocar!",
    date: "21/06/1999",
    thumb: "https://dev-app.guitars.com.br/assets/images/share.png",
  },
];

function ListProjects() {
  return (
    <List>
      {Projects.map((project, i) => (
        <Item key={i}>
          <CardInfo {...project} />
        </Item>
      ))}
    </List>
  );
}

export default ListProjects;
