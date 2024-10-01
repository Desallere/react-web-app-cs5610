import { Route, Routes, Navigate } from "react-router";
import TOC from "../Labs/TOC";
import Lab1 from "../Labs/Lab1";
import Lab2 from "../Labs/Lab2";
import Lab3 from "../Labs/Lab3";


export default function Labs() {
  return (
    <div>
      <h1> Landing Page</h1>
      Daijin Yang | CS5610 20595 Web Development SEC 02 Fall 2024 [VTL-2-OL] （ CS5610.20595.202510 ）
      <h2> To Labs and Kanbas</h2>
      <TOC />
      <h2> To Git</h2>
      <a id="wd-github" href="https://github.com/Desallere/react-web-app-cs5610" target="_blank"> Git Repo</a>

    </div>
  );
}