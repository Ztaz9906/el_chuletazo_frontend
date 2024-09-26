import MultiStepperForm from "@/ChakaraUI/Stepper/Stepper.jsx";
import { Box, Button, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import { Check } from "lucide-react";
import ProductsList from "@/components/home/pedidos/Stepper/steps/productos/ProductsList.jsx";
import SelectDestinatario from "@/components/home/pedidos/Stepper/steps/destinatario/SelectDestinatario.jsx";
import RemitenteInputs from "@/components/home/pedidos/Stepper/steps/remitente/RemitenteInputs.jsx";
import ConfirmationStep from "@/components/home/pedidos/Stepper/steps/confirmacion/ConfirmationStep.jsx";
import { initialValues } from "@/components/home/pedidos/Stepper/schema/initialValues.js";
import { validationSchema } from "@/components/home/pedidos/Stepper/schema/validations.js";
import { useSelector } from "react-redux";
import { usePostPedidoMutation } from "@/servicios/redux/api/Pedidos/index.js";

const getActiveStep = (activeStep) => {
  switch (activeStep) {
    case 0:
      return <ProductsList />;
    case 1:
      return <SelectDestinatario />;
    case 2:
      return <RemitenteInputs />;
    case 3:
      return <ConfirmationStep />;
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
            <Heading fontWeight={"light"} size={"sm"} textColor={"gray.500"}>
              Hemos terminado de recoger toda la información necesaria
            </Heading>
          </Center>
        </Center>
      );
  }
};

export default function MainStepper() {
  const user = useSelector((state) => state.user);
  const [postPedido] = usePostPedidoMutation();
  const steps = [
    {
      title: "Productos",
      description: "Productos seleccionados para la compra",
    },
    { title: "Destinatario", description: "Seleccione un destinatario"},
    { title: "Remitente", description: "Datos del remitente" },
    { title: "Confirmacion", description: "Verifique todos los datos" },
  ];

  const handleSubmit = async (values, actions, stepper) => {
    // Verifica si es el último paso
    if (stepper.activeStep === steps.length) {
      try {
        // Realiza la petición al backend
        const pedido = {
          destinatario_id: values.destinatario_id,
          customer_id: user.customer_id,
          total: values.total,
          productos: values.productos,
          success_url: "http://localhost:3000/pedidos",
          cancel_url: "http://localhost:3000/",
        };
        const res = await postPedido(pedido).unwrap();
        if (res && res.checkout_url) {
          // Redirige a la URL de Stripe
          localStorage.removeItem("cart");
          window.location.href = res.checkout_url;
        }
      } catch (error) {
        console.error("Error al confirmar el pedido:", error);
      }
    } else {
      // Avanza al siguiente paso
      stepper.goToNext();
    }
  };

  return (
    <MultiStepperForm
      steps={steps}
      initialValues={initialValues}
      validations={validationSchema}
      handleSubmit={handleSubmit}
      validateOnMount={true}
    >
      {({ stepper, formikProps }) => (
        <Flex
          direction="column"
          h="calc(100vh - 200px)"
          p={4}
          bg="rgba(255, 255, 255, 0.6)"
          boxShadow="lg"
          mt={0}
          mr={4} 
          mb={4} 
          ml={4} 
        >
          <Box flex="1" overflow="hidden">
            <Box
              h="100%"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#c1c1c1",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#a8a8a8",
                },
              }}
            >
              {getActiveStep(stepper.activeStep)}
            </Box>
          </Box>
          <Stack direction="row" justifyContent="space-between" pt={2}>
            <Button
              onClick={() => {
                if (stepper.activeStep === 0) {
                  // Cancelar
                } else {
                  stepper.goToPrevious();
                }
              }}
              colorScheme="red"
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="base"
            >
              {stepper.activeStep === 0 ? "cancelar" : "anterior"}
            </Button>
            <Button
              isDisabled={!formikProps.isValid}
              fontWeight="base"
              colorScheme="green"
              type="submit"
              borderRadius="5px"
              textTransform="uppercase"
              fontSize="sm"
            >
              {steps.length !== stepper.activeStep
                ? "siguiente"
                : "Confirmar Pedido"}
            </Button>
          </Stack>
        </Flex>
      )}
    </MultiStepperForm>
  );
}