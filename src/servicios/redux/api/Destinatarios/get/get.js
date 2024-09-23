import { destinatarioApi } from "@/servicios/redux/api/Destinatarios/api.js";

const destinatarioGetEndpoint = destinatarioApi.injectEndpoints({
  endpoints: (builder) => ({
    getDestinatario: builder.query({
      query: (filters) => {
        let baseURL = "destinatarios/";
        let queryStrings = [];
        for (let key in filters) {
          if (filters[key] && filters[key] !== "") {
            queryStrings.push(`${key}=${filters[key]}`);
          }
        }
        return {
          url:
            baseURL + (queryStrings.length ? `?${queryStrings.join("&")}` : ""),
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Destinatario",
                id,
              })),
              { type: "Destinatario", id: "LIST" },
            ]
          : [{ type: "Destinatario", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDestinatarioQuery } = destinatarioGetEndpoint;
