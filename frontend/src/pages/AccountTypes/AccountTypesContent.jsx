import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import { getAllAccountTypes } from '../../api/Account';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary
}));

export default function AccountTypesContent() {
	const [types, setTypes] = useState([]);

	useEffect(() => {
		const fetchAccountTypes = async () => {
			const accountTypes = await getAllAccountTypes();	
			setTypes(accountTypes);
		};
		fetchAccountTypes();
	}, []);

	return (
		<>
			<Box m={1.5} sx={{ flexGrow: 1 }}>
				<h1> Account Types </h1>
				<Grid container spacing={2}>
					{types.map(type => {
						return (
							<Grid item xs={3}>
								<Link href={`/account-types/id/${type.id}`}>
									<Item>
										{type.name}
									</Item>
								</Link>
							</Grid>
						)
					})}
				</Grid>
			</Box>
		</>
	);
}