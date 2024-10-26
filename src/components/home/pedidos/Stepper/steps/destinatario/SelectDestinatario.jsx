import { useEffect, useState } from "react";
import { Box, Center, Grid, HStack, Text, VStack, Flex, Divider } from "@chakra-ui/react";
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
    <Box width="100%" mt={2} > 
      <Text
        fontSize={"2xl"}
        textColor={"main.600"}
      >Destinatarios</Text>
      <Divider mb={4} borderColor="gray.300" />
      {data && data.length === 0 ? (
        <Center> 
          <DestinatarioModal />
          {errors.destinatario_id && (
            <Text color="red.500">{errors.destinatario_id}</Text>
          )}
        </Center>
      ) : (
        <VStack spacing={6} align="stretch" mt={6}>
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
              placeholder="Seleccione un destinatario"
            />
            <Center alignItems={"flex-end"}>
              <DestinatarioModal />
            </Center>
          </HStack>

          {selectedDestinatario && (
            <Box borderWidth={1} borderRadius="lg" p={6} mt={6} bg="white" shadow="sm">
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="xl" fontWeight="bold" color="black">
                  Detalles del Destinatario
                </Text>
              </Flex>
              <Divider mb={4} borderColor="gray.300" />
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
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
                  value={selectedDestinatario.provincia.name}
                />
                <DetailsItem
                  label="Municipio"
                  value={selectedDestinatario.municipio.name}
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