import { userApi } from "@/servicios/redux/api/user/api.js";

const UserGetEndpoint = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (filters) => {
        let baseURL = "usuarios/";
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
                type: "User",
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery } = UserGetEndpoint;
