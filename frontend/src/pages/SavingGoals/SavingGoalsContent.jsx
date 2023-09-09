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
import { getSavingGoals } from '../../api/Account';
import { createGoal } from '../../api/Account';
import { getAllAccounts } from '../../api/Account';

export default function SavingGoalsContent() {

     let result = [
        {
            "id": "1976401e-281e-44b4-a0db-b29c4717e99a",
            "account_id": "9f439984-4b27-4136-93ac-3a7a03626b02",
            "category": "test",
            "name": "test",
            "goal_amount": 4000,
            "saved_so_far": 100,
            "spent_so_far": 4,
            "target_date": "2023-08-17T18:45:42.361539+06:00",
            "monthly_contribution": 4
        },
        {
            "id": "dfbc76fe-b92b-41d9-81b3-94eb89494e3a",
            "account_id": "9f439984-4b27-4136-93ac-3a7a03626b02",
            "category": "test",
            "name": "test",
            "goal_amount": 4000,
            "saved_so_far": 98,
            "spent_so_far": 8,
            "target_date": "2023-08-17T18:45:42.361539+06:00",
            "monthly_contribution": 4
        }
    ]

    const [goals, setGoals] = useState([])
    const [account, setAccount] = useState('');
    const [allAccounts, setAllAccounts] = useState([]);
    const [category, setCategory] = useState('')
    const [name, setName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [savedSoFar, setSavedSoFar] = useState('');
    const [spentSoFar, setSpentSoFar] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const history = useHistory();

    const [openCreateFirst, setOpenCreateFirst] = useState(false);
    const [openCreateSecond, setOpenCreateSecond] = useState(false);
    const [openCreateThird, setOpenCreateThird] = useState(false);

    const [selectedSet, setSelectedSet] = useState('set')
    const [targetDate, setTargetDate] = useState(dayjs('2023-08-20'));

    useEffect(() => {
        (async () => {
            let data = await getSavingGoals();
            console.log(data);
            setGoals(data.goal_list);
            console.log(goals);
            console.log(data.goal_list);


            const accounts = await getAllAccounts();
            setAllAccounts(accounts);
        })();
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


    const handleCreateThird = () => {
        const newGoal = {
            account_id: account,
            category: category,
            name: name,
            goal_amount: goalAmount,
            saved_so_far: savedSoFar,
            spent_so_far: spentSoFar,
            target_date: targetDate,
            monthly_contribution: monthlyContribution
        };

        createGoal(JSON.stringify(newGoal)).then(res => {
            setGoals(prev => [...prev, newGoal]);
            if (res.goal_list.length > 0) {
                setAccount(res.goal_list[0].account_id);
            }
        });

        setOpenCreateThird(false); // Close the dialog
        history.push("/saving-goals");
    };

    return (
        <>
            <Box m={1.5} sx={{ flexGrow: 1 }}>
                <h1> Saving Goals </h1>
                { console.log("Goals:", goals) }

                <Grid container spacing={2}>
                    {goals.map((goal, index) => {
                        return (
                            <Grid item xs={3}>
                                <SavingCard name = {goal.name}
                                            account_id = {goal.account_id}
                                            goal_amount = {goal.goal_amount}
                                            saved_so_far = {goal.saved_so_far}
                                            spent_so_far = {goal.spent_so_far}
                                            monthly_contribution = {goal.monthly_contribution}
                                            target_date = {goal.target_date}
                                            category = {goal.category}
                                            key = {index}/>
                                {console.log("data pathaisi")}
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
                        label="Select An Account"
                    >
                        {allAccounts.map((account, index) => (
                            <MenuItem value={account.account_id} key={index}>
                                {account.account_name}
                            </MenuItem>
                        ))}
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
                                    onChange={(e) => { setTargetDate(e.d) }}
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
                        id="spentSoFar"
                        label="Spent So Far"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={spentSoFar}
                        onChange={(e) => setSpentSoFar(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateThird}>Create</Button>
                    <Button onClick={handleCloseThird}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}