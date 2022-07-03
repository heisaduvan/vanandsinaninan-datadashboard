import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const [open, setOpen] = useState(!props.isLogged);
  const [pass, setPass] = useState("");

  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleClose = () => {
    if (props.checkPass(pass)) {
      setOpen(false);
    } else {
      alert("Password was wrong!");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        sx={{ backgroundColor: "rgb(25, 118, 210)" }}
        disableEscapeKeyDown
      >
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>Please, enter your password.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={pass}
            onChange={(e) => {
              handlePass(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") 
                  handleClose();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
