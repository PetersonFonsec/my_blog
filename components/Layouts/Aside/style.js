import styled from "styled-components";

export const Aside = styled.aside`
  order: 1;
  padding-bottom: 86px;
  width: max-content;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0;
    padding-left: 64px;
    width: auto;
    position: unset;
    padding-bottom: 0;
    order: unset;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    align-items: stretch;
    display: flex;
    height: 100%;
    position: absolute;
    padding-left: 0;
    z-index: 1;
    order: unset;
    width: 100%;
    margin: 0 auto;
    max-width: 1220px;
    left: 0;
    right: 0;
  }
`;

export const AsideContainer = styled.div`
  position: relative;
  width: max-content;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-bottom: 90px;
    margin: 0;
    height: inherit;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    height: inherit;
  }
`;
