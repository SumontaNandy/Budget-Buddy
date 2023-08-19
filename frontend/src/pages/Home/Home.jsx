import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


import PlanCard from "./PlanCard";
import PlanData from "../../data/PlanData";
import SidebarMenu from "../../components/SidebarMenu";
const PlanList = PlanData;

export default function Home()
{
    return (
      <Box m={1.5} sx={{ flexGrow: 1 }}>
        <SidebarMenu />
        <h1> Accounts </h1>
        <Grid container spacing={2}>
          { PlanList.map(cell => {
            return (
              <Grid item xs={3}>
                <PlanCard 
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