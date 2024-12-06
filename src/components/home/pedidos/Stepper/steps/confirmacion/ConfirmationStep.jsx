import ProductsList from "@/components/home/pedidos/Stepper/steps/productos/ProductsList.jsx";
import { useLazyGetDestinatarioByIdQuery } from "@/servicios/redux/api/Destinatarios/index.js";
import { Box, Flex, Grid, Show, Stack, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LabelValue = ({ label, value }) => (
  <Flex flexDirection={{ base: "row", md: "column" }} align="center" gap={1}>
    <Text fontWeight="bold" fontSize="sm" color="gray.600">
      {label}
      {""}
      <Show below="md">: </Show>
    </Text>
    <Text fontSize="md" fontWeight="medium" color="gray.500">
      {value || "-"}
    </Text>
  </Flex>
);

export default function ConfirmationStep() {
  const { values } = useFormikContext();
  const user = useSelector((state) => state.user);
  const [getDestinatarioById, { data: destinatario, isLoading, error }] =
    useLazyGetDestinatarioByIdQuery();

  useEffect(() => {
    const fetchDestinatario = async () => {
      if (values.destinatario_id) {
        try {
          await getDestinatarioById(values.destinatario_id).unwrap();
        } catch (err) {
          console.error("Error fetching destinatario:", err);
        }
      }
    };

    fetchDestinatario();
  }, [values.destinatario_id, getDestinatarioById]);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error al cargar los datos del destinatario</Text>;
  }

  return (
    <Flex flexDirection={"column"} w={"100%"} gap={4} mt={2}>
      <Text fontSize="2xl" mb={4} color={"main.600"}>
        Confirmar Datos
      </Text>
      <Box
        borderWidth={1}
        borderRadius="lg"
        w="full"
        p={4}
        bg="white"
        shadow="sm"
      >
        <Text fontSize="xl" mb={4}>
          Destinatario
        </Text>
        {destinatario ? (
          <Stack spacing={3}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={4}
            >
              <LabelValue label={"Nombre"} value={destinatario.nombre} />
              <LabelValue label={"Apellidos"} value={destinatario.apellidos} />
              <LabelValue label={"Dirección"} value={destinatario.direccion} />
              <LabelValue
                label={"Número de Casa"}
                value={destinatario.numero_casa}
              />
              <LabelValue
                label={"Teléfono Celular"}
                value={destinatario.telefono_celular}
              />
              <LabelValue
                label={"Teléfono Fijo"}
                value={destinatario.telefono_fijo}
              />
              <LabelValue label={"CI"} value={destinatario.ci} />
              <LabelValue
                label={"Provincia"}
                value={destinatario.provincia.name}
              />
              <LabelValue
                label={"Municipio"}
                value={destinatario.municipio.name}
              />
            </Grid>
          </Stack>
        ) : (
          <Text>No se encontraron datos del destinatario</Text>
        )}
      </Box>
      <Box
        borderWidth={1}
        borderRadius="lg"
        w="full"
        p={4}
        bg="white"
        shadow="sm"
      >
        <Text fontSize="xl" mb={4}>
          Remitente
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <LabelValue label={"Nombre"} value={user.first_name} />
          <LabelValue label={"Apellidos"} value={user.last_name} />
          <LabelValue label={"Teléfono"} value={user.phone} />
        </Grid>
      </Box>
      <Box
        borderWidth={1}
        borderRadius="lg"
        w="full"
        p={4}
        bg="white"
        shadow="sm"
      >
        <Text fontSize="xl" mb={4}>
          Productos
        </Text>
        <ProductsList hasTitle={false} />
      </Box>
    </Flex>
  );
}
