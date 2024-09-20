import { createApiSlice } from "@/servicios/redux/api/base/base.js";
import { removeUser } from "@/servicios/redux/slices/userSlice.js";

export const logoutApi = createApiSlice({
  reducerPath: "logoutApi",
  tagTypes: ["Logout"],
});

const logoutEndpoint = logoutApi.injectEndpoints({
  endpoints: (builder) => ({
    Logout: builder.mutation({
      query: () => {
        const refreshToken = sessionStorage.getItem("refresh");
        return {
          url: "logout/",
          method: "POST",
          body: {
            refresh: refreshToken,
          },
        };
      },
      onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refresh");
            dispatch(removeUser());
          })
          .catch((error) => {
            // Handle errors here if necessary
            console.error(error);
          });
      },
      invalidatesTags: [{ type: "Logout", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useLogoutMutation } = logoutEndpoint;
