import { createContext, useContext, useState } from "react";
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
