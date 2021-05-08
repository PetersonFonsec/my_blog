import SectionProfile from "../components/Layouts/Sections/Profile";
import SectionSkills from "../components/Layouts/Sections/Skills";
import SectionProjects from "../components/Layouts/Sections/Projects";
import AsideComponent from "../components/Layouts/Aside";

function Home() {
  return (
    <>
      <main>
        <AsideComponent>
          <SectionProfile />
          <SectionSkills />
        </AsideComponent>
        <SectionProjects />
      </main>
    </>
  );
}

export default Home;
