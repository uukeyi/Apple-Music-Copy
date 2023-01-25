import { createContext, useContext, useState } from "react";
const AvatarContext = createContext();
export const useAvatar = () => {
   return useContext(AvatarContext);
};
export const AvatarProvider = ({ children }) => {
   const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
   
   return (
      <AvatarContext.Provider
         value={{
            avatar: avatar,
            setAvatar: setAvatar,
         }}
      >
         {children}
      </AvatarContext.Provider>
   );
};
