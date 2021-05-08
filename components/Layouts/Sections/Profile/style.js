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

export const SectionWrapper = styled.div`
  max-width: 100%;
  width: max-content;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  margin-bottom: 40px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 40px;
    line-height: 49px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    font-size: 48px;
    line-height: 59px;
    margin-right: 68px;
  }

  strong {
    color: ${({ theme }) => theme.colors.contrast};
    display: block;
    font-weight: bold;
  }
`;
