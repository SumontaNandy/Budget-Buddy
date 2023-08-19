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

import SavingCard from "./SavingCard";
import SavingGoalsData from "../../data/SavingGoalsData";


export const SavingGoals = () => {
    const [goals, setGoals] = useState([])
    const [openCreate, setOpenCreate] = useState(false);
    const [name, setName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [savedSoFar, setSavedSoFar] = useState('');
    const [account, setAccount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const history = useHistory();

    useEffect(() => {
        // Fetch saving goals data from the Flask backend API
        fetch('http://127.0.0.1:5000/api/user/goal')
            .then(response => response.json())
            .then(data => setGoals(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleCreateOpen = () => {
        setOpenCreate(true);
    }

    const handleClose = () => {
        setOpenCreate(false);
    }

    const handleCreate = async () => {
        try {
            let link = "http://127.0.0.1:5000/api/user/goal/create"
            const res = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                handleClose();
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
                    {goals.map(goal => {
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
            <Button variant="contained" onClick={handleCreateOpen}>
                Add Account
            </Button>
            <Dialog open={openCreate} onClose={handleClose}>
                <DialogTitle>Create Goal</DialogTitle>
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
                        id="targetDate"
                        label="Target Date"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="account"
                        label="Account"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
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
                    <Button onClick={handleCreate}>Create</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
