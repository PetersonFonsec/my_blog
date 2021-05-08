import styled from "styled-components";

export const Section = styled.section`
  background-color: ${({ theme }) => theme.background.contrast};
  order: 2;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    order: unset;
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 100%;
  padding: 24px 32px;
  width: 1288px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 102px 32px 32px;
  }
`;

export const CarouselContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: 704px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin: 0 0 0 auto;
  }
`;

export const Title = styled.h2`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 44px;
  text-align: center;
  color: ${({ theme }) =>
    theme.darkTheme ? theme.colors.secundary : theme.colors.secundary};
  position: relative;
  margin-bottom: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 32px;
    line-height: 44px;
    margin-bottom: 44px;
    text-align: left;
  }

  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    width: 39.06px;
    height: 6px;
    background: linear-gradient(
        270deg,
        rgba(255, 242, 136, 0.21) 0%,
        rgba(255, 255, 255, 0.6) 70%
      ),
      rgba(255, 227, 0, 0.8);
    border-radius: 14px;
    margin: auto;

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      top: -5px;

      width: 62px;
      right: unset;
    }
  }
`;
