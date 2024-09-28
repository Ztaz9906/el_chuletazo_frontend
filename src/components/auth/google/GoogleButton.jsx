import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { useGoogleLoginMutation } from "@/servicios/redux/api/auth/login/login.js";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  const [googleLoginMutation, { isLoading }] = useGoogleLoginMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log(response);
        await googleLoginMutation(response).unwrap();
        toast({
          title: "Inicio de sesión con Google exitoso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/productos");
      } catch (error) {
        console.error("Error during Google login:", error);
        toast({
          title: "Error al iniciar sesión con Google",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        console.log("Google login success:", response);
      }
    },
    onError: (error) => {
      console.error("Error de login con Google:", error);
      toast({
        title: "Error al iniciar sesión con Google",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <Button
      onClick={() => login()}
      isLoading={isLoading}
      loadingText="Iniciando sesión"
      spinner={<Spinner />}
      leftIcon={<FcGoogle />}
      width="100%"
      bg="white"
      color="gray.900"
      _hover={{ bg: "gray.100" }}
      borderRadius="full"
    >
      Continuar con Google
    </Button>
  );
}
