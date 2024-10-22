import CTable from "@/ChakaraUI/Table/CTable.jsx";
import DynamicFilter from "@/components/home/pedidos/table/DynamicFilter.jsx";
import {
  useGetCheckOutQuery,
  usePatchPedidoMutation,
} from "@/servicios/redux/api/Pedidos/index.js";
import { Badge, IconButton, Stack, Tooltip, useToast } from "@chakra-ui/react";
import { CircleDollarSign, CircleX, FilePenLine, Info } from "lucide-react";
import { useEffect, useState } from "react";

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

  // Use the query hook with conditional fetching
  const { data, error, isFetching } = useGetCheckOutQuery(checkoutId, {
    skip: !checkoutId, // Only fetch when we have an ID
  });
  const [canelar, { isLoading }] = usePatchPedidoMutation();
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

  const handlePayment = () => {
    setCheckoutId(row.original.id);
  };

  const handleCancelled = async () => {
    console.log("Cancelando pedido", row.original.id);
    try {
      await canelar(row.original.id, { estado: "cancelado" });
      toast({
        title: "Éxito",
        description: "Pedido cancelado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al cancelar:", error);
      toast({
        title: "Error",
        description: "No se pudo cancelar el pedido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack direction="row" spacing={2} align={"center"}>
      <Tooltip label="Ver detalles">
        <IconButton
          onClick={() => console.log("Ver detalles", row.original)}
          icon={<Info />}
          size={"20px"}
          color={"gray"}
          variant={"none"}
          aria-label={"Ver detalles"}
          cursor={"pointer"}
        />
      </Tooltip>
      <Tooltip label="Editar pedido">
        <IconButton
          onClick={() => console.log("Editar pedido", row.original)}
          icon={<FilePenLine />}
          size={"20px"}
          color={"gray"}
          variant={"none"}
          aria-label={"Editar pedido"}
          isDisabled={row.original.estado.toLowerCase() !== "pendiente"}
          cursor={"pointer"}
        />
      </Tooltip>
      <Tooltip label={isLoading ? "Cancelando" : "Cancelar pedido"}>
        <IconButton
          onClick={handleCancelled}
          icon={<CircleX />}
          size={"20px"}
          color={"gray"}
          variant={"none"}
          aria-label={"Cancelar pedido"}
          isDisabled={
            row.original.estado.toLowerCase() !== "pendiente" || isLoading
          }
          cursor={"pointer"}
          isLoading={isLoading}
        />
      </Tooltip>
      <Tooltip label={isFetching ? "Procesando..." : "Pagar pedido"}>
        <IconButton
          onClick={handlePayment}
          icon={<CircleDollarSign />}
          size={"20px"}
          color={"gray"}
          variant={"none"}
          aria-label={"Pagar pedido"}
          isDisabled={
            row.original.estado.toLowerCase() !== "pendiente" || isFetching
          }
          cursor={"pointer"}
          isLoading={isFetching}
        />
      </Tooltip>
    </Stack>
  );
};

const columns = [
  {
    header: "Fecha de Registro",
    accessorKey: "created_at",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleDateString();
    },
  },
  {
    header: "Hora de Registro",
    id_column: "created_at_time",
    accessorKey: "created_at",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleTimeString();
    },
  },
  {
    header: "Destinatario",
    accessorKey: "destinatario",
    cell: ({ getValue }) => {
      const dest = getValue();
      return `${dest.nombre} ${dest.apellidos}`;
    },
  },
  {
    header: "Total Pagado",
    accessorKey: "total",
    cell: ({ getValue }) => `$${getValue()}`,
    meta: { isNumeric: true },
  },
  {
    header: "Estado",
    accessorKey: "estado",
    cell: ({ getValue }) => getStatusBadge(getValue()),
  },
  {
    header: "Acciones",
    cell: TableActions,
  },
];

export default function PedidosTable({ pedidos }) {
  if (!pedidos || pedidos.length === 0) {
    return <p>No hay pedidos para mostrar.</p>;
  }

  const dataTable = {
    columns,
    rows: pedidos,
  };

  return <CTable data={dataTable} DynamicFilters={DynamicFilter} />;
}
