"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [pendingTheme, setPendingTheme] = useState(null);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(savedTheme);
  }, []);

  const requestThemeChange = (newTheme) => {
    setPendingTheme(newTheme);
    setIsThemeModalOpen(true);
  };

  const confirmThemeChange = () => {
    const newTheme = pendingTheme;
    console.log("Confirming theme change to:", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Apply theme to DOM
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    console.log("DOM classes after update:", document.documentElement.className);
    
    setIsThemeModalOpen(false);
    setPendingTheme(null);
  };

  const cancelThemeChange = () => {
    setIsThemeModalOpen(false);
    setPendingTheme(null);
  };

  return (
    <UIContext.Provider value={{ 
      theme, 
      isThemeModalOpen, 
      pendingTheme,
      requestThemeChange, 
      confirmThemeChange, 
      cancelThemeChange 
    }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
