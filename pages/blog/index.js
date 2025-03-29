import BannerProjects from "../../components/Banners/BannersProjects";
import CardInfo from "../../components/Cards/CardInfo";
import SimpleList from "../../components/Lists/Simple";
import Footer from "../../components/Layouts/Footer/index";
import { getProfile } from "../../services/profile";
import { getBlog } from "../../services/blog";
import Header from "../../components/Layouts/Header/index";
import NotFound from "../../components/Lists/NotFound/index";

function Blog({ blog, profile }) {
  function getBlogs(number = Infinity) {
    return blog.map((project, i) => {
      if (i > number) return;
      return (
        <li key={i}>
          <CardInfo
            title={project.title}
            description={project.description}
            thumb={project.thumb}
            stack={project.stack}
            link={project.link}
          />
        </li>
      );
    });
  }

  return (
    <>
      <Header contact={profile.contact} />
      <main>
        {
          blog.length > 0 ? <SimpleList title="Posts">{getBlogs()}</SimpleList> : <NotFound />
        }
      </main>
      <Footer contact={profile.contact} />
    </>
  );
}

export async function getStaticProps() {
  const blog = await getBlog();
  const profile = await getProfile();

  return {
    props: {
      blog,
      profile,
    },
  };
}

export default Blog;
