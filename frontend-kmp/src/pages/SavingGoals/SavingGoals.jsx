import React, { useState } from 'react'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import SavingCard from "./SavingCard";
import SavingGoalsData from "../../data/SavingGoalsData";


export const SavingGoals = () => {
    const [goals, setGoals] = useState(SavingGoalsData)

    const onEdit = (goal) => {
        
    }

    const onDelete = (goal) => {
        
    }

    return (
        <div>
            <Box m={1.5} sx={{ flexGrow: 1 }}>
                <h1> Saving Goals </h1>
                <h1> Saving Goals </h1>

                <Grid container spacing={2}>
                    {goals.map(goal => {
                        return (
                            <Grid item xs={3}>
                                <SavingCard
                                    goal = {goal}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </div>
    )
}
