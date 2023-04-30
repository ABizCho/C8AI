import React from "react";
import { FaStar } from "react-icons/fa";
import { IconBaseProps } from "react-icons";

interface IRatingProps {
  scoreAvg: number | any;
  scoreCnt: number;
}

const Rating: React.FC<IRatingProps> = ({ scoreAvg, scoreCnt }) => {
  let roundedValue;
  let fullStars;
  let hasHalfStar;
  let emptyStars;

  if (scoreAvg !== -1) {
    roundedValue = Math.round(scoreAvg * 2) / 2;
    fullStars = Math.floor(roundedValue);
  } else {
    roundedValue = 0;
    fullStars = 0;
    scoreAvg = "";
  }
  hasHalfStar = roundedValue - fullStars !== 0;
  emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={`star_${i}`} className="text-yellow-400" />
      ))}
      {hasHalfStar && (
        <span style={{ position: "relative" }}>
          <RatingStar className="text-gray-300" />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              overflow: "hidden",
            }}
          >
            <RatingStar className="text-yellow-400" />
          </span>
        </span>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <FaStar key={`empty_star_${i}`} className="text-gray-300" />
      ))}
      <span className="ml-1 text-xs text-gray-600 mt-0.5">({scoreCnt})</span>
    </div>
  );
};

interface IRatingStarProps extends IconBaseProps {}

const RatingStar: React.FC<IRatingStarProps> = ({ ...rest }) => (
  <FaStar className={` ${rest.className}`} />
);

export { Rating, RatingStar };
