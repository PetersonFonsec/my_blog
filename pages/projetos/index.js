import BannerProjects from "../../components/Banners/BannersProjects";
import CardInfo from "../../components/Cards/CardInfo";
import SimpleList from "../../components/Lists/Simple";
import { projects } from "../../components/Lists/Projects/models";

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

function Projects() {
  return (
    <main>
      <BannerProjects>{getProjects(3)}</BannerProjects>
      <SimpleList title="Meus projetos">{getProjects()}</SimpleList>
    </main>
  );
}

export default Projects;
