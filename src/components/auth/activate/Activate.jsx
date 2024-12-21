import fondo from "@/assets/fondo_1.png";
import logo from "@/assets/logo.png";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useActivarMutation,
  useReactivarMutation,
} from "../../../servicios/redux/api/auth";

const Activate = () => {
  const [activar, { isLoading: isActivating }] = useActivarMutation();
  const [reactivar, { isLoading: isReactivating }] = useReactivarMutation();
  const [activationStatus, setActivationStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      activar({ token })
        .unwrap()
        .then((res) => {
          setActivationStatus("success");
        })
        .catch((error) => {
          console.log("Error al activar la cuenta:", error);

          if (error?.data === "El token ha expirado") {
            setActivationStatus("expired");
          } else if (error?.data === "El token es inválido") {
            setActivationStatus("invalid");
          } else if (error?.data === "Token no proporcionado") {
            setActivationStatus("missing");
          } else {
            setActivationStatus("error");
          }
        });
    } else {
      setActivationStatus("missing");
    }
  }, [token, activar]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleReactivation = () => {
    setEmailError("");

    if (!email) {
      setEmailError("Por favor ingresa tu correo electrónico");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Por favor ingresa un correo electrónico válido");
      return;
    }

    reactivar({ email })
      .unwrap()
      .then(() => {
        setActivationStatus("resent");
        setEmail(""); // Limpiar el email después de un reenvío exitoso
      })
      .catch((error) => {
        if (error?.data === "Este usuario ya está activado.") {
          setActivationStatus("activated");
        } else {
          setActivationStatus("error");
        }
      });
  };

  const renderActivationStatus = () => {
    if (isActivating || isReactivating) {
      return <Spinner size="xl" color="main.500" />;
    }

    const statusMessages = {
      success: {
        text: "Usuario activado correctamente",
        color: "main.500",
      },
      expired: {
        text: "El token ha expirado",
        color: "red.500",
      },
      invalid: {
        text: "El token proporcionado es inválido",
        color: "red.500",
      },
      missing: {
        text: "Token no proporcionado",
        color: "red.500",
      },
      resent: {
        text: "¡Enlace de activación reenviado! Revisa tu correo.",
        color: "main.500",
      },
      activated: {
        text: "¡Este usuario ya se encuentra activo!",
        color: "main.500",
      },
      error: {
        text: "Error al activar la cuenta. Por favor intenta más tarde.",
        color: "red.500",
      },
    };

    const status = statusMessages[activationStatus];
    if (!status) return null;

    return (
      <VStack spacing={4}>
        <Text fontSize="xl" color={status.color} textAlign="center">
          {status.text}
        </Text>
        {activationStatus !== "success" &&
        activationStatus !== "resent" &&
        activationStatus !== "activated" ? (
          <>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              ¿No recibiste el correo de activación?
            </Text>
            <FormControl isInvalid={!!emailError}>
              <Input
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                bg="white"
                color="gray.800"
                _placeholder={{ color: "gray.400" }}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="main"
              onClick={handleReactivation}
              isLoading={isReactivating}
              width="100%"
            >
              Reenviar enlace de activación
            </Button>
          </>
        ) : (
          <Link
            href="/"
            color="main.500"
            fontSize={"14px"}
            fontWeight={"medium"}
          >
            Ir al inicio
          </Link>
        )}
      </VStack>
    );
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
          p={8}
          borderRadius={8}
          boxShadow="lg"
          bg="rgba(0, 0, 0, 0.5)"
        >
          <VStack spacing={6} align="stretch">
            <Center mb={4}>
              <Image src={logo} alt="Logo del negocio" h="10vh" />
            </Center>
            {renderActivationStatus()}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Activate;
