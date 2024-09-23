import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const provinciaApi = createApiSlice({
  reducerPath: "provincias",
  tagTypes: ["Provincias"],
});
