import React from "react";
import { GridItem, GridContainer } from "../components/Grid/Grid";

export default function Home(): JSX.Element {
  return (
    <div className="main-section-wrap">
      <IntroSec />
      <MagazineSec />
      <TodoSec />
      <CoreSec />
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
            <GridItem>A</GridItem>
            <GridItem>B</GridItem>
            <GridItem>C</GridItem>
            <GridItem>D</GridItem> <GridItem>E</GridItem>
            <GridItem>F</GridItem>
          </GridContainer>
        </div>
      </div>
    </section>
  );
};
