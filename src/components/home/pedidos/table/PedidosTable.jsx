import { Badge, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { CircleDollarSign, CircleX, FilePenLine, Info } from "lucide-react";
import CTable from "@/ChakaraUI/Table/CTable.jsx";
import DynamicFilter from "@/components/home/pedidos/table/DynamicFilter.jsx";

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
    default:
      return <Badge>{status}</Badge>;
  }
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
    cell: ({ row }) => (
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
        <Tooltip label="Cancelar pedido">
          <IconButton
            onClick={() => console.log("Cancelar pedido", row.original)}
            icon={<CircleX />}
            size={"20px"}
            color={"gray"}
            variant={"none"}
            aria-label={"Cancelar pedido"}
            isDisabled={row.original.estado.toLowerCase() !== "pendiente"}
            cursor={"pointer"}
          />
        </Tooltip>
        <Tooltip label="Pagar pedido">
          <IconButton
            onClick={() => console.log("Pagar pedido", row.original)}
            icon={<CircleDollarSign />}
            size={"20px"}
            color={"gray"}
            variant={"none"}
            aria-label={"Pagar pedido"}
            isDisabled={row.original.estado.toLowerCase() !== "pendiente"}
            cursor={"pointer"}
          />
        </Tooltip>
      </Stack>
    ),
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
