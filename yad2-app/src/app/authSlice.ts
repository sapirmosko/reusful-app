import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = window.localStorage.getItem("token");
let initialState = null;

if (token) {
  const { email, sub } = jwtDecode<{ email: string; sub: number }>(token);
  initialState = { email, sub };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const { email, sub } = jwtDecode<{ email: string; sub: number }>(
        action.payload
      );
      state = { email, sub };
      window.localStorage.setItem("token", action.payload);
      return state;
    },
    logout: (state) => {
      window.localStorage.removeItem(`token`);
      return null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
