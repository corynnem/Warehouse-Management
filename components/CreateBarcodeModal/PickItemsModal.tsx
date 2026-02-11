import React, { useState, ChangeEvent, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarehouseGridRow } from "../DataGrid/helpers";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

// interface PickItemsState {
//   dataGridState: WarehouseGridRow;
//   setDataGridState: (state: WarehouseGridRow) => void;
// }

const PickItemsModal = () => {
  const [open, setOpen] = useState(false);
  const [barcode, setBarcode] = useState('')
  const [newRowState, setNewRowState] = useState({
    id: "",
    itemName: "",
    barcode: "",
    paletteSize: 0,
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const paletteSize = Number(e.target.value)
    setNewRowState((prevState) => {
        return {
            ...prevState,
            paletteSize: paletteSize
        }
    })
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    handleClose();
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        // Barcode scan is complete, process the 'barcode' variable
        console.log('Scanned Barcode:', barcode);
        alert('Scanned Barcode: ' + barcode);
        setBarcode('') // Reset for the next scan
    } else {
        // Append the character to the barcode string
       console.log('err', barcode)
    }
});


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
        <DialogTitle>     {`Barcode: ${barcode}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="sku"
            label="SKU"
            type="string"
            fullWidth
            variant="standard"
            value={newRowState.id}
            onChange={(e) =>
              setNewRowState((prevState) => {
                return {
                  ...prevState,
                  id: e.target.value,
                };
              })
            }
          />
          <DialogContentText>
            Add SKU number as stated in Netsuite
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="itemName"
            label="Item Name"
            type="name"
            fullWidth
            variant="standard"
            value={newRowState.itemName}
            onChange={(e) =>
              setNewRowState((prevState) => {
                return {
                  ...prevState,
                  itemName: e.target.value,
                };
              })
            }
          />
          <DialogContentText>
            Add Item name as stated in Netsuite
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="barcode"
            label="Barcode"
            type="number"
            fullWidth
            variant="standard"
            value={newRowState.barcode}
            onChange={(e) =>
              setNewRowState((prevState) => {
                return {
                  ...prevState,
                  barcode: e.target.value,
                };
              })
            }
          />

          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="demo-simple-select-label">Palette Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newRowState.paletteSize}
              label="Palette Size"
              type="number"
              // onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={48}>48</MenuItem>
              <MenuItem value={72}>72</MenuItem>
              <MenuItem value={96}>96</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PickItemsModal;
