import DestinatarioInputs from "@/components/home/pedidos/Stepper/steps/destinatario/DestinatarioInputs.jsx";
import { initialValues } from "@/components/home/pedidos/Stepper/steps/destinatario/schema/initialValues.js";
import { validationSchema } from "@/components/home/pedidos/Stepper/steps/destinatario/schema/validations.js";
import { usePostDestinatarioMutation } from "@/servicios/redux/api/Destinatarios/index.js";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { UserPlus } from "lucide-react";

export default function DestinatarioModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postDestinatario] = usePostDestinatarioMutation();
  async function handleSubmit(values, actions) {
    try {
      const destinatario = {
        direccion: values.direccion,
        ci: values.carneIdentidad,
        provincia: values.provincia,
        apellidos: values.apellidos,
        municipio: values.municipio,
        nombre: values.nombre,
        numero_casa: values.numeroCasa,
        telefono_celular: values.telefonoCelular,
        telefono_fijo: values.telefonoFijo,
      };

      await postDestinatario(destinatario);
      actions.resetForm();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button //Boton de Agregar Destinatarios
        colorScheme={"main"}
        px={4}
        py={2}
        leftIcon={<UserPlus size={18} color="white" />}
        onClick={onOpen}
        fontSize={[12, 14]}
      >
        Agregar Destinatario
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"20px"} fontWeight={"medium"} color={"#646A7A"}>
              Agregar Destinatario
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, submitForm }) => (
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
                    <Button colorScheme="cart" mr={3} onClick={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      onClick={() => {
                        submitForm().catch((error) => {
                          console.error("Form submission error:", error);
                        });
                      }}
                      colorScheme={"main"}
                      isLoading={isSubmitting}
                    >
                      Agregar
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
