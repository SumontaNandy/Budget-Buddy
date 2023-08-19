import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddAccount() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(''); // State to hold email
  const [name, setName] = React.useState('');   // State to hold name

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // Here you can access the email and name values
    console.log('Email: ', email);
    console.log('Name: ', name);
    
    // You can also perform further actions with the captured data
    // For example, sending the data to a server, updating state, etc.
    
    setOpen(false); // Close the dialog
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
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
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}