import { createApiSlice } from "@/servicios/redux/api/base/base.js";
import { setUser } from "@/servicios/redux/slices/userSlice.js";

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
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
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
        body:
          typeof googleToken === "string"
            ? { id_token: googleToken }
            : { access_token: googleToken.access_token },
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then((response) => {
            if (response.data.access && response.data.refresh) {
              localStorage.setItem("token", response.data.access);
              localStorage.setItem("refresh", response.data.refresh);
              dispatch(setUser(response.data.user));
            } else {
              console.error(
                "Invalid response from google login:",
                response.data
              );
            }
          })
          .catch((error) => {
            console.error("google login error:", error);
          });
      },
      invalidatesTags: [{ type: "Login", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGoogleLoginMutation } = loginEndpoint;
