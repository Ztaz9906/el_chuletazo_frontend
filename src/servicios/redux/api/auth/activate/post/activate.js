import { activateApi } from "../api";

const activatePostEndpoint = activateApi.injectEndpoints({
  endpoints: (builder) => ({
    activar: builder.mutation({
      query: (data) => ({
        url: "usuarios/activar/",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useActivarMutation } = activatePostEndpoint;
