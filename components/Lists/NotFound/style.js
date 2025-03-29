import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  p {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    text-align: center;
    margin-top: 40px;
  }
`;

export const Icone = styled.svg`
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
  display: block;

  path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;