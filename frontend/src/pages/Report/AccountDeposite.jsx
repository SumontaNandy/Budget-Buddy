import React, { useEffect, useState } from 'react';
import { getAllAccounts } from '../../api/Account'; 

export default function AccountDeposite(props) {
    const { startDate, endDate } = props;
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        (async () => {
            const params = { start: startDate, end: endDate };
            let temp = await getAllAccounts(params);            
            setAccounts(temp);
        })();
    }, [startDate, endDate]);

    return (
        <>
            {
                accounts.map(account => account.total_deposite > 0 && (
                    <div className="progress" style={{ marginBottom:'20px', height:'50px' }}>
                        <div className="progress-bar bg-warning" role="progressbar" 
                        style={{ width: `${(account.total_deposite / 2500) * 100}%` }} 
                        aria-valuenow={account.total_deposite} aria-valuemin="0" aria-valuemax="100">{account.account_name} - {account.total_deposite}</div>
                    </div>
                ))
            }
        </>
    );
}