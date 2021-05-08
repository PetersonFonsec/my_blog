import styled from "styled-components";
import { Button } from "../../Buttons/Button/style";

export const Card = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: sticky;
  top: 100px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 auto;
    max-width: 330px;
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    border-radius: 14px;
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.25);
    padding: 32px;
    min-width: 385px;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  display: block;
  height: 140px;
  margin-bottom: 28px;
  object-fit: cover;
  width: 140px;
  object-fit: cover;
  object-position: center top;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 220px;
    margin-bottom: 20px;
    width: 220px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    height: 210.29px;
    margin-bottom: 40px;
    margin-top: -64px;
    width: 210.29px;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  text-align: center;
  margin-bottom: 35px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 28px;
    line-height: 42px;
    margin-bottom: 73px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    font-size: 18px;
    line-height: 29px;
    margin-bottom: 32px;
  }
`;

export const DownloadButton = styled(Button)`
  max-width: 140px;
  margin-bottom: 30px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    font-size: 16px;
    line-height: 28px;
    max-width: 180px;
    padding: 12px;
  }
`;
