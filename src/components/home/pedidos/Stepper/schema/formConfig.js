export const formConfig = {
  destinatario: {
    nombre: {
      name: "nombre",
      label: "Nombre",
      errorMsg: "Ingrese el nombre del destinatario",
    },
    apellidos: {
      name: "apellidos",
      label: "Apellidos",
      errorMsg: "Ingrese los apellidos del destinatario",
    },
    direccion: {
      provincia: {
        name: "provincia",
        label: "Provincia",
        errorMsg: "Seleccione una provincia",
      },
      municipio: {
        name: "municipio",
        label: "Municipio",
        errorMsg: "Seleccione un municipio",
      },
      direccion: {
        name: "direccion",
        label: "Dirección",
        errorMsg: "Ingrese una dirección válida",
      },
      numeroCasa: {
        name: "numeroCasa",
        label: "Número de casa",
        errorMsg: "Ingrese el número de casa",
      },
    },
    telefonoFijo: {
      name: "telefonoFijo",
      label: "Teléfono fijo",
      errorMsg: "Ingrese un número de teléfono fijo válido",
    },
    telefonoCelular: {
      name: "telefonoCelular",
      label: "Teléfono celular",
      errorMsg: "Ingrese un número de celular válido",
    },
    carneIdentidad: {
      name: "carneIdentidad",
      label: "Carné de Identidad",
      errorMsg: "Ingrese un número de carné de identidad válido",
    },
    guardarDestinatario: {
      name: "guardarDestinatario",
      label: "Guardar destinatario para futuros envíos",
      type: "checkbox",
    },
  },
  remitenteValidado: {
    name: "remitenteValidado",
    label: "Remitente validado",
  },
  destinatario_id: {
    name: "destinatario_id",
    label: "Destinatario",
    errorMsg: "Seleccione un destinatario",
  },
  direccionFacturacionIgual: {
    name: "direccionFacturacionIgual",
    label: "La dirección de facturación es la misma que la de casa",
    type: "checkbox",
  },
};
