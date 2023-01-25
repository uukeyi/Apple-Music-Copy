import React from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { Stack } from "@mui/system";
import { useForm } from "react-hook-form";
import {
   deleteComment,
   editComment,
   postEditComment,
} from "../../utils/comment";
import { MUSIC_API } from "../../API";
import { useParams } from "react-router-dom";
import { useAvatar } from "../../contexts/avatarContext";
function Comment({
   img,
   text,
   username,
   isEdit,
   isEdited,
   commentId,
   comments,
   id,
   setComments,
}) {
   const { song } = useParams();
   const {avatar} = useAvatar()
   const {
      register,
      formState: { errors },
      handleSubmit,
    reset
   } = useForm({
      mode: "onSubmit",
   });
   if (errors?.editComment) {
      alert(errors?.editComment?.message);
   }
   const onSubmit = (data) => {
      reset()
      const editedComments = comments.map((comment) => {
         if (comment.commentId === commentId) {
            comment = {
               ...comment,
               message: data.editComment,
               isEdit: false,
               isEdited: true,
            };
            return comment;
         }
         return comment;
      });
      postEditComment(`${MUSIC_API}/${song}`, editedComments, setComments);
   };
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
               className="comment-text-container"
               style={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
               }}
            >
               <Typography style={{ fontSize: "1rem" , textTransform : 'uppercase' }}>{username}</Typography>

               <img
                  style={{
                     width: "40px",
                     height: "40px",
                     borderRadius: "100%",
                  }}
                  src={
                     avatar === ""
                        ? "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                        : avatar
                  }
                  alt={username}
               />
            </Box>
            <Box
               style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  width: "100%",
                  borderTop: "1px solid black",
                  padding: "5px",
                  marginTop: "7px",
                  justifyContent: "space-between",
               }}
            >
               {isEdit ? (
                  <form
                     style={{ width: "100%", display: "flex" }}
                     onSubmit={handleSubmit(onSubmit)}
                  >
                     <TextField
                        {...register("editComment", {
                           required: "This field is necessarily for filling",
                           maxLength: {
                              value: 40,
                              message: "Can not be more than 40 characters",
                           },
                           minLength: {
                              value: 5,
                              message: "Can not be less than 5 characters",
                           },
                           validate: {
                              longWord: (value) => {
                                 value = value.split(" ");
                                 for (let i = 0; i < value.length; i++) {
                                    return (
                                       value[i].length < 15 ||
                                       "Seems you have one long word without spaces"
                                    );
                                 }
                              },
                           },
                        })}
                        style={{ width: "100%" }}
                     />
                     <Button
                        className="disable-span"
                        data-id={commentId}
                        type="submit"
                     >
                        Submit
                     </Button>
                  </form>
               ) : (
                  <Box>
                     {isEdited ? (
                        <>
                           <Typography
                              style={{
                                 alignSelf: "flex-start",
                                 fontSize: "11px",
                                 marginTop : '10px',
                                 color : "grey"
                              }}
                           >
                              Edited
                           </Typography>{" "}
                           <Typography
                              style={{
                                 alignSelf: "flex-start",
                                 marginTop: "0px",
                              }}
                           >
                              {text}
                           </Typography>
                        </>
                     ) : (
                        <Typography
                           style={{
                              alignSelf: "flex-start",
                              marginTop: "10px",
                           }}
                        >
                           {text}
                        </Typography>
                     )}
                  </Box>
               )}
               {+localStorage.getItem("userId") === id ? (
                  <Stack
                     direction={{ xs: "column" }}
                     gap="5px"
                     style={{ cursor: "pointer" }}
                  >
                     <Button
                        className="disable-span"
                        data-id={commentId}
                        style={{ display: isEdit ? "none" : "block" }}
                        onClick={(e) => {
                           editComment(
                              comments,
                              setComments,
                              +e.target.dataset.id
                           );
                        }}
                     >
                        Edit
                     </Button>
                     <Button
                        className="disable-span"
                        data-id={commentId}
                        style={{ display: isEdit ? "none" : "block" }}
                        onClick={(e) => {
                           deleteComment(
                              comments,
                              setComments,
                              +e.target.dataset.id,
                              song
                           );
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
