import Image from "next/image";
import Socials from "../../Socials";
import { Card, Description, DownloadButton, Avatar } from "./style";

function CardProfile(params) {
  return (
    <Card>
      <Avatar>
        <Image
          layout="fill"
          src="/photos/profile.jpg"
          alt="Peterson Fonseca Simião"
        />
      </Avatar>

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
