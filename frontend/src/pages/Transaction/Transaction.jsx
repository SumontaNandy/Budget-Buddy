import * as React from 'react';

import TransactionContent from './TransactionContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Transaction() {
  return (
    <UseSideBar content={<TransactionContent />} />
  )
}