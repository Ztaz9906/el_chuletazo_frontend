import ProductCard from "@/components/home/Productos/ProductCard.jsx";
import { useGetProductoQuery } from "@/servicios/redux/api/productos/get/get.js";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const sidebarOptions = [
  "Todos los productos",
  "Carne de Cerdo",
  "Cerdo Ahumado",
  "Embutidos",
  "Bebidas",
  "Los más vendidos",
];

const ITEMS_PER_PAGE = 10;

export default function Index() {
  const { isLoading, data, error } = useGetProductoQuery();
  const [showAnimation, setShowAnimation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("Todos los productos");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

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
      p={4}
      mr={8}
      ml={8}
    >
      <VStack spacing={4} align="stretch" mb={4}>
        <HStack w="full" justify="space-between">
          <Text
            fontSize="4xl"
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
        
        <Divider mb={4} borderColor="gray.300" />
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
          <Flex flexDirection="column">
            <Flex flexWrap="wrap" justifyContent="center" gap={4}>
              {currentProducts.length > 0 ? (
                currentProducts.map((producto) => (
                  <Box
                    key={producto.id}
                    flexBasis={{
                      base: "100%",
                      sm: "calc(50% - 2rem)",
                      md: "calc(33.333% - 2rem)",
                      lg: "calc(25% - 5rem)",
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Flex justifyContent="center" mt={6} mb={4}>
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  isDisabled={currentPage === 1}
                  variant="ghost"
                  mx={1}
                >
                  <ChevronLeft size={20} />
                </Button>

                {getPageNumbers().map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    variant={currentPage === pageNumber ? "solid" : "ghost"}
                    bg={
                      currentPage === pageNumber ? "green.500" : "transparent"
                    }
                    color={currentPage === pageNumber ? "white" : "black"}
                    _hover={{
                      bg: currentPage === pageNumber ? "green.600" : "green.50",
                    }}
                    mx={1}
                    borderRadius={"full"}
                  >
                    {pageNumber}
                  </Button>
                ))}

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                  variant="ghost"
                  mx={1}
                >
                  <ChevronRight size={20} />
                </Button>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
