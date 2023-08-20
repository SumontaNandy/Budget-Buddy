import React, { useState, useEffect } from 'react'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {TaxInfo} from "./TaxInfo";


export const Tax = () => {
    const [taxInfo, setTaxInfo] = useState(null)

    let result = {
        "personal": {
            "name": "Farhan Tanvir Pappu",
            "father_name": "Sumonta Nandy",
            "mother_name": "Amita Mahmuda",
            "dob": "1999-10-11",
            "mobile": "01978962345",
            "address": "248, West Nakhalpara, Dhaka - 1215"
        },
        "ids": {
            "nid": "1310534678",
            "tiin": "1824567891",
            "utin": "890787653464",
            "vat_reg_no": "1234567899876"
        },
        "income_info": {
            "profession": "University Teacher",
            "organisation": "Brac University",
            "designation": "Lecturer",
            "salary": 1000,
            "allowance": 100,
            "bonus": 50
        }
    }

    // useEffect(() => {
    //     const cookies = document.cookie;
    //     const headers = new Headers({
    //         'Content-Type': 'application/json',
    //         'Cookie': cookies
    //     });
    //     // Fetch saving goals data from the Flask backend API
    //     fetch('http://127.0.0.1:5000/api/user/tax', { headers })
    //         .then(response => response.json())
    //         .then(data => setTaxInfo(data))
    //         .catch(error => console.error('Error fetching data:', error));

    //     console.log(taxInfo)
    // }, []);

    return (
        <div>
            <Box m={1.5} sx={{ flexGrow: 1 }}>
                <h1> Tax Return Information </h1>
                <h1> Tax Return Information </h1>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TaxInfo
                            info={result}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
