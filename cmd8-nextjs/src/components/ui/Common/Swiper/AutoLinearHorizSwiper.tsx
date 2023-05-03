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
  }[];
}

const AutoLinearHorizSwiper: React.FC<DataArrProps> = ({
  autoPlaySpeed,
  dataArr,
}) => {
  return (
    <div className="w-[350px]">
      <Swiper
        className="swiper-wrapper w-[350px]"
        spaceBetween={15}
        slidesPerView={2}
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
            className="text-white bg-slate-900 border-2 border-white rounded-xl text-sm p-[0.5px]"
          >
            <Link
              href={data.link}
              className="card-container"
              passHref
              target="_blank"
              rel="noreferrer"
              prefetch={false}
            >
              <div key={data.id} className="">
                <div className="card-content">
                  <h3>{data.title}</h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AutoLinearHorizSwiper;
