import { createContext, useContext, useEffect, useState } from "react";

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    browserLocalPersistence,
    User as FirebaseUser,
  } from 'firebase/auth';

import { auth } from "@services/firebase";

// @TYPES
import { UserType } from "src/@types/UserTypes";

type AuthState = {
    user: UserType | null;
    login(): Promise<void>
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<UserType>({} as UserType);

    const handleUser = (firebaseUser: FirebaseUser): void => {
        if (!firebaseUser) return;
        const { uid, displayName, photoURL } = firebaseUser;
    
        if (!displayName || !photoURL)
          throw new Error('Informações de usuário faltando.');
    
        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
        });
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
            if (firebaseUser) {
              handleUser(firebaseUser);
            }
          });
      
          return () => unsubscribe();
    }, [])

    const login = async (): Promise<void> => {
        if (user.id) return;
        const provider = new GoogleAuthProvider();
        try {
            auth.setPersistence(browserLocalPersistence).then(async ()=>{
                const result = await signInWithPopup(auth, provider);
                handleUser(result.user);
            })
        } catch (error) {
          throw new Error('Usuário não autenticado.');
        }
    };

    const logout = async (): Promise<void> =>{
        await auth.signOut()
        setUser({} as UserType)
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
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