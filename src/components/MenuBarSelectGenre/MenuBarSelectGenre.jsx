import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { Stack } from "@mui/system";
function MenuBarSelectGenre({setGenreValue}) {
   const handleClick = (e) => {
      if(e.target.className.includes('btn-select-genre')){
         setGenreValue(e.target.textContent)
      }
   }
   return (
      <Box onClick= {handleClick} className="container-select-genre">
         <Typography style={{ marginBottom: "20px" }}>Select Genre</Typography>
         <Stack
            className="btn-container-select-genre"
            direction={{
               xs: "column",
               sm: "row",
               md: "row",
               lg: "row",
               xl: "row",
            }}
            gap="15px"
         >
            <Button className="btn-select-genre disable-span" variant="outlined">
               All
            </Button>
            <Button className="btn-select-genre disable-span" variant="outlined">
               Pop
            </Button>
            <Button className="btn-select-genre disable-span" variant="outlined">
               Hip Hop
            </Button>
            <Button className="btn-select-genre disable-span" variant="outlined">
               Rock
            </Button>
            <Button className="btn-select-genre disable-span" variant="outlined">
               Indi
            </Button>
         </Stack>
      </Box>
   );
}

export default MenuBarSelectGenre;
