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
          {TERMS.map((term, idx) => (
            <a
              key={idx}
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
