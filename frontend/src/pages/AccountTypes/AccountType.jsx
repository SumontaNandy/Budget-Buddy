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
import { getAllAccountTypes, getAccountsForAccountType } from '../../api/Account';
import AddAccount from './AddAccount';
import AccountData from './AccountData';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function AccountType() {
    const { type_id } = useParams();
    const [data, setData] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState([]);

	useEffect(() => {
        //console.log("Inside useEffect");
		const fetchAccountData = async () => {
            //console.log("Inside fetchAccountData");
			//const accountData = [];
            const accountData = await getAccountsForAccountType(type_id);
            //console.log("Account Data: ", accountData);
			setData(accountData);
		};
		fetchAccountData();
	}, []);

    // console.log("Outside useEffect");

    //console.log("Data: ", data);
    const { parent, child, accounts } = data;

    useEffect(() => {
        // Handle breadcrumbs generation when data is available
        // const { parent } = data;
        if (parent) {
            const breadcrumbItems = parent.map((cell, index) => (
                <Link underline="hover" key={cell.id} color="inherit" href="/contact">
                    {cell.name}
                </Link>
            ));
            breadcrumbItems.push(
                <Typography key={parent[parent.length - 1].id} color="text.primary">
                    {parent[parent.length - 1].name}
                </Typography>
            );
            setBreadcrumbs(breadcrumbItems);
        }
    }, [data]);

    console.log("Parent: ", parent);
    console.log("Child: ", child);
    console.log("Accounts: ", accounts);

    

    // const breadcrumbs = parent.map((cell, index) => {
    //     if (index !== parent.length - 1) {
    //         return (
    //             <Link underline="hover" key={cell.id} color="inherit" href="/contact">
    //                 {cell.name}
    //             </Link>
    //         )
    //     }
    // });

    // breadcrumbs.push(<Typography key={parent[parent.length - 1].id} color="text.primary">{parent[parent.length - 1].name}</Typography>)

    return (
        <>


            <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>

    

         </>
    );
}