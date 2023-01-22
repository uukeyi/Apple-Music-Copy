import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "../async/auth";
const authSliceSignUp = createSlice({
   name: "authSliceSignUp",
   initialState: {
      status: "",
      error: "",
   },
   extraReducers: {
      [signUp.fulfilled]: (state, action) => {
         state.status = "fulfilled";
      },
      [signUp.rejected]: (state, action) => {
         state.status = "rejected";
         state.error = action.payload;
      },
   },
});
export default authSliceSignUp.reducer;
