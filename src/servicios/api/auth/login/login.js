import { createApiSlice } from "@/servicios/api/base/base.js";
import { setUser } from "@/servicios/redux/userSlice.js";

export const loginApi = createApiSlice({
  reducerPath: "loginApi",
  tagTypes: ["Login"],
});

const loginEndpoint = loginApi.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (login) => ({
        url: "login/",
        method: "POST",
        body: login,
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then((response) => {
            sessionStorage.setItem("token", response.data.access);
            sessionStorage.setItem("refresh", response.data.refresh);
            dispatch(setUser(response.data.user));
          })
          .catch((error) => {
            console.error(error);
          });
      },
      invalidatesTags: [{ type: "Login", id: "LIST" }],
    }),
    GoogleLogin: builder.mutation({
      query: (googleToken) => ({
        url: "google-login/",
        method: "POST",
        body: { id_token: googleToken },
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then((response) => {
            if (response.data.access && response.data.refresh) {
              sessionStorage.setItem("token", response.data.access);
              sessionStorage.setItem("refresh", response.data.refresh);
              dispatch(setUser(response.data.user));
            } else {
              console.error(
                "Invalid response from Google login:",
                response.data,
              );
            }
          })
          .catch((error) => {
            console.error("Google login error:", error);
          });
      },
      invalidatesTags: [{ type: "Login", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGoogleLoginMutation } = loginEndpoint;
