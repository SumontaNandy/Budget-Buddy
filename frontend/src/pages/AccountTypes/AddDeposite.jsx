import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';

import { addDeposite } from '../../api/Account';

export default function AddIncome(props) {
    const { account_id, setLoad } = props;

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(null);
    const [amount, setAmount] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if(!amount || amount < 0)
            alert("Amount is invalid!");
        else if(!date)
            alert("Date is invalid!");
        else {
            const newDeposite = {
                amount: parseFloat(amount),
                date: date,
            };
    
            addDeposite(account_id, JSON.stringify(newDeposite)).then(res => {
                if(res === 200)
                    setLoad(true);
                else
                    alert("Add Deposite Failed!");
            });
    
            setOpen(false); // Close the dialog
        }
    };

    return (
        <>
            <Button variant="contained" style={{ margin: '10px' }} onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Income</DialogTitle>
                <DialogContent>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        placeholderText="Date"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}