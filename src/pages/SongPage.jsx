import React, { useState } from "react";
import {
   Button,
   Container,
   makeStyles,
   Typography,
   Box,
   InputAdornment,
   Link,
   TextField,
   Select,
   MenuItem,
} from "@material-ui/core";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../reduxToolkit/async/data";
import { commentSong } from "../utils/comment";
import { MUSIC_API, USERS_API } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Alert from "../components/Alert/Alert";
import Comment from "../components/Comment/Comment";
import { useForm } from "react-hook-form";
import axios from "axios";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import { useUser } from "../contexts/userContext";
import { addToPlaylist } from "../utils/user";

function SongPage() {
   const navigate = useNavigate();
   useEffect(() => {
      if (
         localStorage.getItem("userId") === null ||
         !localStorage.getItem("userId").length ||
         localStorage.getItem("subscription") === null ||
         !localStorage.getItem("subscription").length
      ) {
         alert("Did not work out  your user data try to sign in again");
         navigate("/signIn");
      }
   }, []);
   const { data, status } = useSelector((state) => state.getData);
   const [open, setOpen] = useState(false);
   const [selectedPlaylist, setSelectedPlaylist] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const {
      video,
      img,
      title,
      dataRelease,
      author,
      album,
      genre,
      totalViews,
      comments,
   } = data;
   const useStyles = makeStyles({
      title: {
         fontSize: "2rem",
         textTransform: "uppercase",
         textAlign: "center",
         whiteSpace: "nowrap",
      },
      desc: {
         fontSize: "1.5rem",
         whiteSpace: "nowrap",
      },
   });
   const [commentsArr, setCommentsArr] = useState([]);
   const classes = useStyles();
   const { song } = useParams();
   const { userContext, setUserContext, playlists, setPlaylists } = useUser();
   useEffect(() => {
      dispatch(getData(`${MUSIC_API}/${song}`));
   }, []);
   useEffect(() => {
      if (comments !== undefined) {
         setCommentsArr(comments);
      }
   }, [comments]);
   // useEffect(() => {
   //    const getUser = async () => {
   //       try {
   //          const response = await axios.get(
   //             `${USERS_API}/${localStorage.getItem("userId")}`
   //          );
   //          setUserContext(response.data);
   //       } catch (error) {
   //          alert("Something went wrong with getting user data");
   //       }
   //    };
   //    getUser();
   // }, []);
   const dispatch = useDispatch();
   // const {avatar , id , username} = userContext
   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({
      mode: "onSubmit",
   });
   if (status === "rejected") {
      return (
         <Alert
            type={"error"}
            text={"Couldn't load data try to reload page or sign in again"}
         />
      );
   }

   const onSubmit = async (data) => {
      reset();
         commentSong({
            requestLink: `${MUSIC_API}/${song}`,
            post: {
               id: localStorage.getItem('userId'),
               message: data.comment,
               commentId: Math.random(),
               isEdit: false,
               isEdited: false,
            },
            commentsPrev: commentsArr,
            setComments: setCommentsArr,
         })
   };
   return (
      <>
         <ModalWindow
            text={"Select playlist to push song"}
            handleClose={handleClose}
            open={open}
         >
            {!playlists.length ? (
               <Typography style={{ marginTop: "40px" }}>
                  Currently you don't have playlists please add
               </Typography>
            ) : (
               <div style={{ marginTop: "50px" }}>
                  <form
                     onSubmit={(e) => {
                        e.preventDefault();
                        if (
                           selectedPlaylist === undefined ||
                           selectedPlaylist === ""
                        ) {
                           alert("Select playlist");
                           return;
                        }
                        const { img, title, id } = data;
                        addToPlaylist(
                           `${USERS_API}/${localStorage.getItem("userId")}`,
                           { img: img, title: title, id: id },
                           selectedPlaylist,
                           playlists,
                           handleClose
                        );
                     }}
                     style={{ width: "80%", margin: "0 auto" }}
                  >
                     <Select
                        value={selectedPlaylist}
                        onChange={(e) => {
                           setSelectedPlaylist(e.target.value);
                        }}
                        style={{ width: "100%" }}
                     >
                        {playlists.map((playlist, index) => {
                           return (
                              <MenuItem
                                 data-id={playlist.id}
                                 key={index}
                                 value={playlist.id}
                              >
                                 {playlist.title}
                              </MenuItem>
                           );
                        })}
                     </Select>
                     <Button
                        style={{
                           width: "200px",
                           display: "block",
                           margin: "50px auto",
                        }}
                        variant="contained"
                        type="submit"
                     >
                        Submit
                     </Button>
                  </form>
               </div>
            )}
         </ModalWindow>
         <Container>
            <Button
               style={{ marginTop: "30px" }}
               variant="outlined"
               onClick={() => navigate("/")}
            >
               Go back
            </Button>
            <Stack
               className="song-container-adaptive"
               direction={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
               }}
               style={{ marginTop: "30px" }}
            >
               <img
                  style={{
                     objectFit: "cover",
                     width: "400px",
                     height: "400px",
                  }}
                  className="song-img-adaptive"
                  src={img}
               />
               <Box
                  className="song-text-container"
                  style={{ paddingLeft: "30px", width: "100%" }}
               >
                  <Typography
                     className={`${classes.title} song-title-adaptive`}
                  >
                     {title}
                  </Typography>
                  <Box
                     className="song-desc-container"
                     style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        marginTop: "30px",
                     }}
                  >
                     <Typography className={`${classes.desc}`}>
                        Total views : {totalViews}
                     </Typography>

                     <Typography className={`${classes.desc}`}>
                        Author : {author}
                     </Typography>
                     <Typography className={`${classes.desc}`}>
                        Data release : {dataRelease}
                     </Typography>
                     <Typography className={`${classes.desc}`}>
                        Genre : {genre}
                     </Typography>
                     <Typography className={`${classes.desc}`}>
                        Album : {album}
                     </Typography>
                  </Box>
                  <Stack
                     direction={{
                        xs: "column",
                        md: "column",
                        sm: "column",
                        lg: "row",
                        xl: "row",
                     }}
                     gap={"15px"}
                     style={{ marginTop: "20px" }}
                  >
                     <Button
                        style={{ width: "200px" }}
                        href={video}
                        variant="outlined"
                     >
                        Watch video
                     </Button>
                     <Button
                        variant="outlined"
                        style={{ width: "200px" }}
                        onClick={async () => {
                           handleOpen();
                           try {
                              const response = await axios.get(
                                 `${USERS_API}/${localStorage.getItem(
                                    "userId"
                                 )}`
                              );
                              const { playlists } = response.data;
                              setPlaylists(playlists);
                           } catch (error) {
                              alert(
                                 "Something went wrong with getting user data"
                              );
                           }
                        }}
                     >
                        Add to playlist
                     </Button>
                  </Stack>
               </Box>
            </Stack>
            <Box
               className="comment-form-container-adaptive"
               style={{
                  marginTop: "10%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
               }}
            >
               <Typography>Write comment</Typography>
               <form
                  onClick={() => {
                     if (localStorage.getItem("subscription") === "Free") {
                        alert(
                           "You can not comment songs with your subscription please buy the new one"
                        );
                        navigate("/");
                     }
                  }}
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <TextField
                     className="input-comment-adaptive"
                     style={{ width: "40%" }}
                     {...register("comment", {
                        required: '"This field is necessarily for filling"',
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
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <Link
                                 component={"button"}
                                 type="submit"
                                 style={{ cursor: "pointer" }}
                              >
                                 <KeyboardArrowRightIcon
                                    style={{ fontSize: "2rem" }}
                                 />
                              </Link>
                           </InputAdornment>
                        ),
                     }}
                  />
                  <Box style={{ marginTop: "20px" }}>
                     {errors?.comment && (
                        <Alert type="error" text={errors?.comment?.message} />
                     )}
                  </Box>
               </form>
               {comments === undefined || !commentsArr.length
                  ? null
                  : commentsArr.map((com, index) => {
                       return (
                          <Comment
                           
                             
                             text={com.message}
                             key={index}
                             id={com.id}
                             comments={commentsArr}
                             commentId={com.commentId}
                             setComments={setCommentsArr}
                             isEdit={com.isEdit}
                             isEdited={com.isEdited}
                          />
                       );
                    })}
            </Box>
         </Container>
      </>
   );
}

export default SongPage;
