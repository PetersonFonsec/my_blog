import BannerProjects from "../../components/Banners/BannersProjects";
import CardInfo from "../../components/Cards/CardInfo";
import SimpleList from "../../components/Lists/Simple";
import Footer from "../../components/Layouts/Footer/index";
import { getBlog } from "../../services/blog";
import { getProjects } from "../../services/project";
import { getProfile } from "../../services/profile";
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
      <Header contact={profile.contact} />
      <main>
        <BannerProjects>{getProjects(3)}</BannerProjects>
        <SimpleList title="Meus projetos">{getProjects()}</SimpleList>
      </main>
      <Footer contact={profile.contact} />
    </>
  );
}

export async function getStaticProps() {
  const blog = await getBlog();

  return {
    props: {
      blogblog,
      profile,
    },
  };
}

export default Projects;
