import React from "react";
import TERMS from "./terms.json";

export function LayoutFooter() {
  // const imgUrl = `/${"images"}/${"logo"}.${"png"}`;

  // const
  return (
    <footer className="doc-footer" style={{ backgroundColor: "dark" }}>
      <div className="inner_footer">
        <section className="section_service-list"></section>
        <section className="section_address"></section>
        <section className="section_terms-wrapper">
          {TERMS.map((term) => (
            <a
              href={term.dest}
              role="button"
              aria-expanded="false"
              className="terms"
            >
              {term.name}
            </a>
          ))}
        </section>
        <ul className="section_social"></ul>
        <small className="txt_copyright">
          © <a href="https://www.c8ai.com">Cmd8</a> All rights reserved.
        </small>
      </div>
    </footer>
  );
}

{
  /* <footer className="footer-bg-dark">
<div className="footer-inner w-100p container desktop-box">
  <img src={imgUrl} width="40px" alt="img" />

  <div className="fw-bold fs-18">공유책방</div>
  <p className="t-c">경기도 의왕시</p>
  <div className="flex-box w-100p t-c mt-10 lh-2">

  </div>
</div>
<div className="footer-line"></div>
<p className="container t-c">
  Copyright © 2023 C8AI.co.kr | All rights reserved.
</p> */
}
