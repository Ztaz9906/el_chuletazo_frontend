import {
  Flex,
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
  const [isActive, setIsActive] = useState("");
  const options = [
    { value: "true", label: "Activo" },
    { value: "false", label: "Inactivo" },
  ];

  const globalFilterFn = useCallback(
    (row) => {
      const searchValue = searchTerm.toLowerCase();
      const rowValues = Object.values(row.original)
        .map(String)
        .join(" ")
        .toLowerCase();

      const searchMatch = searchTerm === "" || rowValues.includes(searchValue);
      const isActiveMatch =
        isActive === "" || row.original.is_active.toString() === isActive;

      return searchMatch && isActiveMatch;
    },
    [searchTerm, isActive]
  );

  useEffect(() => {
    // Pass the entire filter function
    setGlobalFilterFunction(() => globalFilterFn);

    // Include both search term and active status in the global filter value
    setGlobalFilterValue(
      JSON.stringify({
        searchTerm,
        isActive,
      })
    );
  }, [
    globalFilterFn,
    searchTerm,
    isActive,
    setGlobalFilterFunction,
    setGlobalFilterValue,
  ]);

  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} gap={4} mb={4}>
        <InputGroup
          minW={{ base: "100%", md: "300px" }}
          maxW={"450px"}
          flex="1"
        >
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
        <Select
          placeholder="Todos"
          w={{ base: "100%", md: "200px" }}
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
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
