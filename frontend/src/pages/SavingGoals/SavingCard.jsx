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
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { editGoal } from '../../api/Account';
import { deleteGoal } from '../../api/Account';
import { getAllAccounts } from '../../api/Account';

//import { CardActions } from '@mui/material';

//import ProgressBar from './ProgressBar';

export default function SavingCard(props) {
    console.log("props", props)
    const [openEditFirst, setOpenEditFirst] = useState(false);
    const [openEditSecond, setOpenEditSecond] = useState(false);
    const [openEditThird, setOpenEditThird] = useState(false);

    const [selectedSet, setSelectedSet] = useState('set')

    const [account, setAccount] = useState(props.account_id);
    const [allAccounts, setAllAccounts] = useState([]);
    const [category, setCategory] = useState(props.category);
    const [name, setName] = useState(props.name);
    const [goalAmount, setGoalAmount] = useState(props.goal_amount);
    //const [targetDate, setTargetDate] = useState(props.goal.target_date);
    const [targetDate, setTargetDate] = useState(dayjs('2023-08-20'));
    const [savedSoFar, setSavedSoFar] = useState(props.saved_so_far);
    const [spentSoFar, setSpentSoFar] = useState(props.spent_so_far);
    const [monthlyContribution, setMonthlyContribution] = useState(props.monthly_contribution);
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

    useEffect(() => {
        (async () => {
            let accounts = await getAllAccounts();
            setAllAccounts(accounts);
        })();
    }, []);

    const handleEditThird = () => {
        const updatedGoal = {
            account_id: account,
            category: category,
            name: name,
            goal_amount: goalAmount,
            saved_so_far: savedSoFar,
            spent_so_far: spentSoFar,
            target_date: targetDate,
            monthly_contribution: monthlyContribution
        };

        editGoal(JSON.stringify(updatedGoal), account).then(res => {
            if (res.status === 200) { // or any other condition you want to check on the response
                history.push("/saving-goals"); // replace "/saving-goals" with the actual path to the saving goals page
            } else {
                alert("Update not successful");
            }
        });

        setOpenEditThird(false); // Close the dialog
    };


    const onDelete = async (nAme) => {
        try {
            const res = await deleteGoal(nAme);
            if (res.status === 200) {
                history.push("/saving-goals");
            } else {
                alert("Delete Not Successful");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Box sx={{ minWidth: 575 }} m={2}>
                {console.log("data paisi")}
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {name}
                        </Typography>

                        <Typography variant="h5" component="div">
                            Goal Amount: {goalAmount} <br />
                        </Typography>
                        <Typography variant="h5" component="div">
                            Spent So Far: {spentSoFar} <br />
                        </Typography>
                        <Typography variant="h5" component="div">
                            Left To Save: {goalAmount - savedSoFar} <br />
                        </Typography>
                        <Typography variant="h5" component="div">
                            Target Date: {dayjs(targetDate).format('YYYY-MM-DD')}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Category: {category} <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" onClick={() => { onEditFirst() }} startIcon={<EditIcon />}></Button>
                        {/*<Button variant="outlined" onClick={() => { onDelete(name) }} startIcon={<DeleteIcon />}></Button>*/}
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
                    <Button onClick={handleEditThird}>Save</Button>
                    <Button onClick={handleCloseThird}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}




//<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2023-08-20')} />
