import { createSlice } from "@reduxjs/toolkit";
import { signIn  } from "../async/auth";
const authSliceSignIn = createSlice({
   name: "authSliceSignIn",
   initialState: {
      status: "",
      error: "",
      accessToken: "",
      userId: "",
      avatar : '',
      subscription : ''
   },
   extraReducers: {
      [signIn.fulfilled]: (state, action) => {
         state.userId = action.payload.userId;
         state.accessToken = action.payload.accessToken;
         state.avatar = action.payload.avatar
         state.subscription = action.payload.subscription
         state.status = "fulfilled";
         localStorage.setItem("token", state.accessToken);
         localStorage.setItem("userId", state.userId);
         localStorage.setItem('avatar' , state.avatar)
         localStorage.setItem('subscription' , state.subscription)
      },
      [signIn.rejected]: (state, action) => {
         state.status = "rejected";
         state.error = action.payload;
      },
   },
});
export default authSliceSignIn.reducer
