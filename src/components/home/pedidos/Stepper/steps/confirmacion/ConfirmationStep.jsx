import { Box, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useLazyGetDestinatarioByIdQuery } from "@/servicios/redux/api/Destinatarios/index.js";
import { useSelector } from "react-redux";
import ProductsList from "@/components/home/pedidos/Stepper/steps/productos/ProductsList.jsx";

const LabelValue = ({ label, value }) => (
  <Box mb={2}>
    <Text fontSize="sm" fontWeight="bold" color="gray.600">
      {label}
    </Text>
    <Text fontSize="md">{value || "-"}</Text>
  </Box>
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
    <Flex flexDirection={"column"} w={"100%"} gap={4}>
      <Text fontSize="xl" mb={4}>
        Destinatario
      </Text>
      {destinatario ? (
        <Stack spacing={3}>
          <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
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
            <LabelValue label={"Provincia"} value={destinatario.provincia} />
            <LabelValue label={"Municipio"} value={destinatario.municipio} />
          </Grid>
        </Stack>
      ) : (
        <Text>No se encontraron datos del destinatario</Text>
      )}
      <Text fontSize="xl" mb={4}>
        Remitente
      </Text>
      <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
        <LabelValue label={"Nombre"} value={user.first_name} />
        <LabelValue label={"Apellidos"} value={user.last_name} />
        <LabelValue label={"Teléfono"} value={user.phone} />
      </Grid>
      <Text fontSize="xl" mb={4}>
        Productos
      </Text>
      <ProductsList />
    </Flex>
  );
}
