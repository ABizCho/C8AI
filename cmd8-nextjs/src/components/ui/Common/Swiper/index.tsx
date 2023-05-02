import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import Link from "next/link";

SwiperCore.use([Autoplay]);

interface DataArrProps {
  autoPlaySpeed: number;
  dataArr: {
    id: number;
    title: string;
    link: string;
    imageUrl: string;
  }[];
}

const AutoplayInfiniteSwiper: React.FC<DataArrProps> = ({
  autoPlaySpeed,
  dataArr,
}) => {
  return (
    <div className="w-[350px] ">
      <Swiper
        className="swiper-wrapper w-[350px]"
        spaceBetween={15}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={autoPlaySpeed}
        direction="horizontal"
        slidesOffsetBefore={1}
        setWrapperSize={true}
      >
        {dataArr.map((data, index) => (
          <SwiperSlide
            key={index}
            dir="rtl"
            className="text-white bg-slate-600"
          >
            <div key={data.id} className="">
              <Link href={data.link} className="card-container">
                <div className="card-content">
                  <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="w-full h-[40px]"
                  />
                  <h3>{data.title}</h3>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AutoplayInfiniteSwiper;
