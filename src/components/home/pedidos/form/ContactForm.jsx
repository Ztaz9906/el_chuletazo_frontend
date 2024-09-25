import { Box, Button, Container } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import DestinatarioInputs from "@/components/home/pedidos/Stepper/steps/destinatario/DestinatarioInputs.jsx";
import ShipperInputs from "@/components/home/pedidos/form/ShipperInputs.jsx";
import { initialValues } from "@/components/home/pedidos/form/schema/initialValues.js";
import { validationSchema } from "@/components/home/pedidos/form/schema/validations.js";
import { usePostDestinatarioMutation } from "@/servicios/redux/api/Destinatarios/index.js";
import { useSelector } from "react-redux";
import { usePostPedidoMutation } from "@/servicios/redux/api/Pedidos/index.js";

const ContactForm = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [postPedido] = usePostPedidoMutation();
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
      const total = cart.products.reduce((sum, product) => {
        return (
          sum + (product.default_price.unit_amount / 100) * product.quantity
        );
      }, 0);
      let res = values.destinatarios;
      if (values.guardarDestinatario) {
        console.log("Guardando destinatario...", destinatario);
        res = await postDestinatario(destinatario);
      }
      console.log("Destinatario guardado", res);
      const productos = cart.products.map((product) => {
        return {
          stripe_product_id: product.stripe_product_id,
          price: product.default_price.stripe_price_id,
          quantity: product.quantity,
        };
      });
      const pedido = {
        destinatario_id: res.data.id,
        customer_id: user.customer_id,
        total: total,
        productos: productos,
        success_url: "http://localhost:3000/pedidos",
        cancel_url: "http://localhost:3000/pedidos",
      };
      console.log("Enviando pedido...", pedido);
      await postPedido(pedido);
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
                <DestinatarioInputs />
                <ShipperInputs />
                <Button
                  type="submit"
                  bg="main.10"
                  textColor="white"
                  isLoading={isSubmitting} // Desactiva el botón y muestra el estado de carga
                >
                  Confirmar Pedido
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
