import MultiStepperForm from "@/ChakaraUI/Stepper/Stepper.jsx";
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  StackItem,
} from "@chakra-ui/react";
import { Check } from "lucide-react";

const getActiveStep = (activeStep, formConfig) => {
  switch (activeStep) {
    case 0:
      return <div>Paso 1</div>;
    case 1:
      return <div>Paso 2</div>;
    case 2:
      return <div>Paso 3</div>;
    case 3:
      return <div>Paso 4</div>;
    default:
      return (
        <Center flexDirection={"column"} gap={2}>
          <Box
            rounded={"full"}
            borderColor={"green.200"}
            p={1.5}
            border={"2px dashed green"}
          >
            <Check size={64} color={"green"} />
          </Box>
          <Center flexDirection={"column"} gap={2}>
            <Heading
              noOfLines={1}
              fontWeight={"semibold"}
              fontSize={"2xl"}
              textColor={"gray.700"}
            >
              Hecho
            </Heading>
            <Heading fontWeight={"ligth"} size={"sm"} textColor={"gray.500"}>
              Hemos terminado de recoger toda la información necesaria
            </Heading>
          </Center>
        </Center>
      );
  }
};
export default function MyForm() {
  const steps = [
    {
      title: "Productos",
      description: "Productos seleccionados para la compra",
    },
    { title: "Destinatario", description: "Seleccione un destinatario" },
    { title: "Remitente", description: "Datos dle remitente" },
    { title: "Confirmacion", description: "Verifique todos los datos" },
  ];

  const initialValues = {
    name: "",
    email: "",
  };

  const handleSubmit = (values, actions, stepper) => {
    // Lógica de envío del formulario
    console.log(values);
    stepper.goToNext();
  };

  return (
    <MultiStepperForm
      steps={steps}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    >
      {({ stepper, formikProps }) => (
        <Stack gap={4}>
          {getActiveStep(stepper.activeStep)}
          <StackItem display={"flex"} justifyContent={"space-between"} pt={3}>
            <Button
              onClick={() => {
                if (stepper.activeStep === 0) {
                  // Cancelar
                } else {
                  stepper.goToPrevious();
                }
              }}
              colorScheme={"red"}
              borderRadius={0}
              textTransform={"uppercase"}
              fontSize={"sm"}
              fontWeight={"base"}
            >
              {stepper.activeStep === 0 ? "cancelar" : "anterior"}
            </Button>
            <Button
              // isLoading={isMutatingE}
              // isDisabled={!isValid}
              fontWeight={"base"}
              colorScheme={"green"}
              type={"submit"}
              borderRadius={"5px"}
              textTransform={"uppercase"}
              fontSize={"sm"}
            >
              {steps.length !== stepper.activeStep
                ? "siguiente"
                : "Confirmar Pedido"}
            </Button>
          </StackItem>
        </Stack>
      )}
    </MultiStepperForm>
  );
}
