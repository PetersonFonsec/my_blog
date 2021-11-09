import CardProfile from "../../Cards/CardProfile/index";
import { Aside, Wrapper, AsideContainer } from "./style";

function AsideComponent({ children, profile }) {
  return (
    <>
      <Wrapper>
        <Aside>
          <AsideContainer>
            <CardProfile profile={profile} />
          </AsideContainer>
        </Aside>

        {children}
      </Wrapper>
    </>
  );
}

export default AsideComponent;
