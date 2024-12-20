// OrderDetails.jsx
import {
  Box,
  Flex,
  Grid,
  HStack,
  Link,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CircleChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import CanceledBanner from "./CanceledBanner";
import PedidoProductList from "./PedidoProductList";

const LabelValue = ({ label, value }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex flexDirection={{ base: "row", md: "column" }} mb={2} gap={2}>
      <Text fontSize="sm" fontWeight="bold" color="gray.600">
        {label}
        {isMobile && ":"}
      </Text>
      <Text fontSize="md">{value || "-"}</Text>
    </Flex>
  );
};

export default function PedidoDetails({ data, isLoading }) {
  const user = useSelector((state) => state.user);
  if (!data) {
    return <Text>No hay datos disponibles</Text>;
  }

  return (
    <Flex direction="column" p={4} bg="rgba(255, 255, 255, 0.6)" boxShadow="lg">
      <Flex flexDirection="column" w="100%" mt={2}>
        <HStack spacing={4} justify={"space-between"}>
          <Text fontSize="2xl" mb={4} color="main.600">
            <strong>Detalles del Pedido</strong>
          </Text>
          <HStack
            spacing={2}
            justify={"space-between"}
            as={Link}
            href="/pedidos"
            transition="transform 0.2s"
            _hover={{
              textDecoration: "none",
              transform: "translateX(-5px)",
              fontWeight: "bold",
            }}
          >
            <Box as={CircleChevronLeft} size={20} color="main.600" />
            <Text color="main.600" mr={"4px"}>
              Atrás
            </Text>
          </HStack>
        </HStack>
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"calc(100vh - 180px)"} // Ajustado para compensar el nuevo espaciado
          overflowY={"auto"}
          gap={4}
          mt={2}
          p={1}
        >
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" gap={2}>
              <Spinner boxSize={"32px"} />
              <Text color={"gray.500"} fontWeight={"medium"} fontSize={"20px"}>
                Cargando
              </Text>
            </Flex>
          ) : (
            <>
              {/* Estado del Pedido */}
              <Box
                borderWidth={1}
                borderRadius="lg"
                w="full"
                p={4}
                bg="white"
                shadow="sm"
                position="relative"
              >
                {data.estado.toUpperCase() === "CANCELADO" && (
                  <CanceledBanner />
                )}

                <Text fontSize="xl" mb={4}>
                  Estado del Pedido
                </Text>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                  gap={4}
                >
                  <LabelValue
                    label="Estado"
                    value={data.estado.toUpperCase()}
                  />
                  <LabelValue
                    label="Fecha de Creación"
                    value={new Date(data.created_at).toLocaleDateString()}
                  />
                  <LabelValue
                    label="Última Actualización"
                    value={new Date(data.updated_at).toLocaleDateString()}
                  />
                </Grid>
              </Box>
              {/* Remitente */}
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
                {user ? (
                  <Stack spacing={3}>
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                      gap={4}
                    >
                      <LabelValue label={"Nombre"} value={user.first_name} />
                      <LabelValue label={"Apellidos"} value={user.last_name} />
                      <LabelValue label={"Teléfono"} value={user.phone} />
                    </Grid>
                  </Stack>
                ) : (
                  <Text>No se encontraron datos del remitente</Text>
                )}
              </Box>
              {/* Destinatario */}
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
                {data.destinatario ? (
                  <Stack spacing={3}>
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                      gap={4}
                    >
                      <LabelValue
                        label="Nombre"
                        value={data.destinatario.nombre}
                      />
                      <LabelValue
                        label="Apellidos"
                        value={data.destinatario.apellidos}
                      />
                      <LabelValue
                        label="Dirección"
                        value={data.destinatario.direccion}
                      />
                      <LabelValue
                        label="Número de Casa"
                        value={data.destinatario.numero_casa}
                      />
                      <LabelValue
                        label="Teléfono Celular"
                        value={data.destinatario.telefono_celular}
                      />
                      <LabelValue
                        label="Teléfono Fijo"
                        value={data.destinatario.telefono_fijo}
                      />
                      <LabelValue label="CI" value={data.destinatario.ci} />
                      <LabelValue
                        label="Provincia"
                        value={data.destinatario.provincia.name}
                      />
                      <LabelValue
                        label="Municipio"
                        value={data.destinatario.municipio.name}
                      />
                    </Grid>
                  </Stack>
                ) : (
                  <Text>No se encontraron datos del destinatario</Text>
                )}
              </Box>

              {/* Lista de Productos */}
              <Box
                borderWidth={1}
                borderRadius="lg"
                w="full"
                p={4}
                bg="white"
                shadow="sm"
              >
                <PedidoProductList
                  productos={data.productos}
                  total={data.total}
                />
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
