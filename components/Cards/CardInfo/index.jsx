import Image from "next/image";
import Badge from "../../Badge";

import { Card, Content, Title, Description, Date } from "./style";

function getColor(stack) {
  const stacks = {
    Angular: "red",
    React: "blue",
    Vue: "green",
    WordPress: "darkBlue",
  };

  return stacks[stack];
}

function CardInfo({ title, description, date, thumb, stack }) {
  return (
    <Card>
      <div className="badge">
        <Badge color={getColor(stack)}>{stack}</Badge>
      </div>
      <Image layout="fill" src={thumb} alt={title} />
      <Content>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
}

export default CardInfo;
