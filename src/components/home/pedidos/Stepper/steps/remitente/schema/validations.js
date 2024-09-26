import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  nombreEnvio: Yup.string().required("Ingrese su nombre"),
  apellidosEnvio: Yup.string().required("Ingrese sus apellidos"),
  telefonoEnvio: Yup.string()
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .min(8, "El número debe tener al menos 8 dígitos")
    .required("Ingrese su número de teléfono"),
});
