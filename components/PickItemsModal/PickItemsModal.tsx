import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Input,
} from "@mui/material";
import PickableLineItems from "../LineItems/PickableLineItems";
import { getIndividualSalesOrder } from "../DataGrid/helpers";
import { findScannedItem } from "./helpers";
import { DataGridContext } from "@/context/DataGridContext";
import { getLocalStorageScannedItems, ScannedItems } from "@/helpers";
import { isEqual } from "lodash";
import { removeSalesOrder } from "@/helpers";
import { Items } from "@/types/SalesOrderTypes";

interface PickItemsState {
  salesOrderNumber: string;
}

const PickItemsModal = ({ salesOrderNumber }: PickItemsState) => {
  const { setErrorModalOpen, setErrorModalText, currentlyScannedItem, setCurrentlyScannedItem, setSalesOrders} = useContext(DataGridContext)
  const [pickItemsModalOpen, setPickItemsModalOpen] = useState<boolean>(false);
  const [barcode, setBarcode] = useState(0);
  const [parsedScannedItems] = useState(() => {
    try {
      const { parsedScannedItems: scanned } = getLocalStorageScannedItems({
        SONumber: salesOrderNumber,
      });
      return scanned;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return 'defaultValue'; // Return default value if an error occurs
    }
  });

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


  
  const { mockSalesOrder } = getIndividualSalesOrder(salesOrderNumber);
  const orderItems = mockSalesOrder?.item?.items;
  const scannedItem = findScannedItem(barcode);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    
    setBarcode(newValue);
  
    const foundItem = findScannedItem(newValue);
  
    if (foundItem) {
      if (currentlyScannedItem === foundItem) {
        return; 
      } else {
        setCurrentlyScannedItem(foundItem);
        setErrorModalOpen(false); 
      }
    } else if (newValue) {
      setErrorModalText({
        title: "Scanned Item not found",
        subtext: "Please put this item back before continuing",
      });
      setErrorModalOpen(true);
      setCurrentlyScannedItem("");
    }

  };




  const markPicked = () => {
    const formattedOrder =
      orderItems?.map((orderItem: Items) => {
        const { item, quantity } = orderItem || {};
        return {
          refName: item.refName,
          sku: item.sku,
          quantity: quantity,
        } as ScannedItems;
      }, []) || [];

    const sortedOrder = formattedOrder.sort(
      (a: ScannedItems, b: ScannedItems) => a.refName.localeCompare(b.refName)
    );
    const sortedScannedItems = parsedScannedItems.sort(
      (a: ScannedItems, b: ScannedItems) => a.refName.localeCompare(b.refName)
    );

    const picked = isEqual(sortedOrder, sortedScannedItems);
    return picked;
  };


  const allItemsPicked = markPicked();


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
        <DialogContent sx={{ minHeight: "500px", width: "80vw" }}>
          <Input
            id="barcodeInput"
            onChange={handleInputChange}
            // value={inputValue}
          />
          {scannedItem ? `Scanned Item: ${scannedItem}` : ""}
          {orderItems?.map((item: Items, id: number) => {
            const sku = item?.item?.sku;
            const isScannedItem =
              parsedScannedItems?.find(
                ({ sku: scannedSku }: ScannedItems) => scannedSku === sku
              ) || scannedItem === sku;

            return (
              <PickableLineItems
                item={item}
                key={id}
                isScannedItem={isScannedItem}
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
