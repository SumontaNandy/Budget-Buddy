import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardActionArea, Typography } from '@mui/material';

import IncomeTable from './IncomeTable';
import BillTable from './BillTable';

export default function SpendingPlanContent() {
    const [ panel, setPanel ] = useState("FirstDiv");
    const [ firstDivAmount, setFirstDivAmount ] = useState(0);
    const [ secondDivAmount, setSecondDivAmount ] = useState(120);

    let panelContent = null;
    if(panel === "FirstDiv") {
        panelContent = (
            <>
                <IncomeTable setFirstDivAmount={setFirstDivAmount} />
                <BillTable setFirstDivAmount={setFirstDivAmount} />
            </>
        )
    }
    else {
        panelContent = (
            <>
                <h1>Second Div</h1>
            </>
        )
    }

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={3}>

                    <Card sx={{ maxWidth: 345 }} style={{ margin: '10px' }}>
                        <CardActionArea onClick={ () => { setFirstDivAmount(0); setPanel("FirstDiv") } }>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    { firstDivAmount }
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Income after bills & savings
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }} style={{ margin: '10px' }}>
                        <CardActionArea onClick={ () => setPanel("SecondDiv") }>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    { secondDivAmount }
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Planned spending
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={9}>
                    { panelContent }
                </Grid>
            </Grid>
        </>
    );
}