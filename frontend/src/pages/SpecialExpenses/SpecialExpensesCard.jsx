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
import { editSpecialExpense } from '../../api/Account';
import { deleteSpecialExpense } from '../../api/Account';
//import { CardActions } from '@mui/material';

//import ProgressBar from './ProgressBar';

export default function SpecialExpensesCard(props) {
    const [openEditFirst, setOpenEditFirst] = useState(false);
    const [openEditSecond, setOpenEditSecond] = useState(false);
    const [openEditThird, setOpenEditThird] = useState(false);

    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.type);
    const [amount, setAmount] = useState(props.target);
    const [tags, setTags] = useState(props.tags);

    const [newTag, setNewTag] = useState('');

    const [setTarget, setSetTarget] = useState(true);


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

    const handleAddTag = () => {
        if (newTag.trim() !== '') {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleEditThird = () => {
        const updatedExpense = {
            name: name,
            type: type,
            target: amount,
            tags: tags
        };

        editSpecialExpense(JSON.stringify(updatedExpense), id).then(res => {
            history.push("/special-expenses");
        });
        handleCloseThird();
    }

    const onDelete = async () => {
        try {
            const res = await deleteSpecialExpense(id);
            if (res.status === 200) {
                history.push("/special-expenses");
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
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {name}
                        </Typography>

                        <Typography variant="h5" component="div">
                            Type: {type} <br />
                        </Typography>
                        <Typography variant="h5" component="div">
                            {setTarget ? "Target Amount: " + amount : ""} <br />
                        </Typography>
                        <Typography variant="h5" component="div">
                            Tags: {tags.map(tag => `${tag}, `)}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" onClick={() => { onEditFirst() }} startIcon={<EditIcon />}></Button>
                        {/*<Button variant="outlined" onClick={() => { onDelete(id) }} startIcon={<DeleteIcon />}></Button>*/}
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
                        <MenuItem value="Extra">Extra</MenuItem>
                        <MenuItem value="Eating">Eating</MenuItem>
                        <MenuItem value="Recreation">Recreation</MenuItem>
                        <MenuItem value="Tour">Tour</MenuItem>
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
