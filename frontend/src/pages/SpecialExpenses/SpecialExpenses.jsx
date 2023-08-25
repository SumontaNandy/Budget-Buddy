import * as React from 'react';
import Box from "@mui/material/Box";

import SidebarMenu, { DrawerHeader } from '../../components/Menu/SidebarMenu';
import SpecialExpensesContent from './SpecialExpensesContent';

export default function Transaction() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <SpecialExpensesContent />
      </Box>
    </Box>
  )
}