import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

export default function AccountCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Account Name: {props.name}
        </Typography>

        <Typography variant="h5" component="div">
          Balance: {props.balance}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/account/${props.id}/details`} size="small">Details</Button>
      </CardActions>
    </Card>
  );
}