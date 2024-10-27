import { loginApi } from "@/servicios/redux/api/auth/login/login.js";
import { logoutApi } from "@/servicios/redux/api/auth/logout/logout.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: (state) => {
      localStorage.removeItem("user");
      return null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(loginApi.endpoints.Login.matchFulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        return action.payload.user;
      })
      .addMatcher(logoutApi.endpoints.Logout.matchFulfilled, (state) => {
        localStorage.removeItem("user");
        return null;
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
