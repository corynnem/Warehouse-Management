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
import BarcodeScanner from "./BarcodeScanner";

interface PickItemsState {
  salesOrderNumber: string;
}

const PickItemsModal = ({ salesOrderNumber }: PickItemsState) => {
  const { setErrorModalOpen, setErrorModalText, currentlyScannedItem, setCurrentlyScannedItem, setSalesOrders} = useContext(DataGridContext)
  const [pickItemsModalOpen, setPickItemsModalOpen] = useState<boolean>(false);
  // const [scannedItem, setScannedItem] = useState('');
  const [parsedScannedItems, setParsedScannedItems] = useState(() => {
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
  // const scannedItem = findScannedItem(barcode);

  const handleInputChange = (newBarcode: number) => { 
    const { parsedScannedItems: scanned } = getLocalStorageScannedItems({
      SONumber: salesOrderNumber,
    });
    setParsedScannedItems(scanned)
  
    const foundItem = findScannedItem(newBarcode);
  
    if (foundItem) {
      if (currentlyScannedItem !== foundItem) {
        setCurrentlyScannedItem(foundItem)
      } 

      return;
    } else if (newBarcode) {
      setErrorModalText({
        title: "Scanned Item not found",
        subtext: "Please put this item back before continuing",
      });
      setErrorModalOpen(true);
      setCurrentlyScannedItem("");
    }

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
        <DialogContent sx={{ width: "80vw" }}>
        <Button onClick={() => mockScan('810093162987')}>
          Mock Scan Elettrico
        </Button>
        <Button onClick={() => mockScan('810093162642')}>
          Mock Scan CWS
        </Button>
        <Button onClick={() => mockScan('810093160938')}>
          Mock Scan SS
        </Button>
        <Button onClick={() => mockScan('850005186328')}>
          Mock Scan Hot Wax
        </Button>
          <BarcodeScanner handleInputChange={handleInputChange} />
          {currentlyScannedItem ? `Scanned Item: ${currentlyScannedItem}` : ""}
          {orderItems?.map((item: Items, id: number) => {

            const sku = item?.item?.sku;
            const isScannedItem =
              parsedScannedItems?.find(
                ({ sku: scannedSku }: ScannedItems) => scannedSku === sku
              ) || currentlyScannedItem === sku;

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
