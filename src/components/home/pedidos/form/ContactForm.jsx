import { Box, Button, Container } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RecipientInputs from "@/components/home/pedidos/form/RecipientInputs.jsx";
import ShipperInputs from "@/components/home/pedidos/form/ShipperInputs.jsx";
import { initialValues } from "@/components/home/pedidos/schema/initialValues.js";
import { validationSchema } from "@/components/home/pedidos/schema/validations.js";
import { usePostDestinatarioMutation } from "@/servicios/redux/api/Destinatarios/index.js";
import { useSelector } from "react-redux";
// Asegúrate de importar correctamente tu hook de mutación
// import { usePostPedidoMutation } from "@/services/api";

const ContactForm = () => {
  const user = useSelector((state) => state.user);
  // Descomentar y usar el hook si tienes configurado RTK Query o algún sistema de API
  // const [postPedido, { isLoading }] = usePostPedidoMutation();
  const [postDestinatario, { isLoading }] = usePostDestinatarioMutation();
  async function handleSubmit(values, actions) {
    try {
      console.log(values);
      if (values.guardarDestinatario) {
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
          usuario: [user.id],
        };
        console.log("Guardando destinatario...", destinatario);
        await postDestinatario(destinatario);
      }
      // Enviar datos a la API o backend
      // await postPedido(values);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxW="container.md" centerContent>
      <Box width="100%" maxWidth="800px" mt={8}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={4}>
                <RecipientInputs />
                <ShipperInputs />
                <Button
                  type="submit"
                  bg="main.10"
                  textColor="white"
                  isLoading={isSubmitting} // Desactiva el botón y muestra el estado de carga
                >
                  Enviar a Pagar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default ContactForm;