import React from "react";
import {
   Card,
   CardContent,
   Typography,
   makeStyles,
   List,
   ListItemText,
   ListItemIcon,
   ListItem,
   Button,
} from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { CardActions } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../../utils/checkToken";
function SubscriptionCard({ title, opportunities, price }) {
   const { isAuthObj, setIsAuth } = useAuth();
   const navigate = useNavigate();
   useEffect(() => {
      checkToken(setIsAuth);
   }, []);
   const useStyles = makeStyles({
      card: {
         textAlign: "center",
         display: "flex",
         flexDirection: "column",
         gap: "15px",
         padding: "40px 10px",
      },
      cardTitle: {
         fontSize: "1.7rem",
      },
      cardText: {
         fontSize: "1.1rem",
      },
   });
   const classes = useStyles();
   const handleClick = (e) => {
      if (isAuthObj.renderCount > 0) {
         if (isAuthObj.isAuth) {
            navigate(`/payment/${e.target.dataset.id}/${e.target.dataset.price}`);
         } else {
            alert("Please sign in to buy");
            return;
         }
      }
   };
   return (
      <Card variant="outlined" style={{ minWidth: "30%" }}>
         <CardContent className={classes.card}>
            <Typography className={classes.cardTitle}>{title}</Typography>
            <List>
               {opportunities.map((opportunity, index) => {
                  return (
                     <ListItem key={index}>
                        <ListItemIcon>
                           {opportunity.value ? <CheckIcon /> : <ClearIcon />}
                        </ListItemIcon>
                        <ListItemText
                           primary={opportunity.desc}
                             
                        />
                     </ListItem>
                  );
               })}
            </List>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
               
               {title === "Free" ? (
                  <Typography variant="h5">By default</Typography>
               ) : (
                  <div style={{display : "flex" , flexDirection :'column' , alignItems : "center" , gap : '15px' , width : '100%'}}>
                                       <Typography>Price {price}</Typography>
                     <Button
                        className="disable-span"
                        data-id={title}
                        data-price = {price}
                        style={{ width: "50%" }}
                        variant="contained"
                        onClick={handleClick}
                     >
                        Buy now
                     </Button>
                  </div>
               )}
            </CardActions>
         </CardContent>
      </Card>
      // </Box>
   );
}

export default SubscriptionCard;
