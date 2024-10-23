import {
  Box,
  Button,
  Grid,
  HStack,
  Text,
  Tooltip,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { Edit, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useFormikContext } from "formik";
import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";
import CheckboxField from "@/ChakaraUI/FormField/CheckBox/CheckBox.jsx";
import React, { useEffect, useState } from "react";
import { validationSchema } from "@/components/home/pedidos/Stepper/steps/remitente/schema/validations.js";
import { usePatchUserMutation } from "@/servicios/redux/api/user/index.js";
import { setUser } from "@/servicios/redux/slices/userSlice.js";
import { formConfig } from "@/components/home/pedidos/Stepper/steps/remitente/schema/formConfig.js";
import { formConfig as mainFormConfig } from "@/components/home/pedidos/Stepper/schema/formConfig.js";

const LabelValue = ({ label, value }) => (
  <Box>
    <Text fontSize="sm" fontWeight="bold" color="gray.600">
      {label}
    </Text>
    <Text fontSize="md">{value || "-"}</Text>
  </Box>
);

const RemitenteInputs = () => {
  const user = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [patchUser] = usePatchUserMutation();
  const dispatch = useDispatch();
  const { setFieldValue: MainSetFieldValue, errors } = useFormikContext();

  async function handleSubmit(values, setFieldError) {
    try {
      const userUpdate = {
        id: user.id,
        first_name: values.nombreEnvio,
        last_name: values.apellidosEnvio,
        phone: values.telefonoEnvio,
      };

      const res = await patchUser(userUpdate).unwrap();
      dispatch(setUser({ id: user.id, ...res }));
      setEditing(false);
      MainSetFieldValue(mainFormConfig.remitenteVaidado.name, !!res);
    } catch (error) {
      console.log(error);
      if (error.data && error.data.phone) {
        setFieldError(
          formConfig.usuarioEnvio.telefono.name,
          "Ya existe un usuario con ese numero de telefono",
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
    [user],
  );
  return (
    <VStack>
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
            if (user.phone && user.first_name && user.last_name) {
              MainSetFieldValue(mainFormConfig.remitenteValidado.name, true);
            }
            setFieldValue(formConfig.usuarioEnvio.nombre.name, user.first_name);
            setFieldValue(
              formConfig.usuarioEnvio.apellidos.name,
              user.last_name,
            );
            setFieldValue(
              formConfig.usuarioEnvio.telefono.name,
              user.phone || "",
            );
          }, [user, setFieldValue, editing]);
          return (
            <>
              <HStack justify="space-between" w="full" mt={2}>
                <Text fontSize="2xl" fontWeight="medium" color="main.600">
                  Remitente
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
              <Divider mb={4} borderColor="gray.300" />
              <Box borderWidth={1} borderRadius="lg" w="full" p={4} bg="white" shadow="sm">
              <Grid templateColumns="repeat(3, 1fr)" gap={2} w="full"margin={2}>
                {editing ? (
                  <>
                    <InputField
                      name={formConfig.usuarioEnvio.nombre.name}
                      label={formConfig.usuarioEnvio.nombre.label}
                    />
                    <InputField
                      name={formConfig.usuarioEnvio.apellidos.name}
                      label={formConfig.usuarioEnvio.apellidos.label}
                    />
                    <InputField
                      name={formConfig.usuarioEnvio.telefono.name}
                      label={formConfig.usuarioEnvio.telefono.label}
                    />
                  </>
                ) : (
                  <>
                    <LabelValue
                      label={formConfig.usuarioEnvio.nombre.label}
                      value={values[formConfig.usuarioEnvio.nombre.name]}
                    />
                    <LabelValue
                      label={formConfig.usuarioEnvio.apellidos.label}
                      value={values[formConfig.usuarioEnvio.apellidos.name]}
                    />
                    <LabelValue
                      label={formConfig.usuarioEnvio.telefono.label}
                      value={values[formConfig.usuarioEnvio.telefono.name]}
                    />
                  </>
                )}
              </Grid>
              <CheckboxField
                name={mainFormConfig.direccionFacturacionIgual.name}
                label={mainFormConfig.direccionFacturacionIgual.label}
              />
              </Box>
              {errors.remitenteValidado && (
                <Box
                  border
                  borderWidth={"1px"}
                  bg={"red.100"}
                  borderColor={"red.400"}
                  borderRadius={"5px"}
                  display={"flex"}
                  justifyContent={"center"}
                  textAlign={"center"}
                  textColor={"red.600"}
                  w={"100%"}
                >
                  {errors.remitenteValidado}
                </Box>
              )}
            </>
          );
        }}
      </Formik>
      
    </VStack>
  );
};

export default RemitenteInputs;
