import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { getUpcomingTransactions } from '../../api/Account';
import UpcomingCard from './UpcomingCard';

export default function Upcoming() {
	const [upcomings, setUpcomings] = useState([]);

	useEffect(() => {
		const fetchUpcomingTransaction = async () => {
			const tempUpcomings = await getUpcomingTransactions();
			setUpcomings(tempUpcomings.recurrent_expenses);
		};
		fetchUpcomingTransaction();
	}, []);

	return (
		<Box m={1.5} sx={{ flexGrow: 1 }}>
			<h3> Upcoming </h3>
			<Grid container spacing={2}>
				{upcomings.map(cell => {
					return (
						<Grid item xs={3}>
							<UpcomingCard
								days={Math.floor((new Date(cell.next_date) - new Date()) / (1000 * 60 * 60 * 24))}
								category={cell.category}
								amount={cell.amount}
								name={cell.name}
								account={cell.account}
							/>
						</Grid>
					)
				})
				}
			</Grid>
		</Box>
	);
}