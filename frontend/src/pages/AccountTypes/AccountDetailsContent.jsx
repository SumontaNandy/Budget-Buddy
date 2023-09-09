import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAccount } from '../../api/Account';
import DepositeTable from './DepositeTable';

export default function TransactionDetails() {
    const { account_id } = useParams();
    const [account, setAccount] = useState({});

    useEffect(() => {
        (async () => {
            const accountData = await getAccount(account_id);
            setAccount(accountData);
        })();
    }, []);

    let availableBalanceSegment;
    if (account.segment_list) {
        availableBalanceSegment = account.segment_list.find(segment => segment.segment_name === 'available_balance');
    }
    const availableBalance = availableBalanceSegment ? availableBalanceSegment.amount : 'N/A';

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 500 }} style={{ backgroundColor: '#E7B10A' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Account Number: {account.account_no}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Creation Date: {new Date(account.date).toLocaleDateString('en-UK')}
                        </Typography>
                        <Typography variant="body2">
                            Account Name: {account.account_name}
                        </Typography>
                        <Typography variant="body2">
                            Balance: {account.balance}
                        </Typography>
                        <Typography variant="body2">
                            Available Balance: {availableBalance}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <DepositeTable account_id={account.account_id} />
        </>

    );
}