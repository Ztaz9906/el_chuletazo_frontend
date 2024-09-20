import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";
import { Box, useToast } from "@chakra-ui/react";
import { useGoogleLoginMutation } from "@/servicios/redux/api/auth/login/login.js";

export default function CustomGoogleLogin({ useOneTap }) {
  const [googleLoginMutation] = useGoogleLoginMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleGoogleSuccess = async (response) => {
    try {
      await googleLoginMutation(response.credential).unwrap();
      toast({
        title: "Inicio de sesión con google exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/productos");
    } catch (error) {
      console.error("Error during google login:", error);
      toast({
        title: "Error al iniciar sesión con google",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Error de login con google:", error);
    toast({
      title: "Error al iniciar sesión con google",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box display={useOneTap ? "none" : "block"}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          shape={"pill"}
          size={"large"}
          useOneTap={useOneTap}
        />
      </GoogleOAuthProvider>
    </Box>
  );
}
