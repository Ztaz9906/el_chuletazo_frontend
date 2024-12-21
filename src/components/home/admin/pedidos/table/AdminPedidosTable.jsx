import {
  useCancelPedidoMutation,
  useGetCheckOutQuery,
} from "@/servicios/redux/api/Pedidos/index.js";
import {
  Badge,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CTable from "../../../../../ChakaraUI/Table/CTable";
import CambiarEstadoPedidoModal from "../EditarEstado/CambiarEstadoPedidoModal";
import DynamicFilter from "./DynamicFilter";

// Función para obtener el badge del estado
const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "pendiente":
      return <Badge colorScheme="yellow">{status}</Badge>;

    case "pagado":
      return <Badge colorScheme="green">{status}</Badge>;
    case "enviado":
      return <Badge colorScheme="blue">{status}</Badge>;
    case "completado":
      return <Badge colorScheme="purple">{status}</Badge>;
    case "cancelado":
      return <Badge colorScheme="gray">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const TableActions = ({ row }) => {
  const toast = useToast();
  const [checkoutId, setCheckoutId] = useState(null);
  const navigation = useNavigate();
  // Use the query hook with conditional fetching
  const { data, error, isFetching } = useGetCheckOutQuery(checkoutId, {
    skip: !checkoutId, // Only fetch when we have an ID
  });
  const [canelar, { isLoading }] = useCancelPedidoMutation();
  // Handle data and error effects
  useEffect(() => {
    if (data?.checkout_url) {
      window.location.href = data.checkout_url;
    }
    if (error) {
      toast({
        title: "Error",
        description: error.message || "Error al procesar el pago",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setCheckoutId(null); // Reset ID on error
    }
  }, [data, error, toast]);
  const canChangeState =
    row.original.estado.toLowerCase() === "pagado" ||
    row.original.estado.toLowerCase() === "enviado";
  return (
    <Stack direction="row" spacing={2} align={"center"}>
      <Tooltip label="Ver detalles">
        <IconButton
          onClick={() =>
            navigation(`/pedidos/detalles/${row.original.id}`, {
              state: { previousUrl: "/administracion/orderlist" },
            })
          }
          icon={<Info />}
          size={"20px"}
          colorScheme={"gray"}
          _hover={{ color: "blue.500" }}
          variant={"link"}
          aria-label={"Ver detalles"}
          cursor={"pointer"}
        />
      </Tooltip>
      {/* TODO: Implementar edición de pedidos mas adelante */}
      {canChangeState && <CambiarEstadoPedidoModal id={row.original.id} />}
    </Stack>
  );
};

const columns = [
  {
    header: "Pedido",
    accessorKey: "id",
  },

  {
    header: "Fecha",
    accessorKey: "created_at_date",
    accessorFn: (row) => row.created_at,
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleDateString("es-ES", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },

  {
    header: "Destinatario",
    accessorKey: "destinatario",
    cell: ({ getValue }) => {
      const dest = getValue();
      return `${dest.nombre_completo}`;
    },
  },
  {
    header: "Remitente",
    accessorKey: "usuario",
    cell: ({ row }) => {
      const usuario = row.original.usuario;
      return (
        <VStack spacing={1}>
          <Text fontSize={"md"}>{usuario.nombre_completo}</Text>
          <Text fontSize={"xs"}>{usuario.email}</Text>
        </VStack>
      );
    },
    meta: { isNumeric: true },
  },
  {
    header: "Provincia",
    accessorKey: "destinatario_provincia",
    cell: ({ row }) => {
      // Safely access the province name
      const provincia = row.original.destinatario?.provincia?.name || "N/A";
      return provincia;
    },
  },
  {
    header: "Estado",
    accessorKey: "estado",
    cell: ({ getValue }) => {
      return getStatusBadge(getValue());
    },
  },
  {
    header: "Acciones",

    cell: TableActions,
  },
];

export default function AdminPedidosTable({ pedidos, isLoading }) {
  const dataTable = {
    columns,
    rows: pedidos,
  };
  return (
    <CTable
      data={dataTable}
      DynamicFilters={DynamicFilter}
      isLoading={isLoading}
    />
  );
}
