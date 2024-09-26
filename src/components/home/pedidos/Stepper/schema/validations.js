import * as Yup from "yup";

export const validationSchema = [
  // Step 0: No validation
  Yup.object().shape({}),

  // Step 1: Validation for destinatario
  Yup.object().shape({
    destinatario_id: Yup.string().required("Seleccione un destinatario"),
  }),

  // Step 2: Conditional validation for remitente
  Yup.object().shape({
    remitenteValidado: Yup.boolean().oneOf([true], "Debe validar el remitente"),
  }),
];
