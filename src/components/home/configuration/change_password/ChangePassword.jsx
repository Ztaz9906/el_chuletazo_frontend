import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";

import { useChangePasswordMutation } from "@/servicios/redux/api/auth/index.js";
import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { PasswordStrengthChecker } from "./PasswordStrengthCheker";
import { formConfig } from "./schema/formConfig";
import { initialValues } from "./schema/initialValues";
import { validationSchema } from "./schema/validations";
import Sidebar from "../SideBar/Sidebar";

const LabelValue = ({ label, value }) => (
  <Box>
    <Text fontSize="sm" fontWeight="bold" color="gray.600">
      {label}
    </Text>
    <Text fontSize="md">{value || "-"}</Text>
  </Box>
);

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword1, setShowConfirmPassword1] = useState(false);
  const [showConfirmPassword2, setShowConfirmPasswor2] = useState(false);

  async function handleSubmit(values, setFieldError) {
    try {
      const res = await changePassword(values).unwrap();
      console.log(res);
    } catch (error) {
      console.log("Error en submir", error);
      if (error.data && error.data.old_password) {
        setFieldError(formConfig.old_password.name, error.data.old_password[0]);
      } else {
        console.log(error);
      }
    }
  }

  return (
    <VStack
      align="stretch"
      spacing={1}
      bg="rgba(255, 255, 255, 0.6)"
      p={4}
      boxShadow="lg"
      mt={4}
      h="calc(100vh - 100px)"
      justify={"space-between"}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setFieldError }) =>
          handleSubmit(values, setFieldError)
        }
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, isValid, submitForm }) => {
          return (
            <>
              
              <Box>
                <HStack justify="space-between" w="full" mt={2}>
                  <Text fontSize="2xl" fontWeight="medium" color="main.600">
                    Cambiar Contraseña
                  </Text>
                </HStack>
                <Divider mb={6} borderColor="gray.300" />
                <Box w="full" p={4} borderWidth={1} borderRadius="lg" bg="white">
                  <Form>
                    <Grid
                      templateColumns="repeat(1, 1fr)"
                      gap={2}
                      w="full"
                      margin={2}
                    >
                      <InputField
                        name={formConfig.old_password.name}
                        label={formConfig.old_password.label}
                        type={showPassword ? "text" : "password"}
                        placeholderColor={"gray.500"}
                        placeholder="Ingrese su contraseña vieja"
                        required
                        rightIcon={
                          showPassword ? (
                            <EyeOffIcon
                              color={"#646A7A"}
                              onClick={() => setShowPassword(!showPassword)}
                              cursor="pointer"
                            />
                          ) : (
                            <EyeIcon
                              color={"#646A7A"}
                              onClick={() => setShowPassword(!showPassword)}
                              cursor="pointer"
                            />
                          )
                        }
                      />
                      <InputField
                        name={formConfig.new_password1.name}
                        label={formConfig.new_password1.label}
                        type={showConfirmPassword1 ? "text" : "password"}
                        placeholderColor={"gray.500"}
                        placeholder="Ingrese su contraseña nueva"
                        required
                        rightIcon={
                          showConfirmPassword1 ? (
                            <EyeOffIcon
                              color={"#646A7A"}
                              onClick={() =>
                                setShowConfirmPassword1(!showConfirmPassword1)
                              }
                              cursor="pointer"
                            />
                          ) : (
                            <EyeIcon
                              color={"#646A7A"}
                              onClick={() =>
                                setShowConfirmPassword1(!showConfirmPassword1)
                              }
                              cursor="pointer"
                            />
                          )
                        }
                      />
                      <InputField
                        name={formConfig.new_password2.name}
                        label={formConfig.new_password2.label}
                        type={showConfirmPassword2 ? "text" : "password"}
                        placeholderColor={"gray.500"}
                        placeholder="Confirme su contraseña nueva"
                        required
                        rightIcon={
                          showConfirmPassword2 ? (
                            <EyeOffIcon
                              color={"#646A7A"}
                              onClick={() =>
                                setShowConfirmPasswor2(!showConfirmPassword2)
                              }
                              cursor="pointer"
                            />
                          ) : (
                            <EyeIcon
                              color={"#646A7A"}
                              onClick={() =>
                                setShowConfirmPasswor2(!showConfirmPassword2)
                              }
                              cursor="pointer"
                            />
                          )
                        }
                      />

                      <PasswordStrengthChecker
                        password={values.new_password1}
                      />
                    </Grid>
                  </Form>
                </Box>
              </Box>

              <HStack justify="flex-end" w="full">
                <Button
                  colorScheme="main"
                  isDisabled={isSubmitting || isLoading || !isValid}
                  isLoading={isSubmitting || isLoading}
                  onClick={() => {
                    submitForm().catch((error) => {
                      console.error("Form submission error:", error);
                    });
                  }}
                >
                  Guardar
                </Button>
              </HStack>
            </>
          );
        }}
      </Formik>
    </VStack>
  );
};

export default ChangePassword;
