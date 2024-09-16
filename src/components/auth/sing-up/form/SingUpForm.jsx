import { Grid } from "@chakra-ui/react";
import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";
import { formConfig } from "@/components/auth/sing-up/schema/form.js";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const SingUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Grid templateColumns={"repeat(2,1fr)"} gap={3}>
      <InputField
        name={formConfig.username.name}
        label={formConfig.username.label}
        placeholder="Ingrese su nombre de usuario"
        labelColor={"white"}
        placeholderColor={"whiteAlpha.500"}
        required
      />
      <InputField
        name={formConfig.email.name}
        label={formConfig.email.label}
        type="email"
        labelColor={"white"}
        placeholderColor={"whiteAlpha.500"}
        placeholder="Ingrese su correo electrónico"
        required
      />
      <InputField
        name={formConfig.password.name}
        label={formConfig.password.label}
        type={showPassword ? "text" : "password"}
        labelColor={"white"}
        placeholderColor={"whiteAlpha.500"}
        placeholder="Ingrese su contraseña"
        required
        rightIcon={
          showPassword ? (
            <EyeOffIcon
              color={"#FFFFFF80"}
              onClick={() => setShowPassword(!showPassword)}
              cursor="pointer"
            />
          ) : (
            <EyeIcon
              color={"#FFFFFF80"}
              onClick={() => setShowPassword(!showPassword)}
              cursor="pointer"
            />
          )
        }
      />
      <InputField
        name={formConfig.confirm_password.name}
        label={formConfig.confirm_password.label}
        type={showConfirmPassword ? "text" : "password"}
        labelColor={"white"}
        placeholderColor={"whiteAlpha.500"}
        placeholder="Confirme su contraseña"
        required
        rightIcon={
          showConfirmPassword ? (
            <EyeOffIcon
              color={"#FFFFFF80"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              cursor="pointer"
            />
          ) : (
            <EyeIcon
              color={"#FFFFFF80"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              cursor="pointer"
            />
          )
        }
      />
      <InputField
        name={formConfig.first_name.name}
        label={formConfig.first_name.label}
        labelColor={"white"}
        placeholderColor={"whiteAlpha.500"}
        placeholder="Ingrese su nombre"
        required
      />
      <InputField
        name={formConfig.last_name.name}
        label={formConfig.last_name.label}
        labelColor={"white"}
        placeholderColor={"whiteAlpha.500"}
        placeholder="Ingrese su apellido"
        required
      />
    </Grid>
  );
};

export default SingUpForm;
