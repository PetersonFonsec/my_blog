import { Card } from "./styled";

function CardLite({ src, alt }) {
  return (
    <Card>
      <img src={src} alt={alt} />
    </Card>
  );
}

export default CardLite;
