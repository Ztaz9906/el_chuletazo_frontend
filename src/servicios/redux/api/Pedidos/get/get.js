import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const pedidosGetEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    getPedidos: builder.query({
      query: (filters) => {
        let baseURL = "pedidos/";
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
                type: "Pedidos",
                id,
              })),
              { type: "Pedidos", id: "LIST" },
            ]
          : [{ type: "Pedidos", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPedidosQuery } = pedidosGetEndpoint;
