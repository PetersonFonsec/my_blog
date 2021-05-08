import styled from "styled-components";

import { Button } from "../../Buttons/Button/style";

export const List = styled.ul`
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 190px);

  @media (min-width: 768px) {
    grid-gap: 12px 24px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    height: 563px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

export const Item = styled.li`
  grid-row: span 1;

  @media (min-width: 768px) {
    grid-row: span 2;
  }

  &:nth-child(3) {
    @media (max-width: 767px) {
      grid-column: span 2;
    }
  }

  &:first-child {
    @media (min-width: 768px) and (max-width: 1023px) {
      grid-column: span 2;
      grid-row: span 2;
    }
  }

  &:nth-child(2) {
    @media (min-width: 1024px) {
      grid-column: span 2;
      grid-row: span 4;

      img {
        object-position: top right;
      }
    }
  }
`;

export const ButtonShowMore = styled(Button)`
  margin: 60px auto 0;
  max-width: 100%;
  width: 384px;

  @media (min-width: 768px) {
    margin: 80px auto 0;
  }

  @media (min-width: 1024px) {
    margin: 130px auto 0;
  }
`;
