"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ar from "../locales/ar";
import en from "../locales/en";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const storedLang = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (storedLang && (storedLang === "ar" || storedLang === "en")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(storedLang);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      localStorage.setItem("language", lang);
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key) => {
    const dictionary = lang === "ar" ? ar : en;
    const keys = key.split(".");
    let value = dictionary;
    for (const k of keys) {
      if (value[k] === undefined) {
        return key;
      }
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
