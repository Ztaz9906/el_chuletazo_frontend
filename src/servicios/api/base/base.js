import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/servicios/axios/customFetchBase.js";


export const createApiSlice = ({ reducerPath, tagTypes = [] }) =>
    createApi({
        reducerPath,
        baseQuery: customFetchBase,
        tagTypes,
        endpoints: () => ({}),
    });