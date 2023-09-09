//146 number line e expenses.map hobe instead of result.map when we will get data from backend


import React, { useState, useEffect } from 'react'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SpecialExpensesCard from "./SpecialExpensesCard";
import axios from 'axios';
//import SavingGoalsData from "../../data/SavingGoalsData";
import { getSpecialExpenses } from '../../api/Account';
import { createSpecialExpense } from '../../api/Account';


export default function SpecialExpensesContent() {

    // let result = [
    //     {
    //         "type": "by category",
    //         "name": "Dinning Out",
    //         "categories": "resturant",
    //         "setTarget": "true",
    //         "amount": 100
    //     },
    //     {
    //         "type": "by category",
    //         "name": "Dinning Out",
    //         "categories": "resturant",
    //         "setTarget": "true",
    //         "amount": 100
    //     },
    //     {
    //         "type": "by category",
    //         "name": "Dinning Out",
    //         "categories": "resturant",
    //         "setTarget": "true",
    //         "amount": 100
    //     }
    // ]

    const [expenses, setExpenses] = useState([])

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [setTarget, setSetTarget] = useState(true);
    const [tags, setTags] = useState([]);

    const [newTag, setNewTag] = useState('');
    const [amount, setAmount] = useState('');
    const history = useHistory();

    const [openCreateFirst, setOpenCreateFirst] = useState(false);
    const [openCreateSecond, setOpenCreateSecond] = useState(false);
    const [openCreateThird, setOpenCreateThird] = useState(false);

    useEffect(() => {
        const fetchSpecialExpenses = async () => {
            try {
                const specialExpenses = await getSpecialExpenses();
                setExpenses(specialExpenses);
            } catch (error) {
                console.error('Error fetching special expenses:', error);
            }
        };

        fetchSpecialExpenses();
    }, []);


    const onCreateFirst = () => {
        setOpenCreateFirst(true);
    }

    const handleCloseFirst = () => {
        setOpenCreateFirst(false);
    }

    const handleCloseSecond = () => {
        setOpenCreateSecond(false);
    }

    const handleCloseThird = () => {
        setOpenCreateThird(false);
    }

    const handleCreateFirst = () => {
        setOpenCreateFirst(false);
        setOpenCreateSecond(true);
    }

    const handleCreateSecond = () => {
        setOpenCreateSecond(false);
        setOpenCreateThird(true);
    }

    const handleAddTag = () => {
        if (newTag.trim() !== '') {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };


    const handleCreateThird = async () => {
        handleCloseThird();
        try {
            const expense = {
                name: name,
                type: type,
                target: amount,
                tags: tags
            };

            await createSpecialExpense(expense);
            history.push("/special-expenses");
        } catch (error) {
            console.error('Error creating special expense:', error);
            alert("Special Expense Creation Not Successful");
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <h1> Special Expenses </h1>

                <Grid container spacing={2}>
                    {expenses.map(expense => {
                        return (
                            <Grid item xs={3}>
                                <SpecialExpensesCard
                                    expense={expense}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Button variant="contained" onClick={onCreateFirst}>
                Add A Special Expense
            </Button>
            <Dialog open={openCreateFirst} onClose={handleCloseFirst}>
                <DialogTitle>Add Special Expense</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Expense Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputLabel>Select A Type</InputLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label="Select A Type"
                    >
                        <MenuItem value="Extra">Extra</MenuItem>
                        <MenuItem value="Eating">Eating</MenuItem>
                        <MenuItem value="Recreation">Recreation</MenuItem>
                        <MenuItem value="Tour">Tour</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateFirst}>Next</Button>
                    <Button onClick={handleCloseFirst}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateSecond} onClose={handleCloseSecond}>
                <DialogTitle>Add Special Expense</DialogTitle>
                <DialogContent>
                    <InputLabel>Tags</InputLabel>
                    {tags.map((tag, index) => (
                        <TextField
                            key={index}
                            value={tag}
                            onChange={(e) => {
                                const newTags = [...tags];
                                newTags[index] = e.target.value;
                                setTags(newTags);
                            }}
                            label={`Tag ${index + 1}`}
                        />
                    ))}
                    <TextField
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        label="New Tag"
                    />
                    <Button onClick={handleAddTag}>Add Tag</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateSecond}>Next</Button>
                    <Button onClick={handleCloseSecond}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateThird} onClose={handleCloseThird}>
                <DialogTitle>Add Special Expense</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        value={setTarget ? "set" : "noSet"}
                        onChange={(e) => setSetTarget(e.target.value === "set" ? true : false)}
                    >
                        <FormControlLabel
                            value="set"
                            control={<Radio />}
                            label="Set a Target Amount"
                        />
                        <FormControlLabel
                            value="noSet"
                            control={<Radio />}
                            label="No Target Amount"
                        />
                    </RadioGroup>

                    {setTarget ? (
                        <TextField
                            autoFocus
                            margin="dense"
                            id="amount"
                            label="Target Amount"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)} />) : (<div></div>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateThird}>Save</Button>
                    <Button onClick={handleCloseThird}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}