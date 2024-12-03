import { Flex, Spinner, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
// Modular body rendering for table view
export const renderTableBody = (table, isLoading, columns, isMobile) => {
  const filteredRowsCount = table.getFilteredRowModel().rows.length;

  if (isLoading) {
    return (
      <Tbody>
        <Tr>
          <Td colSpan={columns.length} textAlign="center" py={8}>
            <Flex justifyContent="center" alignItems="center" gap={2}>
              <Spinner boxSize={"32px"} />
              <Text
                color={"gray.500"}
                fontWeight={"medium"}
                fontSize={isMobile ? "16px" : "20px"}
              >
                Cargando
              </Text>
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    );
  }

  if (filteredRowsCount === 0) {
    return (
      <Tbody>
        <Tr>
          <Td
            colSpan={columns.length}
            textAlign="center"
            fontSize={isMobile ? "16px" : "20px"}
            fontWeight={"medium"}
            color="#51616D"
            py={8}
          >
            No hay resultados
          </Td>
        </Tr>
      </Tbody>
    );
  }

  return (
    <Tbody bg={"white"}>
      {table.getRowModel().rows.map((row) => (
        <Tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Td
              key={cell.id}
              fontSize={isMobile ? "12px" : "14px"}
              fontWeight="normal"
              color="#51616D"
              textAlign="left"
              px={isMobile ? 2 : 4}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};
