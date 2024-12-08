import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Pencil } from "lucide-react";
import SelectField from "../../../../../ChakaraUI/FormField/SelectField/SelectField";
import { useUpdateStatusMutation } from "../../../../../servicios/redux/api/Pedidos";

const CambiarEstadoPedidoModal = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [patchPedido, { isLoading }] = useUpdateStatusMutation();
  const toast = useToast();

  const options = [
    { value: "enviado", label: "Enviado" },
    { value: "entregado", label: "Entregado" },
  ];

  const validationSchema = Yup.object().shape({
    estado: Yup.string()
      .required("El estado es requerido")
      .oneOf(
        options.map((opt) => opt.value),
        "Estado inválido"
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("id q le paso al mutate", id);
      const data = {
        id: id,
        estado: values.estado,
      };
      console.log("data", data);
      const result = await patchPedido(data).unwrap();

      toast({
        title: "Estado actualizado",
        description: `El pedido ha sido marcado como ${values.estado}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.data?.message || "No se pudo actualizar el estado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Tooltip label="Cambiar estado del pedido">
        <IconButton
          onClick={onOpen}
          icon={<Pencil />}
          size={"20px"}
          color={"gray"}
          _hover={{ color: "blue.500" }}
          variant={"link"}
          aria-label={"Cambiar estado"}
          cursor={"pointer"}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambiar Estado del Pedido</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{ estado: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody>
                  <SelectField
                    name="estado"
                    label="Nuevo Estado"
                    options={options}
                    placeholder="Selecciona un estado"
                    required
                  />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="cart" mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="main"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CambiarEstadoPedidoModal;
