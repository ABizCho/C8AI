import { useState, useEffect } from "react";
import Link from "next/link";
import AutoLinearHorizSwiper from "@/components/ui/Common/Swiper/AutoLinearHorizSwiper";
import AIRankSlider from "@/components/ui/Main/Intro/AIRankSlider";

const IntroSec = () => {
  return (
    <div className="h-[500px] w-full bg-black flex justify-center">
      <div className="p-[40px] h-3/4 self-center w-full overflow-hidden">
        <div className="">
          <h2 className="pt-[10px] text-white font-inherit font-bold text-2xl">
            트렌드를 놓치지 마세요!
          </h2>
        </div>
        <div className="flex mt-14">
          <div></div>
          <div className="w-2/3 min-w-[51%] flex ">
            <div className="thumbnail h-60 hidden w-1/2 xl:flex mx-4"></div>
            <div className="w-full h-40 xl:w-1/2 flex mt-4">
              <div className="ai-rank w-5/6 flex flex-col">
                <AIRankSlider dataArr={RankData} />
              </div>
              <div className="pad w-1/6"></div>
            </div>
          </div>
          <div
            className="absolute left-1/2 w-0 h-0 border-b-black z-10
          border-r-[100px] border-r-transparent border-b-[250px]"
          ></div>

          <div className="area-2 mt-8 w-2/3 flex flex-col gap-y-4">
            <AutoLinearHorizSwiper dataArr={cardData} autoPlaySpeed={4000} />
            <AutoLinearHorizSwiper dataArr={cardData} autoPlaySpeed={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSec;

const RankData = [
  {
    id: 1,
    title: "주간 Best AI : ChatGPT-4",
    link: "https://example.com/articles/gpt-4-ai-language-model-future",
  },
  {
    id: 2,
    title: "최다방문 그림AI : MidJorney",
    link: "https://example.com/articles/ai-in-autonomous-vehicles",
  },
  {
    id: 3,
    title: "최신 동영상 AI : Fliki",
    link: "https://example.com/articles/ai-big-data-in-healthcare",
  },
  {
    id: 4,
    title: "최다방문 그림AI : MidJorney",
    link: "https://example.com/articles/ai-smart-home-technology-trends",
  },
  {
    id: 5,
    title: "최다방문 그림AI : MidJorney",
    link: "https://example.com/articles/ai-computer-vision-advancements",
  },
];

const cardData = [
  {
    id: 1,
    title: "GPT-4 기술을 활용한 인공지능 언어 모델의 미래",
    link: "https://example.com/articles/gpt-4-ai-language-model-future",
  },
  {
    id: 2,
    title: "자율주행 자동차의 인공지능 시스템 발전 동향",
    link: "https://example.com/articles/ai-in-autonomous-vehicles",
  },
  {
    id: 3,
    title: "인공지능과 빅데이터가 의료 분야에 미치는 영향",
    link: "https://example.com/articles/ai-big-data-in-healthcare",
  },
  {
    id: 4,
    title: "AI 기반 스마트홈 기술의 최신 트렌드",
    link: "https://example.com/articles/ai-smart-home-technology-trends",
  },
  {
    id: 5,
    title: "컴퓨터 비전의 발전과 인공지능의 역할",
    link: "https://example.com/articles/ai-computer-vision-advancements",
  },
  {
    id: 6,
    title: "AI 가상비서의 현재와 미래 기술",
    link: "https://example.com/articles/ai-virtual-assistants-technology",
  },
  {
    id: 7,
    title: "인공지능 기술이 금융 서비스에 미치는 영향",
    link: "https://example.com/articles/ai-in-financial-services",
  },
  {
    id: 8,
    title: "머신러닝을 이용한 이미지 분석의 최신 동향",
    link: "https://example.com/articles/machine-learning-image-analysis",
  },
  {
    id: 9,
    title: "인공지능과 로봇공학의 융합: 새로운 시대의 시작",
    link: "https://example.com/articles/ai-robotics-integration",
  },
  {
    id: 10,
    title: "인공지능이 게임 개발에 미치는 파급력",
    link: "https://example.com/articles/ai-in-game-development",
  },
];
