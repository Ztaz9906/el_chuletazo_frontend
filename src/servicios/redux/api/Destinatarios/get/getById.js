import { destinatarioApi } from "@/servicios/redux/api/Destinatarios/api.js";

const productoGetEndpoint = destinatarioApi.injectEndpoints({
  endpoints: (builder) => ({
    getDestinatarioById: builder.query({
      query: (id, filters) => {
        let baseURL = `destinatarios/${id}/`;
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

export const { useGetDestinatarioByIdQuery } = productoGetEndpoint;
