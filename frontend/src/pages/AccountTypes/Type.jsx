import React, { useState, useEffect, useParams } from 'react';
//import { Link } from "react-router-dom";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import AccountCard from "./AccountCard";
import { getAccountsForAccountType } from '../../api/Account';
import AddAccount from './AddAccount';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function AccountTypesContent() {
    const { type_id } = useParams();
    const [data, setData] = useState([]);

	useEffect(() => {
		const fetchAccountData = async () => {
			const accountData = await getAccountsForAccountType(type_id);	
			setData(accountData);
		};
		fetchAccountData();
	}, []);

    const { parent, child, accounts } = data;

    const breadcrumbs = parent.map((cell, index) => {
        if (index !== parent.length - 1) {
            return (
                <Link underline="hover" key={cell.id} color="inherit" href="/contact">
                    {cell.name}
                </Link>
            )
        }
    });

    breadcrumbs.push(<Typography key={parent[parent.length - 1].id} color="text.primary">{parent[parent.length - 1].name}</Typography>)

    return (
        <>


            <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>

            <Box m={1.5} sx={{ flexGrow: 1 }}>
                <h1> Child Account Types </h1>
                <Grid container spacing={2}>
                    {child.map(cell => {
                        return (
                            <Grid item xs={3}>
                                <Link href="/contact">
                                    <Item>
                                        {cell.name}
                                    </Item>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>


            <Box m={1.5} sx={{ flexGrow: 1 }}>
                <h1> Accounts </h1>
                <Grid container spacing={2}>
                    {accounts.map(cell => {
                        return (
                            <Grid item xs={3}>
                                <AccountCard
                                    name={cell.account_name}
                                    balance={cell.balance}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

            <AddAccount />

        </>
    );
}