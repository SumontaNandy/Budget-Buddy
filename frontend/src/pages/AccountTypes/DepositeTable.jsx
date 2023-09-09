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
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getAllDeposites } from '../../api/Account';
import DateRangePicker from './DateRangePicker';
import AddDeposite from './AddDeposite';

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
    { id: 'amount', label: 'Amount', minWidth: 170, format: (value) => value.toLocaleString('en-US') }
];
/* ======= @Part-1 ends ======= */

export default function DepositeTable(props) {
    /* ======= @Part-2 ======= */
    const { account_id } = props;

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

    useEffect(() => {
        (async () => {
            const params = {
                page: page + 1,
                per_page: rowsPerPage
            };

            if (selectedOption !== 'none') {
                params['start_date'] = startDate;
                params['end_date'] = endDate;
            }
            //console.log("Dates", startDate, endDate);
            let tempDeposites = await getAllDeposites(account_id, params);
            setTotalRows(tempDeposites.page_info.total);
            setRows(tempDeposites.deposites);
        })();
    }, [load, page, rowsPerPage, account_id]);

    const handleFilter = () => {
        //console.log("Inside filter");
        if (selectedOption !== 'none' && (!startDate || !endDate || startDate > endDate))
            alert('Please select a valid date range');
        else
            setLoad(!load);
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

                        <Button variant="contained" color="success" onClick={handleFilter}>
                            Apply
                        </Button>
                    </div>

                    {/* ======= @Part-4 ======= */}
                    <AddDeposite
                        account_id={account_id}
                        setLoad={setLoad}
                    />

                    Deposites
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
                                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1} >
                                        {
                                            columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })
                                        }
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
        </Paper >
    );
}