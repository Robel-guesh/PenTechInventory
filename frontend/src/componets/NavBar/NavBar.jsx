import React from "react";
import logo from "../../assets/logo.png";
import profile_photo from "../../assets/profilePhoto.png";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const {
    toggleDarkMode,
    toggleLanguage,
    darkMode,
    language,
    defaultBackground,
    loggedUser,
    backendUrl,
    translate,
  } = useAppContext();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div
      className={`d-flex justify-content-between gap-2 align-items-center flex-wrap ${
        darkMode ? defaultBackground : "bg-green"
      } `}
    >
      <div className="company-logo">
        <img src={logo} alt="" />
      </div>
      <div className="d-flex gap-2 ">
        {loggedUser && (
          <div onClick={() => navigate("/")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-house mx-2 fw-bold fs-5 pointer"
                  : "text-black bi bi-house mx-2 fw-bold fs-5 pointer"
              }
            ></span>
          </div>
        )}
        {loggedUser.isAdmin && (
          <div onClick={() => navigate("/admindashboard")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-grid mx-2 fw-bold fs-5 pointer"
                  : "text-black bi bi-grid mx-2 fw-bold fs-5 pointer"
              }
            ></span>
          </div>
        )}
        {loggedUser.isAdmin && (
          <div onClick={() => navigate("/report")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-graph-up mx-2 fw-bold fs-5 pointer"
                  : "text-black bi bi-graph-up mx-2 fw-bold fs-5 pointer"
              }
            ></span>
          </div>
        )}
        {loggedUser.isAdmin && (
          <div onClick={() => navigate("/withdraw")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-download mx-2 fw-bold fs-5 pointer"
                  : "text-black bi bi-download mx-2 fw-bold fs-5 pointer"
              }
            ></span>
          </div>
        )}
      </div>
      <div
        className="d-flex gap-2 text-white  align-items-center"
        style={{ cursor: "pointer" }}
      >
        {loggedUser && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="profile-photo  ">
              <img src={`${backendUrl}/${loggedUser.photo[0]}`} alt="profile" />
            </div>
            {/* <div
              className={`${darkMode ? "text-white" : "text-dark"}  mx-1   `}
            >
              {loggedUser.name}
            </div> */}
          </div>
        )}
        <div
          className={darkMode ? "text-warning mx-1" : "text-black mx-1"}
          onClick={() => toggleLanguage()}
        >
          {language === "eng" ? "En" : "ትግ"}
        </div>
        <div onClick={() => toggleDarkMode()}>
          <span
            className={
              darkMode
                ? "text-warning bi bi-sun-fill mx-1  "
                : "text-black bi bi-sun-fill mx-1"
            }
          ></span>
        </div>
        {loggedUser && (
          <div
            onClick={handleLogOut}
            className={`${
              darkMode ? "text-white" : "text-dark"
            }  mx-3 bi bi-box-arrow-right  fs-5 fw-bolder `}
          ></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
