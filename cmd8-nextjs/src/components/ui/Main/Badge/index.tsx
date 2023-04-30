import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { ICategoryVariants } from "@/pages/sections/CoreSec";

const Badge = ({
  className,
  categoryKey,
}: {
  className: string;
  categoryKey: string;
}): JSX.Element => {
  console.log("category", categoryKey);

  const badgeImgUrl = `/images/badge-${categoryKey}.png`;

  const BadgeVariants: ICategoryVariants = {
    chat: `bg-pink-500 hover:bg-pink-400`,
    drawing: `bg-purple-500 hover:bg-purple-400`,
  };

  return (
    <Tooltip title={categoryKey}>
      <div
        className={`${className} ${BadgeVariants[categoryKey]} cursor-pointer absolute -top-2 -left-2 w-10 h-10 rounded-full overflow-hidden shadow-lg transition-all duration-300`}
      >
        <Image src={badgeImgUrl} alt="Badge" width={40} height={40} />
      </div>
    </Tooltip>
  );
};

export { Badge };
