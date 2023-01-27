import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk(
   "authSliceSignup/signUp",
   async ({ data } , {rejectWithValue}) => {
      try {
         await axios.post("http://localhost:8000/register", {
            ...data,
            aboutMe: "",
            playlists: [],
            avatar: "",
            subscription : 'Free',
         });
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);
export const signIn = createAsyncThunk(
   "authSliceSignIn/signIn",
   async ({ data,  setAuth, isAuthObj } , {rejectWithValue}) => {
      try {
         const response = await axios.post("http://localhost:8000/login", data);
         setAuth({ ...isAuthObj, isAuth: true , renderCount : 0 });
         return {
            userId: response.data.user.id,
            accessToken: response.data.accessToken,
            avatar : response.data.user.avatar,
            subscription : response.data.user.subscription,
         };
      } catch (error) {
        return rejectWithValue(error.message)
      }
   }
);
