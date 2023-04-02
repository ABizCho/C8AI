import React from "react";
import CoreSec from "../sections/home/CoreSec";

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
