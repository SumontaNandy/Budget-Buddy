import Box from "@mui/material/Box";

import SidebarMenu, { DrawerHeader } from '../../components/SidebarMenu';
import Upcoming from "../../components/Upcoming";
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