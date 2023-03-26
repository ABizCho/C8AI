import React from "react";
import { Link } from "react-router-dom";

export function LayoutHeader() {
  const imgUrl = `/${"images"}/${"logo"}.${"png"}`;

  return (
    <div>
      <div className="navbar-brand">
        <a href="/" target="_self" className="navbar-item">
          <div className="navbar-brand-logo">
            <img height={50} src={imgUrl} alt="logo" />
            <div className="navbar-item-link" role="none">
              <span>CMD+8</span>
            </div>
          </div>
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">header</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
