import ProductCard from "@/components/home/Productos/ProductCard.jsx";
import { useGetProductoQuery } from "@/servicios/redux/api/productos/get/get.js";
import {
  Box,
  Checkbox,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const sidebarOptions = [
  "Todos los productos",
  "Carne de Cerdo",
  "Cerdo Ahumado",
  "Embutidos",
  "Bebidas",
  "Los más vendidos",
];

export default function Index() {
  const { isLoading, data, error } = useGetProductoQuery();
  const [showAnimation, setShowAnimation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("Todos los productos");

  useEffect(() => {
    if (!isLoading && data) {
      console.log("Products data:", data);
      setShowAnimation(true);
    }

    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [isLoading, data, error]);

  const filteredProducts = data
    ? data.filter((producto) => {
        const nameMatch = producto.name
          ? producto.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false;
        const descriptionMatch = producto.description
          ? producto.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : false;
        return nameMatch || descriptionMatch;
      })
    : [];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={5}>
        <Text fontSize="xl" color="red.500">
          Error loading products. Please try again later.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      bg="white"
      shadow="md"
      p={2}
    >
      <VStack spacing={4} align="stretch" mb={4}>
        <HStack w="full" justify="space-between">
          <Text
            fontSize="48px"
            fontWeight="bold"
            color="green.500"
            textAlign="center"
          >
            Productos
          </Text>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray" size="18px" />
            </InputLeftElement>
            <Input
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </HStack>
        <Text fontSize="24px" textAlign="left" color="#5D5D5D">
          En nuestra tienda online usted podrá comprar y enviar productos a sus
          familiares y amigos en Cuba
        </Text>
      </VStack>
      <Flex flex={1} overflow="hidden">
        <Box
          width="200px"
          mr={8}
          bg="#EEFFE8"
          boxShadow="#00000040"
          p={4}
          overflowY="auto"
        >
          <VStack align="start" spacing={2}>
            {sidebarOptions.map((option) => (
              <Checkbox
                key={option}
                isChecked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                colorScheme="green"
                color="#5D5D5D"
              >
                {option}
              </Checkbox>
            ))}
          </VStack>
        </Box>
        <Box flex={1} overflowY="auto">
          <Flex flexWrap="wrap" justifyContent="center" gap={6}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((producto) => (
                <Box
                  key={producto.id}
                  flexBasis={{
                    base: "100%",
                    sm: "calc(50% - 1rem)",
                    md: "calc(33.333% - 1rem)",
                    lg: "calc(25% - 1rem)",
                  }}
                >
                  <ProductCard
                    producto={producto}
                    showAnimation={showAnimation}
                  />
                </Box>
              ))
            ) : (
              <Text fontSize="xl" color="gray.500">
                No se encontraron productos.
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
