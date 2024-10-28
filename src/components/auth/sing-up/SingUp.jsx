import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  Divider,
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
import { useNavigate } from "react-router-dom";
import CustomGoogleLogin from "@/components/auth/google/GoogleLogin.jsx";
import { usePostUserMutation } from "@/servicios/redux/api/user/index.js";
import { motion, AnimatePresence } from "framer-motion";

const MotionModalContent = motion(ModalContent);

const SignUp = ({ isOpen, onClose }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [postUser] = usePostUserMutation();

  const buttonColors = {
    elegant: {
      bg: "green.500",
      hover: "cart.300",
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
      onClose();
      navigate("/productos");
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
      } else {
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
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay
            bg="rgba(0, 0, 0, 0.5)"
            backdropFilter="blur(8px)"
          />
          <MotionModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            bg="rgba(255, 255, 255, 0.6)"
            borderRadius="xl"
            maxW="md"
          >
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
                      <VStack spacing={4}>
                        <SingUpForm />
                        <Button
                          type="submit"
                          mt={3}
                          w="40%"
                          isLoading={isSubmitting}
                          loadingText="Registrando"
                          spinner={<Spinner />}
                          bg={buttonColors.elegant.bg}
                          color="white"
                          _hover={{
                            bg: buttonColors.elegant.hover,
                          }}
                          borderRadius="full"
                          fontWeight="bold"
                        >
                          Registrarse
                        </Button>
                        <HStack align="center" justify="center" width="100%">
                          <Divider borderColor="white" width="40%" />
                          <Text color="gray.600">Ó</Text>
                          <Divider borderColor="white" width="40%" />
                        </HStack>
                        <CustomGoogleLogin />
                        <HStack align="center" justify="center" width="100%">
                          <Text color="gray.600" fontSize="14px">
                            ¿Ya tienes cuenta?
                          </Text>
                          <Link
                            onClick={() => {
                              onClose();
                              navigate("/login");
                            }}
                            color="green.500"
                            fontWeight="semibold"
                            _hover={{
                              textDecoration: "underline",
                              color: "cart.300",
                            }}
                            fontSize="14px"
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
          </MotionModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SignUp;