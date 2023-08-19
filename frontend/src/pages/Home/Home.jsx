import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import PlanCard from "./PlanCard";
import PlanData from "../../data/PlanData";
import SidebarMenu, { DrawerHeader } from "../../components/SidebarMenu";
const PlanList = PlanData;

const drawerWidth = 240;

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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
    </Box>
  );
}