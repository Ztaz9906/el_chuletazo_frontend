import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const CustomNumberInput = ({ value, onChange, min = 0, max = 99 }) => {
  return (
    <NumberInput
      bg="white"
      size="sm"
      maxW="60px"
      value={value}
      borderRadius="full"
      onChange={(valueString) => {
        const newValue = parseInt(valueString) || 0;
        onChange(Math.max(min, Math.min(newValue, max)));
      }}
      min={min}
      max={max}
    >
      <NumberInputField textAlign="center" fontSize="xs" />
      <NumberInputStepper>
        <NumberIncrementStepper bg="white" _active={{ bg: "gray.300" }} />
        <NumberDecrementStepper bg="white" _active={{ bg: "gray.300" }} />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default CustomNumberInput;
