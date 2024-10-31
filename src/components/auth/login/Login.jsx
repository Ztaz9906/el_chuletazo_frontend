import logo from "@/assets/logo.png";
import CustomGoogleLogin from "@/components/auth/google/GoogleLogin.jsx";
import LoginForm from "@/components/auth/login/form/LoginForm";
import { initialValues } from "@/components/auth/login/schema/initialValues.js";
import { validationSchema } from "@/components/auth/login/schema/validations.js";
import { useLoginMutation } from "@/servicios/redux/api/auth/login/login.js";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, toggleAuthMode }) => {
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
      onClose();
      navigate("/");
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
      bg: "green.500",
      hover: "cart.300",
    },
    modern: {
      bg: "#FF4500",
    },
  };

  return (
    <Box p={6}>
      <VStack spacing={3} align="stretch">
        <Center mb={2}>
          <Image src={logo} alt="Logo del negocio" h={"10vh"} />
        </Center>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack spacing={4} align="center">
                <LoginForm />
                <Button
                  type="submit"
                  mt={3}
                  isLoading={isSubmitting}
                  loadingText="Iniciando sesión"
                  spinner={<Spinner />}
                  w="40%"
                  bg={buttonColors.elegant.bg}
                  color="white"
                  _hover={{
                    bg: buttonColors.elegant.hover,
                  }}
                  borderRadius="full"
                >
                  Iniciar Sesión
                </Button>
                <HStack align="center" justify="center" width="100%">
                  <Divider borderColor="white" width="40%" />
                  <Text color="gray.600">Ó</Text>
                  <Divider borderColor="white" width="40%" />
                </HStack>
                <CustomGoogleLogin />
                <HStack align="center" justify="center" width="100%">
                  <Text color="gray.600" fontSize="14px">
                    ¿No tienes cuenta?
                  </Text>
                  <Link
                    onClick={toggleAuthMode}
                    color={"green.500"}
                    fontWeight="semibold"
                    _hover={{
                      textDecoration: "underline",
                      color: "cart.300",
                    }}
                    fontSize="14px"
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
  );
};

export default Login;
