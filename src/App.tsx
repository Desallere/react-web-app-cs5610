import React from "react";
import "./App.css";
import { HashRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import Landing from "./Landing";

function App() {
  return (
    <HashRouter>
      <div>
       
        
        <Routes>
         <Route path="/*" element={<Landing />} />
         <Route path="/Landing/*" element={<Landing />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
