import { Box } from "@chakra-ui/react";
// Separate render function for filters
export const renderFilters = (
  table,
  DynamicFilters,
  setGlobalFilterValue,
  setGlobalFilterFn
) => {
  const filteredRowsCount = table.getFilteredRowModel().rows.length;
  const totalRowsCount = table.getRowCount();
  return (
    <Box
      position="sticky"
      top={0}
      zIndex={2}
      p={4}
      bg="white"
      borderRadius={"5px"}
    >
      <DynamicFilters
        setGlobalFilterFunction={setGlobalFilterFn}
        setGlobalFilterValue={setGlobalFilterValue}
        filteredRowsCount={filteredRowsCount}
        totalRowsCount={totalRowsCount}
      />
    </Box>
  );
};
