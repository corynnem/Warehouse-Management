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

interface PickItemsState {
  salesOrderNumber: string;
}

const PickItemsModal = ({ salesOrderNumber }: PickItemsState) => {
  const [open, setOpen] = useState(false);
  const [allItemsPicked, setAllItemsPicked] = useState(false);
  const [barcode, setBarcode] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleClose();
  };




  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const barcodeInput = Number(e.target.value);
    setBarcode(barcodeInput)
  }
  
  const { mockSalesOrder } = getIndividualSalesOrder(salesOrderNumber);
  const orderItems = mockSalesOrder?.item?.items;
  const scannedItem = findScannedItem(barcode)

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Pick
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ component: "form", onSubmit: handleSubmit }}
      >
        <DialogTitle>Pick Order {salesOrderNumber}</DialogTitle>
        <DialogContent sx={{ minHeight: "500px", width: "80vw" }}>
          <Input id="barcodeInput" onChange={handleInputChange}/>
          {scannedItem}
          {orderItems?.map((item, id) => {
            return <PickableLineItems item={item} key={id} />;
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
