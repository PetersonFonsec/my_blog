import SectionProfile from "../components/Layouts/Sections/Profile";
import SectionSkills from "../components/Layouts/Sections/Skills";
import SectionProjects from "../components/Layouts/Sections/Projects";
import AsideComponent from "../components/Layouts/Aside";

import Footer from "../components/Layouts/Footer/index";
import Header from "../components/Layouts/Header/index";

import { getProjects } from "../services/project";
import { getProfile } from "../services/profile";

function Home({ projects, profile }) {
  return (
    <>
      <Header contact={profile.contact} />
      <main>
        <AsideComponent profile={profile}>
          <SectionProfile />
          <SectionSkills />
        </AsideComponent>
        <SectionProjects projects={projects} />
      </main>
      <Footer contact={profile.contact} />
    </>
  );
}

export async function getStaticProps() {
  const projects = await getProjects();
  const profile = await getProfile();

  return {
    props: {
      projects,
      profile,
    },
  };
}

export default Home;
