import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addTransaction } from '../../api/Transaction'; // Assuming you have a function to post a transaction

export default function AddTransaction() {
    const [open, setOpen] = useState(false);
    const [transaction, setTransaction] = useState({
        account_id: '',
        date: '',
        status: '',
        payee: '',
        gp: [],
    });

    const handleChange = (event) => {
        setTransaction({
            ...transaction,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddGP = () => {
        setTransaction({
            ...transaction,
            gp: [...transaction.gp, { amount: '', withdraw_for: '', goal_id: '' }],
        });
    };

    const handleGPChange = (index, event) => {
        const newGP = [...transaction.gp];
        newGP[index][event.target.name] = event.target.value;
        setTransaction({
            ...transaction,
            gp: newGP,
        });
    };

    const handleSubmit = async () => {
        await addTransaction(transaction);
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" style={{ margin: '10px' }} onClick={() => setOpen(true)}>
                Add
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="account_id"
                        label="Account ID"
                        type="text"
                        fullWidth
                        value={transaction.account_id}
                        onChange={handleChange}
                    />
                    {/* Add more fields for date, status, payee */}
                    {transaction.gp.map((gp, index) => (
                        <div key={index}>
                            <TextField
                                margin="dense"
                                name="amount"
                                label="Amount"
                                type="number"
                                value={gp.amount}
                                onChange={(event) => handleGPChange(index, event)}
                            />
                            {/* Add more fields for withdraw_for, goal_id */}
                        </div>
                    ))}
                    <Button onClick={handleAddGP}>Add GP</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}