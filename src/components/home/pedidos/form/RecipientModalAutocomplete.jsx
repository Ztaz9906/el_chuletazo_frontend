import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { UserPlus } from "lucide-react";
import { Form, Formik } from "formik";
import SelectField from "@/ChakaraUI/FormField/SelectField/SelectField.jsx";

export default function RecipientModalAutocomplete() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip
        label="Autocompletar datos del destinatario"
        hasArrow
        bg="gray.600"
      >
        <UserPlus size={24} color="#646A7A" cursor="pointer" onClick={onOpen} />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Completar Destinatario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ recipient: "" }}
              onSubmit={(values) => console.log(values)}
            >
              {() => (
                <Form>
                  <VStack spacing={4} align="stretch">
                    <SelectField
                      options={[
                        { value: "1", label: "Destinatario 1" },
                        { value: "2", label: "Destinatario 2" },
                        { value: "3", label: "Destinatario 3" },
                        { value: "4", label: "Destinatario 4" },
                        { value: "5", label: "Destinatario 5" },
                        { value: "6", label: "Destinatario 6" },
                        { value: "7", label: "Destinatario 7" },
                      ]}
                      name="recipient"
                      label="Destinatarios Guardados"
                      placeholder="Seleccione un destinatario"
                    />
                  </VStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <HStack w="full">
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <Button colorScheme="blue">Agregar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
