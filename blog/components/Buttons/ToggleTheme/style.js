import styled from "styled-components";

export const Button = styled.button`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  height: 50px;
  width: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 60px;
  right: 60px;
  z-index: 2;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 124px;
    right: 124px;
    height: 80px;
    width: 80px;
  }
`;
