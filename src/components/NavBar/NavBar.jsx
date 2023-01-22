import React from 'react'
import {  ListItem , ListItemIcon } from '@material-ui/core'
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from 'react-router-dom';
function NavBar({toggleDrawer}) {
    const activeLinkStyles = ({ isActive }) => {
        return {
           color: isActive ? "purple" : "black",
        };
     };
    return (
<>
<ListItem className='header-nav-item'>
                     <NavLink onClick={toggleDrawer} to={"/"} style={activeLinkStyles}>
                        Home
                     </NavLink>
                  </ListItem>
                  <ListItem className='header-nav-item' >
                     <NavLink onClick={toggleDrawer} to={"songs"} style={activeLinkStyles}>
                        Songs
                     </NavLink>
                  </ListItem>
                  <ListItem className='header-nav-item'>
                     <NavLink onClick={toggleDrawer} to={"artists"} style={activeLinkStyles}>
                        Artists
                     </NavLink>
                  </ListItem>
                  <ListItem className='header-nav-item'>
                     <ListItemIcon className='header-nav-icon'>
                        <NavLink onClick={toggleDrawer} to={'profile'}>
                           {!localStorage.getItem("avatar") ? (
                              <PersonIcon className='icon' style={{fontSize : '2rem'}} />
                           ) : (
                              <img
                                 src={localStorage.getItem("avatar")}
                                 alt="Profile"
                              />
                           )}
                        </NavLink>
                     </ListItemIcon>
                  </ListItem>

</>
        
           
    )
}

export default NavBar
