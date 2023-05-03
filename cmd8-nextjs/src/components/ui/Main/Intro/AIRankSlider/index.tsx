import { useState, useEffect } from "react";
import Link from "next/link";

interface DataArrProps {
  dataArr: {
    id: number;
    title: string;
    link: string;
  }[];
}

const AIRankSlider: React.FC<DataArrProps> = ({ dataArr }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % dataArr.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-rank pt-3 gap-2 w-full md:gap-3 md:w-5/6 flex flex-col">
      {dataArr.map((data, index) => (
        <div
          key={index}
          className={`ai-rank-card text-[9px] sm:text-sm text-white border-white rounded-xl  p-[0.5px]
          
          ${
            index === activeCardIndex
              ? "bg-slate-600 transform scale-110 z-10"
              : "bg-black text-slate-600"
          } transition-all duration-500`}
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
        </div>
      ))}
    </div>
  );
};

export default AIRankSlider;
