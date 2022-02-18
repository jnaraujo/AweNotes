import { createContext, useContext, useState } from "react";

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    User as FirebaseUser,
  } from 'firebase/auth';

import { auth } from "@services/firebase";

type UserType = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}
type AuthState = {
    user: UserType | null;
    login(): Promise<void>
    logout: () => void;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<UserType>({} as UserType);

    const handleUser = (firebaseUser: FirebaseUser): void => {
        if (!firebaseUser) return;
        const { uid, displayName, photoURL, email } = firebaseUser;
    
        if (!displayName || !photoURL)
          throw new Error('Informações de usuário faltando.');
    
        setUser({
            id: uid,
            name: displayName,
            email: email,
            avatar: photoURL,
        });
    };

    const login = async (): Promise<void> => {
        if (user.id) return;
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          handleUser(result.user);
        } catch (error) {
          throw new Error('Usuário não autenticado.');
        }
    };
    
    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout: () => {}
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}