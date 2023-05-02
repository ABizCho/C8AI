import { useState, useEffect } from "react";
import Link from "next/link";
import AutoplayInfiniteSwiper from "@/components/ui/Common/Swiper";

const IntroSec = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset - 0.1) % cardData.length);
    }, 50); // Set interval duration (100ms)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-[500px] w-full bg-black flex justify-center">
      <div className="p-[40px] h-3/4 self-center w-full overflow-hidden">
        <div className="">
          <h2 className="pt-[10px] text-white font-inherit font-bold text-2xl">
            트렌드를 놓치지 마세요!
          </h2>
        </div>
        <div className="flex mt-14">
          <div className="w-2/3 min-w-[51%]"></div>
          <div
            className="absolute left-1/2 w-0 h-0 border-b-black z-10
          border-r-[100px] border-r-transparent border-b-[250px]"
          ></div>

          <div className="area-2 mt-8 w-2/3 flex flex-col gap-y-4">
            <AutoplayInfiniteSwiper dataArr={cardData} autoPlaySpeed={4000} />
            <AutoplayInfiniteSwiper dataArr={cardData} autoPlaySpeed={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSec;

const cardData = [
  {
    id: 1,
    title: "Card 1",
    link: "/card1",
    imageUrl:
      "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTI0MTN8MHwxfGFsbHwxfHx8fHx8fHx8fHwxNjEzMzE0MjU&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 2,
    title: "Card 2",
    link: "/card2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Card 3",
    link: "/card3",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Card 4",
    link: "/card4",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Card 5",
    link: "/card5",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "Card 6",
    link: "/card6",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    title: "Card 7",
    link: "/card7",
    imageUrl: "https://via.placeholder.com/150",
  },
  // ...more cards
];
