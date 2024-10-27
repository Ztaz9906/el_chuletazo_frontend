import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  old_password: Yup.string().required("La contraseña actual es requerida"),
  new_password1: Yup.string()
    .required("La nueva contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(
      /[.,:;!@#$%^&*+\-=?_~()]/,
      "Debe contener al menos un carácter especial (.,-+*)"
    )
    .notOneOf(
      [Yup.ref("old_password")],
      "La nueva contraseña debe ser diferente a la actual"
    ),
  new_password2: Yup.string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([Yup.ref("new_password1")], "Las contraseñas no coinciden"),
});
