import { Wrapper, Title, List } from "./style";

function SimpleList({ children, title }) {
  return (
    <Wrapper>
      <Title as="h1"> {title} </Title>
      <List> {children} </List>
    </Wrapper>
  );
}

export default SimpleList;
