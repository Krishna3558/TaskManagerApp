import React, { useContext , useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLogin , setIsLogin] = useState(false);
    const loggedIn = () => {
        setIsLogin(true);
    }
    const logOut = () => {
        setIsLogin(false);
    }
    return (
        <AuthContext.Provider value={{isLogin , loggedIn , logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => (useContext(AuthContext));