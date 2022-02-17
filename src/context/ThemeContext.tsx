import React, {useContext, createContext, useState} from "react";
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