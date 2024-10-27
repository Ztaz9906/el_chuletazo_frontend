import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const authApi = createApiSlice({
  reducerPath: "Auth",
  tagTypes: ["auth"],
});
