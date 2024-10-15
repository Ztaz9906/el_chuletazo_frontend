import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { CircleX, FilePenLine, Info } from "lucide-react";
import CTable from "@/ChakaraUI/Table/CTable.jsx";
import DynamicFilter from "@/components/home/configuration/destinatarios/Table/DynamicFilter.jsx";

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
    },
    {
        header: "Municipio",
        accessorKey: "municipio",
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
                <Tooltip label="Editar destinatario">
                    <IconButton
                        onClick={() => console.log("Editar destinatario", row.original)}
                        icon={<FilePenLine />}
                        size={"20px"}
                        color={"gray"}
                        variant={"none"}
                        aria-label={"Editar destinatario"}
                        cursor={"pointer"}
                    />
                </Tooltip>
                <Tooltip label="Eliminar destinatario">
                    <IconButton
                        onClick={() => console.log("Eliminar destinatario", row.original)}
                        icon={<CircleX />}
                        size={"20px"}
                        color={"gray"}
                        variant={"none"}
                        aria-label={"Eliminar destinatario"}
                        cursor={"pointer"}
                    />
                </Tooltip>
            </Stack>
        ),
    },
];

export default function DestinatariosTable({ destinatarios }) {
    if (!destinatarios || destinatarios.length === 0) {
        return <p>No hay destinatarios para mostrar.</p>;
    }

    const dataTable = {
        columns,
        rows: destinatarios,
    };

    return <CTable data={dataTable} DynamicFilters={DynamicFilter}/>;
}
