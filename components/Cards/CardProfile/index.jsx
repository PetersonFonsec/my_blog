import Image from "next/image";
import Socials from "../../Socials";
import { Card, Description, DownloadButton, Avatar } from "./style";

function CardProfile({ profile }) {
  return (
    <Card>
      <Avatar>
        <Image src={profile.avatar?.url} alt={profile.avatar?.alt} fill sizes="100vw" />
      </Avatar>

      <Description>
        {profile.name}
        <br />
        {profile.role}
      </Description>

      <DownloadButton
        as="a"
        target="_blank"
        href={profile.cv?.url}
        primary
        block
      >
        Baixar CV
      </DownloadButton>

      <Socials contact={profile?.contact} />
    </Card>
  );
}

export default CardProfile;
