import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";

const Badge = ({ className, categoryKey, bgColor }: any): JSX.Element => {
  console.log("category", categoryKey);

  const badgeImgUrl = `/images/badge-${categoryKey}.png`;

  const [isHovered, setIsHovered] = useState(false);
  const bgColorClass = isHovered ? `${bgColor}-400` : `${bgColor}-500`;

  return (
    <Tooltip title={categoryKey}>
      <div
        className={`${className} ${bgColorClass} cursor-pointer absolute -top-2 -left-2 w-10 h-10 rounded-full overflow-hidden shadow-lg transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={badgeImgUrl} alt="Badge" width={40} height={40} />
      </div>
    </Tooltip>
  );
};

export { Badge };
