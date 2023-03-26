import React from "react";
import { Link } from "react-router-dom";

export function LayoutHeader() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">header</Link>
        </li>
      </ul>
    </nav>
  );
}
