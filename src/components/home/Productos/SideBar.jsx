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
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";   

const sidebarOptions = {
    categories: {
      title: "Categorías",
      options: [
        "Todos los productos",
        "Carne de Cerdo",
        "Cerdo Ahumado",
        "Embutidos",
        "Bebidas",
        "Los más vendidos",
      ],
    },
    prices: {
      title: "Precios",
      options: [
        {label: "Menos de $10", value: {min:0, max:999}},
        {label: "$10 - $30", value: {min:1000, max:2999}},
        {label: "$30 - $50", value: {min:3000, max:4999}},
        {label: "$50 - $100", value: {min:5000, max:9999}},
        {label: "Más de $100", value: {min:10000, max:null}},
      ],
    },
  };
        
export default function SideBar({setSearchTerm}){
  const [selectedOption, setSelectedOption] = useState("Todos los productos");
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);

  function handleSelect(){
    setSearchTerm({categories:selectedOption, prices:selectedOptionPrice})
  }

  useEffect(()=> {handleSelect();}, [selectedOption, selectedOptionPrice])

    return(
        <VStack align="start" spacing={6}>
            <Box width="100%">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="green.600"
                mb={3}
              >
                {sidebarOptions.categories.title}
              </Text>
              <VStack align="start" spacing={2}>
                {sidebarOptions.categories.options.map((option) => (
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

            <Divider borderColor="gray.300" />

            <Box width="100%">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="green.600"
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
                    color="#5D5D5D"
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </VStack>
            </Box>
        </VStack>
    )
}