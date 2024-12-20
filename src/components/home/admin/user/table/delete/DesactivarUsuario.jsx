import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { CircleX } from "lucide-react";
import CustomAlertDialog from "../../../../../../ChakaraUI/AlertDialog/CustomAlertDialog";
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
          title: "Usuario desactivado",
          description: "El Usuario fue desactivado",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      if (res.error) {
        toast({
          title: "Error",
          description: res.error || "Error al desactivar el Usuario",
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
    <CustomAlertDialog
      onConfirm={handleDeleteUsuario}
      description="Esta acción desactivara al usuario en el sistema y no lo podra usar mas"
    >
      <Tooltip label={isLoading ? "Desactivando..." : "Desactivar Usuario"}>
        <IconButton
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
    </CustomAlertDialog>
  );
}
