import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import { CarouselWrapper } from "./style";
import CardLite from "../../Cards/CardLite";

SwiperCore.use([Pagination]);

const skills = [
  {
    src: "/icons/react.svg",
    alt: "React logo",
  },
  {
    src: "/icons/angular.svg",
    alt: "Angular logo",
  },
  {
    src: "/icons/vue.svg",
    alt: "vueIcon",
  },
  {
    src: "/icons/typescript.svg",
    alt: "Typescript logo",
  },
  {
    src: "/icons/git.svg",
    alt: "Git logo",
  },
  {
    src: "/icons/webpack.svg",
    alt: "Webpack logo",
  },
  {
    src: "/icons/sass.svg",
    alt: "Sass logo",
  },
  {
    src: "/icons/js.svg",
    alt: "Js logo",
  },
  {
    src: "/icons/docker.svg",
    alt: "Docker logo",
  },
  {
    src: "/icons/gulp.svg",
    alt: "Gulp logo",
  },
  {
    src: "/icons/html.svg",
    alt: "Html logo",
  },
  {
    src: "/icons/css.svg",
    alt: "Css logo",
  },
];

const breakpoints = {
  360: {
    slidesPerView: 3,
    slidesPerColumn: 2,
  },
  1024: {
    slidesPerView: 4,
    slidesPerColumn: 3,
    pagination: false,
  },
};

export default function SkillsCarousel() {
  return (
    <CarouselWrapper>
      <Swiper
        slidesPerView={2}
        slidesPerColumn={2}
        breakpoints={breakpoints}
        pagination={{
          clickable: true,
        }}
      >
        {skills.map((skill, i) => (
          <SwiperSlide key={i}>
            <CardLite {...skill} />
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselWrapper>
  );
}
