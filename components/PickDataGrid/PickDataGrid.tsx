"use client";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./helpers";
import ErrorModal from "../ErrorModal/ErrorModal";
import useStyles from "./styles";
import { WarehouseGridRow } from "./helpers";


// Netsuite GET /salesOrder

interface PickDataGridProps {
  rows: WarehouseGridRow[]
}

const PickDataGrid = ({ rows }: PickDataGridProps) => {
  const { classes } = useStyles();


  return (
    <Box>
      <ErrorModal />
      <DataGrid
        className={classes.grid}
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
