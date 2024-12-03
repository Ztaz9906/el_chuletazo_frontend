import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
// Modular body rendering for card view
export const renderCardBody = (table, isLoading, columns, isMobile) => {
  const filteredRowsCount = table.getFilteredRowModel().rows.length;

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="200px">
        <Spinner boxSize={"32px"} />
        <Text
          ml={2}
          color={"gray.500"}
          fontWeight={"medium"}
          fontSize={isMobile ? "16px" : "20px"}
        >
          Cargando
        </Text>
      </Flex>
    );
  }

  if (filteredRowsCount === 0) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="200px"
        fontSize={isMobile ? "16px" : "20px"}
        fontWeight="medium"
        color="#51616D"
      >
        No hay resultados
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={4} p={4}>
      {table.getRowModel().rows.map((row) => (
        <Box
          key={row.id}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          bg="white"
          boxShadow="sm"
        >
          {row.getVisibleCells().map((cell) => (
            <Flex
              key={cell.id}
              mb={2}
              alignItems="center"
              fontSize={isMobile ? "12px" : "14px"}
            >
              <Text fontWeight="bold" mr={2} minWidth="150px" color="#51616D">
                {cell.column.columnDef.header}:
              </Text>
              <Text color="#51616D">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Text>
            </Flex>
          ))}
        </Box>
      ))}
    </Flex>
  );
};
