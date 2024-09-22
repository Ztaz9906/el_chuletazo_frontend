import { Grid, Text, VStack } from "@chakra-ui/react";
import { formConfig } from "@/components/home/pedidos/schema/formConfig.js";
import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";
import CheckboxField from "@/ChakaraUI/FormField/CheckBox/CheckBox.jsx";

const ShipperInputs = () => {
  return (
    <VStack spacing={2} shadow={"md"} borderRadius={"5px"} p={2} bg={"white"}>
      <Text fontSize={"20px"} fontWeight={"medium"} color={"#646A7A"}>
        {" "}
        Datos Personales del Remitente
      </Text>
      <Grid templateColumns={"repeat(2,1fr)"} gap={3}>
        <InputField
          name={formConfig.usuarioEnvio.nombre.name}
          label={formConfig.usuarioEnvio.nombre.label}
        />
        <InputField
          name={formConfig.usuarioEnvio.apellidos.name}
          label={formConfig.usuarioEnvio.apellidos.label}
        />
        <InputField
          name={formConfig.usuarioEnvio.direccion.name}
          label={formConfig.usuarioEnvio.direccion.label}
        />
        <InputField
          name={formConfig.usuarioEnvio.telefono.name}
          label={formConfig.usuarioEnvio.telefono.label}
        />
        <CheckboxField
          name={formConfig.usuarioEnvio.direccionFacturacionIgual.name}
          label={formConfig.usuarioEnvio.direccionFacturacionIgual.label}
        />
      </Grid>
    </VStack>
  );
};

export default ShipperInputs;
