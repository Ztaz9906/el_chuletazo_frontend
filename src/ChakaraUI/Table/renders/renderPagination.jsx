import { Button, Flex, IconButton, Select, Text } from "@chakra-ui/react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

// Pagination render function
export function renderPagination(table, isMobile) {
  return (
    <Flex
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="space-between"
      alignItems={isMobile ? "stretch" : "center"}
      p={4}
      minHeight={"60px"}
      position="sticky"
      bottom={0}
      zIndex={1}
      borderTop="1px solid"
      bg={"white"}
      borderColor={"gray.300"}
      borderBottomRadius={"5px"}
      gap={isMobile ? 3 : 0}
    >
      {/* Contenido de paginación similar al original */}
      <Flex
        alignItems={isMobile ? "stretch" : "center"}
        gap={isMobile ? 2 : 6}
        width="100%"
      >
        <Text
          textAlign={isMobile ? "center" : "left"}
          fontSize={isMobile ? "12px" : "14px"}
          fontWeight="normal"
          color="#51616D"
        >
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </Text>

        <Flex
          alignItems={isMobile ? "stretch" : "center"}
          gap={2}
          width="100%"
          justifyContent={isMobile ? "center" : "flex-start"}
        >
          <Text
            textAlign={isMobile ? "center" : "left"}
            fontSize={isMobile ? "12px" : "14px"}
            fontWeight="normal"
            color="#51616D"
          >
            Filas por página:
          </Text>
          <Select
            size="sm"
            width={isMobile ? "full" : "auto"}
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            fontSize={isMobile ? "12px" : "14px"}
            fontWeight="normal"
            color="#51616D"
            textAlign="center"
          >
            {[5, 10, 20, 30, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      {/* Botones de paginación */}
      <Flex alignItems="center" justifyContent="center" gap={2} width="100%">
        <Flex gap={2} justifyContent="center" width="100%">
          <Flex gap={1} flexWrap="wrap" justifyContent="center" width="100%">
            <IconButton
              aria-label="Primera página"
              colorScheme={"cart"}
              variant={"link"}
              size={isMobile ? "sm" : "md"}
              icon={<ChevronsLeft />}
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
            />
            <IconButton
              aria-label="Página anterior"
              colorScheme={"cart"}
              variant={"link"}
              size={isMobile ? "sm" : "md"}
              icon={<ChevronLeft />}
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            />
            {Array.from(
              { length: Math.min(5, table.getPageCount()) },
              (_, i) =>
                i + Math.max(0, table.getState().pagination.pageIndex - 2)
            ).map((pageIndex) => (
              <Button
                key={pageIndex}
                size={isMobile ? "sm" : "md"}
                colorScheme={"cart"}
                borderRadius={"full"}
                variant={
                  pageIndex === table.getState().pagination.pageIndex
                    ? "solid"
                    : "outline"
                }
                onClick={() => table.setPageIndex(pageIndex)}
                mb={isMobile ? 1 : 0}
              >
                {pageIndex + 1}
              </Button>
            ))}
            <IconButton
              aria-label="Siguiente página"
              colorScheme={"cart"}
              variant={"link"}
              size={isMobile ? "sm" : "md"}
              icon={<ChevronRight />}
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            />
            <IconButton
              aria-label="Última página"
              colorScheme={"cart"}
              variant={"link"}
              size={isMobile ? "sm" : "md"}
              icon={<ChevronsRight />}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
