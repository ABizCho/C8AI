// Main.tsx

import tw from "tailwind-styled-components";

import { IAiTool } from "@/interfaces/main";

import IntroSec from "../sections/IntroSec";
import CoreSec from "../sections/CoreSec";
import TodoSec from "../sections/TodoSec";
import MagazineSec from "../sections/MagazineSec";

export default function Main({ aiTools }: { aiTools: IAiTool[] }): JSX.Element {
  console.log(aiTools);
  return (
    <div className="main-section-wrap">
      <IntroSec />
      <CoreSec aiTools={aiTools} />
      <TodoSec />
      <MagazineSec />
    </div>
  );
}

export const ContentSection = tw.section`
  my-60
`;
