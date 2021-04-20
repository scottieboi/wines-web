/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FindWineRespone } from "../api/apiResponses";

interface FindWineByIdState {
  loading: boolean;
  response: FindWineRespone | null;
}

const initialState = {
  loading: false,
  response: null,
} as FindWineByIdState;

const findWineByIdSlice = createSlice({
  name: "FindWineById",
  initialState,
  reducers: {
    updateFindWineById(state, action: PayloadAction<FindWineRespone>) {
      state.response = action.payload;
      state.loading = false;
    },
    fetchFindWineById(state) {
      state.loading = true;
    },
  },
});

export const {
  updateFindWineById,
  fetchFindWineById,
} = findWineByIdSlice.actions;
export default findWineByIdSlice.reducer;
