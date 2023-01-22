import { createSlice } from "@reduxjs/toolkit";
import { buySubscription } from "../async/buySubscription";
const buySubscriptionSlice = createSlice({
    name : 'buySubscriptionSlice',
    initialState : {
        data : [],
        status : '',
        error : ''
    },
    extraReducers : {
        [buySubscription.fulfilled] : (state , action) => {
            state.data = action.payload
            state.status = 'fulfilled'
            localStorage.setItem('subscription' , action.payload.subscription)
        },
        [buySubscription.rejected] : (state , action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    }
})
export default buySubscriptionSlice.reducer