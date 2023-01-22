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
} from "@material-ui/core";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../reduxToolkit/async/data";
import { commentSong } from "../utils/setComment";
import { MUSIC_API, USERS_API } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Alert from "../components/Alert/Alert";
import Comment from "../components/Comment/Comment";
import { useForm } from "react-hook-form";
import axios from "axios";
function SongPage() {
   const navigate = useNavigate();
   useEffect(() => {
      if (
         localStorage.getItem("userId") === null ||
         !localStorage.getItem("userId").length
      ) {
         alert("Did not work out  your user id try to sign in again");
         navigate("/signIn");
      }
   }, []);
   const { data, status } = useSelector((state) => state.getData);
   const [isEdit, setIsEditing] = useState(false);
   const [commentId, setCommentId] = useState(0);
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
   const [commentsArr, setCommentsArr] = useState([]);
   useEffect(() => {
      dispatch(getData(`${MUSIC_API}/${song}`));
   }, []);
   useEffect(() => {
      if (comments !== undefined) {
         setCommentsArr(comments);
      }
   }, [comments]);
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
   const classes = useStyles();
   const { song } = useParams();
   const dispatch = useDispatch();

   const {
      register,
      formState: { errors },
      handleSubmit,
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
      try {
         const response = await axios.get(
            `${USERS_API}/${localStorage.getItem("userId")}`
         );
         const { avatar, id, username, message } = response.data;
         setCommentId(commentId + 1);

         commentSong({
            requestLink: `${MUSIC_API}/${song}`,
            post: {
               avatar: avatar,
               id: id,
               username: username,
               message: message,
               message: data.comment,
               commentId: commentId,
            },
            commentsPrev: commentsArr,
            setComments: setCommentsArr,
         });
      } catch (error) {
         alert("Something went wrong with getting user data");
      }
   };
   return (
      <Container>
         <Button
            style={{ marginTop: "30px" }}
            variant="outlined"
            onClick={() => navigate(-1)}
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
               style={{ objectFit: "cover", width: "400px", height: "400px" }}
               className="song-img-adaptive"
               src={img}
            />
            <Box
               className="song-text-container"
               style={{ paddingLeft: "30px", width: "100%" }}
            >
               <Typography className={`${classes.title} song-title-adaptive`}>
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
               <Button
                  style={{ marginTop: "20px" }}
                  href={video}
                  variant="outlined"
               >
                  Watch video
               </Button>
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        value: 10,
                        message: "Can not be less than 10 characters",
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
                          img={com.avatar}
                          username={com.username}
                          text={com.message}
                          key={index}
                          id={com.id}
                          commentId={com.commentId}
                          isEdit={isEdit}
                          setIsEditing={setIsEditing}
                       />
                    );
                 })}
         </Box>
      </Container>
   );
}

export default SongPage;
