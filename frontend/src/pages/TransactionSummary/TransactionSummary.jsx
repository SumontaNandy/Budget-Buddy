import * as React from 'react';

import TransactionSummaryContent from './TransactionSummaryContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function TransactionSummary() {
  return (
    <UseSideBar content={<TransactionSummaryContent />} />
  )
}