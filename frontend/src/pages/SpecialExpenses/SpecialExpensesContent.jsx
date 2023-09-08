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
    const [category, setCategory] = useState('');
    const [setTarget, setSetTarget] = useState(true);
    const [amount, setAmount] = useState('');
    const history = useHistory();

    const [openCreateFirst, setOpenCreateFirst] = useState(false);
    const [openCreateSecond, setOpenCreateSecond] = useState(false);
    const [openCreateThird, setOpenCreateThird] = useState(false);

    useEffect(() => {
        const getTokenFromCookies = (tokenType) => {
            const cookies = document.cookie.split('; ');
            for (const cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name === tokenType) {
                    return value;
                }
            }
            return null;
        };

        const accessToken = getTokenFromCookies('access_token');
        const refreshToken = getTokenFromCookies('refresh_token');
        console.log("access token is : ", accessToken);

        const headers = new Headers({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        });
        // Fetch special expenses/watchlist data from the Flask backend API
        console.log('fetching data');
        axios.get('http://127.0.0.1:5000/api/1/user/watchlist', { headers: headers })
            .then(response => {
                console.log('just got the response');
                if (!response.status === 200) {
                    console.log("Khaise re baba");
                }
                return response.data;
            })
            .then(data => {
                setExpenses(data);
                console.log("gulli mari", data);
            })
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
            let link = "http://127.0.0.1:5000/api/user/watchlist/create"

            const getTokenFromCookies = (tokenType) => {
                const cookies = document.cookie.split('; ');
                for (const cookie of cookies) {
                    const [name, value] = cookie.split('=');
                    if (name === tokenType) {
                        return value;
                    }
                }
                return null;
            };

            const accessToken = getTokenFromCookies('access_token');
            const refreshToken = getTokenFromCookies('refresh_token');

            const res = await fetch(link, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: 1,
                    name: name,
                    type: type,
                    target: amount,
                    tags: category
                })
            });

            if (res.ok) {
                const data = await res.json();
                const { status } = data;

                if (status === "success") {
                    history.push("/special-expenses");
                }
            }
            else {
                alert("Special Expense Creation Not Successful");
            }
        } catch (error) {
            console.log(error);
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
                        <MenuItem value={type}>{type}</MenuItem>
                        <MenuItem value="Extra">Extra</MenuItem>
                        <MenuItem value="Eating">Eating</MenuItem>
                        <MenuItem value="Recreation">Recreation</MenuItem>
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
                    <InputLabel>Select A Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Select A Category"
                    >
                        <MenuItem value={category}>{category}</MenuItem>
                        <MenuItem value="Restaurant">Restaurant</MenuItem>
                        <MenuItem value="MI-28-Attack-Helicopter">MI-28-Attack-Helicopter</MenuItem>
                        <MenuItem value="Otomat-MKII-Missile">Otomat-MKII-Missile</MenuItem>
                    </Select>
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