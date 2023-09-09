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
import { Container, Paper, Typography } from '@mui/material';
import { getTaxInfo } from '../../api/Account';
import { editTaxInfo } from '../../api/Account';
//import SpecialExpensesCard from "./SpecialExpensesCard";
//import SavingGoalsData from "../../data/SavingGoalsData";


export const TaxInfo = (props) => {

    const centerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    console.log(props.info);

    const [id, setId] = useState(props.id);

    const [name, setName] = useState(props.name || "No Name Found");
    const [spouse, setSpouse] = useState(props.spouseName || "No Name Found");
    const [fatherName, setFatherName] = useState(props.fatherName || "No Name Found");
    const [motherName, setMotherName] = useState(props.motherName || "No Name Found");
    
    const [dob, setDob] = useState(dayjs(props.dob).format('YYYY-MM-DD') || "No Date Found");
    const [mobile, setMobile] = useState(props.contactNo || "No Mobile Number Found");
    const [email, setEmail] = useState(props.email || "No Email Found");
    const [address, setAddress] = useState(props.address || "No Address Found");

    const [nid, setNid] = useState(props.nid || "No NID Found");
    const [tiin, setTiin] = useState(props.tin || "No TIIN Found");

    const history = useHistory();

    const [openCreateFirst, setOpenCreateFirst] = useState(false);
    const [openCreateSecond, setOpenCreateSecond] = useState(false);
    const [openCreateThird, setOpenCreateThird] = useState(false);


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
        const updatedTaxInfo = {
            "id": id,
            "email": email,
            "user": {
                "first_name": name,
                "middle_initial": null,
                "last_name": null
            },
            "spouse": {
                "first_name": spouse,
                "middle_initial": null,
                "last_name": null
            },
            "father": {
                "first_name": fatherName,
                "middle_initial": null,
                "last_name": null
            },
            "mother": {
                "first_name": motherName,
                "middle_initial": null,
                "last_name": null
            },
            "permanent_address": {
                "village_house": null,
                "road_block_sector": null,
                "police_station": null,
                "post_office": null,
                "post_code": null,
                "district": null
            },
            "present_address": {
                "village_house": address,
                "road_block_sector": null,
                "police_station": null,
                "post_office": null,
                "post_code": null,
                "district": null
            },
            "contact_no": mobile,
            "nid": nid,
            "tin": tiin,
            "dob": dob,
            "img": null
        }

        editTaxInfo(JSON.stringify(updatedTaxInfo), id).then(res => {
            history.push("/tax");
        });
        handleCloseThird();
    }

    return (
        <div>
            <Box m={1.5} sx={{ flexGrow: 1, width: "1200px" }}>
                <Typography variant="h6" component="div">
                    <div className="shadow-lg p-3 mb-2 bg-white rounded text-center"><b>Personal Information</b></div>
                </Typography>


                <div className='row text-center'>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Name</u></small></b><br />
                            {name}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Father's Name</u></small></b><br />
                            {fatherName}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Mother's Name</u></small></b><br />
                            {motherName}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Spouse's Name</u></small></b><br />
                            {spouse}
                        </Typography>
                    </div>
                </div>

                <br />

                <div className='row text-center'>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Date of Birth</u></small></b><br />
                            {dob}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Mobile Number</u></small></b><br />
                            {mobile}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Email</u></small></b><br />
                            {email}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Address</u></small></b><br />
                            {address}
                        </Typography>
                    </div>
                </div>

                <br />

                <div className='row text-center'>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Address</u></small></b><br />
                            {address}
                        </Typography>
                    </div>
                </div>
            </Box>




            <Box m={1.5} sx={{ flexGrow: 1, width: "1200px" }}>
                <Typography variant="h6" component="div">
                    <div className="shadow-lg p-3 mb-2 bg-white rounded text-center"><b>Identification Numbers</b></div>
                </Typography>


                <div className='row text-center'>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>NID No</u></small></b><br />
                            {nid}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>TIIN No</u></small></b><br />
                            {tiin}
                        </Typography>
                    </div>
                </div>
            </Box>


            <div style={centerContainerStyle}>
                <Button variant="contained" onClick={onCreateFirst}>
                    Update Tax Information
                </Button>
            </div>


            <Dialog open={openCreateFirst} onClose={handleCloseFirst}>
                <DialogTitle>Update Tax Information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fatherName"
                        label="Father's Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="motherName"
                        label="Mother's Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mobile"
                        label="Mobile Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Date of Birth"
                                value={dob}
                                onChange={(e) => { setDob(e.d) }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateFirst}>Next</Button>
                    <Button onClick={handleCloseFirst}>Cancel</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openCreateSecond} onClose={handleCloseSecond}>
                <DialogTitle>Update Tax Information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nid"
                        label="NID"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nid}
                        onChange={(e) => setNid(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tiin"
                        label="TIIN"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={tiin}
                        onChange={(e) => setTiin(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateSecond}>Next</Button>
                    <Button onClick={handleCloseSecond}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateThird} onClose={handleCloseThird}>
                <DialogTitle>Update Tax Information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="spouse"
                        label="spouse"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={spouse}
                        onChange={(e) => setSpouse(e.target.value)}
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
