import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
    const [isAuthObj , setIsAuth] = useState({isAuth  : false , renderCount : 0})
   return <AuthContext.Provider value = {{
    isAuthObj : isAuthObj,
    setIsAuth : setIsAuth
   }} >{children}</AuthContext.Provider>;
};
