import React from "react";
import { ListItem, ListItemIcon } from "@material-ui/core";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAvatar } from "../../contexts/avatarContext";
function NavBar({ toggleDrawer }) {
   const navigate = useNavigate();
   const {avatar} = useAvatar()
   const activeLinkStyles = ({ isActive }) => {
      return {
         color: isActive ? "purple" : "black",
      };
   };
   useEffect(() => {
      if (
         localStorage.getItem("userId") === null ||
         !localStorage.getItem("userId").length
      ) {
         alert("Did not work out  your user data try to sign in again");
         navigate("/signIn");
      }
   }, []);
   return (
      <>
         <ListItem className="header-nav-item">
            <NavLink onClick={toggleDrawer} to={"/"} style={activeLinkStyles}>
               Home
            </NavLink>
         </ListItem>
         <ListItem className="header-nav-item">
            <NavLink
               onClick={toggleDrawer}
               to={"songs"}
               style={activeLinkStyles}
            >
               Songs
            </NavLink>
         </ListItem>
         <ListItem className="header-nav-item">
            <NavLink
               onClick={toggleDrawer}
               to={"artists"}
               style={activeLinkStyles}
            >
               Artists
            </NavLink>
         </ListItem>
         <ListItem className="header-nav-item">
            <ListItemIcon className="header-nav-icon">
               <NavLink
                  onClick={toggleDrawer}
                  to={`profile/${localStorage.getItem("userId")}`}
               >
                  {avatar === '' || localStorage.getItem('avatar') === ''? (
                     <PersonIcon
                        className="icon"
                        style={{ fontSize: "2rem" }}
                     />
                  ) : (
                     <img style={{width : '40px' , height : '40px' , borderRadius : '100%' , border : '1px solid black'}} src={localStorage.getItem('avatar')} alt="Profile" />
                  )}
               </NavLink>
            </ListItemIcon>
         </ListItem>
      </>
   );
}

export default NavBar;
