import styled from "styled-components";
import { Title as TitleProjects } from "../../Layouts/Sections/Projects/style";

export const Wrapper = styled.section`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  margin: 0 auto;
  max-width: 100%;
  padding: 40px 32px 120px;
  width: 1288px;
`;

export const Title = styled(TitleProjects)`
  &:after {
    right: unset;
  }
`;

export const List = styled.ul`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  li {
    height: 354px;
  }
`;
