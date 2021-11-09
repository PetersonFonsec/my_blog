import Socials from "../../Socials/index";
import { Wrapper, Footer } from "./style";

function footer({ contact }) {
  return (
    <Footer>
      <Wrapper>
        <Socials contact={contact} />
        <hr /> © 2021 Peterson F. Simião. Todos os direitos reservados.
      </Wrapper>
    </Footer>
  );
}

export default footer;
