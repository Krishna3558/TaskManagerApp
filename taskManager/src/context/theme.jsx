import React, { useContext, useState , useEffect } from "react";
import { createContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [mode , setMode] = useState("light");
    const darkMode = () => {
        setMode("dark");
    }
    const lightMode = () => {
        setMode("light");
    }
    useEffect(() => {
        document.querySelector('html').classList.remove("light" , "dark");
        document.querySelector('html').classList.add(mode);
      } , [mode]);
    return (
        <ThemeContext.Provider value={{mode , darkMode , lightMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => (useContext(ThemeContext));