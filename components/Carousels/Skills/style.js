import styled from "styled-components";

export const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: unset;
  }

  .swiper-container {
    height: 280px;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      height: 360px;
      margin-left: -6px;
    }
  }

  .swiper-slide {
    align-items: center;
    display: flex;
    font-size: 18px;
    justify-content: center;
    height: calc((100% - 44px) / 2);
    text-align: center;

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      height: calc((100% - 44px) / 3);
    }
  }

  .swiper-pagination {
    bottom: 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      display: none;
    }

    &-bullet {
      width: 14px;
      height: 14px;
      background: #fff070;
      box-shadow: 0px 4px 4px rgba(255, 240, 112, 0.25);
      opacity: 1;
      transition: 0.2s ease-in-out all;
    }
  }

  .swiper-pagination-bullet-active {
    width: 24px;
    height: 14px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgb(6 214 160 / 25%);
    border-radius: 14px;
  }
`;
