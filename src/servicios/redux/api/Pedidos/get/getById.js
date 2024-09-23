import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const productoGetEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    getPedidoById: builder.query({
      query: (id, filters) => {
        let baseURL = `pedidos/${id}/`;
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
                type: "Pedido",
                id,
              })),
              { type: "Pedido", id: "LIST" },
            ]
          : [{ type: "Pedido", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPedidoByIdQuery } = productoGetEndpoint;
