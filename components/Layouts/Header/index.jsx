import { useState } from "react";
import Link from "next/link";

import Menu from "../Menu/index";
import { links } from "./models";
import { Header, Button, Nav } from "./style";

const scrollToSection = (id) => id &&
  document
    .getElementById(id)
    .scrollIntoView({ block: "start", behavior: "smooth" });

const HeaderComponent = ({ contact }) => {
  const [showMenu, setShowMenu] = useState(false);
  const scroll = (id) => {
    setShowMenu(false);
    scrollToSection(id);
  };

  return (
    <>
      <Header>
        <Link href="/">
          <picture>
              <source media="(min-width: 768px)" srcSet="/icons/logo.svg" />
              <img
                width="40"
                height="26"
                src="/icons/logo-mobile.svg"
                alt="Logo - Peterson Simião"
              />
          </picture>
        </Link>

        <Nav>
          <ul>
            {links.map(({ idSection, label }, i) => (
              <li key={i} onClick={() => scroll(idSection)}>
                {label}
              </li>
            ))}
            <li>
              <a href="/blog">blog</a>
            </li>
            <li>
              <a href="/about">Sobre mim</a>
            </li>
          </ul>
        </Nav>

        <Button onClick={() => setShowMenu(!showMenu)}>
          <img
            width="20"
            height="18"
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
        contact={contact}
      />
    </>
  );
};

export default HeaderComponent;
