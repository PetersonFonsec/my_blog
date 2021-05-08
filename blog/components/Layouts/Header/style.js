import styled from "styled-components";

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  width: 1288px;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 44px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 52px 46px;
  }

  img {
    width: 40px;
    filter: ${({ theme }) => (theme.darkTheme ? "invert(1)" : "unset")};

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 268px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      width: 200px;
    }
  }
`;

export const Button = styled.button`
  z-index: 3;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
  img {
    width: 20px;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 38px;
    }
  }
`;

export const Nav = styled.nav`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    font-size: 18px;
    line-height: 22px;
  }

  ul {
    display: flex;
  }

  li {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  li:not(:last-child) {
    margin-right: 40px;
  }
`;
