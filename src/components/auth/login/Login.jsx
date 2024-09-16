import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Link,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { initialValues } from "@/components/auth/login/schema/initialValues.js";
import { validationSchema } from "@/components/auth/login/schema/validations.js";

import logo from "@/assets/logo.png";
import fondo from "@/assets/fondo_1.png";

import LoginForm from "@/components/auth/login/form/LoginForm";
import { useLoginMutation } from "@/servicios/api/auth/login/login.js";

export default function Login() {
  const toast = useToast();
  const [loginMutation] = useLoginMutation();

  const handleSubmit = async (values, actions) => {
    try {
      await loginMutation(values);
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Aquí iría la redirección después del login exitoso
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Box
      backgroundImage={`url(${fondo})`}
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="xl" centerContent>
        <Box
          width="100%"
          p={3}
          borderRadius={8}
          boxShadow="lg"
          bg="rgba(0, 0, 0, 0.5)"
        >
          <VStack spacing={3} align="stretch">
            <Center mb={2} borderRadius={8} mt={4}>
              <Image src={logo} alt="Logo del negocio" h={"10vh"} />
            </Center>
            <Heading
              as="h1"
              size="lg"
              textAlign="center"
              color={"white"}
              mb={4}
            >
              Iniciar Sesión
            </Heading>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <VStack spacing={2}>
                    <LoginForm />
                    <Button
                      type="submit"
                      colorScheme="green"
                      width="full"
                      isLoading={isSubmitting}
                      loadingText="Iniciando sesión"
                      spinner={<Spinner />}
                      w={"40%"}
                    >
                      Iniciar Sesión
                    </Button>
                    <Link href={"/sign-up"} color={"white"}>
                      Registrarse
                    </Link>
                  </VStack>
                </Form>
              )}
            </Formik>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
