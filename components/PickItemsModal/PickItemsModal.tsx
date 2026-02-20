import React, { useState, useContext } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Box
} from "@mui/material";
import PickableLineItems from "../LineItems/PickableLineItems";
import { getIndividualSalesOrder } from "../PickDataGrid/helpers";

import { DataGridContext } from "@/context/DataGridContext";
import { removeSalesOrder } from "@/helpers";
import { Items } from "@/types/SalesOrderTypes";
import BarcodeScanner from "./BarcodeScanner";
import { mockScan } from "./helpers";

interface PickItemsState {
  salesOrderNumber: string;
}

const PickItemsModal = ({ salesOrderNumber }: PickItemsState) => {
  const { setErrorModalOpen, setErrorModalText, currentlyScannedItem, setSalesOrders} = useContext(DataGridContext)
  const [pickItemsModalOpen, setPickItemsModalOpen] = useState<boolean>(false);
  const [scanCounts, setScanCounts] = useState<Record<string, number>>({});

    
  const { mockSalesOrder } = getIndividualSalesOrder(salesOrderNumber);
  const orderItems = mockSalesOrder?.item?.items;


  const handlePickModalOpen = () => {
    setPickItemsModalOpen(true);
  };

  const handlePickModalClose = () => {
    setPickItemsModalOpen(false);
  };


  const handlePickModalSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeSalesOrder(salesOrderNumber, setSalesOrders)
    handlePickModalClose();
  };



  const allItemsPicked = orderItems?.every((orderItem: Items) => {
    const sku = orderItem.item.sku;
    return (scanCounts[sku] ?? 0) === orderItem.quantity;
  }) ?? false;
  

  return (
    <Box>
      <Button variant="contained" onClick={handlePickModalOpen}>
        Pick
      </Button>

      <Dialog
        open={pickItemsModalOpen}
        onClose={handlePickModalClose}
        PaperProps={{ component: "form", onSubmit: handlePickModalSubmit }}
      >
        <DialogTitle>Pick Order {salesOrderNumber}</DialogTitle>
        <DialogContent sx={{ width: "100%", maxHeight: '100%', overflow: "scroll" }}>
          <Button onClick={() => mockScan("810093162987")}>
            Mock Scan Elettrico
          </Button>
          <Button onClick={() => mockScan("810093162642")}>
            Mock Scan CWS
          </Button>
          <Button onClick={() => mockScan("810093160938")}>Mock Scan SS</Button>
          <Button onClick={() => mockScan("850005186328")}>
            Mock Scan Hot Wax
          </Button>
          <Button onClick={() => mockScan("810090000000")}>
            Mock Scan broken
          </Button>
          <BarcodeScanner
            setErrorModalOpen={setErrorModalOpen}
            setErrorModalText={setErrorModalText}
            orderItems={orderItems}
            scanCounts={scanCounts}
            setScanCounts={setScanCounts}
          />
          {currentlyScannedItem ? `Scanned Item: ${currentlyScannedItem}` : ""}
          {orderItems?.map((item: Items, id: number) => {
            const sku = item?.item?.sku;
            const count = scanCounts[sku] ?? 0;

            return (
              <PickableLineItems
                item={item}
                key={id}
                scanCount={count}
                SONumber={salesOrderNumber}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePickModalClose}>Cancel</Button>
          <Button onClick={handlePickModalSubmit} disabled={!allItemsPicked}>
            Mark Picked
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PickItemsModal;
