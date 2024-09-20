import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { initialValues } from "@/components/auth/sing-up/schema/initialValues.js";
import { validationSchema } from "@/components/auth/sing-up/schema/validations.js";
import SingUpForm from "@/components/auth/sing-up/form/SingUpForm.jsx";
import logo from "@/assets/logo.png";
import fondo from "@/assets/fondo_1.png";
import { useNavigate } from "react-router-dom";
import CustomGoogleLogin from "@/components/auth/google/GoogleLogin.jsx";
import { usePostUserMutation } from "@/servicios/redux/api/user/index.js";

export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const [postUser, { isLoading }] = usePostUserMutation();
  const buttonColors = {
    elegant: {
      bg: "#4A0E0E",
      hover: "#3D0C0C",
    },
    modern: {
      bg: "#FF4500",
    },
  };
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
                  <VStack spacing={4}>
                    <SingUpForm />
                    <Button
                      type="submit"
                      mt={3}
                      w="40%"
                      isLoading={isSubmitting || isLoading}
                      loadingText="Enviando"
                      spinner={<Spinner />}
                      bg={buttonColors.elegant.bg}
                      _hover={{
                        bg: buttonColors.elegant.hover,
                      }}
                      color={"white"}
                      borderRadius="full"
                      fontWeight="bold"
                    >
                      Registrarse
                    </Button>
                    <HStack align={"center"} justify={"center"} width="100%">
                      <Divider borderColor="white" width="40%" />
                      <Text color={"white"}>O</Text>
                      <Divider borderColor="white" width="40%" />
                    </HStack>
                    <CustomGoogleLogin />
                    <HStack align={"center"} justify={"center"} width="100%">
                      <Text
                        color={"white"}
                        fontWeight={"medium"}
                        fontSize={"14px"}
                      >
                        Ya tienes cuenta?
                      </Text>
                      <Link
                        href={"/login"}
                        color={"white"}
                        fontWeight={"semibold"}
                        _hover={{
                          color: buttonColors.modern.bg,
                          textDecoration: "underline",
                        }}
                        fontSize={"14px"}
                      >
                        Iniciar Sesión
                      </Link>
                    </HStack>
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
