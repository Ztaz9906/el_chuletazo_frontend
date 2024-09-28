import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { initialValues } from "@/components/auth/login/schema/initialValues.js";
import { validationSchema } from "@/components/auth/login/schema/validations.js";
import logo from "@/assets/logo.png";
import fondo from "@/assets/fondo_1.png";
import LoginForm from "@/components/auth/login/form/LoginForm";
import { useNavigate } from "react-router-dom";
import CustomGoogleLogin from "@/components/auth/google/GoogleLogin.jsx";
import { useLoginMutation } from "@/servicios/redux/api/auth/login/login.js";

export default function Login() {
  const toast = useToast();
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      await loginMutation(values).unwrap();
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/productos");
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error.data,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const buttonColors = {
    elegant: {
      bg: "#4A0E0E",
      hover: "#3D0C0C",
    },
    modern: {
      bg: "#FF4500",
    },
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <VStack
                    spacing={4}
                    justifyContent={"center"}
                    align={"center"}
                  >
                    <LoginForm />
                    <Button
                      type="submit"
                      mt={3}
                      isLoading={isSubmitting}
                      loadingText="Iniciando sesión"
                      spinner={<Spinner />}
                      w={"40%"}
                      bg={buttonColors.elegant.bg}
                      color="white"
                      _hover={{
                        bg: buttonColors.elegant.hover,
                      }}
                      borderRadius="full"
                      fontWeight="bold"
                    >
                      Iniciar Sesión
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
                        No tienes cuenta?
                      </Text>
                      <Link
                        href={"/sign-up"}
                        color={"white"}
                        fontWeight={"semibold"}
                        _hover={{
                          color: buttonColors.modern.bg,
                          textDecoration: "underline",
                        }}
                        fontSize={"14px"}
                      >
                        Registrarse
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
