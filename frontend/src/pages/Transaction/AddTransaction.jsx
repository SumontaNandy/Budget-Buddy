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

import { getAllOneTimeExpenses, getAllRecurringExpenses } from '../../api/SpendingPlan'; 
import { getAllGoals } from '../../api/SavingsGoal';

export default function AddTransaction(props) {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [nextDate, setNextDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [frequency, setFrequency] = useState(null);
    const [type, setType] = useState(null);

    const freqList = ['WEEKLY', 'BI_WEEKLY', 'TWICE_A_MONTH', 'MONTHLY', '2_MONTHS', 'QUARTERLY', '6MONTHS', 'YEARLY'];
    const typeList = ['BILL', 'SUBSCRIPTION'];

    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const params = { per_page: 1000, page: 1 };
            if(type === 'sp')
            {
                let plans = await getAllOneTimeExpenses(params);            
                let recurPlans = await getAllRecurringExpenses(params);
                setList([...plans.one_time_expenses, ...recurPlans.recurrent_expenses]);
            }
            else if(type === 'gp')
            {
                let goals = await getAllGoals(params);
                setList(goals.goal_list);
            }
        })();
    }, [type]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if (!name || !payee || !nextDate)
            alert("Field cannot be blank!");
        else {
            const newRecurringExpense = {
                name: name,
                payee: payee,
                amount: parseFloat(amount),
                date: nextDate,
                end_date: endDate,
                frequency: frequency,
                type: type
            };

            // addRecurring(JSON.stringify(newRecurringExpense)).then(res => {
            //     console.log(res);
            //     if (res !== 201)
            //         alert("Add Recurring Expense Plan Failed!");
            // });

            setOpen(false); // Close the dialog
        }
    };

    return (
        <>
            <Button variant="contained" style={{ margin: '10px' }} onClick={handleClickOpen}>
                Add Transaction
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Recurring Expense Plan</DialogTitle>
                <DialogContent>
                    <div>
                        <DatePicker
                            selected={nextDate}
                            onChange={(date) => setNextDate(date)}
                            placeholderText="Date"
                        />
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="payee"
                        label="Payee"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setPayee(e.target.value)}
                    />

                    <InputLabel></InputLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label=""
                    >
                        <MenuItem value="sp">Spending Goals</MenuItem>
                        <MenuItem value="Sonali-Bank">Saving Goals</MenuItem>
                    </Select>             

                    <Select
                        fullWidth
                        variant="standard"
                        label="Account"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    >
                        { list.map((account) => (
                            <MenuItem value={account.id}> {account.name} </MenuItem>
                        )) }
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