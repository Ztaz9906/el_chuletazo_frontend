import { api } from "@/servicios/redux/api/productos/api.js";

const deleteDestinatarioEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteDestinatario: builder.mutation({
      query: (id) => ({
        url: `destinatario/${id}/`,
        method: "DELETE",
      }),
      providesTags: (result, error, id) => [{ type: "Destinatario", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteDestinatarioMutation } = deleteDestinatarioEndpoint;
