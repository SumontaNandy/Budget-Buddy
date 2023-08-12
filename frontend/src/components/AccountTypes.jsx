import React from 'react';
import { Link } from "react-router-dom";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link as MuiLink from "@mui/material/Link";

import BasicCard from "./Card";
import Data from './Data';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));


const { parent, child, accounts } = Data;

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function AccountTypes() {
  // const breadcrumbs = [
  //   <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
  //     MUI
  //   </Link>,
  //   <Link underline="hover" key="2" color="inherit" href="/" onClick={handleClick}>
  //     Core
  //   </Link>,
  //   <Typography key="3" color="text.primary">
  //     Breadcrumb
  //   </Typography>,
  // ];

  const breadcrumbs = parent.map((cell, index) => {
    if(index !== parent.length - 1) {
      return (
        <Link underline="hover" key={cell.id} color="inherit" href="/contact" onClick={handleClick}>
          {cell.name}
        </Link>
      )
    }
  });

  breadcrumbs.push(<Typography key={parent[parent.length-1].id} color="text.primary">{parent[parent.length-1].name}</Typography>)

  return (
    <div>
      <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>

      <Box m={1.5} sx={{ flexGrow: 1 }}>
        <h1> Child Account-Types </h1>
        <Grid container spacing={2}>
          { child.map(cell => {
            return (
              <Grid item xs={3}>
                <Link to="/contact">
                  <Item>
                    {cell.name}
                  </Item>
                </Link>
              </Grid>
            )
          }) }
        </Grid>
      </Box>

      
      <Box m={1.5} sx={{ flexGrow: 1 }}>
        <h1> Accounts </h1>
        <Grid container spacing={2}>
          { accounts.map(cell => {
            return (
              <Grid item xs={3}>
                <BasicCard 
                name={cell.account_name}
                balance={cell.balance}
                />
              </Grid>
            )
          }) }
        </Grid>
      </Box>
    </div>
  );
}