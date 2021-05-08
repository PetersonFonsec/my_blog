import SectionProfile from "../components/Layouts/Sections/Profile";
import SectionSkills from "../components/Layouts/Sections/Skills";
import SectionProjects from "../components/Layouts/Sections/Projects";

export default function Home() {
  return (
    <>
      <SectionProfile />
      <SectionSkills />
      <SectionProjects />
    </>
  );
}
