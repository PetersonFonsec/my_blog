import { Section, Wrapper } from "./style";

function SectionWrapper({ children, sectionId = "", bgContrast=false }) {
  return (
    <Section id={sectionId} bgContrast={bgContrast}>
      <Wrapper>{children}</Wrapper>
    </Section>
  ); 
}

export default SectionWrapper;
