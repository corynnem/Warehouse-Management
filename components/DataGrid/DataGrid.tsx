"use client";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./helpers";
import { WarehouseGridRow } from "./helpers";
import { mockSalesOrders } from "@/mockData";
import { useState } from "react";
import { getDataGridRows } from "./helpers";

// Netsuite GET /salesOrder

const getSalesOrders = () => {
  // fetch("https://demo123.suitetalk.api.netsuite.com/services/rest/record/v1/salesorder/1504")
  // .then((res) => res.json())
  // .then(res => console.log(res))
  return { mockSalesOrders };
};

const WarehouseGrid = () => {
  const { mockSalesOrders } = getSalesOrders();
  const salesOrders = getDataGridRows(mockSalesOrders);
  console.log(salesOrders);

  const [dataGridState, setDataGridState] =
    useState<WarehouseGridRow[]>(salesOrders);

  console.log(dataGridState);
  return (
    <Box >
      <DataGrid
        sx={{ height: "80vh", width: "90%" }}
        rows={dataGridState}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default WarehouseGrid;
