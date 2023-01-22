import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../async/data";
const dataSlice = createSlice({
    name : 'dataSlice',
    initialState : {
        data : [],
        status : '',
        error : ''
    },
    extraReducers : {
        [getData.fulfilled] : (state , action) => {
            state.data = action.payload
            state.status = 'fulfilled'
        },
        [getData.rejected] : (state , action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    }
})
export default dataSlice.reducer