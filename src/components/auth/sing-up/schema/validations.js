import * as Yup from "yup";
import { formConfig } from "@/components/auth/sing-up/schema/form.js";

export const validationSchema = Yup.object().shape({
  [formConfig.phone.name]: Yup.string().required("Este campo es requerido"),
  [formConfig.email.name]: Yup.string()
    .email(formConfig.email.errorMsg)
    .required(formConfig.email.errorMsg),
  [formConfig.password.name]: Yup.string()
    .min(8, formConfig.password.errorMsg)
    .required(formConfig.password.errorMsg),
  [formConfig.confirm_password.name]: Yup.string()
    .required("La confirmación de contraseña es requerida")
    .oneOf(
      [Yup.ref(formConfig.password.name), null],
      "Las contraseñas deben coincidir",
    ),
  [formConfig.first_name.name]: Yup.string().required(
    formConfig.first_name.errorMsg,
  ),
  [formConfig.last_name.name]: Yup.string().required(
    formConfig.last_name.errorMsg,
  ),
});
