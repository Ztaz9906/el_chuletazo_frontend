import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";
import { validationSchema } from "@/components/home/pedidos/Stepper/steps/remitente/schema/validations.js";
import { usePatchUserMutation } from "@/servicios/redux/api/user/index.js";
import { setUser } from "@/servicios/redux/slices/userSlice.js";
import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { Edit, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formConfig } from "./schema/formConfig";

const LabelValue = ({ label, value }) => ( //campos de los datos personales ()
  <Box> 
    <Text fontSize="sm" fontWeight="bold" color="gray.600">
      {label}
    </Text>
    <Text fontSize="md">{value || "-"}</Text>
  </Box>
);

const DatosPersonales = () => {
  const user = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [patchUser, { isLoading }] = usePatchUserMutation();
  const dispatch = useDispatch();

  async function handleSubmit(values, setFieldError) {
    try {
      const userUpdate = {
        id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
      };
      console.log(userUpdate);
      const res = await patchUser(userUpdate).unwrap();
      console.log(res);
      dispatch(setUser({ id: user.id, ...res }));
      setEditing(false);
    } catch (error) {
      console.log(error);
      if (error.data && error.data.phone) {
        setFieldError(
          formConfig.phone.name,
          "Ya existe un usuario con ese numero de telefono"
        );
      } else {
        console.log(error);
      }
    }
  }
  const initialValues = React.useMemo(
    () => ({
      nombreEnvio: user.first_name || "",
      apellidosEnvio: user.last_name || "",
      telefonoEnvio: user.phone || "",
    }),
    [user]
  );
  return (
    <VStack align="stretch" spacing={0} bg="rgba(255, 255, 255, 0.6)" p={4} boxShadow="lg" mt={4} h="calc(100vh - 100px)">     
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setFieldError }) =>
          handleSubmit(values, setFieldError)
        }
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, submitForm, setFieldValue }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            setFieldValue(formConfig.first_name.name, user.first_name);
            setFieldValue(formConfig.last_name.name, user.last_name);
            setFieldValue(formConfig.phone.name, user.phone || "");
          }, [user, setFieldValue, editing]);
          return (
            <>
              <HStack justify="space-between" w="full" mt={2}>
                <Text fontSize="2xl" fontWeight="medium" color="main.600">
                  Datos Personales
                </Text>
                <Tooltip
                  label={
                    editing ? "Guardar cambios" : "Editar datos del remitente"
                  }
                  hasArrow
                  bg="gray.600"
                >
                  {editing ? (
                    <HStack>
                      <Button
                        size="sm"
                        colorScheme="cart"
                        onClick={() => setEditing(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        leftIcon={<Save size={20} />}
                        isDisabled={isSubmitting}
                        isLoading={isLoading}
                        size="sm"
                        colorScheme="main"
                        onClick={() => {
                          submitForm().catch((error) => {
                            console.error("Form submission error:", error);
                          });
                        }}
                      >
                        Guardar
                      </Button>
                    </HStack>
                  ) : (
                    <Edit
                      size={24}
                      color="#646A7A"
                      cursor="pointer"
                      onClick={() => setEditing(true)}
                    />
                  )}
                </Tooltip>
              </HStack>
              <Divider mb={6} borderColor="gray.300" />
              <Box
                borderWidth={1}
                borderRadius="lg"
                w="full"
                p={4}
                bg="white"
                shadow="sm"
              >
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  gap={2}
                  w="full"
                  margin={2}
                >
                  {editing ? (
                    <>
                      <InputField
                        name={formConfig.first_name.name}
                        label={formConfig.first_name.label}
                        isString
                      />
                      <InputField
                        name={formConfig.last_name.name}
                        label={formConfig.last_name.label}
                        isString
                      />
                      <InputField
                        name={formConfig.phone.name}
                        label={formConfig.phone.label}
                      />
                    </>
                  ) : (
                    <>
                      <LabelValue
                        label={formConfig.first_name.label}
                        value={values[formConfig.first_name.name]}
                      />
                      <LabelValue
                        label={formConfig.last_name.label}
                        value={values[formConfig.last_name.name]}
                      />
                      <LabelValue
                        label={formConfig.phone.label}
                        value={values[formConfig.phone.name]}
                      />
                    </>
                  )}
                </Grid>
              </Box>
            </>
          );
        }}
      </Formik>
    </VStack>
  );
};

export default DatosPersonales;
