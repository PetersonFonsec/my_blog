import searchIcon from "../../../assets/icons/search.svg";

import { Form, Input, ButtonSubmit } from "./style";

function FormSearch({ submit }) {
  return (
    <Form onSubmit={submit}>
      <Input type="text" placeholder="Buscar..." />
      <ButtonSubmit type="submit">
        <img src={searchIcon} alt="Icone de uma lupa" />
        <span>Pesquisar</span>
      </ButtonSubmit>
    </Form>
  );
}

export default FormSearch;
