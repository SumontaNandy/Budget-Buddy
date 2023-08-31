import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { getAllAccounts, addIncome } from '../../api/Account';

export default function AddIncome(props) {
    const { setIncomes } = props;

    const [open, setOpen] = useState(false);
    const [account_id, setAccountID] = useState('');
    const [amount, setAmount] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        (async () => {
            const tempAccounts = await getAllAccounts();
            setAccounts(tempAccounts);
        })();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        const newIncome = {
            amount: parseFloat(amount),
            date: new Date(),
        };

        addIncome(account_id, JSON.stringify(newIncome)).then(res => {
            setIncomes(prev => [...prev, newIncome])
        });

        setOpen(false); // Close the dialog
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Income
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Income</DialogTitle>
                <DialogContent>
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
                    <Select
                        fullWidth
                        variant="standard"
                        label="Account"
                        value={account_id}
                        onChange={(e) => setAccountID(e.target.value)}
                    >
                        { accounts.map((account) => (
                            <MenuItem value={account.account_id}> {account.account_no} - {account.account_name} </MenuItem>
                        )) }
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}