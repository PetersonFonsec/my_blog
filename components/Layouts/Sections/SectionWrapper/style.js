import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 32px 32px;
  position: relative;
  order: 0;
  width: auto;
  background-color: ${({ theme }) =>
      theme.bgContrast ? theme.background.contrast : theme.background.tertiary}
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 44px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    order: unset;
    padding-bottom: 86px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    justify-content: flex-end;
    flex-direction: row;
    padding-bottom: 104px;
    width: 1288px;
  }
`;

export const Wrapper = styled.div`
  max-width: 100%;
  width: max-content;
`;
