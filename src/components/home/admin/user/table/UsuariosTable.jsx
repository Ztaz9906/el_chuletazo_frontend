import CTable from "@/ChakaraUI/Table/CTable.jsx";

import { Badge, Stack } from "@chakra-ui/react";
import ActivarUsuario from "./delete/ActivarUsuario";
import DeleteUsuario from "./delete/DesactivarUsuario";
import DynamicFilter from "./DynamicFilter";

const columns = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Nombre",
    accessorKey: "first_name",
  },
  {
    header: "Apellidos",
    accessorKey: "last_name",
  },
  {
    header: "Telefono",
    accessorKey: "phone",
  },
  {
    header: "Activo",
    accessorKey: "is_active",
    cell: ({ row }) => {
      return (
        <Stack direction="row" spacing={2} align={"center"}>
          {row.original.is_active ? (
            <Badge colorScheme={"green"}>{"Activo"}</Badge>
          ) : (
            <Badge colorScheme={"gray"}>{"Inactivo"}</Badge>
          )}
        </Stack>
      );
    },
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <Stack direction="row" spacing={2} align={"center"}>
        {row.original.is_active ? (
          <DeleteUsuario id={row.original.id} />
        ) : (
          <ActivarUsuario id={row.original.id} />
        )}
      </Stack>
    ),
  },
];

export default function UsuariosTable({ usuarios, isLoading }) {
  const dataTable = {
    columns,
    rows: usuarios,
  };

  return (
    <CTable
      data={dataTable}
      DynamicFilters={DynamicFilter}
      isLoading={isLoading}
    />
  );
}
