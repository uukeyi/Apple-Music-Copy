import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useAvatar } from "../contexts/avatarContext";
import FlexStack from "../components/FlexStack/FlexStack";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import FormCreatePlaylist from "../components/FormCreatePlaylist/FormCreatePlaylist";
import FormEditAcc from "../components/FormEditAcc/FormEditAcc";
import { useUser } from "../contexts/userContext";
import { useDispatch, useSelector } from "react-redux";
import { USERS_API } from "../API";
import { getData } from "../reduxToolkit/async/data";
function ProfilePage() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [isOwnAcc, setIsOwnAcc] = useState(false);
   const [isCreatePlaylist, setIsCreatePlaylist] = useState(false);
   const { setAvatar } = useAvatar();
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [open, setOpen] = useState(false);
   const [deleteBtn, setDeleteBtn] = useState(true);
   useEffect(() => {
      dispatch(getData(`${USERS_API}/${id}`));
      if (+localStorage.getItem("userId") === +id) {
         setIsOwnAcc(true);
      }
   }, [id]);
   const { userContext, setUserContext, playlists, setPlaylists } = useUser();
   const dispatch = useDispatch();
   const { data, status, error } = useSelector((state) => state.getData);
   useEffect(() => {
      if (!isOwnAcc) {
         setDeleteBtn(false);
      } else {
         setDeleteBtn(true);
      }
   }, [isOwnAcc]);
   useEffect(() => {
      setUserContext(data);
      setPlaylists(data.playlists);
   }, [data]);
   useEffect(() => {
      if (status === "rejected" && error !== "") {
         alert("Server error");
         navigate("/signIn");
      }
   }, [status]);
   const { avatar, username, aboutMe, subscription } = userContext;
   return (
      <div>
         <ModalWindow
            text={isCreatePlaylist ? "Create Playlist" : "Edit your account"}
            handleClose={handleClose}
            open={open}
         >
            {!isCreatePlaylist ? (
               <FormEditAcc
                  setData={setUserContext}
                  setAvatar={setAvatar}
                  avatar={avatar}
                  username={username}
                  aboutMe={aboutMe}
                  handleClose={handleClose}
               />
            ) : (
               <FormCreatePlaylist
                  arr={playlists}
                  setArr={setPlaylists}
                  handleClose={handleClose}
               />
            )}
         </ModalWindow>

         <Container>
            <Stack
               direction={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
               }}
               style={{ marginTop: "5%" }}
            >
               <Box
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     maxWidth: "300px",
                  }}
                  className="img-contianer-adaptive-profile"
               >
                  <img
                     className="img-adaptive-profile"
                     style={{
                        borderRadius: "30%",
                        maxWidth: "90%",
                        objectFit: "cover",
                        height: "280px",
                        textAlign: "center",
                     }}
                     src={
                        avatar !== ""
                           ? avatar
                           : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                     }
                     alt="Avatar"
                  />
                  <Typography
                     style={{
                        display: avatar !== "" ? "none" : "block",
                        marginTop: "10px",
                        color: "grey",
                        textAlign: "center",
                     }}
                  >
                     {isOwnAcc
                        ? "Currently you don't have avatar you can set it!"
                        : "This user currently doesn't have avatar"}
                  </Typography>
                  {isOwnAcc ? (
                     <>
                        <Button
                           onClick={() => {
                              setIsCreatePlaylist(false);
                              handleOpen();
                           }}
                           style={{ marginTop: "30px" }}
                           variant="contained"
                        >
                           Edit account
                        </Button>
                        <Button
                           onClick={() => {
                              localStorage.clear();
                              navigate("/signUp");
                           }}
                           style={{ marginTop: "20px" }}
                           variant="contained"
                        >
                           logout account
                        </Button>
                     </>
                  ) : null}
               </Box>
               <Stack
                  direction={{ xs: "column", sm: "column" }}
                  style={{ marginLeft: "50px" }}
                  gap="15px"
                  className="desc-contianer-adaptive-profile"
               >
                  <Typography style={{ fontSize: "1.3rem" }}>
                     {isOwnAcc ? "Your nickname :" : "User nickname :"}
                     <Typography
                        style={{
                           marginLeft: "10px",
                           textTransform: "uppercase",
                           fontSize: "1.3rem",
                        }}
                        component={"span"}
                     >
                        {username}
                     </Typography>
                  </Typography>
                  <Typography style={{ fontSize: "1.3rem" }}>
                     {isOwnAcc ? "Your subscription :" : "User subscription :"}
                     <Typography
                        style={{
                           marginLeft: "10px",
                           textTransform: "uppercase",
                           fontSize: "1.3rem",
                        }}
                        component={"span"}
                     >
                        {subscription}
                     </Typography>
                  </Typography>
                  <Typography style={{ fontSize: "1.3rem" }}>
                     {isOwnAcc ? "About you :" : "About user :"}
                     <Typography
                        style={{
                           marginLeft: "10px",
                           fontSize: "1.3rem",
                           display: "inline",
                        }}
                        component={"span"}
                     >
                        {aboutMe === ""
                           ? "Currently there is nothing here"
                           : aboutMe}
                     </Typography>
                  </Typography>
               </Stack>
            </Stack>
            <Typography
               style={{ textAlign: "center", marginTop: "150px" }}
               variant="h4"
            >
               {isOwnAcc ? "Your playlists" : "User playlist"}
            </Typography>
            {subscription !== "Premium" ? null : (
               <>
                  <Button
                     style={{ display: "block", margin: "30px auto" }}
                     variant="outlined"
                     onClick={() => {
                        setIsCreatePlaylist(true);
                        handleOpen();
                     }}
                  >
                     Create playlist
                  </Button>
                  <FlexStack
                     array={playlists}
                     status={status}
                     error={error}
                     deleteBtn={deleteBtn}
                     path={"/playlist"}
                  />
               </>
            )}
         </Container>
      </div>
   );
}

export default ProfilePage;
