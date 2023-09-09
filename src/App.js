import React from "react";
import "./App.css";
import "./index";
import "./WeatherSearch.js";
export default function App() {
  return (
    <div className="App">
      <div className="container">
        <footer className="footer">
          This website was coded by{" "}
          <a
            href="https://www.linkedin.com/in/farha-bibi-b2a52125b//"
            target="_blank"
            rel="noreferrer"
            title="Farha Bibi"
          >
            Farha Bibi
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/fbibi4/react-weather-app"
            target="_blank"
            rel="noreferrer"
            title="Source code on GitHub"
          >
            <strong>open-sourced</strong>
          </a>
        </footer>
      </div>
    </div>
  );
}
