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
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [childItems, setChildItems] = useState([]);
    const [accountItems, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccountData = async () => {
            const accountData = await getAccountsForAccountType(type_id);
            setData(accountData);
        };
        fetchAccountData();
    }, [data, accountItems]);

    const { parent, child, accounts } = data;

    useEffect(() => {
        if (parent) {
            const breadcrumbItems = parent.map((type, index) => {
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
            });
            breadcrumbItems.push(
                <Typography key={parent[parent.length - 1].id} color="text.primary">
                    {parent[parent.length - 1].name}
                </Typography>
            );
            setBreadcrumbs(breadcrumbItems);
        }

        if (child) {
            const items = child.map(type => {
                return (
                    <Grid item xs={3}>
                        <Link href={`/account-types/id/${type.id}`}>
                            <Item>
                                {type.name}
                            </Item>
                        </Link>
                    </Grid>
                )
            });
            setChildItems(items);
        }

        if (accounts) {
            const items = accounts.map(acc => {
                return (
                    <Grid item xs={3}>
                        <AccountCard
                            name={acc.account_name}
                            balance={acc.balance}
                        />
                    </Grid>
                )
            });
            setAccounts(items);
        }
    }, [data, accountItems]);

    let showChildTypes = childItems.length > 0 ?
        <Box m={1.5} sx={{ flexGrow: 1 }}>
            <h1> Child Account Types </h1>
            <Grid container spacing={2}>
                {childItems}
            </Grid>
        </Box> : null;

    let showAccounts = accountItems.length > 0 ?
        <Box m={1.5} sx={{ flexGrow: 1 }}>
            <h1> Accounts </h1>
            <Grid container spacing={2}>
                {accountItems}
            </Grid>
        </Box> : null;

    return (
        <>
            <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>

            {showChildTypes}
            {showAccounts}
            <AddAccount type_id={type_id} setAccounts={setAccounts}  />  
        </>
    );
}