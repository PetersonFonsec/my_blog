import Socials from "../../Socials";
import { Avatar, Card, Description, DownloadButton } from "./style";

function CardProfile(params) {
  return (
    <Card>
      <Avatar src="/photos/profile-small.jpg" alt="Peterson Fonseca Simião" />

      <Description>
        Peterson F. Simião
        <br /> Front-end developer
      </Description>

      <DownloadButton
        as="a"
        href="/Curriculo-Peterson.pdf"
        download
        primary
        block
      >
        Baixar CV
      </DownloadButton>

      <Socials />
    </Card>
  );
}

export default CardProfile;
