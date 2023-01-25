import React from "react";
import { Stack } from "@mui/material";
import {  Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../reduxToolkit/async/data";
import { SUBSCRIPTIONS_API } from "../../API";
import SubscriptionCard from "../SubscriptionCard/SubscriptionCard";
import { StarOutlineSharp } from "@mui/icons-material";
function SubscriptionSection() {
   const dispatch = useDispatch();
   const {status , error , data} = useSelector(state => state.getData)
   useEffect(() => {
      dispatch(getData( SUBSCRIPTIONS_API ));
   }, []);
   useEffect(() => {
      if(status === 'rejected'){
         alert('Server Error')
        }
   } , [status])

   return (
      <Stack
         direction={{ xs: "column", sm: "column", lg: "row" }}
         spacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
         style={{ marginTop: "10%" }}
         justifyContent = 'center'
      >
         {data.length ? (
            data.map((sub, index) => {
               return (
                  <SubscriptionCard
                     title={sub.title}
                     price = {sub.price}
                     opportunities={sub.opportunities}
                     key={index}
                  />
               );
            })
         ) : (
            <Typography variant="h5">Loading...</Typography>
         )}
      </Stack>
   );
}

export default SubscriptionSection;
