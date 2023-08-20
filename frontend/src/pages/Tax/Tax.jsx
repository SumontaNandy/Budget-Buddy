import React, { useState, useEffect } from 'react'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {TaxInfo} from "./TaxInfo";


export const Tax = () => {
    const [taxInfo, setTaxInfo] = useState({})

    useEffect(() => {
        const cookies = document.cookie;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Cookie': cookies
        });
        // Fetch saving goals data from the Flask backend API
        fetch('http://127.0.0.1:5000/api/user/tax', { headers })
            .then(response => response.json())
            .then(data => setTaxInfo(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <Box m={1.5} sx={{ flexGrow: 1 }}>
                <h1> Special Expenses </h1>
                <h1> Special Expenses </h1>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TaxInfo
                            info={taxInfo}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
