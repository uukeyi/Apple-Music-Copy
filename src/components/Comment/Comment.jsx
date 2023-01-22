import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { Stack } from "@mui/system";
function Comment({ img, text, username, isEdit, setIdEditing, commentId, id }) {
   return (
      <Box
         className="comment-desc-container-adaptive"
         style={{
            display: "flex",
            gap: "20px",
            width: "90%",
            alignItems: "center",
            marginTop: "20px",
            maxHeight: "150px",
         }}
      >
         <Box width={"100%"}>
            <Box
               style={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                  width: "50%",
                  justifyContent: "space-between",
               }}
            >
               <Typography style={{ fontSize: "1rem" }}>{username}</Typography>
               <img
                  style={{
                     width: "40px",
                     height: "40px",
                     borderRadius: "100%",
                  }}
                  src={
                     img === ""
                        ? "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                        : img
                  }
                  alt={username}
               />
            </Box>
            <Box
               style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  width: "50%",
                  borderTop: "1px solid black",
                  padding: "5px",
                  marginTop: "7px",
                  justifyContent: "space-between",
               }}
            >
               <Typography
                  style={{ alignSelf: "flex-start", marginTop: "10px" }}
               >
                  {text}
               </Typography>
               {+localStorage.getItem("userId") === id ? (
                  <Stack
                     direction={{ xs: "column" }}
                     gap="5px"
                     style={{ cursor: "pointer" }}
                  >
                     <Button className="disable-span">Edit</Button>
                     <Button
                        className="disable-span"
                        data-id={commentId}
                        onClick={(e) => {
                           console.log(e.target.dataset.id);
                        }}
                     >
                        Delete
                     </Button>
                  </Stack>
               ) : null}
            </Box>
         </Box>
      </Box>
   );
}

export default Comment;
