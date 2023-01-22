import {
   AppBar,
   Container,
   Toolbar,
   Typography,
   Box,
   Link
} from "@material-ui/core";
function Header({burger , children }) {
   return (
      <AppBar position="static" className="header" style={{ backgroundColor: "#fff" }}>

         <Toolbar>
            {burger}
            <Container>
               <Box
                  style={{
                     width: "100%",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                  }}
               >
                  <Typography
                     component={"h1"}
                    variant = {'h5'}
                 
                  >
                     Apple Music
                  </Typography>
                {children}
               </Box>
            </Container>
         </Toolbar>
      </AppBar>
   );
}

export default Header;
