import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

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
  const translationData = {
    "ADD TO CART": { eng: "add to cart", tig: "nab zembil aetu" },
    ORDER: { eng: "order", tig: "azz" },
  };
  const [translation, setTranslation] = useState(translationData);
  // const translationRoute = "/translations";
  const [darkMode, setDarkMode] = useState(false);

  const [language, setLanguage] = useState("eng");
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
    setBackendUrl("http://127.0.0.1:5000");
    const token = localStorage.getItem("token");
    if (token) {
      setIsAdmin(true);
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
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `${token}`;
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
