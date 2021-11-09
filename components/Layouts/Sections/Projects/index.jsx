import ListProjects from "../../../Lists/Projects";

import { Section, Wrapper, Title } from "./style";

function SectionProjects({ projects }) {
  return (
    <Section id="projects">
      <Wrapper>
        <Title>Meus Projetos</Title>
        <ListProjects projects={projects} />
      </Wrapper>
    </Section>
  );
}

export default SectionProjects;
