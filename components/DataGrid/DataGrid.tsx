"use client";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./helpers";
import { WarehouseGridRow } from "./helpers";
import { useContext, useEffect, useState } from "react";
import { getDataGridRows } from "./helpers";
import ErrorModal from "../ErrorModal/ErrorModal";
import { DataGridContext } from "@/context/DataGridContext";
import { getSalesOrdersLocalStorage } from "@/helpers";
import { postSalesOrdersLocalStorage } from "@/helpers";
import { mockSalesOrders } from "@/mockData";

// Netsuite GET /salesOrder


const WarehouseGrid = () => {
  const { setSalesOrders } = useContext(DataGridContext);
  const { mockSalesOrders } = getSalesOrdersLocalStorage();
  const rows = getDataGridRows(mockSalesOrders);

  const [dataGridState, setDataGridState] = useState<WarehouseGridRow[]>(rows);

  useEffect(() => {
    setSalesOrders(mockSalesOrders);
  }, []);

  useEffect(() => {
    postSalesOrdersLocalStorage(mockSalesOrders);
  }, []);
  
  return (
    <Box>
      <ErrorModal />
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
