import styled from "styled-components";

export const Content = styled.article`
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
`