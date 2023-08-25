import * as React from 'react';
import Grid from '@mui/material/Grid';

import PlanCard from "./PlanCard";
import PlanData from "../../data/PlanData";
const PlanList = PlanData;

export default function HomeContent() {
  return (
    <>
      <h1> Accounts </h1>
      <Grid container spacing={2}>
        {PlanList.map(cell => {
          return (
            <Grid item xs={3}>
              <PlanCard
                name={cell.name}
                spent={cell.spent}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}