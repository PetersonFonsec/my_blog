import Image from "next/image";
import Badge from "../../Badge";

import { Card, Content, Title, Description } from "./style";

function getColor(stack) {
  const stacks = {
    Angular: "red",
    React: "blue",
    Vue: "green",
    WordPress: "darkBlue",
  };

  return stacks[stack] || "";
}

function CardInfo({ title, description, thumb, stack, link }) {
  return (
    <Card as="a" href={link.url} target={link.target}>
      {stack && (
        <div className="badge">
          <Badge color={getColor(stack)}>{stack}</Badge>
        </div>
      )}

      {thumb && <Image src={thumb.url} alt={thumb.alt} fill sizes="100vw" />}
      <Content>
        {title && <Title>{title}</Title>}

        {description && <Description>{description}</Description>}
      </Content>
    </Card>
  );
}

export default CardInfo;
