import * as React from 'react';
import Box from '@mui/material/Box';

import SidebarMenu, { DrawerHeader } from "../../components/Menu/SidebarMenu";

export default function UseSideBar(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        { props.content }
      </Box>
    </Box>
  );
}