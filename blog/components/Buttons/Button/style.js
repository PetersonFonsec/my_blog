import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ primary, theme }) => {
    if (theme.darkTheme) return theme.background.contrast;
    return primary ? theme.background.contrast : theme.background.tertiary;
  }};
  color: ${({ theme }) => theme.background.primary};
  display: block;
  border-radius: 14px;
  box-shadow: ${({ primary }) =>
    primary
      ? "0px 4px 4px rgba(94, 211, 243, 0.25)"
      : "-2px 8px 8px rgba(97, 215, 164, 0.25)"};
  font-size: ${({ large }) => (large ? 18 : 16)}px;
  font-weight: bold;
  line-height: ${({ large }) => (large ? 22 : 20)}px;
  padding: ${({ large }) => (large ? "24px 16px" : "16px")};
  text-align: center;
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "normal")};
  transition: 0.2s ease-in-out all;
  width: ${({ block }) => (block ? "100%" : "auto")};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 22px;
    padding: 24px;
    line-height: 24px;
  }

  &:hover {
    background-color: #06d6cc;
    box-shadow: 0px 0px 14px 4px rgb(6 214 204 / 25%);
  }
`;
