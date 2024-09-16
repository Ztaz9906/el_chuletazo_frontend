import React from "react";
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
import { initialValues } from "@/components/auth/sing-up/schema/initialValues.js";
import { validationSchema } from "@/components/auth/sing-up/schema/validations.js";
import SingUpForm from "@/components/auth/sing-up/form/SingUpForm.jsx";
import logo from "@/assets/logo.png";
import fondo from "@/assets/fondo_1.png";
import { usePostUserMutation } from "@/servicios/api/user";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const [postUser, { isLoading }] = usePostUserMutation();

  const handleSubmit = async (values, actions) => {
    const { confirm_password, ...userData } = values;
    try {
      await postUser(userData).unwrap();
      toast({
        title: "Usuario registrado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      if (error.data) {
        // Handle specific field errors
        const { username, email } = error.data;
        if (username) {
          actions.setFieldError("username", username[0]);
        }
        if (email) {
          actions.setFieldError("email", email[0]);
        }
        // If there are field-specific errors, don't show the general error toast
      } else {
        // Show general error toast for other types of errors
        toast({
          title: "Error al registrar",
          description: "Ocurrió un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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
            <Heading as="h1" size="lg" textAlign="center" color={"white"}>
              Registro de Usuario
            </Heading>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <VStack spacing={2}>
                    <SingUpForm />
                    <Button
                      type="submit"
                      colorScheme="green"
                      width="full"
                      isLoading={isSubmitting || isLoading}
                      loadingText="Enviando"
                      spinner={<Spinner />}
                      w={"40%"}
                    >
                      Registrarse
                    </Button>
                    <Link href={"/login"} color={"white"}>
                      Iniciar Sesión
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
