import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//import ProgressBar from './ProgressBar';

export default function PlanCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.name}
        </Typography>

        <Typography variant="h5" component="div">
          Spent: {props.spent}
        </Typography>


      </CardContent>
    </Card>
  );
}