import React from "react";
import { Stack } from '@mui/material';
import { Container, Typography, Link } from "@material-ui/core";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from '@mui/icons-material/Telegram';
function Footer() {
   return (
      <footer style={{ marginTop: "2%", padding: "3% 0px" }}>
         <Container>
            <Typography>Created by @Nee Aleksandr</Typography>
            <Stack direction={'row'} spacing = {3} style={{marginTop : '5%'}}>
            <Link href="https://github.com/uukeyi">
               <GitHubIcon sx={{fontSize : '3rem'}} />
            </Link>
            <Link href="https://t.me/uukeyi">
               <TelegramIcon sx={{fontSize : '3rem'}} />
            </Link>
            </Stack>
         </Container>
      </footer>
   );
}

export default Footer;
