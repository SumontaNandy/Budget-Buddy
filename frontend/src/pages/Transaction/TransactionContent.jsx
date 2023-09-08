import * as React from 'react';
import Upcoming from "../../components/Upcoming/Upcoming";
import TransactionTable from "./TransactionTable";

export default function TransactionContent() {
    return (
        <>
            <Upcoming />
            <hr/>
            <TransactionTable />
        </>
    )
}