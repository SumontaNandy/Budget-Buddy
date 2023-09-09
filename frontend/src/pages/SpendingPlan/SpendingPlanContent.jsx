import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardActionArea, Typography } from '@mui/material';

import OneTimeTable from './OneTimeTable';
import RecurrentTable from './RecurrentTable';
import AddRecurrent from './AddRecurrent';

export default function SpendingPlanContent() {
    const [panel, setPanel] = useState("FirstDiv");

    let panelContent = null;
    if (panel === "FirstDiv") {
        panelContent = (
            <OneTimeTable />
        )
    }
    else if (panel === "SecondDiv") {
        panelContent = (
            <>
                <AddRecurrent />
                <RecurrentTable type="BILL" />
                <RecurrentTable type="SUBSCRIPTION" />
            </>
        )
    }

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={3}>

                    <Card sx={{ maxWidth: 345 }} style={{ margin: '10px' }}>
                        <CardActionArea onClick={() => { setPanel("FirstDiv") }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Onetime Expenses
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary">
                                    Onetime Expenses
                                </Typography> */}
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }} style={{ margin: '10px' }}>
                        <CardActionArea onClick={() => setPanel("SecondDiv")}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Recurring Expenses
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={9}>
                    {panelContent}
                </Grid>
            </Grid>
        </>
    );
}