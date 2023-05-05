import { useState, useEffect } from "react";
import Image from "next/image";

import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { RxOpenInNewWindow } from "react-icons/rx";
import { TbScript } from "react-icons/tb";

import { IAiCardParams } from "@/interfaces/main";
import { Rating } from "../Rating";
import { Badge } from "../Badge";
import { truncateString } from "@/lib/util/Main";
import Link from "next/link";

export const AIGridCard = ({
  id,
  imgUrl,
  nameKo,
  summary,
  categoryKey,
  redirectUrl,
  derived,
}: IAiCardParams) => {
  const [isEnterMouseImage, setIsEnterMouseImage] = useState("deactivate");

  return (
    <div className="relative">
      <div
        className={`${id} ${CardVariants[categoryKey]} text-center border rounded-3xl pb-4 shadow-aiBox overflow-hidden`}
      >
        <Badge className="category-badge" categoryKey={categoryKey} />
        <div className="relative">
          <div
            onMouseEnter={() => {
              setIsEnterMouseImage("activate");
            }}
            onMouseLeave={() => {
              setIsEnterMouseImage("deactivate");
            }}
            className={`absolute top-0 left-0 w-full h-full z-10 `}
          >
            <div
              className={`cover-image bg-black h-full transition-opacity duration-300 ${OverImage[isEnterMouseImage]} flex justify-center items-center`}
            ></div>
            <div
              className={`${OverImageButton[isEnterMouseImage]} absolute top-1/3 w-full flex justify-center`}
            >
              <div className="buttons-inner-cover  flex flex-row">
                <Link
                  href={redirectUrl}
                  className="bg-white mx-4 rounded-full w-20 h-20 flex flex-col justify-center place-items-center"
                  prefetch={false}
                  passHref
                  target="_blank"
                  rel="noreferrer"
                >
                  <RxOpenInNewWindow className=" pt-1 w-6 h-6" />
                  <div>방문</div>
                </Link>
                <Link
                  href={"/"}
                  className="bg-white mx-4 rounded-full w-20 h-20 flex flex-col justify-center place-items-center"
                  prefetch={false}
                  passHref
                >
                  <TbScript className=" pt-1 w-6 h-6" />
                  <div>자세히</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <Image
              className={`m-auto h-52`}
              alt={`ai-logo-${id}`}
              src={imgUrl}
              width={300}
              height={0}
            />
          </div>
        </div>
        <div
          className={`info-box relative ${CardVariants[categoryKey]}`}
          style={{ minHeight: "142px" }}
        >
          <div className="text-center grid place-items-center">
            <div className="">
              <div className="text-white text-xl font-bold mt-4">
                {nameKo[0]}
              </div>
              <div className="pl-5">
                <Rating
                  scoreAvg={derived.score.avg}
                  scoreCnt={derived.score.cnt}
                />
              </div>
            </div>
            <div className="bookmark absolute top-0 left-3/4 flex cursor-pointer ">
              <BsFillBookmarkHeartFill className="text-white text-xl transition-all duration-300 hover:text-yellow-300 hover:scale-125" />
              <span className="text-white text-sm ml-1">
                {derived.favoriteCnt}
              </span>
            </div>
          </div>
          <div className="summary-area text-white text-sm mx-5 mt-5">
            {truncateString(55, summary)}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ICategoryVariants {
  [key: string]: string;
}
const CardVariants: ICategoryVariants = {
  chat: `bg-cyan-800`,
  image: `bg-purple-400`,
  video: `bg-violet-500`,
  music: `bg-pink-400`,
  writing: `bg-amber-500`,
  office: `bg-slate-500`,
  developer: `bg-zinc-700`,
};

type OverImageType = {
  [key: string]: string;
};

const OverImage: OverImageType = {
  activate: `opacity-70`,
  deactivate: `opacity-0`,
};

const OverImageButton: OverImageType = {
  activate: `opacity-100`,
  deactivate: `opacity-0`,
};
