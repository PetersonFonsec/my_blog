import CardProfile from "../../Cards/CardProfile/index";
import { Aside, Wrapper, AsideContainer } from "./style";

function AsideComponent({ children }) {
  return (
    <>
      <Wrapper>
        <Aside>
          <AsideContainer>
            <CardProfile />
          </AsideContainer>
        </Aside>

        {children}
      </Wrapper>
    </>
  );
}

export default AsideComponent;
