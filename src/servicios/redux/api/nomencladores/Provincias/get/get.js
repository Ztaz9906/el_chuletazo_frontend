import { provinciaApi } from "@/servicios/redux/api/nomencladores/Provincias/api.js";

const provinciaGetEndpoint = provinciaApi.injectEndpoints({
  endpoints: (builder) => ({
    getProvincia: builder.query({
      query: (filters) => {
        let baseURL = `provincias/`;
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

export const { useGetProvinciaQuery } = provinciaGetEndpoint;
