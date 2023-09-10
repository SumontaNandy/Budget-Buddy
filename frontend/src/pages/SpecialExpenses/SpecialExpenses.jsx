import * as React from 'react';

import SpecialExpensesContent from './SpecialExpensesContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function SpecialExpenses() {
  return (
    <UseSideBar content={<SpecialExpensesContent />} />
  )
}