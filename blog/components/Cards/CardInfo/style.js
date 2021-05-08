import styled from "styled-components";

export const Card = styled.article`
  border-radius: 14px;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const Content = styled.div`
  z-index: 1;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.88) 100%
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
  padding: 12px 6px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 28px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 32px 22px;
  }
`;

export const Title = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  margin-bottom: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 24px;
    line-height: 29px;
  }
`;

export const Description = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const Thumb = styled.img`
  position: absolute;
  width: 100%;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
`;

export const Date = styled.time`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 8px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 12px;
  }
`;
