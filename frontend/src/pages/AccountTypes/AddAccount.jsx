import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { addAccount } from '../../api/Account';

export default function AddAccount(props) {
  const { type_id, setAccounts } = props;

  const [open, setOpen] = useState(false);
  const [account_no, setAccountNumber] = useState('');
  const [account_name, setAccountName] = useState('');
  const [balance, setBalance] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const newAccount = {
      account_no: account_no,
      account_name: account_name,
      balance: parseFloat(balance),
      date: new Date(),
      account_type_id: type_id
    };

    addAccount(JSON.stringify(newAccount)).then(res => {
      setAccounts(prev => [...prev, newAccount])
    });

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
            id="account_no"
            label="Account Number"
            type="number"
            fullWidth
            variant="standard"
            value={account_no}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="account_name"
            label="Account Name"
            type="text"
            fullWidth
            variant="standard"
            value={account_name}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="balance"
            label="Balance"
            type="number"
            fullWidth
            variant="standard"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
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