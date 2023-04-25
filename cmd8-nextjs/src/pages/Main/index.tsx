// Main.tsx

import { IAiTool } from "@/interfaces/main";

import { CoreSec, IntroSec, MagazineSec, TodoSec } from "@/pages/sections";

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
