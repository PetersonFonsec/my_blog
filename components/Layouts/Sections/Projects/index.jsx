import ListProjects from "../../../Lists/Projects";

import { Section, Wrapper, Title } from "./style";

function SectionProjects() {
  return (
    <Section id="projects">
      <Wrapper>
        <Title>Meus Projetos</Title>
        <ListProjects />
      </Wrapper>
    </Section>
  );
}

export default SectionProjects;
