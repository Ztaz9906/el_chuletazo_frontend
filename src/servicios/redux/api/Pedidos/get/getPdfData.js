import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const PdfDataGetEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    getPdfData: builder.query({
      query: (filters) => {
        let baseURL = "pedidos/datos_pdf/";
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
                type: "PdfData",
                id,
              })),
              { type: "PdfData", id: "LIST" },
            ]
          : [{ type: "PdfData", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPdfDataQuery } = PdfDataGetEndpoint;
