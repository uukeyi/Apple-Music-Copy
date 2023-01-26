import React from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import { Button, Container, Typography, makeStyles } from "@material-ui/core";
import SubscriptionSection from "../components/SubscriptionSection/SubscriptionSection";
import Footer from "../components/Footer/Footer";
function PreviewPage() {
   const useStyles = makeStyles({
      gifContainer: {
         width: "100%",
         display: "flex",
         justifyContent: "center",
         marginTop: "3%",
         paddingTop: "10px",
      },
      gif: {
         width: "90%",
         height: "auto",
         objectFit: "cover",
         borderRadius: "20px",
      },
   });
   const classes = useStyles();
   return (
      <>
         <Header>
            <Button
               component={Link}
               to={"/signUp"}
               variant="contained"
               className="header-btn"
            >
               Get Started
            </Button>
         </Header>
         <main className="main">
            <div className={classes.gifContainer}>
               <img
                  className={classes.gif}
                  src="https://media2.giphy.com/media/WwzHkNu1gKQdfM9tWm/giphy.gif"
               />
            </div>
            <Container>
               <Typography
                  style={{ textAlign: "center", marginTop: "15%" }}
                  sx={{ typography: { sm: "body1", md: "40px" } }}
                  variant={"h4"}
               >
                  Subscriptions
               </Typography>
               <SubscriptionSection />
            </Container>
         </main>
         <Footer />
      </>
   );
}

export default PreviewPage;
