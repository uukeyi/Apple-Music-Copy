import { Paper, Typography } from "@material-ui/core";
import React from "react";

function CarouselItem({ img, title }) {
   return (
      <div>
         <img
            style={{
               display: "block",
               margin: "60px auto",
               width: "80%",
               maxHeight : "600px",
               objectFit: "cover",
               borderRadius : '10px'
            }}
            src={img}
            alt={title}
         />
         <Typography style={{top : '-40px' , fontSize : '28px' , position : 'relative' , textTransform : 'uppercase'}}>{title}</Typography>
         
      </div>
   );
}

export default CarouselItem;
