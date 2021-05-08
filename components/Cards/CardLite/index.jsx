import { Card } from "./styled";

function CardLite({ src, alt }) {
  return (
    <Card>
      <img height="50px" width="50px" src={src} alt={alt} />
    </Card>
  );
}

export default CardLite;
