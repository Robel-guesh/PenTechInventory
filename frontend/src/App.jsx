import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./componets/NavBar/NavBar";
import DisplayData from "./componets/DisplayData";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [language, setLanguage] = useState("");

  const toggleLanguage = () => {
    setLanguage(language === "eng" ? "tig" : "eng");
    localStorage.setItem("language", language);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const defaultBackground = darkMode ? "dark" : "light";
  useEffect(() => {
    const new_language = localStorage.getItem("language");

    if (new_language) {
      setLanguage(new_language);
    }
  }, []);
  return (
    <>
      <div className={defaultBackground}>
        <nav>
          <NavBar
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            toggleLanguage={toggleLanguage}
            language={language}
            defaultBackground={defaultBackground}
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
