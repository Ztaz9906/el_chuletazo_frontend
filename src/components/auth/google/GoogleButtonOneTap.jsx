import { GoogleLogin } from "@react-oauth/google";

import { useGoogleLoginMutation } from "@/servicios/redux/api/auth/login/login.js";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function GoogleButtonOneTap({ useOneTap }) {
  const [googleLoginMutation] = useGoogleLoginMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleGoogleSuccess = async (response) => {
    try {
      console.log(response);
      await googleLoginMutation(response.credential).unwrap();
      toast({
        title: "Inicio de sesión con google exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
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
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleFailure}
      shape={"pill"}
      size={"large"}
      useOneTap={useOneTap}
    />
  );
}
