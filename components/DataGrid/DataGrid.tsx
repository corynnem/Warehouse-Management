"use client";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./helpers";
import { WarehouseGridRow } from "./helpers";
import { mockSalesOrders } from "@/mockData";
import { useState } from "react";
import { getDataGridRows } from "./helpers";
import { getSalesOrders } from "./helpers";

// Netsuite GET /salesOrder


const WarehouseGrid = () => {
  const { mockSalesOrders } = getSalesOrders();
  const salesOrders = getDataGridRows(mockSalesOrders);
  console.log(salesOrders);

  const [dataGridState, setDataGridState] =
    useState<WarehouseGridRow[]>(salesOrders);

  console.log(dataGridState);
  return (
    <Box>
      <DataGrid
        sx={{ height: "90vh", width: "90%", padding: "10px" }}
        rows={dataGridState}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        checkboxSelection
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default WarehouseGrid;
