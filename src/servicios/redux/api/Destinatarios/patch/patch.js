import { destinatarioApi } from "@/servicios/redux/api/Destinatarios/api.js";

const patchDestinatarioEndpoint = destinatarioApi.injectEndpoints({
  endpoints: (builder) => ({
    patchDestinatario: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `destinatarios/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Destinatario", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { usePatchDestinatarioMutation } = patchDestinatarioEndpoint;
