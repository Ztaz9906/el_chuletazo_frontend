import InputField from "@/ChakaraUI/FormField/InputField/InputField.jsx";
import { formConfig } from "@/components/auth/login/schema/form.js";
import { Grid } from "@chakra-ui/react";
import { EyeIcon, EyeOffIcon, LockIcon, User } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <Grid templateColumns={"repeat(1,1fr)"} gap={3} w={"90%"}>
      <InputField
        name={formConfig.email.name}
        label={formConfig.email.label}
        type="email"
        labelColor={"white"}
        placeholderColor={"grey"}
        color={"grey"}
        backgroundColor={"white"}
        placeholder="Ingrese su correo electrónico"
        leftIcon={<User color={"green"} />}
      />
      <InputField
        name={formConfig.password.name}
        label={formConfig.password.label}
        type={showPassword ? "password" : "text"}
        labelColor={"white"}
        placeholderColor={"grey"}
        color={"grey"}
        backgroundColor={"white"}
        placeholder="Ingrese su contraseña"
        leftIcon={<LockIcon color={"green"} />}
        rightIcon={
          showPassword ? (
            <EyeIcon
              color={"#000000"}
              onClick={() => setShowPassword(!showPassword)}
              cursor="pointer"
            />
          ) : (
            <EyeOffIcon
              color={"#000000"}
              onClick={() => setShowPassword(!showPassword)}
              cursor="pointer"
            />
          )
        }
      />
    </Grid>
  );
};

export default LoginForm;
