import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import { CardActions } from '@mui/material';

//import ProgressBar from './ProgressBar';

export default function SavingCard(props) {
    return (
        <Box sx={{ minWidth: 575 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.goal.name}
                    </Typography>

                    <Typography variant="h5" component="div">
                        Goal Amount: {props.goal.goal_amount} <br />
                        Saved So Far: {props.goal.saved_so_far} <br />
                        Left To Save: {props.goal.goal_amount - props.goal.saved_so_far} <br />
                        Target: {props.goal.target_date} <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={()=>{props.onEdit(props.goal)}} startIcon={<EditIcon />}></Button>
                    <Button variant="outlined" onClick={()=>{props.onDelete(props.goal)}} startIcon={<DeleteIcon />}></Button>
                </CardActions>
            </Card>
        </Box>
    );
}
