import React, { useEffect, useState } from 'react';
import { getAllOneTimeExpenses, getAllRecurringExpenses } from '../../api/SpendingPlan'; 

export default function SpendingPlan() {
    const [spendingPlans, setSpendingPlans] = useState([]);
    useEffect(() => {
        (async () => {
            const params = { per_page: 1000, page: 1 };
            let plans = await getAllOneTimeExpenses(params);            
            let recurPlans = await getAllRecurringExpenses(params);
            setSpendingPlans([...plans.one_time_expenses, ...recurPlans.recurrent_expenses]);
        })();
    }, []);

    return (
        <>
            {
                spendingPlans.map(plan => plan.amount_used > 0 && (
                    <div className="progress" style={{ marginBottom:'20px', height:'50px' }}>
                        <div className="progress-bar bg-success" role="progressbar" 
                        style={{ width: `${(plan.amount_used / plan.amount) * 100}%` }} 
                        aria-valuenow={plan.amount_used} aria-valuemin="0" aria-valuemax="100">{plan.amount_used}</div>

                        <div className="progress-bar bg-warning" role="progressbar" 
                        style={{ width: `${((plan.amount - plan.amount_used) / plan.amount) * 100}%` }} 
                        aria-valuenow={plan.amount - plan.amount_used} aria-valuemin="0" aria-valuemax="100">{plan.name}</div>
                    </div>
                ))
            }
        </>
    );
}