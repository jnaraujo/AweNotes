import { useContext, useState, createContext, useEffect } from "react";

type RecaptchaState = {
    isVerified: boolean;
    token: string;
    setToken(token: string): void;
}

declare global {
    interface Window {
        grecaptcha:any;
    }
}
const RecaptchaContext = createContext<RecaptchaState>({} as RecaptchaState);

export function RecaptchaProvider({children}){
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY, { action: "submit" }).then(async (token) => {
                setIsVerified(true);
                setToken(token);
            })
        })
    }, [])

    return (
        <RecaptchaContext.Provider value={{
            isVerified,
            token,
            setToken
        }}>
            {children}
        </RecaptchaContext.Provider>
    )
}
export function useRecaptcha(){
    return useContext(RecaptchaContext);
}