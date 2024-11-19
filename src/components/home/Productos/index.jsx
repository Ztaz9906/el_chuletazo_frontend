import ProductCard from "@/components/home/Productos/ProductCard.jsx";
import { useGetProductoQuery } from "@/servicios/redux/api/productos/get/get.js";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CustomDrawer from "../../../ChakaraUI/Drawer/CustomDrawer";
import SideBar from "./SideBar";

const ITEMS_PER_PAGE = 10;

export default function Index() {
  const { isLoading, data, error } = useGetProductoQuery();
  const [showAnimation, setShowAnimation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  function CustomFilter(producto) {
    // Si no hay filtro, devolver true
    console.log(filter);

    if (!filter) return true;

    // Búsqueda por término
    const contentMatch = !searchTerm
      ? true
      : (() => {
          // Limpia y divide los términos de búsqueda
          const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/);

          // Obtiene el contenido combinado para buscar
          const productContent = [
            producto.name || "",
            producto.description || "",
          ]
            .join(" ")
            .toLowerCase();

          // Verifica que todos los términos estén presentes
          return searchTerms.every((term) => productContent.includes(term));
        })();
    console.log(contentMatch);

    // Filtrado por precio
    const priceAmount = producto.default_price?.unit_amount || 0;
    const priceMatch = !filter.prices
      ? true
      : priceAmount >= (filter.prices.min || 0) &&
        (filter.prices.max === null || priceAmount <= filter.prices.max);
    console.log(priceMatch, priceAmount);

    return contentMatch && priceMatch;
  }

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
        return CustomFilter(producto);
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
      mr={2}
      ml={2}
    >
      <VStack spacing={4} align="stretch" mb={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          w="full"
          justify="space-between"
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color="green.500"
            textAlign="left"
          >
            Productos
          </Text>
          <HStack w={"full"} justifyContent={"flex-end"}>
            <InputGroup maxW={{ base: "auto", md: "400px" }}>
              <InputLeftElement
                pointerEvents="none"
                children={<Search size={18} color="#666666" />}
              />
              <Input
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="#EEFFE8"
                borderColor="gray.200"
                _hover={{
                  borderColor: "green.300",
                  bg: "#E4FFD9",
                }}
                _focus={{
                  borderColor: "green.400",
                  boxShadow: "0 0 0 1px #48BB78",
                  bg: "#EEFFE8",
                }}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </InputGroup>
            {isMobile && (
              <CustomDrawer
                trigger={<Filter size={24} color="#666666" strokeWidth={1.5} />}
                title={"Filtros"}
                menu={<SideBar setSearchTerm={setFilter} />}
              />
            )}
          </HStack>
        </Flex>

        <Divider mb={4} borderColor="gray.300" />
      </VStack>
      <Flex flex={1} overflow="hidden">
        {!isMobile && (
          <Box
            width="200px"
            mr={8}
            bg="#EEFFE8"
            boxShadow="#00000040"
            p={4}
            overflowY="auto"
          >
            <SideBar setSearchTerm={setFilter} />
          </Box>
        )}
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
