import * as Yup from "yup";
import { formConfig } from "@/components/auth/sing-up/schema/form.js";

export const validationSchema = Yup.object().shape({
  [formConfig.email.name]: Yup.string()
    .email(formConfig.email.errorMsg)
    .required("Este campo es requerido"),
  [formConfig.password.name]: Yup.string()
    .min(8, formConfig.password.errorMsg)
    .required("Este campo es requerido"),
});
