import './App.css';

import * as React from "react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ProSidebarProvider } from "react-pro-sidebar";

import BasicCard from "./components/Card";
import Home from "./components/Home";
import AppRoutes from "./components/AppRoutes";
import SidebarMenu from "./components/Sidebar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  return (      
    < AppRoutes />
  );
}

export default App;