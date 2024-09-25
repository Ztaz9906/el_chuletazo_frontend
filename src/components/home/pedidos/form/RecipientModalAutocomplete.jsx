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
  useDisclosure,
} from "@chakra-ui/react";
import { UserPlus } from "lucide-react";
import SelectField from "@/ChakaraUI/FormField/SelectField/SelectField.jsx";
import { useGetDestinatarioQuery } from "@/servicios/redux/api/Destinatarios/index.js";
import { useFormikContext } from "formik";
import { useState } from "react";
import { formConfig } from "@/components/home/pedidos/form/schema/formConfig.js";

export default function RecipientModalAutocomplete() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, error } = useGetDestinatarioQuery();
  const { values, setFieldValue } = useFormikContext(); // Para autocompletar los campos del formulario
  const [selectedRecipientCI, setSelectedRecipientCI] = useState(null); // Guardar CI del destinatario seleccionado

  return (
    <>
      <Button
        colorScheme={"green"}
        leftIcon={<UserPlus size={24} color="#646A7A" />}
        onClick={onOpen}
      >
        Registrar Destinatario
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Completar Destinatario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Select para destinatarios guardados */}
            <SelectField
              options={
                data
                  ? data.map((destinatario) => ({
                      value: destinatario.id, // El value es el CI del destinatario
                      label: `${destinatario.nombre} ${destinatario.apellidos}`, // Mostrar el nombre completo
                    }))
                  : []
              }
              name={formConfig.destinatarios.name}
              label={formConfig.destinatarios.label}
              placeholder="Seleccione un destinatario"
            />
          </ModalBody>
          <ModalFooter>
            <HStack w="full">
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <Button colorScheme="blue">Autocompletar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
