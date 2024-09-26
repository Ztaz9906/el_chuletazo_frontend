import { useEffect, useState } from "react";
import { Box, Center, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { useGetDestinatarioQuery } from "@/servicios/redux/api/Destinatarios/index.js";
import SelectField from "@/ChakaraUI/FormField/SelectField/SelectField.jsx";
import { formConfig } from "@/components/home/pedidos/Stepper/schema/formConfig.js";
import DestinatarioModal from "@/components/home/pedidos/Stepper/steps/destinatario/DestinatarioModal.jsx";
import { useFormikContext } from "formik";

const DetailsItem = ({ label, value }) => (
  <VStack align="start" spacing={0}>
    <Text fontWeight="bold" fontSize="sm" color="gray.600">
      {label}
    </Text>
    <Text fontSize="md">{value}</Text>
  </VStack>
);

const SelectDestinatario = () => {
  const { data } = useGetDestinatarioQuery();
  const { values, errors } = useFormikContext();
  const [selectedDestinatario, setSelectedDestinatario] = useState(null);
  useEffect(() => {
    if (values.destinatario_id) {
      const selected = data.find((dest) => dest.id === values.destinatario_id);
      setSelectedDestinatario(selected);
    }
  }, [values.destinatario_id, data]);

  return (
    <Box width="100%" mt={8} >
      {data && data.length === 0 ? (
        <Center> 
          <DestinatarioModal />
          {errors.destinatario_id && (
            <Text color="red.500">{errors.destinatario_id}</Text>
          )}
        </Center>
      ) : (
        <VStack spacing={6} align="stretch">
          <HStack spacing={6} align="stretch">
            <SelectField
              options={
                data
                  ? data.map((destinatario) => ({
                      value: destinatario.id,
                      label: `${destinatario.nombre} ${destinatario.apellidos}`,
                    }))
                  : []
              }
              name={formConfig.destinatario_id.name}
              label={formConfig.destinatario_id.label}
              placeholder="Seleccione un destinatario"
            />
            <Center alignItems={"flex-end"}>
              <DestinatarioModal />
            </Center>
          </HStack>

          {selectedDestinatario && (
            <Box borderWidth={1} borderRadius="md" p={4} mt={4} bg="gray.50">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Detalles del Destinatario
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <DetailsItem
                  label="Nombre"
                  value={`${selectedDestinatario.nombre} ${selectedDestinatario.apellidos}`}
                />
                <DetailsItem label="CI" value={selectedDestinatario.ci} />
                <DetailsItem
                  label="Dirección"
                  value={selectedDestinatario.direccion}
                />
                <DetailsItem
                  label="Número de Casa"
                  value={selectedDestinatario.numero_casa}
                />
                <DetailsItem
                  label="Provincia"
                  value={selectedDestinatario.provincia}
                />
                <DetailsItem
                  label="Municipio"
                  value={selectedDestinatario.municipio}
                />
                <DetailsItem
                  label="Teléfono Celular"
                  value={selectedDestinatario.telefono_celular}
                />
                <DetailsItem
                  label="Teléfono Fijo"
                  value={selectedDestinatario.telefono_fijo}
                />
              </Grid>
            </Box>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default SelectDestinatario;