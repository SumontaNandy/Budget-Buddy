import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

export default function AccountCard(props) {
  const history = useHistory();
  return (
    <Card sx={{ minWidth: 275 }} onClick={() => history.push(`/account/${props.id}/details`) }>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Account Name: { props.name }
        </Typography>
        
        <Typography variant="h5" component="div">
           Balance: { props.balance }
        </Typography>
      </CardContent>
    </Card>
  );
}