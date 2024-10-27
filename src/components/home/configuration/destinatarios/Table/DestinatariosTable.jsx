import CTable from "@/ChakaraUI/Table/CTable.jsx";
import DynamicFilter from "@/components/home/configuration/destinatarios/Table/DynamicFilter.jsx";
import { Stack } from "@chakra-ui/react";
import DeleteDestinatario from "../delete/DeleteDestinatario";
import DestinatarioEditModal from "../edit/DestinatarioEditModal";

const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Apellidos",
    accessorKey: "apellidos",
  },
  {
    header: "Dirección",
    accessorKey: "direccion",
  },
  {
    header: "CI",
    accessorKey: "ci",
  },
  {
    header: "Provincia",
    accessorKey: "provincia",
    accessorFn: (row) => row.provincia.name,
  },
  {
    header: "Municipio",
    accessorKey: "municipio",
    accessorFn: (row) => row.municipio.name,
  },
  {
    header: "Número de Casa",
    accessorKey: "numero_casa",
  },
  {
    header: "Teléfono Celular",
    accessorKey: "telefono_celular",
  },
  {
    header: "Teléfono Fijo",
    accessorKey: "telefono_fijo",
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <Stack direction="row" spacing={2} align={"center"}>
        <DestinatarioEditModal row={row.original} />
        <DeleteDestinatario id={row.original.id} />
      </Stack>
    ),
  },
];

export default function DestinatariosTable({ destinatarios, isLoading }) {
  if (!destinatarios || destinatarios.length === 0) {
    return <p>No hay destinatarios para mostrar.</p>;
  }

  const dataTable = {
    columns,
    rows: destinatarios,
  };

  return (
    <CTable
      data={dataTable}
      DynamicFilters={DynamicFilter}
      isLoading={isLoading}
    />
  );
}
