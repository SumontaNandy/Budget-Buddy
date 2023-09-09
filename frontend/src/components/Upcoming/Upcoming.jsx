import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { getAllRecurringExpenses } from '../../api/Account';
import UpcomingCard from './UpcomingCard';

export default function Upcoming() {
	const rowsPerPage = 4;
    const [upcomings, setUpcomings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUpcomingTransaction = async () => {
			const params = {
				upcoming: 1,
				page: page,
				per_page: rowsPerPage
			};
            const tempUpcomings = await getAllRecurringExpenses(params);
            setUpcomings(tempUpcomings.recurrent_expenses);
            setTotalPages(Math.ceil(tempUpcomings.page_info.total / rowsPerPage));
        };
        fetchUpcomingTransaction();
    }, [page]);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <Box m={1.5} sx={{ flexGrow: 1 }}>
            <h3> Upcoming </h3>
            <Grid container spacing={2}>
                {upcomings.map(cell => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <UpcomingCard
                                days={Math.floor((new Date(cell.next_date) - new Date()) / (1000 * 60 * 60 * 24))}
                                category={cell.category}
                                amount={cell.amount}
                                name={cell.name}
                                account={cell.account}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button onClick={handlePrevPage} disabled={page === 1}>&lt;</Button>
                <span>{page} / {totalPages}</span>
                <Button onClick={handleNextPage} disabled={page === totalPages}>&gt;</Button>
            </Box>
        </Box>
    );
}