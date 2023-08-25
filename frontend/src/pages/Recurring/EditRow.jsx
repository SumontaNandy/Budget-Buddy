import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditRow(props) {
  console.log("props edit: ", props);
  const [open, setOpen] = React.useState(true);
  const [email, setEmail] = React.useState(props.account); // State to hold email
  const [name, setName] = React.useState(props.category);   // State to hold name

  const handleClose = () => {
    setOpen(false);
    props.handleDialog();
  };

  const handleSave = () => {
    // Here you can access the email and name values
    console.log('Email: ', email);
    console.log('Name: ', name);
    
    // You can also perform further actions with the captured data
    // For example, sending the data to a server, updating state, etc.
    
    setOpen(false); // Close the dialog
    props.handleDialog();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Account"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}