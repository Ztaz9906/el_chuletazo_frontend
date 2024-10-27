import { authApi } from "../../api";

const reactivatePostEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    reactivar: builder.mutation({
      query: (data) => ({
        url: "usuarios/reenviar-activacion/",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useReactivarMutation } = reactivatePostEndpoint;
