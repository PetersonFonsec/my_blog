import SectionProfile from "../components/Layouts/Sections/Profile";
import SectionSkills from "../components/Layouts/Sections/Skills";
import SectionProjects from "../components/Layouts/Sections/Projects";
import AsideComponent from "../components/Layouts/Aside";
import { getProjects } from "../services/project";
import { getProfile } from "../services/profile";

function Home({ projects, profile }) {
  return (
    <>
      <main>
        <AsideComponent profile={profile}>
          <SectionProfile />
          <SectionSkills />
        </AsideComponent>
        <SectionProjects projects={projects} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
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
