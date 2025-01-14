import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./componets/NavBar/NavBar";
import DisplayData from "./componets/DisplayData";
import { useAppContext } from "./contexts/AppContext";
function App() {
  const { defaultBackground } = useAppContext();
  return (
    <>
      <div className={defaultBackground}>
        <nav>
          <NavBar
          // toggleDarkMode={toggleDarkMode}
          // darkMode={darkMode}
          // toggleLanguage={toggleLanguage}
          // language={language}
          // defaultBackground={defaultBackground}
          />
        </nav>
        <div>
          <DisplayData />
        </div>
      </div>
    </>
  );
}

export default App;
