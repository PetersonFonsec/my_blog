import Image from "next/image";

import { Card, Content, Title, Description, Date } from "./style";

function CardInfo({ title, description, date, thumb }) {
  return (
    <Card>
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
