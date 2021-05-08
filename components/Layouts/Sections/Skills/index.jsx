import SkillsCarousel from "../../../Carousels/Skills";
import { Section, Title, Wrapper, CarouselContainer } from "./styled";

function SectionSkills() {
  return (
    <Section id="skills">
      <Wrapper>
        <CarouselContainer>
          <Title>Habilidades</Title>
          <SkillsCarousel />
        </CarouselContainer>
      </Wrapper>
    </Section>
  );
}

export default SectionSkills;
