import React from 'react';

import TransactionDetailsContent from './TransactionDetailsContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function TransactionDetails() {
  return (
    <UseSideBar content={<TransactionDetailsContent />} />
  );
}