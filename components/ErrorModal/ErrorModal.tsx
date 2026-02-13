import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { DataGridContext } from "@/context/DataGridContext";



const ErrorModal = () => {
  const { errorModalText, errorModalOpen, setErrorModalOpen } =
    useContext(DataGridContext);
  const { title, subtext } = errorModalText;

  const handleClose = () => {
    setErrorModalOpen(false);
  };

  return (
    <div>
      <Dialog open={errorModalOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ minHeight: "500px", width: "80vw" }}>
          {subtext}
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorModal;
