//152 number line e goals.map hobe instead of result.map when we will get data from backend


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
import SavingCard from "./SavingCard";
import SavingGoalsData from "../../data/SavingGoalsData";


export const SavingGoals = () => {

    let result = [
        {
            "name": "Cox's Bazar Vacation",
            "goal_amount": 100000,
            "saved_so_far": 5000,
            "account": "ICCU Savings",
            "target_date": "10/10/2029",
            "monthly_contribution": 2500
        },
        {
            "name": "Eid Shopping",
            "goal_amount": 10000,
            "saved_so_far": 2000,
            "account": "ICCU Savings",
            "target_date": "10/10/2024",
            "monthly_contribution": 1000
        },
        {
            "name": "Grad Night",
            "goal_amount": 1000,
            "saved_so_far": 200,
            "account": "ICCU Savings",
            "target_date": "10/10/2024",
            "monthly_contribution": 100
        }
    ]

    const [goals, setGoals] = useState([])
    const [name, setName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [savedSoFar, setSavedSoFar] = useState('');
    const [account, setAccount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const history = useHistory();

    const [openCreateFirst, setOpenCreateFirst] = useState(false);
    const [openCreateSecond, setOpenCreateSecond] = useState(false);
    const [openCreateThird, setOpenCreateThird] = useState(false);

    const [selectedSet, setSelectedSet] = useState('set')
    const [targetDate, setTargetDate] = useState(dayjs('2023-08-20'));

    useEffect(() => {
        const cookies = document.cookie;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Cookie': cookies
        });
        // Fetch saving goals data from the Flask backend API
        fetch('http://127.0.0.1:5000/api/user/goal', { headers })
            .then(response => response.json())
            .then(data => setGoals(data))
            .catch(error => console.error('Error fetching data:', error));
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


    const handleCreateThird = async () => {
        handleCloseThird();
        try {
            let link = "http://127.0.0.1:5000/api/user/goal/create"
            const cookies = document.cookie;
            const res = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Cookie': cookies
                },
                body: JSON.stringify({
                    name: name,
                    goal_amount: goalAmount,
                    saved_so_far: savedSoFar,
                    target_date: targetDate,
                    account: account,
                    monthly_contribution: monthlyContribution
                })
            });

            if (res.ok) {
                const data = await res.json();
                const { status } = data;

                if (status === "success") {
                    history.push("/saving-goals");
                }
            }
            else {
                alert("Goal Creation Not Successful");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Box m={1.5} sx={{ flexGrow: 1 }}>
                <h1> Saving Goals </h1>
                <h1> Saving Goals </h1>

                <Grid container spacing={2}>
                    {result.map(goal => {
                        return (
                            <Grid item xs={3}>
                                <SavingCard
                                    goal={goal}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Button variant="contained" onClick={onCreateFirst}>
                Add A Saving Goal
            </Button>
            <Dialog open={openCreateFirst} onClose={handleCloseFirst}>
                <DialogTitle>Add Goal</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Goal Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="goalAmount"
                        label="Goal Amount"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="savedSoFar"
                        label="Saved So Far"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={savedSoFar}
                        onChange={(e) => setSavedSoFar(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateFirst}>Next</Button>
                    <Button onClick={handleCloseFirst}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateSecond} onClose={handleCloseSecond}>
                <DialogTitle>Add Goal</DialogTitle>
                <DialogContent>
                    <InputLabel>Select an Account</InputLabel>
                    <Select
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        label="Select an Account"
                    >
                        <MenuItem value={account}>{account}</MenuItem>
                        <MenuItem value="ICCU-Checking">ICCU-Checking</MenuItem>
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Sonali-Bank">Sonali Bank</MenuItem>
                    </Select>
                    <RadioGroup
                        value={selectedSet}
                        onChange={(e) => setSelectedSet(e.target.value)}
                    >
                        <FormControlLabel
                            value="set"
                            control={<Radio />}
                            label="Set a Target Date"
                        />
                        <FormControlLabel
                            value="noSet"
                            control={<Radio />}
                            label="No Target Date"
                        />
                    </RadioGroup>

                    {selectedSet === "set" ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Target Date"
                                    value={targetDate}
                                    onChange={(e) => { setTargetDate(e) }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>) : (<div></div>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateSecond}>Next</Button>
                    <Button onClick={handleCloseSecond}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateThird} onClose={handleCloseThird}>
                <DialogTitle>Add Goal</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="monthlyContribution"
                        label="Monthly Contribution"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateThird}>Save</Button>
                    <Button onClick={handleCloseThird}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
