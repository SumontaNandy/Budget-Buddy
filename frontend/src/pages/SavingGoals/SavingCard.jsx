import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


//import { CardActions } from '@mui/material';

//import ProgressBar from './ProgressBar';

export default function SavingCard(props) {
    const [openEditFirst, setOpenEditFirst] = useState(false);
    const [openEditSecond, setOpenEditSecond] = useState(false);
    const [openEditThird, setOpenEditThird] = useState(false);

    const [selectedSet, setSelectedSet] = useState('set')
    const [name, setName] = useState(props.goal.name);
    const [goalAmount, setGoalAmount] = useState(props.goal.goal_amount);
    //const [targetDate, setTargetDate] = useState(props.goal.target_date);
    const [targetDate, setTargetDate] = useState(dayjs('2023-08-20'));
    const [savedSoFar, setSavedSoFar] = useState(props.goal.saved_so_far);
    const [account, setAccount] = useState(props.goal.account);
    const [monthlyContribution, setMonthlyContribution] = useState(props.goal.monthly_contribution);
    const history = useHistory();

    const onEditFirst = () => {
        setOpenEditFirst(true);
    }

    const handleCloseFirst = () => {
        setOpenEditFirst(false);
    }

    const handleCloseSecond = () => {
        setOpenEditSecond(false);
    }

    const handleCloseThird = () => {
        setOpenEditThird(false);
    }

    const handleEditFirst = () => {
        setOpenEditFirst(false);
        setOpenEditSecond(true);
    }

    const handleEditSecond = () => {
        setOpenEditSecond(false);
        setOpenEditThird(true);
    }

    const handleEditThird = async () => {
        handleCloseThird();
        try {
            let link = "http://127.0.0.1:5000/api/user/goal/edit/" + name
            const cookies = document.cookie;
            const res = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookies
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
                alert("Edit Not Successful");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const onDelete = async (nAme) => {
        try {
            let link = "http://127.0.0.1:5000/api/user/goal/delete/" + nAme
            const cookies = document.cookie;
            const res = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookies
                },
                body: JSON.stringify({
                    name: nAme,
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
                alert("Delete Not Successful");
                //handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Box sx={{ minWidth: 575 }} m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {props.goal.name}
                        </Typography>

                        <Typography variant="h5" component="div">
                            Goal Amount: {props.goal.goal_amount} <br />
                            Saved So Far: {props.goal.saved_so_far} <br />
                            Left To Save: {props.goal.goal_amount - props.goal.saved_so_far} <br />
                            Target: {props.goal.target_date} <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" onClick={() => { onEditFirst() }} startIcon={<EditIcon />}></Button>
                        <Button variant="outlined" onClick={() => { onDelete(props.goal.name) }} startIcon={<DeleteIcon />}></Button>
                    </CardActions>
                </Card>
            </Box>
            <Dialog open={openEditFirst} onClose={handleCloseFirst}>
                <DialogTitle>Edit Goal</DialogTitle>
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
                    <Button onClick={handleEditFirst}>Next</Button>
                    <Button onClick={handleCloseFirst}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditSecond} onClose={handleCloseSecond}>
                <DialogTitle>Edit Goal</DialogTitle>
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
                    <Button onClick={handleEditSecond}>Next</Button>
                    <Button onClick={handleCloseSecond}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditThird} onClose={handleCloseThird}>
                <DialogTitle>Edit Goal</DialogTitle>
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
                    <Button onClick={handleEditThird}>Save</Button>
                    <Button onClick={handleCloseThird}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}




//<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2023-08-20')} />
