import {
  List,
  ListIcon,
  ListItem,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, CircleAlert } from "lucide-react";

export const PasswordStrengthChecker = ({ password }) => {
  const requirements = [
    {
      text: "Mínimo 8 caracteres",
      test: (pass) => pass.length >= 8,
    },
    {
      text: "Al menos una mayúscula",
      test: (pass) => /[A-Z]/.test(pass),
    },
    {
      text: "Al menos un número",
      test: (pass) => /[0-9]/.test(pass),
    },
    {
      text: "Al menos un carácter especial (.,-+*)",
      test: (pass) => /[.,:;!@#$%^&*+\-=?_~()]/.test(pass),
    },
  ];

  const getStrengthPercentage = () => {
    if (!password) return 0;
    const validRequirements = requirements.filter((req) => req.test(password));
    return (validRequirements.length / requirements.length) * 100;
  };

  const strengthPercentage = getStrengthPercentage();
  const getProgressColor = (strength) => {
    if (strength < 25) return "wine";
    if (strength < 50) return "orange";
    if (strength < 75) return "yellow";
    return "green";
  };
  console.log(strengthPercentage);
  return (
    <VStack align="stretch" spacing={2} w="full" mt={2}>
      <Progress
        hasStripe
        value={strengthPercentage}
        colorScheme={getProgressColor(strengthPercentage)}
        size="sm"
        borderRadius="full"
      />
      <List spacing={1}>
        {requirements.map((req, index) => (
          <ListItem
            key={index}
            fontSize="sm"
            display="flex"
            alignItems="center"
          >
            <ListIcon
              as={req.test(password) ? CheckCircleIcon : CircleAlert}
              color={req.test(password) ? "green.500" : "red.400"}
            />
            <Text color={req.test(password) ? "green.500" : "red.600"}>
              {req.text}
            </Text>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};
