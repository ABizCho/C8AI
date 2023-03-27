import React from "react";
import { GridItemWrap, GridContainer } from "../components/Grid/Grid";
import AIINFO from "./aiInfo.json";

export default function Home(): JSX.Element {
  return (
    <div className="main-section-wrap">
      <IntroSec />
      <CoreSec />
      <TodoSec />
      <MagazineSec />
    </div>
  );
}

const IntroSec = () => {
  return (
    <section className="content-section">
      <h2>Intro Section</h2>
      <div className="container"></div>
    </section>
  );
};
const MagazineSec = () => {
  return (
    <section className="content-section">
      <h2>Magazine Section</h2>
      <div className="container"></div>
    </section>
  );
};

const TodoSec = () => {
  return (
    <section className="content-section">
      <h2>Todo Section</h2>
      <div className="container"></div>
    </section>
  );
};

const CoreSec = () => {
  return (
    <section className=" content-section">
      <input className="coreSec-search" />
      <div className="coreSec-itemBox">
        <div className="coreSec-categoryBox">
          <div>All</div>
          <div>그림</div>
          <div>영상</div>
          <div>3D렌더링</div>
          <div>글쓰기</div>
          <div></div>
        </div>
        <div className="container core-container">
          <GridContainer>
            {AIINFO.map((v) => (
              <GridItemWrap>
                <GridItemInner
                  id={v.id}
                  nameKo={v.ko?.name}
                  categoryKo={v.ko?.category}
                />
              </GridItemWrap>
            ))}
          </GridContainer>
        </div>
      </div>
    </section>
  );
};

// type Bilingual =
//   | {
//       ko: string;
//       en: string;
//     }
//   | { ko: string[]; en: string[] };

interface AiCardProps {
  id: string | undefined;
  nameKo: string[] | string | undefined;
  categoryKo: string[] | string | undefined;
}

const GridItemInner = ({ id, nameKo, categoryKo }: AiCardProps) => {
  return <div>{id}</div>;
};
