import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("Ingrese el nombre del destinatario"),
  apellidos: Yup.string().required("Ingrese los apellidos del destinatario"),
  provincia: Yup.string().required("Seleccione una provincia"),
  municipio: Yup.string().required("Seleccione un municipio"),
  direccion: Yup.string().required("Ingrese una dirección válida"),
  numeroCasa: Yup.string().required("Ingrese el número de casa"),
  telefonoFijo: Yup.string()
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .min(8, "El número debe tener al menos 8 dígitos")
    .required("Ingrese un número de teléfono fijo válido"),
  telefonoCelular: Yup.string()
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .min(8, "El número debe tener al menos 8 dígitos")
    .required("Ingrese un número de celular válido"),
  carneIdentidad: Yup.string()
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .length(11, "El carné de identidad debe tener 11 dígitos")
    .required("Ingrese un número de carné de identidad válido"),
  guardarDestinatario: Yup.boolean(),
  nombreEnvio: Yup.string().required("Ingrese su nombre"),
  apellidosEnvio: Yup.string().required("Ingrese sus apellidos"),
  telefonoEnvio: Yup.string()
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .min(8, "El número debe tener al menos 8 dígitos")
    .required("Ingrese su número de teléfono"),
  direccionFacturacionIgual: Yup.boolean(),
  productos: Yup.array(),
});
