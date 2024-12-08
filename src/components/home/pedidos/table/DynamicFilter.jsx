import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";

import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const DynamicFilter = ({
  setGlobalFilterFunction,
  setGlobalFilterValue,
  filteredRowsCount,
  totalRowsCount,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [estado, setEstado] = useState("");

  const globalFilterFn = useCallback(
    (row) => {
      const searchValue = searchTerm.toLowerCase();
      const rowValues = Object.values(row.original)
        .map(String)
        .join(" ")
        .toLowerCase();

      const searchMatch = rowValues.includes(searchValue);
      const estadoMatch = !estado || row.original.estado === estado;
      const rowDate = new Date(row.original.created_at);
      const dateMatch = !date || rowDate.toISOString().split("T")[0] === date;

      return searchMatch && dateMatch && estadoMatch;
    },
    [searchTerm, date, estado]
  );

  useEffect(() => {
    setGlobalFilterFunction(() => globalFilterFn);
    setGlobalFilterValue(
      JSON.stringify({
        searchTerm,
        date,
        estado,
      })
    );
  }, [
    globalFilterFn,
    searchTerm,
    date,
    estado,
    setGlobalFilterFunction,
    setGlobalFilterValue,
  ]);
  const options = [
    { value: "pendiente", label: "Pendiente" },
    { value: "pagado", label: "Pagado" },
    { value: "enviado", label: "Enviado" },
    { value: "entregado", label: "Entregado" },
    { value: "cancelado", label: "Cancelado" },
  ];
  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} gap={4} mb={4}>
        <InputGroup minW={{ base: "100%", md: "300px" }} flex="1">
          <InputLeftElement pointerEvents="none" height="100%">
            <SearchIcon size={"16px"} color="#7C8CA1" />
          </InputLeftElement>
          <Input
            placeholder="Buscar por nombre"
            bg="white"
            borderRadius="md"
            pl={10}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fontSize="14px"
            fontWeight="normal"
            color="#51616D"
            _placeholder={{ color: "#51616D", fontWeight: "normal" }}
          />
        </InputGroup>
        <HStack spacing={4}>
          <Input
            type="date"
            placeholder="Fecha"
            minW={{ base: "auto", md: "150px" }}
            bg="white"
            borderRadius="md"
            color="#51616D"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fontSize="14px"
            fontWeight="normal"
            _placeholder={{ color: "#51616D", fontWeight: "normal" }}
          />
          <Select
            placeholder="Todos"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            fontSize="14px"
            fontWeight="normal"
            color="#51616D"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </HStack>
      </Flex>
      <Flex
        direction={{ base: "row", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize="14px"
          fontWeight={"normal"}
          color="#51616D"
          mb={{ base: 2, md: 0 }}
        >
          {filteredRowsCount === totalRowsCount
            ? `${totalRowsCount} resultados`
            : `${filteredRowsCount} de ${totalRowsCount} resultados`}
        </Text>
      </Flex>
    </>
  );
};

export default DynamicFilter;
