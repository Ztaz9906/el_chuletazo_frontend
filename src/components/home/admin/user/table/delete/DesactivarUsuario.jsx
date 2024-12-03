import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { CircleX } from "lucide-react";
import { useDeleteUsuariosMutation } from "../../../../../../servicios/redux/api/user";

export default function DeleteUsuario({ id }) {
  const [deleteUsuario, { isLoading, error, isSuccess }] =
    useDeleteUsuariosMutation();
  const toast = useToast();
  async function handleDeleteUsuario() {
    try {
      const res = await deleteUsuario(id);
      if (res.data) {
        toast({
          title: "Usuario eliminado",
          description: "El Usuario fue eliminado correctamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      if (res.error) {
        toast({
          title: "Error",
          description: res.error || "Error al eliminar el Usuario",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Error al eliminar el Usuario",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <Tooltip label={isLoading ? "Desactivando..." : "Desactivar Usuario"}>
      <IconButton
        onClick={() => handleDeleteUsuario()}
        icon={<CircleX />}
        size={"20px"}
        color={"gray"}
        _hover={{ color: "red.500" }}
        variant={"none"}
        aria-label={"Desactivar Usuario"}
        cursor={"pointer"}
        isLoading={isLoading}
      />
    </Tooltip>
  );
}
