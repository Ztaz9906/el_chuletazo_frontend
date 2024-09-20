import { api } from "@/servicios/redux/api/productos/api.js";

const productoGetEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducto: builder.query({
      query: (filters) => {
        let baseURL = "productos/";
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
                type: "Producto",
                id,
              })),
              { type: "Producto", id: "LIST" },
            ]
          : [{ type: "Producto", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductoQuery } = productoGetEndpoint;
