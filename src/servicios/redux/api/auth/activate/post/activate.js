import { authApi } from "../../api";

const activatePostEndpoint = authApi.injectEndpoints({
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
