/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getToken = (): string | null => {
  const tokenString = localStorage.getItem("token") ?? "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token ?? null;
};

interface AuthState {
  token: string | null;
}

const initialState = {
  token: getToken(),
} as AuthState;

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { saveToken } = authSlice.actions;
export default authSlice.reducer;
