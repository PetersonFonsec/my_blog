import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Menu from "../Menu/index";
import { Header, Button, Nav } from "./style";

import LogoMobile from "../../../assets/icons/logo-mobile.svg";
import Logo from "../../../assets/icons/logo.svg";
import MenuIcon from "../../../assets/icons/menu.svg";
import CloseIcon from "../../../assets/icons/close.svg";

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
        <Router>
          <picture>
            <source media="(min-width: 768px)" srcSet={Logo} />
            <img src={LogoMobile} alt="Logo - Peterson Simião" />
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
              src={showMenu ? CloseIcon : MenuIcon}
              alt="Icone menu hamburger"
            />
          </Button>
        </Router>
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
