import React from "react";
import { Box, TextField, Button } from "@material-ui/core";
import Alert from "../Alert/Alert";
import { useForm } from "react-hook-form";
import { validateURL } from "../../utils/validateURL";
import { createPlaylist } from "../../utils/user";
import { USERS_API } from "../../API";
function FormCreatePlaylist({ arr, setArr, handleClose }) {
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      mode: "onSubmit",
   });
   const onSubmitPlaylist = (data) => {
      const { playlistName, playlistAvatar } = data;
      const isExist = arr.some(playlist => playlist.title === playlistName)
      if(isExist){
         alert('Playlist with this title already exist')
         handleClose()
         return
      }
      handleClose();
      createPlaylist(
         `${USERS_API}/${localStorage.getItem("userId")}`,
         { title: playlistName, img: playlistAvatar, id: Math.random() , songs : [] },
         arr,
         setArr
      );
   };
   return (
      <form onSubmit={handleSubmit(onSubmitPlaylist)}>
         <Box className="input-container-modal-adaptive">
            <TextField
               label="Playlist name"
               {...register("playlistName", {
                  required: "Required fill",
                  minLength: {
                     value: 3,
                     message: "Playlist name can not be less than 3 characters",
                  },
                  maxLength: {
                     value: 10,
                     message:
                        "Playlist name can not be more than 10 characters",
                  },
               })}
            />
            {errors?.playlistName && (
               <Alert type="error" text={errors?.playlistName?.message} />
            )}
            <TextField
               label="Playlist avatar link"
               {...register("playlistAvatar", {
                  required: "Required fill",
                  validate: (value) => validateURL(value),
               })}
            />
            {errors?.playlistAvatar && (
               <Alert type="error" text={errors?.playlistAvatar?.message} />
            )}
            <Button
               variant="contained"
               style={{
                  width: "150px",
                  display: "block",
                  margin: "0 auto",
               }}
               type="submit"
            >
               Submit
            </Button>
         </Box>
      </form>
   );
}

export default FormCreatePlaylist;
