import DestinatarioInputs from "@/components/home/pedidos/Stepper/steps/destinatario/DestinatarioInputs.jsx";
import { validationSchema } from "@/components/home/pedidos/Stepper/steps/destinatario/schema/validations.js";
import { usePatchDestinatarioMutation } from "@/servicios/redux/api/Destinatarios/index.js";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Pencil } from "lucide-react";
import { formConfig } from "../../../pedidos/Stepper/schema/formConfig";

export default function DestinatarioEditModal({ row }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [patchDestinatario] = usePatchDestinatarioMutation();

  // Crear los valores iniciales basados en el row
  const getInitialValues = () => ({
    [formConfig.destinatario.nombre.name]: row.nombre || "",
    [formConfig.destinatario.apellidos.name]: row.apellidos || "",
    [formConfig.destinatario.carneIdentidad.name]: row.ci || "",
    [formConfig.destinatario.telefonoCelular.name]: row.telefono_celular || "",
    [formConfig.destinatario.telefonoFijo.name]: row.telefono_fijo || "",
    [formConfig.destinatario.direccion.direccion.name]: row.direccion || "",
    [formConfig.destinatario.direccion.provincia.name]: row.provincia?.id || "",
    [formConfig.destinatario.direccion.municipio.name]: row.municipio?.id || "",
    [formConfig.destinatario.direccion.numeroCasa.name]: row.numero_casa || "",
  });

  async function handleSubmit(values, actions) {
    try {
      const destinatario = {
        id: row.id,
        direccion: values[formConfig.destinatario.direccion.direccion.name],
        ci: values[formConfig.destinatario.carneIdentidad.name],
        provincia: values[formConfig.destinatario.direccion.provincia.name],
        apellidos: values[formConfig.destinatario.apellidos.name],
        municipio: values[formConfig.destinatario.direccion.municipio.name],
        nombre: values[formConfig.destinatario.nombre.name],
        numero_casa: values[formConfig.destinatario.direccion.numeroCasa.name],
        telefono_celular: values[formConfig.destinatario.telefonoCelular.name],
        telefono_fijo: values[formConfig.destinatario.telefonoFijo.name],
      };

      if (row.id) {
        console.log("Actualizando destinatario...", destinatario);
        await patchDestinatario(destinatario);
        console.log("Destinatario actualizado");
      }
    } catch (error) {
      console.log(error);
    } finally {
      actions.resetForm();
      actions.setSubmitting(false);
      onClose();
    }
  }

  return (
    <>
      <Tooltip label="Editar destinatario">
        <IconButton
          onClick={onOpen}
          icon={<Pencil />}
          size={"20px"}
          color={"gray"}
          _hover={{ color: "main.500" }}
          variant={"none"}
          aria-label={"Editar destinatario"}
          cursor={"pointer"}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"20px"} fontWeight={"medium"} color={"#646A7A"}>
              Editar Destinatario
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={getInitialValues()}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ isSubmitting, handleSubmit }) => (
              <>
                <ModalBody>
                  <Form>
                    <Box display="flex" flexDirection="column" gap={4}>
                      <DestinatarioInputs />
                    </Box>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <HStack w="full" justify={"space-between"}>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      colorScheme={"main"}
                      isLoading={isSubmitting}
                    >
                      Guardar cambios
                    </Button>
                  </HStack>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
