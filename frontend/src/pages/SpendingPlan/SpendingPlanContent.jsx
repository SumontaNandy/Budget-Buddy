import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardActionArea, Typography } from '@mui/material';

import OneTimeTable from './OneTimeTable';
import BillTable from './BillTable';

export default function SpendingPlanContent() {
    const [panel, setPanel] = useState("FirstDiv");
    const [firstDivAmount, setFirstDivAmount] = useState(0);
    const [secondDivAmount, setSecondDivAmount] = useState(120);

    let panelContent = null;
    if (panel === "FirstDiv") {
        panelContent = (
            <OneTimeTable setFirstDivAmount={setFirstDivAmount} />
        )
    }
    else {
        panelContent = (
            <>
                {/* <BillTable setFirstDivAmount={setFirstDivAmount} /> */}
            </>
        )
    }

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={3}>

                    <Card sx={{ maxWidth: 345 }} style={{ margin: '10px' }}>
                        <CardActionArea onClick={() => { setFirstDivAmount(0); setPanel("FirstDiv") }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {firstDivAmount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Onetime Expenses
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }} style={{ margin: '10px' }}>
                        <CardActionArea onClick={() => setPanel("SecondDiv")}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {secondDivAmount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Planned spending
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