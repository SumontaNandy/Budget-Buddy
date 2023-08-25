import * as React from 'react';

import SavingGoalsContent from './SavingGoalsContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Transaction() {
  return (
    <UseSideBar content={<SavingGoalsContent />} />
  )
}