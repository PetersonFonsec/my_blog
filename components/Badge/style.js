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
  padding: 4px;
  background-color: ${({ color }) => getColor(color)};
  font-size: 14px;
  font-weight: 500;
  font-family: "Montserrat";
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
`;
