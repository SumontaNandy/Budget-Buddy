import React, { useEffect, useState } from 'react';
import { getAllOneTimeExpenses, getAllRecurringExpenses } from '../../api/SpendingPlan'; 

function SpendingPlanChart() {
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
                spendingPlans.map(plan => (
                    <div className="progress" style={{ marginBottom:'20px' }}>
                        <div className="progress-bar bg-success" role="progressbar" 
                        style={{ width: `${(plan.amount_used / plan.amount) * 100}%` }} 
                        aria-valuenow={plan.amount_used} aria-valuemin="0" aria-valuemax="100">{plan.amount_used}</div>

                        <div className="progress-bar bg-danger" role="progressbar" 
                        style={{ width: `${((plan.amount - plan.amount_used) / plan.amount) * 100}%` }} 
                        aria-valuenow={plan.amount - plan.amount_used} aria-valuemin="0" aria-valuemax="100">{plan.name}</div>
                    </div>
                ))
            }
        </>
    );
}

export default SpendingPlanChart;

// @progress/kendo-drawing @progress/kendo-licensing
// @progress/kendo-react-animation @progress/kendo-react-buttons @progress/kendo-react-intl
// @progress/kendo-react-layout @progress/kendo-react-progressbars @progress/kendo-svg-icons