import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { CarouselWrapper } from "./style";
import { skills, breakpoints } from "./models";
import CardLite from "../../Cards/CardLite";

SwiperCore.use([Pagination]);

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
