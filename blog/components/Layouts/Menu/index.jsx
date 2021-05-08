import { Menu, List, Item } from "./styled";

import Socials from "../../Socials/index";

function MenuComponent({ links, active, show, callback }) {
  return (
    <Menu show={show}>
      <List role="menu">
        {links &&
          links.map(({ idSection, label }, i) => (
            <Item
              key={i}
              active={active === idSection}
              onClick={() => callback(idSection)}
              role="menuitem"
            >
              {label}
            </Item>
          ))}
      </List>
      <Socials />
    </Menu>
  );
}

export default MenuComponent;
