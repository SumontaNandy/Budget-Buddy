import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from 'react-datepicker';

import { addRecurring } from '../../api/SpendingPlan';

export default function AddRecurrent(props) {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [nextDate, setNextDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [frequency, setFrequency] = useState(null);
    const [type, setType] = useState(null);

    const freqList = ['WEEKLY', 'BI_WEEKLY', 'TWICE_A_MONTH', 'MONTHLY', '2_MONTHS', 'QUARTERLY', '6MONTHS', 'YEARLY'];
    const typeList = ['BILL', 'SUBSCRIPTION'];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if (!name || !category || !amount || !nextDate || !endDate)
            alert("Field cannot be blank!");
        else if (amount < 0 || nextDate > endDate)
            alert("Invalid data!");
        else {
            const newRecurringExpense = {
                name: name,
                category: category,
                amount: parseFloat(amount),
                next_date: nextDate,
                end_date: endDate,
                frequency: frequency,
                type: type
            };

            addRecurring(JSON.stringify(newRecurringExpense)).then(res => {
                console.log(res);
                if (res !== 201)
                    alert("Add Recurring Expense Plan Failed!");
            });

            setOpen(false); // Close the dialog
        }
    };

    return (
        <>
            <Button variant="contained" style={{ margin: '10px' }} onClick={handleClickOpen}>
                Add Recurrent Plan
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Recurring Expense Plan</DialogTitle>
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
                    <div>
                        <DatePicker
                            selected={nextDate}
                            onChange={(date) => setNextDate(date)}
                            placeholderText="Next Date"
                        />
                    </div>

                    <div>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="End Date"
                        />
                    </div>

                    <InputLabel>Select Frequency</InputLabel>
                    <Select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        label="Frequency"
                    >
                        {freqList.map((freq, index) => (
                            <MenuItem value={freq} key={index}>
                                {freq}
                            </MenuItem>
                        ))}
                    </Select>

                    <InputLabel>Select Type</InputLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label="Type"
                    >
                        {typeList.map((type, index) => (
                            <MenuItem value={type} key={index}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}