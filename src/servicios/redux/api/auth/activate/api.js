import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const activateApi = createApiSlice({
  reducerPath: "activar",
  tagTypes: ["Activar"],
});
