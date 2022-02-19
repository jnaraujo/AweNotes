import React, {useContext, createContext, useState, useEffect} from "react";
import { ThemeInterface, lightTheme } from "./../theme";

type ThemeContextType = {
    theme: ThemeInterface;
    setTheme: (theme: ThemeInterface) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    setTheme: (theme: ThemeInterface) => {},
});

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        const themeStorage = localStorage.getItem("theme");

        if( themeStorage ){
            if(themeStorage === "dark"){
                (import('./../theme').then(({darkTheme})=>{
                    setTheme(darkTheme);
                }));
            }
        }
    }, []);

    useEffect(() => {
        const themeStorage = localStorage.getItem("theme");
        if(themeStorage != theme.name){
            localStorage.setItem("theme", theme.name);
            if( theme.name == "light"){
                setTheme(lightTheme);
            }else{
                (import('./../theme').then(({darkTheme})=>{
                    setTheme(darkTheme);
                }));
            }
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext);
}