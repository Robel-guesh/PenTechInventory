import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import decode from "jwt-decode"; // Import jwt-decode
// require("dotenv").config();
// Create a context for backend URL, language, admin status, and translations
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Context provider to wrap the entire app and provide context values
export const AppProvider = ({ children }) => {
  // const [currentLanguage, setCurrentLanguage] = useState("eng");
  const [backendUrl, setBackendUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const companyName = "PTSC";
  const catagoryList = {
    furniture: "fur",
    electronic: "ele",
    stationary: "sta",
    book: "book",
    medical: "med",
  };

  const translationData = {
    // "ADD TO CART": { eng: "order", tig: "ኣዝዝ " },
    ORDER: { eng: "order", tig: "ኣዝዝ" },
    "finished Stock": { eng: "finished stock", tig: "ዝተወደአ" },
  };
  const [translation, setTranslation] = useState(translationData);
  // const translationRoute = "/translations";
  const [darkMode, setDarkMode] = useState(false);

  const [language, setLanguage] = useState("eng");
  const [totalCart, setTotalCart] = useState(0);
  const sellerName = "Robel Guesh";
  const customerName = "Amaniel";
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

  useEffect(() => {
    const backendIp = import.meta.env.VITE_BACKEND_IP;

    setBackendUrl(backendIp);
    const newtoken = localStorage.getItem("token");
    // const newUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (newtoken) {
      const newUser = jwtDecode(newtoken);

      if (newUser) {
        setLoggedUser(newUser);
      }
    }

    if (newtoken) {
      setToken(newtoken);

      if (loggedUser.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  // useEffect(() => {
  //   const fetchLanguage = async () => {
  //     try {
  //       // const response = await axios.get(`${backendUrl}${translationRoute}`);
  //       // setTranslation(response.data);

  //     } catch (error) {
  //       console.error("Error fetching translations:", error);
  //     }
  //   };

  //   fetchLanguage();
  // }, [backendUrl]);

  // Function to set the admin status
  const setAdminStatus = (status) => {
    setIsAdmin(status);
  };

  const translate = (key) => {
    if (!translation) return key; // Return the key itself if no translation is loaded yet

    // Convert the key to uppercase before trying to access the translation
    const upperKey = key.toUpperCase();

    // Check if the translation exists for the uppercase key and current language
    const translatedText = translation[upperKey]
      ? translation[upperKey][language] // Fetch the translation in the current language
      : upperKey; // Fallback to the uppercase key itself if no translation is found

    // Capitalize the translation (if available) before returning it
    return translatedText ? capitalize(translatedText) : upperKey;
  };

  // Helper function to capitalize the first letter of the string
  const capitalize = (text) => {
    if (!text) return text; // If the text is empty, return it as is
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  axios.interceptors.request.use(
    (config) => {
      const newtoken = localStorage.getItem("token");
      if (newtoken) {
        config.headers["Authorization"] = `${newtoken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isAdmin,
        setAdminStatus,

        darkMode,
        defaultBackground,
        toggleDarkMode,

        toggleLanguage,
        language,
        sellerName,
        customerName,
        translation,
        translate,
        loggedUser,
        totalCart,
        setTotalCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
