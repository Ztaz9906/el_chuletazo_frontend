import { destinatarioApi } from "@/servicios/redux/api/Destinatarios/api.js";

const patchDestinatarioEndpoint = destinatarioApi.injectEndpoints({
  endpoints: (builder) => ({
    patchDestinatario: builder.mutation({
      query: (id, data) => ({
        url: `destinatario/${id}/`,
        method: "PATCH",
        body: data,
      }),
      providesTags: (result, error, id) => [{ type: "Destinatario", id }],
    }),
  }),
  overrideExisting: false,
});

export const { usePatchDestinatarioMutation } = patchDestinatarioEndpoint;
