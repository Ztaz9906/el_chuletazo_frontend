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
      providesTags: (result) => {
        if (result) {
          return [{ type: "Destinatario", id: result.id }];
        } else {
          return [{ type: "Destinatario", id: "LIST" }];
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetDestinatarioByIdQuery } = productoGetEndpoint;
