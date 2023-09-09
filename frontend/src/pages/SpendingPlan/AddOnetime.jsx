import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { addOnetime } from '../../api/SpendingPlan';

export default function AddOnetime(props) {
    const { setLoad } = props;

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if (!name || !category || !amount) {
            alert("Name, Category, Budget cannot be blank!");
        }
        else {

            const newOnetimeExpense = {
                name: name,
                category: category,
                amount: parseFloat(amount)
            };

            addOnetime(JSON.stringify(newOnetimeExpense)).then(res => {
                setLoad(true);
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
                <DialogTitle>Add Onetime Expense</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Budget"
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