"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedbackType {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
}


const initialState : { storedFeedbacks: FeedbackType[]} = {
    storedFeedbacks: []
}
const feedbackSlice = createSlice({
    initialState,
    name: "Feedback",
    reducers:{
        addFeedback: (state, action: PayloadAction<FeedbackType>) => {
            state.storedFeedbacks = [action.payload, ...state.storedFeedbacks]
        }
    }
})


export const { addFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;