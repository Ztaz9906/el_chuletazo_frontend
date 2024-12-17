import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { CheckCircleIcon } from "lucide-react";
import CustomAlertDialog from "../../../../../../ChakaraUI/AlertDialog/CustomAlertDialog";
import { usePatchUserMutation } from "../../../../../../servicios/redux/api/user";

export default function ActivarUsuario({ id }) {
  const [activarUsuario, { isLoading, error, isSuccess }] =
    usePatchUserMutation();
  const toast = useToast();
  async function handleActivateUsuario() {
    try {
      const data = {
        id: id,
        is_active: true,
      };
      const res = await activarUsuario(data);
      if (res.data) {
        toast({
          title: "Usuario Activado",
          description: "El Usuario fue activado",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      if (res.error) {
        toast({
          title: "Error",
          description: res.error || "Error al activar el Usuario",
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
      onConfirm={handleActivateUsuario}
      description="Esta acción reactivara al usuario en el sistema"
    >
      <Tooltip label={isLoading ? "Activando..." : "Activar Usuario"}>
        <IconButton
          icon={<CheckCircleIcon />}
          size={"20px"}
          color={"gray"}
          _hover={{ color: "main.500" }}
          variant={"none"}
          aria-label={"Activar Usuario"}
          cursor={"pointer"}
          isLoading={isLoading}
        />
      </Tooltip>
    </CustomAlertDialog>
  );
}
