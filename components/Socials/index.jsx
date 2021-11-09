import { List, Item } from "./style";

function Socials({ contact }) {
  return (
    <List>
      {contact?.map(({ link, icone_social, invert_color }, i) => (
        <Item key={i} invert={invert_color}>
          <a href={link?.url} target={link?.target} rel="noreferrer">
            <img
              height="34px"
              width="34px"
              src={icone_social?.url}
              alt={icone_social?.alt}
            />
          </a>
        </Item>
      ))}
    </List>
  );
}

export default Socials;
