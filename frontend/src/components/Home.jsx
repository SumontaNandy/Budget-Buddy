import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


import BasicCard from "./Card";
import PlanData from "./PlanData";
const list = PlanData;

export default function Home()
{
    return (
        <Box m={1.5} sx={{ flexGrow: 1 }}>
        <h1> Accounts </h1>
        <Grid container spacing={2}>
          { list.map(cell => {
            return (
              <Grid item xs={3}>
                <BasicCard 
                name={cell.name}
                spent={cell.spent}
                />
              </Grid>
            )
          }) }
        </Grid>
      </Box>
    );
}