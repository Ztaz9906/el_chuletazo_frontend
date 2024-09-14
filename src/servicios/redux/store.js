import {configureStore} from "@reduxjs/toolkit";

import userReducer from '@/servicios/redux/userSlice';
import {setupApiSlices} from "@/servicios/api/api.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        ...setupApiSlices.reducers,
    },
    middleware: (getDefaultMiddleware) =>
        setupApiSlices.middleware(getDefaultMiddleware),
});
export default store;