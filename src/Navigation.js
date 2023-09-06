import React from "react";
import axios from "axios";

export default function App() {
  return (
    <div className="Navigation">
      <header>
        <ul className="navigation-items">
          <li className="navigation-item">
            <a href="/">Lisbon</a>
          </li>
          <li className="navigation-item">
            <a href="/">Paris</a>
          </li>
          <li className="navigation-item">
            <a href="/">Sydney</a>
          </li>
          <li className="navigation-item">
            <a href="/">San Francisco</a>
          </li>
        </ul>
      </header>
    </div>
  );
}
