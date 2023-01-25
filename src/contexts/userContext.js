import { createContext, useContext, useState } from "react";
import { USERS_API } from "../API";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getData } from "../reduxToolkit/async/data";
const UserContext = createContext();
export const useUser = () => {
   return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
   const [userContext, setUserContext] = useState({});
   const [playlists, setPlaylists] = useState([]);
   return (
      <UserContext.Provider
         value={{
            userContext: userContext,
            setUserContext: setUserContext,
            playlists: playlists,
            setPlaylists: setPlaylists,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};
