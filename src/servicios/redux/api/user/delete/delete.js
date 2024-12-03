import { userApi } from "../api";

const usuarioEndpoints = userApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUsuarios: builder.mutation({
      query: (id) => ({
        url: `usuarios/${id}/`,
        method: "DELETE",
      }),
      // Transformar la respuesta vacía en un objeto con mensaje

      invalidatesTags: (result, error, id) => [
        { type: "Usuarios", id: "LIST" },
        { type: "Usuarios", id },
      ],
    }),
  }),
});

export const { useDeleteUsuariosMutation } = usuarioEndpoints;
