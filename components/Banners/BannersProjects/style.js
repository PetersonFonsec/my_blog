import styled from "styled-components";

export const List = styled.ul`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr;
  grid-template-rows: 350px;
  margin: 0 auto;
  max-width: 100%;
  padding: 40px 32px;
  width: 1288px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 489px repeat(2, 1fr);
    grid-template-rows: 350px repeat(1, 1fr);
  }

  li:first-child {
    grid-column: 1;
    grid-row: 1;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-column: span 3;
      grid-row: span 2;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      grid-column: span 1;
    }
  }

  li:nth-child(2) {
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      grid-column: span 2;
    }
  }

  li:not(:first-child) {
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: flex;
    }
  }
`;
