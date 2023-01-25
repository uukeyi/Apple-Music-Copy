import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getData = createAsyncThunk(
   "data/getData",
   async (requestLink, { rejectWithValue }) => {
      try {
         const response = await axios.get(requestLink, {
            headers: {
               "Content-type": "application/json",
            },
         });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);
export const paginateData = createAsyncThunk(
   "data/paginateData",
   async ({ requestLink, page, limit }, { rejectWithValue }) => {
      try {
         const response = await axios.get(
            `${requestLink}?_page=${page}&_limit=${limit}`,
            {
               headers: {
                  "Content-type": "application/json",
               },
            }
         );
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);


