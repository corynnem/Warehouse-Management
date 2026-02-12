import React, { useState, ChangeEvent } from "react";
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
import ErrorModal from "../ErrorModal/ErrorModal";
import { getLocalStorageScannedItems, GetLocalStorageScannedItemsProps } from "@/helpers";

interface PickItemsState {
  salesOrderNumber: string;
}

const PickItemsModal = ({ salesOrderNumber }: PickItemsState) => {
  const [pickItemsModalOpen, setPickItemsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const [allItemsPicked, setAllItemsPicked] = useState(false);
  const [barcode, setBarcode] = useState(0);

  const handleClickOpen = () => {
    setPickItemsModalOpen(true);
  };

  const handleClose = () => {
    setPickItemsModalOpen(false);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleClose();
  };




  
  const { mockSalesOrder } = getIndividualSalesOrder(salesOrderNumber);
  const orderItems = mockSalesOrder?.item?.items;
  const scannedItem = findScannedItem(barcode)
  const { parsedScannedItems } = getLocalStorageScannedItems()


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const barcodeInput = Number(e.target.value);
    setBarcode(barcodeInput)
  
    const foundItem = findScannedItem(barcode)
      if(!foundItem) {
        alert('This item is not on the list to be picked, please return the item.')
        setInputValue('')
      }
    
  }

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
          <Input id="barcodeInput" onChange={handleInputChange} value={inputValue}   style={{ visibility: 'hidden' }}/>
          {scannedItem ? `Scanned Item: ${scannedItem}` : ""}
          {orderItems?.map((item, id) => {
            const sku = item?.item?.sku
            const isScannedItem = parsedScannedItems?.find(({ sku: scannedSku }: GetLocalStorageScannedItemsProps) => scannedSku === sku) || scannedItem === sku 
            
            return (
              <PickableLineItems
                item={item}
                key={id}
                isScannedItem={isScannedItem}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={!allItemsPicked}>
            Mark Picked
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PickItemsModal;
