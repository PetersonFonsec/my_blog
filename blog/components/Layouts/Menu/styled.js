import styled from "styled-components";

export const Menu = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.primary};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 32px;
  transition: 0.2s ease-in-out all;
  display: ${({ show }) => (show ? "flex" : "none")};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`;

export const Item = styled.li`
  position: relative;
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 36px;
  text-align: center;
  color: ${({ active, theme }) =>
    active ? theme.colors.contrast : theme.colors.primary};
  display: block;
  cursor: pointer;

  &:after {
    content: ${({ active }) => (active ? '" "' : "unset")};
    position: absolute;
    top: -12px;
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
  }

  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;
