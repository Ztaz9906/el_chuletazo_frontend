import {createSlice} from '@reduxjs/toolkit';
import {loginApi} from "@/servicios/api/auth/login/login.js";
import {logoutApi} from "@/servicios/api/auth/logout/logout.js";



const initialState = JSON.parse(sessionStorage.getItem('user')) || null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            sessionStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        },
        removeUser: (state) => {
            sessionStorage.removeItem('user');
            return null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(loginApi.endpoints.Login.matchFulfilled, (state, action) => {
                sessionStorage.setItem('user', JSON.stringify(action.payload.user));
                return action.payload.user;
            })
            .addMatcher(logoutApi.endpoints.Logout.matchFulfilled, (state) => {
                sessionStorage.removeItem('user');
                return null;
            });
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;