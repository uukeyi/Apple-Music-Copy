import React, { useEffect } from "react";
import {
   Card,
   CardContent,
   Typography,
   CardActions,
   Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { deletePLaylist } from "../../utils/user";
import { USERS_API } from "../../API";
import { useUser } from "../../contexts/userContext";
function InfoCard({ img, title, classCard, id, path, deleteBtn }) {
   const navigate = useNavigate();
   const handleClick = (e) => {
      navigate(`${path}/${e.target.dataset.id}`);
   };

   const {playlists , setPlaylists} = useUser()
   return (
      <Card
         className={classCard}
         style={{
            width: "30%",
            textAlign: "center",
            height: !deleteBtn ? "450px" : "570px",
         }}
      >
         <img
            style={{
               width: "100%",
               objectFit: "cover",
               backgroundPosition: "center",
               height: "69%",
            }}
            src={img}
            alt={title}
         />
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {title}
            </Typography>
            <CardActions></CardActions>
            {!deleteBtn ? (
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
            ) : (
               <>
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
                  <Button
                     className="disable-span"
                     variant="contained"
                     data-id={id}
                     style={{ margin: "15px auto", width: "80%" }}
                     size="medium"
                     onClick={(e) => {
                        const id = e.target.dataset.id;
                        deletePLaylist(
                           `${USERS_API}/${localStorage.getItem("userId")}`,
                           id,
                           playlists , 
                           setPlaylists
                        );
                     }}
                  >
                     Delete
                  </Button>
               </>
            )}
         </CardContent>
      </Card>
   );
}

export default InfoCard;
