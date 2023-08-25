import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function UpcomingCard(props) {
  let dueTime = "";
  if (props.days === 0)
    dueTime = "Today";
  else if (props.days === 1)
    dueTime = "Tomorrow";
  else
    dueTime = "In " + props.days + " days";

  return (
    <Card sx={{ minWidth: 275 }} style={{ backgroundColor: '#FFE5E5' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            { dueTime }
        </Typography>
        <Typography variant="h5" component="div">
            { props.category }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            { props.amount }
        </Typography>
        <Typography variant="body2">
            { props.account }
        </Typography>
      </CardContent>
    </Card>
  );
}