import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";



interface ErrorModalState {
  errorModalOpen: boolean;
  setErrorModalOpen: (arg: boolean) => void;
}

const ErrorModal = ({ errorModalOpen, setErrorModalOpen }: ErrorModalState) => {
  const handleClickOpen = () => {
    setErrorModalOpen(true);
  };

  const handleClose = () => {
    setErrorModalOpen(false);
  };

  return (
    <div>
      <Dialog open={errorModalOpen} onClose={handleClose}>
        <DialogTitle>{`This item is not in this order`}</DialogTitle>
        <DialogContent sx={{ minHeight: "500px", width: "80vw" }}>
          Please scan another item and put this one back
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorModal;
