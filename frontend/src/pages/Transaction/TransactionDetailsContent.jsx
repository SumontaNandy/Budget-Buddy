import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTransaction } from '../../api/Transaction';
import { getGoal } from '../../api/SavingsGoal';
import { getOnetime, getRecurring } from '../../api/SpendingPlan';

export default function TransactionDetails() {
    const { transaction_id } = useParams();
    const [transaction, setTransaction] = useState({});
    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const transactionData = await getTransaction(transaction_id);
            setTransaction(transactionData);

            if (transactionData.gp) {
                setTitle('Contributions to Savings Goals');
                const goalPromises = transactionData.gp.map((goal) => getGoal(goal.goal));
                const goals = (await Promise.all(goalPromises));
                setList(goals.map((goal, index) => ({ ...goal, amount: transactionData.gp[index].amount })));
            }
            else if (transactionData.tp) {
                setTitle('Contributions to Spending Plans');
                const planPromises = transactionData.tp.map((plan) => {
                    if (plan.type === "onetime")
                        return getOnetime(plan.spending_plan);
                    else if (plan.type === "recurring")
                        return getRecurring(plan.spending_plan);
                });
                const plans = (await Promise.all(planPromises));
                setList(plans.map((plan, index) => ({ ...plan, amount: transactionData.tp[index].amount })));
            }
        })();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 500 }} style={{ backgroundColor: '#E7B10A' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            TxID: {transaction.id}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Date: {new Date(transaction.date).toLocaleDateString('en-UK')}
                        </Typography>
                        <Typography variant="body2">
                            Payee: {transaction.payee}
                        </Typography>
                        <Typography variant="body2">
                            Description: {transaction.description || 'N/A'}
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <h1 style={{ textAlign: 'center', margin: '10px' }}>{title}</h1>
            <Grid container spacing={2}>
                {list.map((item) => {
                    return (
                        <Grid item xs={3}>
                            <Card sx={{ minWidth: 275 }} style={{ backgroundColor: '#FEFFAC' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Name: {item.name}
                                    </Typography>

                                    <Typography variant="h5" component="div">
                                        Amount: {item.amount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>

    );
}