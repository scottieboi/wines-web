/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllWinesResponse } from "../../api/apiResponses";

interface FindAllWinesState {
  loading: boolean;
  response: Array<AllWinesResponse> | null;
}

const initialState = {
  loading: false,
  response: null,
} as FindAllWinesState;

const counterSlice = createSlice({
  name: "FindAllWines",
  initialState,
  reducers: {
    updateFindAllWines(state, action: PayloadAction<Array<AllWinesResponse>>) {
      state.response = action.payload;
      state.loading = false;
    },
    fetchFindAllWines(state) {
      state.loading = true;
    },
  },
});

export const { updateFindAllWines, fetchFindAllWines } = counterSlice.actions;
export default counterSlice.reducer;
