import { Button } from "./style";

import darkLamp from "../../../assets/icons/dark-lamp.svg";
import lightLamp from "../../../assets/icons/light-lamp.svg";

function ButtonToggleTheme({ darkTheme, toggleTheme }) {
  return (
    <Button onClick={toggleTheme} darkTheme={darkTheme}>
      <img
        src={darkTheme ? darkLamp : lightLamp}
        alt={darkTheme ? "Lâmpada apagada" : "Lâmpada  acessa"}
      />
    </Button>
  );
}

export default ButtonToggleTheme;
