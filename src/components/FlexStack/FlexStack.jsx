import React from "react";
import { Stack } from "@mui/system";
import { Typography, Box } from "@material-ui/core";
import InfoCard from "../InfoCard/InfoCard";
import Alert from "../Alert/Alert";
function FlexStack({ array, status, error , path , deleteBtn  }) {
   if (status === "rejected") {
      return (
         <Box style={{ marginTop: "60px" }}>
            <Alert type="error" text={error} />
         </Box>
      );
   }
   return (
      <Stack
         justifyContent={"center"}
         alignItems={"center"}
         direction={{
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
         }}
         sx={{ flexWrap: "wrap", gap: 7.5, margin: "40px auto" }}
      >
         {!array.length ? (
            <Typography>Nothing here)</Typography>
         ) : (
            array.map((obj, index) => {
               return (
                  <InfoCard
                     classCard={"info-card-flex"}
                     key={index}
                     img={obj.img}
                     id = {obj.id}
                     path = {path}
                     title={obj.title}
                     deleteBtn = {deleteBtn}
                  />
               );
            })
         )}
      </Stack>
   );
}

export default FlexStack;
