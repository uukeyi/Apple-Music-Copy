import React from "react";
import {
   Card,
   CardContent,
   Typography,
   CardActions,
   Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
function InfoCard({ img, title, classCard, id, path }) {
   const navigate = useNavigate();
   const handleClick = (e) => {
      navigate(`${path}/${e.target.dataset.id}`);
   };
   return (
      <Card
         className={classCard}
         style={{ width: "30%", textAlign: "center", height: "450px" }}
      >
         <img
            style={{
               width: "100%",
               objectFit: "cover",
               backgroundPosition: "center",
               height: "65%",
            }}
            src={img}
            alt={title}
         />
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {title}
            </Typography>
            <CardActions></CardActions>
            <Button
               className="disable-span"
               variant="contained"
               data-id={id}
               style={{ margin: "0 auto", width: "80%" }}
               size="medium"
               onClick={handleClick}
            >
               More
            </Button>
         </CardContent>
      </Card>
   );
}

export default InfoCard;
