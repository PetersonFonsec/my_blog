import { Button } from "./style";

function ButtonToggleTheme({ darkTheme, toggleTheme }) {
  return (
    <Button onClick={toggleTheme} darkTheme={darkTheme}>
      <img
        src={darkTheme ? "/icons/dark-lamp.svg" : "/icons/light-lamp.svg"}
        alt={darkTheme ? "Lâmpada apagada" : "Lâmpada  acessa"}
      />
    </Button>
  );
}

export default ButtonToggleTheme;
