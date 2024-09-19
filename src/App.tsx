import React from "react";
import "./App.css";
import { HashRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";

function App() {
  return (
    <HashRouter>
      <div>
        <Link to="/Labs">Labs</Link> |
        <Link to="/Kanbas">Kanbas</Link>
        <Routes>
         <Route path="/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
