import { formConfig } from "@/components/auth/sing-up/schema/form.js";

export const initialValues = {
  [formConfig.phone.name]: "",
  [formConfig.email.name]: "",
  [formConfig.password.name]: "",
  [formConfig.confirm_password.name]: "",
  [formConfig.first_name.name]: "",
  [formConfig.last_name.name]: "",
};
