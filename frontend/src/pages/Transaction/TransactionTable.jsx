import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getAllAccounts } from '../../api/Account';
import { getAllTransactions } from '../../api/Transaction';
import AddTransaction from './AddTransaction';
import DateRangePicker from './DateRangePicker';

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
/* ======= @Part-1 ======= */
const columns = [
    { id: 'date', label: 'Date', minWidth: 120, format: (value) => new Date(value).toLocaleDateString('en-UK') },
    { id: 'amount', label: 'Amount', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
    { id: 'payee', label: 'Payee', minWidth: 120 }
];
/* ======= @Part-1 ends ======= */

export default function TransactionTable(props) {
    /* ======= @Part-2 ======= */
    const { setFirstDivAmount } = props;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('none');
    /* ======= @Part-2 ends ======= */

    const [rows, setRows] = useState([]);

    // Rest of your component code...
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    /* ======= @Part-3 ======= */
    // Add a new state variable for total count of rows
    const [totalRows, setTotalRows] = useState(0);
    const [load, setLoad] = useState(true);
    const [payee, setPayee] = useState('');

    const [accountID, setAccountID] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        (async () => {
            const tempAccounts = await getAllAccounts();
            setAccounts(tempAccounts);
        })();
    }, []);

    useEffect(() => {
        if (!load)
            return;

        (async () => {
            const params = {
                page: page + 1,
                per_page: rowsPerPage
            };

            if (selectedOption !== 'none') {
                params['start_date'] = startDate;
                params['end_date'] = endDate;
            }
            //console.log(startDate, endDate);
            params['payee'] = payee;
            if(accountID !== 'none')
                params['account_id'] = accountID;

            let tempTransactions = await getAllTransactions(params);
            setTotalRows(tempTransactions.page_info.total);
            setRows(tempTransactions.transactions);
        })();

        setLoad(false);
    }, [load, page, rowsPerPage]);

    const handleFilter = () => {
        if(selectedOption !== 'none' && (startDate === null || endDate === null || startDate > endDate))
            alert('Please select a valid date range');
        else
            setLoad(true);
    };

    /* ======= @Part-3 ends ======= */

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setLoad(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
        setLoad(true);
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: '10px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>

                <div style={{ paddingLeft: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', paddingLeft: '10px' }}>
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            selectedOption={selectedOption}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            setSelectedOption={setSelectedOption}
                        />

                        <TextField
                            size="small"
                            autoFocus
                            margin="dense"
                            name="payee"
                            label="Payee"
                            type="text"
                            variant="standard" // Change variant to "standard"
                            value={payee}
                            onChange={(e) => setPayee(e.target.value)}
                        />

                        <select
                            fullWidth
                            variant="standard"
                            label="Account"
                            value={accountID}
                            onChange={(e) => setAccountID(e.target.value)}
                        >
                            {accounts.map((account) => (
                                <option value={account.account_id}> {account.account_no} - {account.account_name} </option>
                            ))}
                            <option value="none"> None </option>
                        </select>

                        <Button variant="contained" color="success" onClick={handleFilter}>
                            Apply
                        </Button>
                    </div>

                    {/* ======= @Part-4 ======= */}
                    <AddTransaction />

                    Transactions
                    {/* ======= @Part-4 ends ======= */}

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
                            {rows.map((row) => {
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
                        rowsPerPageOptions={[3, 5, 7]}
                        component="div"
                        count={totalRows}
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