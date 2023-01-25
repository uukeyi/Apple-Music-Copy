import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FlexStack from "../components/FlexStack/FlexStack";
import { getData } from "../reduxToolkit/async/data";
import { USERS_API } from "../API";
import { useState } from "react";
function PlaylistPage() {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [currentPlaylist, setCurrentPlaylist] = useState([]);
   const { data, status } = useSelector((state) => state.getData);
   useEffect(() => {
      dispatch(getData(`${USERS_API}/${localStorage.getItem("userId")}`));
   }, []);
   if (status === "rejected") {
      alert("Server error");
      navigate("/");
   }
   const { playlists } = data;
   useEffect(() => {
      if (playlists !== undefined) {
         playlists.forEach((playlist) => {
            if (playlist.id === +id) {
               setCurrentPlaylist(playlist);
            }
         });
      }
   }, [playlists]);
   return (
      <Container>
         <Typography
            style={{ textAlign: "center", marginTop: "60px", fontSize: "25px" }}
         >
            Songs in {currentPlaylist.title}
         </Typography>
         {currentPlaylist.songs === undefined ? null : (
            <FlexStack array={currentPlaylist.songs} path={"/songs"} />
         )}
      </Container>
   );
}

export default PlaylistPage;
