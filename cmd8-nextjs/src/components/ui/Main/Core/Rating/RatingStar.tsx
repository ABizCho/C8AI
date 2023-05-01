import React from "react";
import { FaStar } from "react-icons/fa";
import { IconBaseProps } from "react-icons";

interface IRatingStarProps extends IconBaseProps {
  half?: boolean;
}

const RatingStar: React.FC<IRatingStarProps> = ({ half = false, ...rest }) => (
  <FaStar className={`text-yellow-400`} {...rest} />
);

export default RatingStar;
