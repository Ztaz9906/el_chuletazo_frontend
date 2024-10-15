import { useCallback, useEffect, useState } from "react";
import { Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";

const DynamicFilter = ({ setGlobalFilterFunction, setGlobalFilterValue, filteredRowsCount, totalRowsCount }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const globalFilterFn = useCallback(
        (row) => {
            const searchValue = searchTerm.toLowerCase();
            const rowValues = Object.values(row.original)
                .map(String)
                .join(" ")
                .toLowerCase();

            return rowValues.includes(searchValue);
        },
        [searchTerm]
    );

    useEffect(() => {
        setGlobalFilterFunction(() => globalFilterFn);
        setGlobalFilterValue(
            JSON.stringify({
                searchTerm,
            })
        );
    }, [globalFilterFn, searchTerm, setGlobalFilterFunction, setGlobalFilterValue]);

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
            </Flex>
            <Flex direction={{ base: "row", md: "row" }} justifyContent="space-between" alignItems="center">
                <Text fontSize="14px" fontWeight={"normal"} color="#51616D" mb={{ base: 2, md: 0 }}>
                    {filteredRowsCount === totalRowsCount
                        ? `${totalRowsCount} resultados`
                        : `${filteredRowsCount} de ${totalRowsCount} resultados`}
                </Text>
            </Flex>
        </>
    );
};

export default DynamicFilter;