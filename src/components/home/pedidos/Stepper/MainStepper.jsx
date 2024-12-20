import MultiStepperForm from "@/ChakaraUI/Stepper/Stepper.jsx";
import { initialValues } from "@/components/home/pedidos/Stepper/schema/initialValues.js";
import { validationSchema } from "@/components/home/pedidos/Stepper/schema/validations.js";
import ConfirmationStep from "@/components/home/pedidos/Stepper/steps/confirmacion/ConfirmationStep.jsx";
import SelectDestinatario from "@/components/home/pedidos/Stepper/steps/destinatario/SelectDestinatario.jsx";
import ProductsList from "@/components/home/pedidos/Stepper/steps/productos/ProductsList.jsx";
import RemitenteInputs from "@/components/home/pedidos/Stepper/steps/remitente/RemitenteInputs.jsx";
import { usePostPedidoMutation } from "@/servicios/redux/api/Pedidos/index.js";
import { clearCart } from "@/servicios/redux/slices/productSliece.js";
import { Box, Button, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        <Center flexDirection={"column"} gap={2} h={"100%"}>
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
  const [postPedido, { isLoading }] = usePostPedidoMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const steps = [
    {
      title: "Productos",
      description: "Verifique los productos",
    },
    { title: "Destinatario", description: "Seleccione el destinatario" },
    { title: "Remitente", description: "Datos del remitente" },
    { title: "Confirmación", description: "Verifique todos los datos" },
  ];

  const handleSubmit = async (values, actions, stepper) => {
    // Verifica si es el último paso
    if (stepper.activeStep === steps.length) {
      try {
        // Realiza la petición al backend
        const pedido = {
          destinatario_id: values.destinatario_id,
          customer_id: user.customer_id,
          total: values.total.toFixed(2),
          productos: values.productos,
          success_url: `${window.location.origin}/pedidos`,
          cancel_url: `${window.location.origin}/pedidos`,
        };
        const res = await postPedido(pedido).unwrap();
        if (res && res.checkout_url) {
          // Redirige a la URL de Stripe
          dispatch(clearCart());
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
          p={4}
          bg="rgba(255, 255, 255, 0.6)"
          boxShadow="lg"
        >
          <Box flex="1">
            <Box
              h={["calc(100vh - 270px)", "calc(100vh - 270px)"]}
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
                  navigate("/productos");
                } else {
                  stepper.goToPrevious();
                }
              }}
              colorScheme="cart"
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="base"
            >
              {stepper.activeStep === 0 ? "cancelar" : "anterior"}
            </Button>
            <Button
              isDisabled={!formikProps.isValid}
              fontWeight="base"
              colorScheme="main"
              type="submit"
              borderRadius="5px"
              textTransform="uppercase"
              fontSize="sm"
              isLoading={formikProps.isSubmitting || isLoading}
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
