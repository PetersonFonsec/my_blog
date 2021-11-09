import { Menu, List, Item } from "./styled";

import Socials from "../../Socials/index";

function MenuComponent({ links, active, show, callback, contact }) {
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
      <Socials contact={contact} />
    </Menu>
  );
}

export default MenuComponent;
