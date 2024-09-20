import { useField, useFormikContext } from "formik";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

const NumberInputField = ({ name, min = 0, max = 99, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const value = parseInt(field.value) || 0;

  const handleIncrement = () => {
    setFieldValue(name, Math.min(value + 1, max));
  };

  const handleDecrement = () => {
    setFieldValue(name, Math.max(value - 1, min));
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    setFieldValue(name, Math.max(min, Math.min(newValue, max)));
  };

  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      height={"30px"}
      display={"flex"}
      justifyContent={"flex-end"}
      maxW={"100px"}
      alignItems="center"
      bg="orange.100"
      rounded="md"
      shadow="inner"
    >
      <Button
        onClick={handleDecrement}
        bg="#b5c4bf"
        px={2}
        py={0}
        h="30px"
        minW="30px"
        borderRadius={0}
        roundedLeft="md"
        _hover={{ bg: "gray.400" }}
        fontSize="sm"
        textColor="#525252"
      >
        -
      </Button>

      <Input
        {...field}
        id={name}
        px={2}
        minW="40px"
        bg="white"
        shadow="innerCustom"
        value={value}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        textAlign="center"
        w="40px"
        h="30px"
        border="none"
        borderRadius={0}
        fontSize="sm"
        {...props}
      />

      <Button
        onClick={handleIncrement}
        bg="#b5c4bf"
        px={2}
        h="30px"
        minW="30px"
        borderRadius={0}
        roundedRight="md"
        _hover={{ bg: "gray.400" }}
        fontSize="sm"
        textColor="#525252"
      >
        +
      </Button>

      {meta.touched && meta.error ? (
        <FormErrorMessage fontSize="xs" fontWeight="semibold">
          {meta.error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default NumberInputField;
