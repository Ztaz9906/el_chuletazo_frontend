import {
  Grid,
  GridItem,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { formConfig } from "@/components/home/pedidos/schema/formConfig.js";
import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";
import CheckboxField from "@/ChakaraUI/FormField/CheckBox/CheckBox.jsx";
import { Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const ShipperInputs = () => {
  const user = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!editing) {
      setFieldValue(formConfig.usuarioEnvio.nombre.name, user.first_name);
      setFieldValue(formConfig.usuarioEnvio.apellidos.name, user.last_name);
      setFieldValue(formConfig.usuarioEnvio.telefono.name, user.phone);
    }
  }, []);

  return (
    <VStack spacing={2} shadow={"md"} borderRadius={"5px"} p={2} bg={"white"}>
      <HStack justify={"space-between"} w={"full"}>
        <Text fontSize={"20px"} fontWeight={"medium"} color={"#646A7A"}>
          {" "}
          Datos Personales del Remitente
        </Text>
        <Tooltip label="Editar datos del remitente" hasArrow bg="gray.600">
          <Edit
            size={24}
            color="#646A7A"
            cursor="pointer"
            onClick={() => setEditing(!editing)}
          />
        </Tooltip>
      </HStack>

      <Grid templateColumns={"repeat(2,1fr)"} gap={3}>
        <InputField
          name={formConfig.usuarioEnvio.nombre.name}
          label={formConfig.usuarioEnvio.nombre.label}
          readOnly={!editing}
        />
        <InputField
          name={formConfig.usuarioEnvio.apellidos.name}
          label={formConfig.usuarioEnvio.apellidos.label}
          readOnly={!editing}
        />
        <InputField
          name={formConfig.usuarioEnvio.telefono.name}
          label={formConfig.usuarioEnvio.telefono.label}
          readOnly={!editing}
        />
        <GridItem display="flex" alignItems="end" h={"100%"}>
          <CheckboxField
            name={formConfig.usuarioEnvio.direccionFacturacionIgual.name}
            label={formConfig.usuarioEnvio.direccionFacturacionIgual.label}
          />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default ShipperInputs;
