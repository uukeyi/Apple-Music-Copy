import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ARTISTS_API } from "../API";
import { getData } from "../reduxToolkit/async/data";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import {
   Typography,
   Box,
   Container,
   Card,
   CardContent,
   CardMedia,
   makeStyles,
} from "@material-ui/core";
function ArtistPage() {
   const { artist } = useParams();
   const dispatch = useDispatch();
   const useStyles = makeStyles({
    text : {
        textTransform: "uppercase",
        fontSize: "1.5rem",
        marginTop: "30px",
        whiteSpace : 'nowrap'
    }
   })
   const classes = useStyles()
   const { data, status, error } = useSelector((state) => state.getData);
   useEffect(() => {
      dispatch(getData(`${ARTISTS_API}/${artist}`));
   }, []);
   return (
      <Container>
         <Stack
            direction={{
               xs: "column",
               sm: "column",
               md: "column",
               lg: "row",
               xl: "row",
            }}
            style={{ marginTop: "60px" }}
            className="artist-container-adaptive"
            justifyContent={"space-between"}
         >
            <img
               style={{ width: "500px", height: "500px", objectFit: "cover" }}
               src={data.img}
               alt=""
            />
            <Box
               style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "calc(100% - 500px)",
               }}
            >
               <Typography
                  className={classes.text}
               >
                  {data.title}
               </Typography>
               <Typography
               className={classes.text}
           
               >
                  Current playlists on app
               </Typography>
               <Stack
                  direction={{
                     xs: "column",
                     sm: "row",
                     md: "row",
                     lg: "row",
                     xl: "row",
                  }}
                  gap="20px"
                  style={{ marginTop: "30px" }}
               >
                  {data.albums === undefined ? (
                     <Typography>Nothing here</Typography>
                  ) : (
                     data.albums.map((album, index) => {
                        return (
                           <Card style={{ width: "250px", height: "250px" }} key = {index}>
                              <CardMedia
                                 component="img"
                                 alt="green iguana"
                                 height="70%"
                                 image={album.albumImg}
                              />
                              <CardContent>
                                 <Typography
                                    gutterBottom
                                    variant="h5"
                                    style={{ textAlign: "center" }}
                                 >
                                    {album.album}
                                 </Typography>
                              </CardContent>
                           </Card>
                        );
                     })
                  )}
               </Stack>
            </Box>
         </Stack>
      </Container>
   );
}

export default ArtistPage;
