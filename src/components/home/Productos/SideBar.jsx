import {
  Box,
  Button,
  Checkbox,
  Divider,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const sidebarOptions = {
  categories: {
    title: "Categorías",
    options: [
      { label: "Todos los productos", value: null },
      { label: "Carne de Cerdo", value: "carne_cerdo" },
      { label: "Cerdo Ahumado", value: "cerdo_aumado" },
      { label: "Embutidos", value: "embutido" },
      { label: "Los más vendidos", value: "more_sales" },
    ],
  },
  prices: {
    title: "Precios",
    options: [
      { label: "Todos los precios", value: null },
      { label: "Menos de $10", value: { min: 0, max: 999 } },
      { label: "$10 - $30", value: { min: 1000, max: 2999 } },
      { label: "$30 - $50", value: { min: 3000, max: 4999 } },
      { label: "$50 - $100", value: { min: 5000, max: 9999 } },
      { label: "Más de $100", value: { min: 10000, max: null } },
    ],
  },
};

export default function SideBar({ setSearchTerm, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  function handleSelect() {
    setSearchTerm({ categories: selectedOption, prices: selectedOptionPrice });
  }

  useEffect(() => {
    handleSelect();
  }, [selectedOption, selectedOptionPrice]);

  return (
    <VStack align="start" spacing={6}>
      <Box width="100%">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={isMobile ? "white" : "gray.600"}
          mb={3}
        >
          {sidebarOptions.categories.title}
        </Text>
        <VStack align="start" spacing={2}>
          {sidebarOptions.categories.options.map((option) => (
            <Checkbox
              key={option.label}
              isChecked={selectedOption === option.value}
              onChange={() => setSelectedOption(option.value)}
              colorScheme="green"
              color={isMobile ? "#ffffff" : "#5D5D5D"}
            >
              {option.label}
            </Checkbox>
          ))}
        </VStack>
      </Box>

      <Divider borderColor="gray.300" />

      <Box width="100%">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={isMobile ? "white" : "gray.600"}
          mb={3}
        >
          {sidebarOptions.prices.title}
        </Text>
        <VStack align="start" spacing={2}>
          {sidebarOptions.prices.options.map((option) => (
            <Checkbox
              key={option.label}
              isChecked={selectedOptionPrice === option.value}
              onChange={() => setSelectedOptionPrice(option.value)}
              colorScheme="green"
              color={isMobile ? "#ffffff" : "#5D5D5D"}
            >
              {option.label}
            </Checkbox>
          ))}
        </VStack>
      </Box>
      {isMobile && (
        <Button colorScheme={"cart"} onClick={onClose} w="full">
          Aplicar Filtros
        </Button>
      )}
    </VStack>
  );
}
