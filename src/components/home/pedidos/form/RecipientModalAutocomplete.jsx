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
} from "@chakra-ui/react";
import { UserPlus } from "lucide-react";
import SelectField from "@/ChakaraUI/FormField/SelectField/SelectField.jsx";
import { useGetDestinatarioQuery } from "@/servicios/redux/api/Destinatarios/index.js";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { formConfig } from "@/components/home/pedidos/form/schema/formConfig.js";

export default function RecipientModalAutocomplete() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, error } = useGetDestinatarioQuery();
  const { values, setFieldValue } = useFormikContext(); // Para autocompletar los campos del formulario
  const [selectedRecipientCI, setSelectedRecipientCI] = useState(null); // Guardar CI del destinatario seleccionado

  useEffect(() => {
    setSelectedRecipientCI(values.destinatarios);
  }, [values.destinatarios, selectedRecipientCI]);

  const handleAutoComplete = () => {
    if (selectedRecipientCI && data) {
      // Buscar el destinatario correspondiente por CI
      const destinatarioSeleccionado = data.find(
        (destinatario) => destinatario.id === selectedRecipientCI,
      );
      if (destinatarioSeleccionado) {
        // Autocompletar los campos del formulario con el destinatario seleccionado
        setFieldValue(
          formConfig.destinatario.nombre.name,
          destinatarioSeleccionado.nombre,
        );
        setFieldValue(
          formConfig.destinatario.apellidos.name,
          destinatarioSeleccionado.apellidos,
        );
        setFieldValue(
          formConfig.destinatario.direccion.direccion.name,
          destinatarioSeleccionado.direccion,
        );
        setFieldValue(
          formConfig.destinatario.direccion.numeroCasa.name,
          destinatarioSeleccionado.numero_casa,
        );
        setFieldValue(
          formConfig.destinatario.telefonoFijo.name,
          destinatarioSeleccionado.telefono_fijo,
        );
        setFieldValue(
          formConfig.destinatario.telefonoCelular.name,
          destinatarioSeleccionado.telefono_celular,
        );
        setFieldValue(
          formConfig.destinatario.carneIdentidad.name,
          destinatarioSeleccionado.ci,
        );
        setFieldValue(
          formConfig.destinatario.direccion.provincia.name,
          destinatarioSeleccionado.provincia,
        );
        setFieldValue(
          formConfig.destinatario.direccion.municipio.name,
          destinatarioSeleccionado.municipio,
        );
        onClose();
      } else {
        console.error("Recipient not found");
      }
    } else {
      console.error("Data not available");
    }
  };

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
              <Button colorScheme="blue" onClick={handleAutoComplete}>
                Autocompletar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
