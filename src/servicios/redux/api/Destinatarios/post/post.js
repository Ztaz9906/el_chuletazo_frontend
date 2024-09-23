import { destinatarioApi } from "@/servicios/redux/api/Destinatarios/api.js";

const destinatarioPostEndpoint = destinatarioApi.injectEndpoints({
  endpoints: (builder) => ({
    postDestinatario: builder.mutation({
      query: (data) => ({
        url: "destinatarios/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Destinatario", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { usePostDestinatarioMutation } = destinatarioPostEndpoint;
