import styled from "styled-components";

function getColor(color) {
  const defaultColor = "inherit";
  const availableColors = {
    red: "#dd0031",
    blue: "#61dafb",
    green: "#42b983",
    darkBlue: "#0073aa",
  };

  return availableColors[color] ?? defaultColor;
}

export const BadgeComponent = styled.span`
  align-items: center;
  background-color: ${({ color }) => getColor(color)};
  border-radius: 8px;
  color: #fff;
  display: flex;
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  padding: 4px 8px;
`;
