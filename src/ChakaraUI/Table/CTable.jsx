import { Box, Flex, Table, useBreakpointValue } from "@chakra-ui/react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { renderFilters } from "./renders/renderFilters";
import { renderPagination } from "./renders/renderPagination";
import { renderTableBody } from "./renders/renderTableBody";
import { renderCardBody } from "./renders/renderTableCardBody";
import { renderTableHeader } from "./renders/renderTableHeader";

export default function CTable({ data, DynamicFilters, isLoading }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [globalFilterFn, setGlobalFilterFn] = useState(() => () => true);

  const isMobile = useBreakpointValue({ base: true, md: false });
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

  return (
    <Flex
      direction="column"
      minH={{ base: "calc(100vh - 215px)", md: "calc(100vh - 200px)" }}
      maxH={{ base: "calc(100vh - 215px)", md: "calc(100vh - 200px)" }}
      width="100%"
      bg={"white"}
      borderRadius={"5px"}
      borderWidth={1}
      borderColor={"gray.300"}
    >
      {DynamicFilters &&
        renderFilters(
          table,
          DynamicFilters,
          setGlobalFilterValue,
          setGlobalFilterFn
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
        {isMobile ? (
          renderCardBody(table, isLoading, columns, isMobile)
        ) : (
          <Table>
            {renderTableHeader(table, isMobile)}
            {renderTableBody(table, isLoading, columns, isMobile)}
          </Table>
        )}
      </Box>
      {renderPagination(table, isMobile)}
    </Flex>
  );
}
