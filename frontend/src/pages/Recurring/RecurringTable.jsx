import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Settings from "./Settings";
import TransactionData from "../../data/TransactionData";
const TransactionList = TransactionData;

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {new Date(row.date).toLocaleDateString("en-US")}
        </TableCell>
        <TableCell align="center">{row.category}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
        <TableCell align="center">{row.account}</TableCell>
        <TableCell>
          <Settings account={row.account} category={row.category} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired
  }).isRequired
};

export default function RecurringTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Amount</TableCell>
            <TableCell align="left">Account</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TransactionList.map((row) => (
            <Row key={row.account} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}