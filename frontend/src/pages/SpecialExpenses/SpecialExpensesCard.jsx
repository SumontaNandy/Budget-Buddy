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
import { InputLabel, MenuItem, Select } from '@mui/material';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

//import { CardActions } from '@mui/material';

//import ProgressBar from './ProgressBar';

export default function SpecialExpensesCard(props) {
    const [openEditFirst, setOpenEditFirst] = useState(false);
    const [openEditSecond, setOpenEditSecond] = useState(false);
    const [openEditThird, setOpenEditThird] = useState(false);

    const [name, setName] = useState(props.expense.name);
    const [type, setType] = useState(props.expense.type);
    const [category, setCategory] = useState(props.expense.categories);
    const [setTarget, setSetTarget] = useState(props.expense.setTarget);
    const [amount, setAmount] = useState(props.expense.amount);

    //const [selectedSet, setSelectedSet] = useState('set')

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
        try {
            let link = "http://127.0.0.1:5000/api/user/watchlist/update/" + name
            const cookies = document.cookie;
            const res = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookies
                },
                body: JSON.stringify({
                    type: type,
                    name: name,
                    categories: category,
                    setTarget: setTarget,
                    amount: amount,
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
                alert("Edit Not Successful");
                handleCloseThird();
            }
        } catch (error) {
            console.log(error);
        }
    }


    const onDelete = async (nAme) => {
        try {
            let link = "http://127.0.0.1:5000/api/user/watchlist/delete/" + nAme
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
                    history.push("/special-expenses");
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
                            {props.expense.name}
                        </Typography>

                        <Typography variant="h5" component="div">
                            Name: {props.expense.name} <br />
                            Type: {props.expense.type} <br />
                            Categories: {props.expense.categories} <br />
                            {setTarget ? "Target Amount: " + props.expense.amount : ""} <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" onClick={() => { onEditFirst() }} startIcon={<EditIcon />}></Button>
                        <Button variant="outlined" onClick={() => { onDelete(props.expense.name) }} startIcon={<DeleteIcon />}></Button>
                    </CardActions>
                </Card>
            </Box>
            <Dialog open={openEditFirst} onClose={handleCloseFirst}>
                <DialogTitle>Edit Special Expense</DialogTitle>
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
                    <Button onClick={handleEditFirst}>Next</Button>
                    <Button onClick={handleCloseFirst}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditSecond} onClose={handleCloseSecond}>
                <DialogTitle>Edit Special Expense</DialogTitle>
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
                    <Button onClick={handleEditSecond}>Next</Button>
                    <Button onClick={handleCloseSecond}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditThird} onClose={handleCloseThird}>
                <DialogTitle>Edit Special Expense</DialogTitle>
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
                    <Button onClick={handleEditThird}>Save</Button>
                    <Button onClick={handleCloseThird}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}




//<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2023-08-20')} />
