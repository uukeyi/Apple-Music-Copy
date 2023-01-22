import React from "react";
import { Alert as AlertMUI , AlertTitle } from "@mui/material";
function Alert({ type, text }) {
   return (
      <AlertMUI style={{ padding: "0px 10px" }} severity={type}>
         <AlertTitle>{text}</AlertTitle>
      </AlertMUI>
   );
}

export default Alert;
