import BannerProjects from "../../components/Banners/BannersProjects";
import CardInfo from "../../components/Cards/CardInfo";
import SimpleList from "../../components/Lists/Simple";

const projects = [
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
  {
    title: "Sindicato dos Metalúrgicos do ABC",
    description:
      "A combatividade, o fortalecimento das bases, o alto índice de representação sindical e a sintonia com os movimentos sociais na luta contra as desigualdades de renda e de direitos, são características que ajudaram a transformar o Sindicato dos Metalúrgicos do ABC numa referência nacional e internacional.",
    date: "21/06/1999",
    thumb: "/projects/smabc-share.png",
  },
  {
    title: "Amazon Lord - Viva experiências memoráveis!",
    description:
      "A Amazon Lord realiza expedições memoráveis de Pesca Esportiva e Turismo Ecológico pelos rios da Amazônia.",
    date: "21/06/1999",
    thumb: "/projects/amazon-share.png",
  },
  {
    title: "Pet In Time",
    description:
      "Perfeito para você que é apaixonado por Pets, através de sua geolocalização você encontra produtos e serviços pets próximos, e o melhor, todos com descontos!!",
    date: "21/06/1999",
    thumb: "/projects/petintime-share.png",
  },
];

function Projects() {
  return (
    <main>
      <BannerProjects>
        {projects.map((project, i) => {
          if (i > 3) return;
          return (
            <li key={i}>
              <CardInfo {...project} />
            </li>
          );
        })}
      </BannerProjects>
      <SimpleList title="Meus projetos">
        {projects.map((project, i) => (
          <li key={i}>
            <CardInfo {...project} />
          </li>
        ))}
      </SimpleList>
    </main>
  );
}

export default Projects;
