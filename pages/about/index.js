import { getAbout } from "../../services/about";
import { getProfile } from "../../services/profile";
import CmsContent from "../../components/CmsContent";

import Footer from "../../components/Layouts/Footer/index";
import Header from "../../components/Layouts/Header/index";
import AsideComponent from "../../components/Layouts/Aside";
import SectionWrapper from "../../components/Layouts/Sections/SectionWrapper";

function About({ about, profile }) {
  return (
    <>
      <Header contact={profile.contact} />
      <main>
        <AsideComponent profile={profile}>
          <SectionWrapper sectionId="about">
            <div className="cms-content">
              {about.content.map((content, index) => (
                <CmsContent key={index} content={content} />
              ))}
            </div>
          </SectionWrapper>
        </AsideComponent>
      </main>
      <Footer contact={profile.contact} />
    </>
  );
}

export async function getStaticProps() {
  const about = await getAbout();
  const profile = await getProfile();

  return {
    props: {
      about,
      profile,
    },
  };
}

export default About;
