import { createSlice } from "@reduxjs/toolkit";
import {  paginateData } from "../async/data";
const paginateSlice = createSlice({
    name : 'dataSlice',
    initialState : {
        data : [],
        status : '',
        error : '',
        renderCount : 1
    },
    extraReducers : {
        [paginateData.fulfilled] : (state , action) => {
            state.status = 'fulfilled'
            state.data = action.payload
        },
        [paginateData.rejected] : (state , action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    }
})
export default paginateSlice.reducer