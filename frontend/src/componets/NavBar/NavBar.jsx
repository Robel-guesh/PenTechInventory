import React from "react";
import logo from "../../assets/logo.png";
import profile_photo from "../../assets/profilePhoto.png";
import { useAppContext } from "../../contexts/AppContext";
function NavBar() {
  const {
    toggleDarkMode,
    toggleLanguage,
    darkMode,
    language,
    defaultBackground,
    userName,
  } = useAppContext();

  return (
    <div
      className={`d-flex justify-content-between align-items-center ${
        darkMode ? defaultBackground : "bg-green"
      } `}
    >
      <div className="company-logo">
        <img src={logo} alt="" />
      </div>
      <div
        className="d-flex me-2 text-white  align-items-center"
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className="profile-photo  ">
            <img src={profile_photo} alt="user photos" />
          </div>
          <div className=" mx-3 ">{userName}</div>
        </div>
        <div onClick={() => toggleLanguage()}>
          {language === "eng" ? "En" : "ትግ"}
        </div>
        <div onClick={() => toggleDarkMode()}>
          <span
            className={
              darkMode
                ? "text-warning bi bi-sun-fill mx-4  "
                : "text-white bi bi-sun-fill mx-4"
            }
          ></span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
