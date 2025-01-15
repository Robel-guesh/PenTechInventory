import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./componets/NavBar/NavBar";
import DisplayData from "./componets/DisplayData";
import { useAppContext } from "./contexts/AppContext";
import GoodForm from "./componets/forms/GoodForm";
import CategoryForm from "./componets/forms/CategoryForm";
function App() {
  const { defaultBackground } = useAppContext();
  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<DisplayData />}></Route>
            <Route path="/goods" element={<GoodForm />}></Route>
            <Route path="/category" element={<CategoryForm />}></Route>
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
