import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS_API } from "../../API";

export const buySubscription = createAsyncThunk(
   "buySubscription/buySubscription",
   async ( {userId , sub , setSuccess} , {rejectWithValue}) => {
      try {
         const response = await axios.patch(`${USERS_API}/${userId}`, {
          subscription : sub,
          
         });
         setSuccess(true)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);