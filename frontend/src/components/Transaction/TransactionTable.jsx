import React from 'react';
import IncomeTable from './IncomeTable';
import ExpenseTable from './ExpenseTable';

export default function TransactionTable() {
	return (
		<>
			<ExpenseTable />
			<IncomeTable />
		</>
	);
}