import { Container, Typography, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MUSIC_API } from "../API";
import Carousel from "../components/Carousel/Carousel";
import SongCard from "../components/InfoCard/InfoCard";
import SubscriptionSection from "../components/SubscriptionSection/SubscriptionSection";
import { paginateData } from "../reduxToolkit/async/data";
import Alert from "../components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import FlexStack from "../components/FlexStack/FlexStack";
function HomePage() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { status, error, data } = useSelector(
      (state) => state.getPaginatedData
   );
   useEffect(() => {
      dispatch(paginateData({ requestLink: MUSIC_API, page: 1, limit: 4 }));
   }, []);

   return (
      <>
         <Typography
            variant="h4"
            style={{ textAlign: "center", marginTop: "100px" }}
            component={"p"}
         >
            Explore Music
         </Typography>
         <Carousel />
         <Container>
            <Stack
               direction={{ xs: "column", sm: "column", lg: "row" }}
               spacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
               style={{ margin: "10% 0" }}
               alignItems={"center"}
            >
               {data.length && status !== "rejected" ? (
                  data.map((song, index) => (
                     <SongCard
                        key={index}
                        img={song.img}
                        title={song.title}
                        id = {song.id}
                        path = {'/songs'}
                        classCard={"info-card-flex-home"}
                     />
                  ))
               ) : (
                  <Alert type="error" text={error} />
               )}
            </Stack>
            <Button
               style={{
                  display: "block",
                  margin: "0",
                  width: "50%",
                  margin: "-1% auto",
               }}
               size="medium"
               variant="outlined"
               onClick={() => {
                  navigate("/songs");
               }}
            >
               See more
            </Button>
            <SubscriptionSection />
         </Container>
      </>
   );
}

export default HomePage;
