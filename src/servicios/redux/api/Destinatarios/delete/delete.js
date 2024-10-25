import { destinatarioApi } from "@/servicios/redux/api/Destinatarios/api.js";

const destinatarioEndpoints = destinatarioApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteDestinatario: builder.mutation({
      query: (id) => ({
        url: `destinatarios/${id}/`,
        method: "DELETE",
      }),
      // Transformar la respuesta vacía en un objeto con mensaje

      invalidatesTags: (result, error, id) => [
        { type: "Destinatario", id: "LIST" },
        { type: "Destinatario", id },
      ],
    }),
  }),
});

export const { useDeleteDestinatarioMutation } = destinatarioEndpoints;
