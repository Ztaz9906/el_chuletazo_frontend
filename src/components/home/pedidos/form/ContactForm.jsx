import { Box, Button, Container } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RecipientInputs from "@/components/home/pedidos/form/RecipientInputs.jsx";
import ShipperInputs from "@/components/home/pedidos/form/ShipperInputs.jsx";
import { initialValues } from "@/components/home/pedidos/schema/initialValues.js";
import { validationSchema } from "@/components/home/pedidos/schema/validations.js";

const ContactForm = () => {
  return (
    <Container maxW="container.md" centerContent>
      <Box width="100%" maxWidth="800px" mt={8}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <Box display="flex" flexDirection="column" gap={4}>
                <RecipientInputs />
                <ShipperInputs />
              </Box>
              <Button type={"submit"} bg="main.10" textColor="white">
                Enviar a Pagar
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default ContactForm;
