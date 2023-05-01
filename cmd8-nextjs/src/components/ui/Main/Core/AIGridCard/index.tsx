import { IAiCardParams } from "@/interfaces/main";
import { Badge } from "../Badge";
import Image from "next/image";
import { Rating } from "../Rating";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

export const AIGridCard = ({
  id,
  imgUrl,
  nameKo,
  summary,
  categoryKey,
  derived,
}: IAiCardParams) => {
  return (
    <div>
      <div className="relative">
        <div
          className={`${id} ${CardVariants[categoryKey]} text-center border rounded-3xl pb-4 shadow-aiBox overflow-hidden`}
        >
          <Badge className="category-badge" categoryKey={categoryKey} />
          <Image
            className="m-auto h-52"
            alt={`ai-logo-${id}`}
            src={imgUrl}
            width={300}
            height={0}
          />
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
            <div className="bookmark absolute top-52 left-3/4 flex cursor-pointer ">
              <BsFillBookmarkHeartFill className="text-white text-xl transition-all duration-300 hover:text-yellow-300 hover:scale-125" />
              <span className="text-white text-sm ml-1">
                {derived.favoriteCnt}
              </span>
            </div>
          </div>
          <div className="text-white text-sm mx-5 mt-5">{summary}</div>
        </div>
      </div>
    </div>
  );
};

export interface ICategoryVariants {
  [key: string]: string;
  chat: string;
  drawing: string;
}
const CardVariants: ICategoryVariants = {
  chat: `bg-gray-500`,
  drawing: `bg-purple-400`,
  video: `bg-fuchsia-400`,
  music: `bg-pink-400`,
  office: `bg-teal-500`,
  developer: `bg-zinc-700`,
};
