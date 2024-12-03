import { Th, Thead, Tr } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
// Modular header rendering
export const renderTableHeader = (table, isMobile) => {
  return (
    <Thead
      position="sticky"
      top={0}
      zIndex={1}
      h={"70px"}
      bg={"white"}
      borderRadius={"5px"}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Th
              key={header.id}
              fontSize={isMobile ? "12px" : "16px"}
              fontWeight="semibold"
              w={header.column.columnDef.width}
              color="#51616D"
              textTransform="capitalize"
              textAlign="left"
              px={isMobile ? 2 : 4}
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
  );
};
