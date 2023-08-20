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
//import SpecialExpensesCard from "./SpecialExpensesCard";
//import SavingGoalsData from "../../data/SavingGoalsData";


export const TaxInfo = (props) => {

    const centerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const [name, setName] = useState(props.info.personal.name);
    const [fatherName, setFatherName] = useState(props.info.personal.father_name);
    const [motherName, setMotherName] = useState(props.info.personal.mother_name);
    const [dob, setDob] = useState(dayjs(props.info.personal.dob).format('YYYY-MM-DD'));
    const [mobile, setMobile] = useState(props.info.personal.mobile);
    const [address, setAddress] = useState(props.info.personal.address);

    const [nid, setNid] = useState(props.info.ids.nid);
    const [tiin, setTiin] = useState(props.info.ids.tiin);
    const [utin, setUtin] = useState(props.info.ids.utin);
    const [vatRegNo, setVatRegNo] = useState(props.info.ids.vat_reg_no);

    const [profession, setProfession] = useState(props.info.income_info.profession);
    const [organisation, setOrganisation] = useState(props.info.income_info.organisation);
    const [designation, setDesignation] = useState(props.info.income_info.designation);
    const [salary, setSalary] = useState(props.info.income_info.salary);
    const [allowance, setAllowance] = useState(props.info.income_info.allowance);
    const [bonus, setBonus] = useState(props.info.income_info.bonus);

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
        handleCloseThird();
        try {
            let link = "http://127.0.0.1:5000/api/user/tax/update"
            const cookies = document.cookie;
            const res = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Cookie': cookies
                },
                body: JSON.stringify({
                    "personal": {
                        "name": name,
                        "father_name": fatherName,
                        "mother_name": motherName,
                        "dob": dob,
                        "mobile": mobile,
                        "address": address
                    },
                    "ids": {
                        "nid": nid,
                        "tiin": tiin,
                        "utin": utin,
                        "vat_reg_no": vatRegNo
                    },
                    "income_info": {
                        "profession": profession,
                        "organisation": organisation,
                        "designation": designation,
                        "salary": salary,
                        "allowance": allowance,
                        "bonus": bonus
                    }
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

                <br />

                <div className='row text-center'>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>UTIN No</u></small></b><br />
                            {utin}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>VAT Registration No</u></small></b><br />
                            {vatRegNo}
                        </Typography>
                    </div>
                </div>
            </Box>



            <Box m={1.5} sx={{ flexGrow: 1, width: "1200px" }}>
                <Typography variant="h6" component="div">
                    <div className="shadow-lg p-3 mb-2 bg-white rounded text-center"><b>Income Information</b></div>
                </Typography>


                <div className='row text-center'>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Profession</u></small></b><br />
                            {profession}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Organisation</u></small></b><br />
                            {organisation}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Designation</u></small></b><br />
                            {designation}
                        </Typography>
                    </div>
                </div>

                <br />

                <div className='row text-center'>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Basic Salary</u></small></b><br />
                            {salary}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Special Allowance</u></small></b><br />
                            {allowance}
                        </Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="body1" component="div">
                            <b><small><u>Bonus Allowance</u></small></b><br />
                            {bonus}
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
                <DialogTitle>Add Special Expense</DialogTitle>
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
                                onChange={(e) => { setDob(e) }}
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
                <DialogTitle>Add Special Expense</DialogTitle>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="utin"
                        label="UTIN"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={utin}
                        onChange={(e) => setUtin(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="vatRegNo"
                        label="VAT Registration Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={vatRegNo}
                        onChange={(e) => setVatRegNo(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateSecond}>Next</Button>
                    <Button onClick={handleCloseSecond}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateThird} onClose={handleCloseThird}>
                <DialogTitle>Add Special Expense</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="profession"
                        label="Profession"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="organisation"
                        label="Organisation"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="designation"
                        label="Designation"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="salary"
                        label="Salary"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="allowance"
                        label="Allowance"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={allowance}
                        onChange={(e) => setAllowance(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bonus"
                        label="Bonus"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
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
