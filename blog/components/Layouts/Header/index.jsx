import { useState } from "react";

import Menu from "../Menu/index";
import { Header, Button, Nav } from "./style";

const links = [
  {
    idSection: "skills",
    label: "Habilidades",
  },
  // {
  //   idSection: "/experiencia",
  //   label: "Experiência",
  // },
  {
    idSection: "projects",
    label: "Projetos",
  },
];

const scrollToSection = (id) =>
  document
    .getElementById(id)
    .scrollIntoView({ block: "start", behavior: "smooth" });

const HeaderComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const scroll = (id) => {
    setShowMenu(false);
    scrollToSection(id);
  };

  return (
    <>
      <Header>
        <picture>
          <source media="(min-width: 768px)" srcSet="/icons/logo.svg" />
          <img src="/icons/logo-mobile.svg" alt="Logo - Peterson Simião" />
        </picture>

        <Nav>
          <ul>
            {links.map(({ idSection, label }, i) => (
              <li key={i} onClick={() => scroll(idSection)}>
                {label}
              </li>
            ))}
          </ul>
        </Nav>

        <Button onClick={() => setShowMenu(!showMenu)}>
          <img
            src={showMenu ? "/icons/close.svg" : "/icons/menu.svg"}
            alt="Icone menu hamburger"
          />
        </Button>
      </Header>
      <Menu
        links={links}
        active={links[0].idSection}
        callback={scroll}
        show={showMenu}
      />
    </>
  );
};

export default HeaderComponent;
