import './App.css';

import * as React from "react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import BasicCard from "./components/Card";
import Home from "./components/Home";
import AppRoutes from "./components/AppRoutes";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

function App() {
  return (
    <AppRoutes />
  );
}

export default App;