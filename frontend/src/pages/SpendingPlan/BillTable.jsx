import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from '@mui/material';

import { getAllBills } from '../../api/Account';
import AddIncome from './AddIncome';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
    })
}));

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'amount', label: 'Amount', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 }
];

export default function IncomeTable(props) {
    const { setFirstDivAmount } = props;
    const [rows, setRows] = useState([]);

    useEffect(() => {
        (async () => {
            const bills = await getAllBills();
            setRows(bills.recurrent_expenses);

            const totalBill = bills.recurrent_expenses.reduce((accumulator, currentBill) => {
                return accumulator + currentBill.amount;
            }, 0);
            setFirstDivAmount(prev => prev - totalBill);
        })();
    }, []);

    // Rest of your component code...
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: '10px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>

                <div style={{ paddingLeft: '10px' }}>
                    <Button variant="contained" style={{ margin: '10px' }}>
                        Add Bill
                    </Button>

                    Bills

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>

                </div>

                <Collapse sx={{ width: "100%" }} in={expanded} timeout="auto" unmountOnExit>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 8, 10]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Collapse>

            </TableContainer>
        </Paper>
    );
}