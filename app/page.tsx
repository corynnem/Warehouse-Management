"use client"
import { ChangeEvent, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PickDataGrid from "@/components/PickDataGrid/PickDataGrid";
import useStyles from "./appStyles";
import { getSalesOrdersLocalStorage } from "@/helpers";
import { getDataGridRows, WarehouseGridRow } from "@/components/PickDataGrid/helpers";


const Home = () => {
  const { classes } = useStyles();
  const { mockSalesOrders } = getSalesOrdersLocalStorage();
  const rows = getDataGridRows(mockSalesOrders);
  const [searchedRows, setSearchedRows] = useState<WarehouseGridRow[]>(rows)
  

  const handleOrderSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedOrder = e.target.value;
    console.log(searchedOrder)

   const foundOrders = rows.flatMap((order: WarehouseGridRow) => {
    if(order.salesOrderNumber.includes(searchedOrder)) {
      return order
    } else {
      return []
    }
   }, [])

   console.log(foundOrders)
   if(foundOrders.length > 0) {
    setSearchedRows(foundOrders)
   } else {
    setSearchedRows(rows)
   }

  }


  return (
    <Box className={classes.body}>
      <Box className={classes.title}>
        <Typography className={classes.fontStyles}>Pick</Typography>
        <TextField onChange={handleOrderSearch}  type='search' label="Search Sales Orders" variant="outlined" sx={{background: 'transparent', color: "white"}}/>
      </Box>

      <PickDataGrid rows={searchedRows}/>
    </Box>
  );
};
export default Home;
