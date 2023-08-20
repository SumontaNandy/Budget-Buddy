import * as React from 'react';
import Box from "@mui/material/Box";

import SidebarMenu, { DrawerHeader } from '../../components/Menu/SidebarMenu';
import Upcoming from "../../components/Upcoming/Upcoming";
import TransactionTable from "../../components/Transaction/TransactionTable";

export default function Transaction() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Upcoming />
        <TransactionTable />
      </Box>
    </Box>
  )
}