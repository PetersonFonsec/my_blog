import BannerProjects from "../../components/Banners/BannersProjects";
import CardInfo from "../../components/Cards/CardInfo";
import SimpleList from "../../components/Lists/Simple";
import Footer from "../../components/Layouts/Footer/index";
import { getBlog } from "../../services/blog";
import Header from "../../components/Layouts/Header/index";

function Projects({ projects, profile }) {
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
    <>
      <h1>ola mundo</h1>
    </>
  );
}

export default Projects;
