import styled from "styled-components";

export const Footer = styled.footer`
  background: ${({ theme }) => theme.background.secundary};
`;

export const Wrapper = styled.div`
  margin: auto;
  max-width: 600px;
  padding: 32px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.tertiary};
  border-top: ${({ theme }) => theme.colors.tertiary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 60px;
  }

  hr {
    border-top: 1px solid ${({ theme }) => theme.colors.tertiary};
    width: 100%;
    margin: 24px 0;
  }
`;
