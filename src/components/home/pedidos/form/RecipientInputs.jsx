import { Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import { formConfig } from "@/components/home/pedidos/schema/formConfig.js";
import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";
import CheckboxField from "@/ChakaraUI/FormField/CheckBox/CheckBox.jsx";
import SelectField from "@/ChakaraUI/FormField/SelectField/SelectField.jsx";
import RecipientModalAutocomplete from "@/components/home/pedidos/form/RecipientModalAutocomplete.jsx";

const RecipientInputs = () => {
  return (
    <VStack spacing={2} shadow={"md"} borderRadius={"5px"} p={2} bg={"white"}>
      <HStack justify={"space-between"} w={"full"}>
        <Text fontSize={"20px"} fontWeight={"medium"} color={"#646A7A"}>
          Datos Personales del Destinatario
        </Text>
        <RecipientModalAutocomplete />
      </HStack>
      <Grid templateColumns={"repeat(2,1fr)"} gap={3} alignItems={"start"}>
        <InputField
          name={formConfig.destinatario.nombre.name}
          label={formConfig.destinatario.nombre.label}
        />
        <InputField
          name={formConfig.destinatario.apellidos.name}
          label={formConfig.destinatario.apellidos.label}
        />
        <InputField
          name={formConfig.destinatario.direccion.direccion.name}
          label={formConfig.destinatario.direccion.direccion.label}
        />
        <InputField
          name={formConfig.destinatario.direccion.numeroCasa.name}
          label={formConfig.destinatario.direccion.numeroCasa.label}
        />
        <SelectField
          options={[
            { value: "La Habana", label: "La Habana" },
            { value: "Matanzas", label: "Matanzas" },
            { value: "Villa Clara", label: "Villa Clara" },
            { value: "Camaguey", label: "Camaguey" },
            { value: "Holguin", label: "Holguin" },
            { value: "Santiago de Cuba", label: "Santiago de Cuba" },
            { value: "Guantanamo", label: "Guantanamo" },
          ]}
          name={formConfig.destinatario.direccion.provincia.name}
          label={formConfig.destinatario.direccion.provincia.label}
          placeholder={"Seleccione una provincia"}
        />
        <SelectField
          options={[
            { value: "La Habana", label: "La Habana" },
            { value: "Matanzas", label: "Matanzas" },
            { value: "Villa Clara", label: "Villa Clara" },
            { value: "Camaguey", label: "Camaguey" },
            { value: "Holguin", label: "Holguin" },
            { value: "Santiago de Cuba", label: "Santiago de Cuba" },
            { value: "Guantanamo", label: "Guantanamo" },
          ]}
          name={formConfig.destinatario.direccion.municipio.name}
          label={formConfig.destinatario.direccion.municipio.label}
          placeholder={"Seleccione un municipio"}
        />
        <InputField
          name={formConfig.destinatario.telefonoFijo.name}
          label={formConfig.destinatario.telefonoFijo.label}
        />
        <InputField
          name={formConfig.destinatario.telefonoCelular.name}
          label={formConfig.destinatario.telefonoCelular.label}
        />
        <InputField
          name={formConfig.destinatario.carneIdentidad.name}
          label={formConfig.destinatario.carneIdentidad.label}
        />
        <GridItem display="flex" alignItems="end" h={"100%"}>
          <CheckboxField
            name={formConfig.destinatario.guardarDestinatario.name}
            label={formConfig.destinatario.guardarDestinatario.label}
          />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default RecipientInputs;
