import { Card, Content, Title, Description, Date, Thumb } from "./style";

function CardInfo({ title, description, date, thumb }) {
  return (
    <Card>
      <Thumb src={thumb} alt={title} />
      <Content>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
}

export default CardInfo;
