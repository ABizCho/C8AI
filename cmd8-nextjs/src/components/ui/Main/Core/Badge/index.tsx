import React from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { ICategoryVariants } from "../AIGridCard";

const Badge = ({
  className,
  categoryKey,
}: {
  className: string;
  categoryKey: string;
}): JSX.Element => {
  console.log("category", categoryKey);

  const badgeImgUrl = `/images/badge/badge-${categoryKey}.png`;

  const BadgeVariants: ICategoryVariants = {
    chat: `bg-gray-400 hover:bg-gray-300`,
    drawing: `bg-purple-500 hover:bg-purple-400`,
    video: `bg-fuchsia-500 hover:bg-fuchsia-400`,
    music: `bg-pink-200 hover:bg-pink-100`,
    office: `bg-teal-500 hover:bg-teal-600`,
    developer: `bg-zinc-600 hover:bg-zinc-500`,
  };

  return (
    <Tooltip title={categoryKey}>
      <div
        className={`${className} ${BadgeVariants[categoryKey]} absolute z-50 cursor-pointer  -top-2 -left-2 w-10 h-10 rounded-full overflow-hidden shadow-lg transition-all duration-300`}
      >
        <Image src={badgeImgUrl} alt="Badge" width={40} height={40} />
      </div>
    </Tooltip>
  );
};

export { Badge };
