import BannerProjects from "../../components/Banners/BannersProjects";
import CardInfo from "../../components/Cards/CardInfo";
import SimpleList from "../../components/Lists/Simple";
import { getProjects } from "../../services/project";

function Projects({ projects }) {
  function getProjects(number = Infinity) {
    return projects.map((project, i) => {
      if (i > number) return;
      return (
        <li key={i}>
          <CardInfo {...project} />
        </li>
      );
    });
  }

  return (
    <main>
      <BannerProjects>{getProjects(3)}</BannerProjects>
      <SimpleList title="Meus projetos">{getProjects()}</SimpleList>
    </main>
  );
}

export async function getServerSideProps() {
  const projects = await getProjects();

  return {
    props: {
      projects,
    },
  };
}

export default Projects;
