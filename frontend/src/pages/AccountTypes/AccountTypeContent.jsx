import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    const [data, setData] = useState({});
    const [accountItems, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccountData = async () => {
            const accountData = await getAccountsForAccountType(type_id);
            setData(accountData);
        };
        fetchAccountData();
    }, [accountItems]);

    const { parent, child, accounts } = data;

    let showChildTypes = child && child.length > 0 ?
        <Box m={1.5} sx={{ flexGrow: 1 }}>
            <h1> Child Account Types </h1>
            <Grid container spacing={2}>
                {child.map(type => {
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
        </Box> : null;

    let showAccounts = accounts && accounts.length > 0 ?
        <Box m={1.5} sx={{ flexGrow: 1 }}>
            <h1> Accounts </h1>
            <Grid container spacing={2}>
                {accounts.map(acc => {
                    return (
                        <Grid item xs={3}>
                            <AccountCard
                                name={acc.account_name}
                                balance={acc.balance}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Box> : null;

    return (
        <>
            <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
                {parent && parent.map((type, index) => {
                    if (index === 0) {
                        return (
                            <Link underline="hover" key={type.id} color="inherit" href="/account-types">
                                {type.name}
                            </Link>
                        )
                    }
                    else if (index !== parent.length - 1) {
                        return (
                            <Link underline="hover" key={type.id} color="inherit" href={`/account-types/id/${type.id}`}>
                                {type.name}
                            </Link>
                        )
                    }
                    else {
                        return (
                            <Typography key={parent[parent.length - 1].id} color="text.primary">
                                {parent[parent.length - 1].name}
                            </Typography>
                        )
                    }
                })}
            </Breadcrumbs>

            {showChildTypes}
            {showAccounts}
            <AddAccount type_id={type_id} setAccounts={setAccounts} />
        </>
    );
}