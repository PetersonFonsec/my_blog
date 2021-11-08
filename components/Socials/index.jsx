import { List, Item } from "./style";
import { socials } from "./models";

function Socials() {
  return (
    <List>
      {socials.map(({ link, alt, src, invert }, i) => (
        <Item key={i} invert={invert}>
          <a href={link} target="_blank" rel="noreferrer">
            <img height="34px" width="34px" src={src} alt={alt} />
          </a>
        </Item>
      ))}
    </List>
  );
}

export default Socials;
