import {
  Box,
  Button,
  Flex,
  IconButton,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function CTable({ data, DynamicFilters, isLoading }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [globalFilterFn, setGlobalFilterFn] = useState(() => () => true);

  const columns = useMemo(() => data.columns, [data.columns]);

  const table = useReactTable({
    data: data.rows,
    columns,
    state: {
      pagination,
      globalFilter: globalFilterValue,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row) => globalFilterFn(row),
  });

  const rowModel = table.getRowModel();
  const filteredRowsCount = table.getFilteredRowModel().rows.length;
  const totalRowsCount = data.rows.length;
  return (
    <Flex
      direction="column"
      maxH="calc(100vh - 130px)"
      bg={"white"}
      shadow={"lg"}
      borderRadius={"lg"}
    >
      {DynamicFilters && (
        <Box position="sticky" top={0} zIndex={2} p={4}>
          <DynamicFilters
            setGlobalFilterFunction={setGlobalFilterFn}
            setGlobalFilterValue={setGlobalFilterValue}
            filteredRowsCount={filteredRowsCount}
            totalRowsCount={totalRowsCount}
          />
        </Box>
      )}

      <Box
        flex="1"
        overflowY="auto"
        position="relative"
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#c1c1c1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#a8a8a8",
          },
        }}
      >
        <Table size="sm" layout="fixed" width="full">
          <Thead
            position="sticky"
            top={0}
            zIndex={1}
            p={4}
            h={"60px"}
            bg={"white"}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    fontSize="16px"
                    fontWeight="semibold"
                    color="#51616D"
                    textTransform="capitalize"
                    textAlign="left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody bg={"white"}>
            {isLoading && (
              <Tr>
                <Td colSpan={columns.length} textAlign="center" py={8}>
                  <Flex justifyContent="center" alignItems="center" gap={2}>
                    <Spinner boxSize={"32px"} />
                    <Text
                      color={"gray.500"}
                      fontWeight={"medium"}
                      fontSize={"20px"}
                    >
                      Cargando
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            )}
            {!isLoading && filteredRowsCount === 0 ? (
              <Tr>
                <Td
                  colSpan={columns.length}
                  textAlign="center"
                  fontSize="20px"
                  fontWeight={"medium"}
                  color="#51616D"
                  py={8}
                >
                  No hay resultados
                </Td>
              </Tr>
            ) : (
              rowModel.rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      fontSize="14px"
                      fontWeight="normal"
                      color="#51616D"
                      textAlign="left"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={4}
        h={"60px"}
        position="sticky"
        bottom={0}
        zIndex={1}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="gray.200"
        bg={"white"}
      >
        <Flex alignItems="center" gap={6}>
          <Text fontSize="14px" fontWeight="normal" color="#51616D">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </Text>
          <Flex alignItems="center" gap={2}>
            <Text fontSize="14px" fontWeight="normal" color="#51616D">
              Filas por página:
            </Text>
            <Select
              size="sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              fontSize="14px"
              fontWeight="normal"
              color="#51616D"
            >
              {[5, 10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <Flex gap={2} alignItems="center">
          <IconButton
            aria-label="Primera página"
            colorScheme={"cart"}
            variant={"link"}
            size="sm"
            icon={<ChevronsLeft />}
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
          />
          <IconButton
            aria-label="Página anterior"
            colorScheme={"cart"}
            variant={"link"}
            size="sm"
            icon={<ChevronLeft />}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
          <Flex gap={1}>
            {Array.from(
              { length: Math.min(5, table.getPageCount()) },
              (_, i) =>
                i + Math.max(0, table.getState().pagination.pageIndex - 2)
            ).map((pageIndex) => (
              <Button
                key={pageIndex}
                size="sm"
                colorScheme={"cart"}
                borderRadius={"full"}
                variant={
                  pageIndex === table.getState().pagination.pageIndex
                    ? "solid"
                    : "outline"
                }
                onClick={() => table.setPageIndex(pageIndex)}
              >
                {pageIndex + 1}
              </Button>
            ))}
          </Flex>
          <IconButton
            aria-label="Siguiente página"
            colorScheme={"cart"}
            variant={"link"}
            size="sm"
            icon={<ChevronRight />}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          />
          <IconButton
            aria-label="Última página"
            colorScheme={"cart"}
            variant={"link"}
            size="sm"
            icon={<ChevronsRight />}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
