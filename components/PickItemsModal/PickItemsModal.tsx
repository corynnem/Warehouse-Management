import React, { useState, useContext } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import PickableLineItems from "../LineItems/PickableLineItems";
import { getIndividualSalesOrder } from "../PickDataGrid/helpers";
import { findScannedItem } from "./helpers";
import { DataGridContext } from "@/context/DataGridContext";
import { removeSalesOrder } from "@/helpers";
import { Items } from "@/types/SalesOrderTypes";
import BarcodeScanner from "./BarcodeScanner";


interface PickItemsState {
  salesOrderNumber: string;
}

const PickItemsModal = ({ salesOrderNumber }: PickItemsState) => {
  const { setErrorModalOpen, setErrorModalText, currentlyScannedItem, setSalesOrders} = useContext(DataGridContext)
  const [pickItemsModalOpen, setPickItemsModalOpen] = useState<boolean>(false);
  const [scanCounts, setScanCounts] = useState<Record<string, number>>({});

    
  const { mockSalesOrder } = getIndividualSalesOrder(salesOrderNumber);
  const orderItems = mockSalesOrder?.item?.items;


  const handleClickOpen = () => {
    setPickItemsModalOpen(true);
  };

  const handleClose = () => {
    setPickItemsModalOpen(false);
  };


  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeSalesOrder(salesOrderNumber, setSalesOrders)
    handleClose();
  };


  
  const handleInputChange = (newBarcode: number) => {
    const foundSku = findScannedItem(newBarcode);
  
    if (!foundSku) {
      setErrorModalText({
        title: "Scanned Item not found",
        subtext: "Please put this item back before continuing",
      });
      setErrorModalOpen(true);
      return;
    }
  
    const orderItem = orderItems?.find(
      (item: Items) => item.item.sku === foundSku
    );
  
    if (!orderItem) {
      setErrorModalText({
        title: "Item not in this order",
        subtext: "Please scan an item from this order",
      });
      setErrorModalOpen(true);
      return;
    }
  
    setScanCounts(prev => {
      const currentCount = prev[foundSku] ?? 0;
  
      if (currentCount >= orderItem.quantity) {
        setErrorModalText({
          title: "Quantity of this item already met",
          subtext: "Please put this item back before continuing",
        });
        setErrorModalOpen(true);
        return prev; // do NOT increment
      }
      return {
        ...prev,
        [foundSku]: currentCount + 1
      };
    });
  };
  

  const mockScan = (value: string) => {
    for (const char of value) {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: char })
      );
    }

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
  };


  const allItemsPicked = orderItems?.every((orderItem: Items) => {
    const sku = orderItem.item.sku;
    return (scanCounts[sku] ?? 0) === orderItem.quantity;
  }) ?? false;
  

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Pick
      </Button>

      <Dialog
        open={pickItemsModalOpen}
        onClose={handleClose}
        PaperProps={{ component: "form", onSubmit: handleSubmit }}
      >
        <DialogTitle>Pick Order {salesOrderNumber}</DialogTitle>
        <DialogContent sx={{ width: "80vw" }}>
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
          <BarcodeScanner handleInputChange={handleInputChange} />
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!allItemsPicked}>
            Mark Picked
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PickItemsModal;
