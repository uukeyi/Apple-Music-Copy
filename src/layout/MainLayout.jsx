import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, makeStyles, List, Link } from "@material-ui/core";
import { Stack } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';

function MainLayout() {
   const useStyles = makeStyles({
      popBurger: {
         width: "65%",

         textAlign: "center",
         fontSize: "2rem",
      },
   });
   const [visible, setVisible] = useState(false);
   const classes = useStyles();
   const toggleDrawer = () => {
      setVisible((prev) => !prev);
   };
   return (
      <>
         <Header
            toggleDrawer={toggleDrawer}
            burger={
               <Link className="header-burger" onClick={toggleDrawer}>
                  <MenuIcon />
               </Link>
            }
         >
            <Box component={"nav"} className="header-nav-bar">
               <List className="header-list" style={{ display: "flex", gap: "1rem" }}>
                  <NavBar />
               </List>
            </Box>
         </Header>
         <main className="main">
            <Drawer
               anchor="right"
               variant="persistent"
               open={visible}
               classes={{ paper: classes.popBurger }}
            >
               <Link
                  style={{ position: "absolute", right: "10px" }}
                  onClick={toggleDrawer}
               >
                  <CloseIcon
                     style={{
                        fontSize: "3rem",
                     }}
                  />
               </Link>
               <Stack
                  style={{ marginTop: "35%" }}
                  direction={"column"}
                  spacing={10}
                  justifyContent={"center"}
                  alignItems={"center"}
               >
                  <NavBar toggleDrawer={toggleDrawer} />
               </Stack>
            </Drawer>
            <Outlet />
         </main>
         <Footer />
      </>
   );
}

export default MainLayout;
