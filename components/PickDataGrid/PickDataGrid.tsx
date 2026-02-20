"use client";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./helpers";
import { useContext, useEffect } from "react";
import { getDataGridRows } from "./helpers";
import ErrorModal from "../ErrorModal/ErrorModal";
import { DataGridContext } from "@/context/DataGridContext";
import { getSalesOrdersLocalStorage } from "@/helpers";
import { postSalesOrdersLocalStorage } from "@/helpers";

// Netsuite GET /salesOrder

const PickDataGrid = () => {
  const { setSalesOrders, salesOrders } = useContext(DataGridContext);
  const { mockSalesOrders } = getSalesOrdersLocalStorage();
  const rows = getDataGridRows(mockSalesOrders);

  useEffect(() => {
    setSalesOrders(salesOrders ?? mockSalesOrders);
    postSalesOrdersLocalStorage(mockSalesOrders);
  }, []);
  
  return (
    <Box>
      <ErrorModal />
      <DataGrid
        sx={{ height: "90vh", width: "100%", padding: "10px" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        checkboxSelection
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default PickDataGrid;
