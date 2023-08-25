import React from 'react';
//import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TransactionData from '../../data/TransactionData';
import UpcomingCard from './UpcomingCard';

const TransactionList = TransactionData;

export default function Upcoming() {
  return (
    <Box m={1.5} sx={{ flexGrow: 1 }}>
        <h3> Upcoming </h3>
        <Grid container spacing={2}>
            { TransactionList.map(cell => {
              return (
                  <Grid item xs={3}>
                    <UpcomingCard 
                    days={ Math.floor((new Date(cell.date) - new Date()) / (1000 * 60 * 60 * 24)) }
                    category={cell.category}
                    amount={cell.amount}
                    account={cell.account}
                    />
                  </Grid>
              )})
            }
        </Grid>
    </Box>
  );
}