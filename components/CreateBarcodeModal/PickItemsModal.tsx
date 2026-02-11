import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PickableLineItems from "../LineItems/PickableLineItems";
import { getIndividualSalesOrder } from "../DataGrid/helpers";
import { findScannedItem } from "./helpers";

interface PickItemsState {
  salesOrderNumber: string;
}

const PickItemsModal = ({ salesOrderNumber }: PickItemsState) => {
  const [open, setOpen] = useState(false);
  const [allItemsPicked, setAllItemsPicked] = useState(false);
  const [testText, setTestText] = useState('Test Text')

  const [newRowState, setNewRowState] = useState({
    id: "",
    itemName: "",
    barcode: "",
    paletteSize: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const paletteSize = Number(e.target.value);
    setNewRowState((prevState) => {
      return {
        ...prevState,
        paletteSize: paletteSize,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleClose();
  };

  const [barcode, setBarcode] = useState("");


  let barcodeNum = "";
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      // Barcode scan is complete, process the 'barcode' variable
      console.log("Scanned Barcode:", barcode);
      const scannedBarcode = findScannedItem(Number(barcode))
      setTestText(scannedBarcode)
      barcodeNum = ""; // Reset for the next scan
    } else {
      barcodeNum += e.key; // Append the character to the barcode string
    }
  });

  const { mockSalesOrder } = getIndividualSalesOrder(salesOrderNumber);
  const orderItems = mockSalesOrder?.item?.items;

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
        <DialogContent  sx={{ minHeight: "500px", width: '80vw' }}>
          <div>{testText}</div>
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
