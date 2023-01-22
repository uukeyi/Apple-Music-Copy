import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import checkToken from "../utils/checkToken";
function PrivateAuth({ children }) {
   const { isAuthObj, setIsAuth } = useAuth();
   useEffect(() => {
      checkToken(setIsAuth);
   }, []);
   if (isAuthObj.renderCount > 0) {
      if(isAuthObj.isAuth){
         return children
      }else{
         return <Navigate to={'preview'} />
      }
   }
}

export default PrivateAuth;
