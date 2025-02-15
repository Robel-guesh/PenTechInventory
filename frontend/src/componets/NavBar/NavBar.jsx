import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
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
    totalCart,
  } = useAppContext();

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    navigate("/login");
    window.location.reload();
  };
  // console.log("logged user is", loggedUser);
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div
      className={`d-flex justify-content-around gap-1 align-items-center  flex-wrap shadow-sm w-100  ${
        // darkMode ? defaultBackground : "bg-green"
        defaultBackground
      } `}
    >
      <div className="company-logo">
        <img src={logo} alt="" />
      </div>
      <div className="d-flex gap-2">
        {loggedUser && (
          <div onClick={() => navigate("/")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-house mx-1 fw-bold fs-6 pointer"
                  : "text-black bi bi-house mx-1 fw-bold fs-6 pointer"
              }
            ></span>
          </div>
        )}
        {(loggedUser.isAdmin ||
          loggedUser?.roleName?.name.toLowerCase() ===
            "supper Admin".toLowerCase()) && (
          <div onClick={() => navigate("/admindashboard")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-grid mx-1 fw-bold fs-6 pointer"
                  : "text-black bi bi-grid mx-1 fw-bold fs-6 pointer"
              }
            ></span>
          </div>
        )}
        {(loggedUser?.roleName?.name.toLowerCase() === "store manager" ||
          loggedUser?.roleName?.name.toLowerCase() ===
            "supper Admin".toLowerCase() ||
          loggedUser.isAdmin) && (
          <div onClick={() => navigate("/report")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-graph-up mx-1 fw-bold fs-6 pointer"
                  : "text-black bi bi-graph-up mx-1 fw-bold fs-6 pointer"
              }
            ></span>
          </div>
        )}
        {(loggedUser?.roleName?.name.toLowerCase() === "store keeper" ||
          loggedUser?.roleName?.name.toLowerCase() ===
            "supper Admin".toLowerCase() ||
          loggedUser.isAdmin) && (
          <div onClick={() => navigate("/withdraw")}>
            <span
              className={
                darkMode
                  ? "text-white bi bi-download mx-1 fw-bold fs-6 pointer"
                  : "text-black bi bi-download mx-1 fw-bold fs-6 pointer"
              }
            ></span>
          </div>
        )}
      </div>
      <div
        className="d-flex gap-1 text-white  align-items-center"
        style={{ cursor: "pointer" }}
      >
        {loggedUser && (
          <div className={`${defaultBackground}  p-2 `}>
            <span
              className={`${defaultBackground}  bi bi-cart fw-bolder`}
            ></span>
            <small>{totalCart}</small>
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
                : "text-black bi bi-moon-fill mx-1"
            }
          ></span>
        </div>

        {loggedUser && (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="profile-photo  m-1"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <img
                className="h-100"
                src={`${backendUrl}/${loggedUser.photo[0]}`}
                alt="profile"
              />
            </div>
            {openProfile && (
              <div
                className={`settings ${darkMode ? "bg-dark" : "bg-light"}   `}
              >
                <div
                  className={`border-bottom border-1 border-warning w-100 py-2 ${
                    darkMode ? "text-white" : "text-dark"
                  }`}
                  style={{ fontSize: "14px" }}
                >
                  <span
                    className={`bi bi-pen me-1 ${
                      darkMode ? "text-white" : "text-dark"
                    }`}
                  ></span>
                  <span className="my-2">{translate("edit Profile")}</span>
                </div>
                {loggedUser && (
                  <div
                    onClick={handleLogOut}
                    className={` d-flex align-items-center  `}
                  >
                    <span
                      className={`me-1 ${
                        darkMode ? "text-white" : "text-dark"
                      }   bi bi-box-arrow-right  fs-6 fw-bolder `}
                    ></span>
                    <span
                      className={`${darkMode ? "text-white" : "text-dark"}`}
                      style={{ fontSize: "14px" }}
                    >
                      {translate("Log Out")}
                    </span>
                  </div>
                )}
              </div>
            )}
            {/* <div
              className={`${darkMode ? "text-white" : "text-dark"}  mx-1   `}
            >
              {loggedUser.name}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
