import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { CircleX } from "lucide-react";
import { useDeleteDestinatarioMutation } from "../../../../../servicios/redux/api/Destinatarios";

export default function DeleteDestinatario({ id }) {
  const [deleteDestinatario, { isLoading, error, isSuccess }] =
    useDeleteDestinatarioMutation();
  const toast = useToast();
  async function handleDeleteDestinatario() {
    try {
      const res = await deleteDestinatario(id);
      if (res.data) {
        toast({
          title: "Destinatario eliminado",
          description: "El destinatario fue eliminado correctamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      if (res.error) {
        toast({
          title: "Error",
          description: res.error || "Error al eliminar el destinatario",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Error al eliminar el destinatario",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <Tooltip label={isLoading ? "Eliminando..." : "Eliminar destinatario"}>
      <IconButton
        onClick={() => handleDeleteDestinatario()}
        icon={<CircleX />}
        size={"20px"}
        color={"gray"}
        _hover={{ color: "red.500" }}
        variant={"none"}
        aria-label={"Eliminar destinatario"}
        cursor={"pointer"}
        isLoading={isLoading}
      />
    </Tooltip>
  );
}
