import styled from "styled-components";

export const Card = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 16px 22px;
  width: 86px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 80px;
    width: 80px;
  }

  img {
    object-fit: contain;
  }
`;
