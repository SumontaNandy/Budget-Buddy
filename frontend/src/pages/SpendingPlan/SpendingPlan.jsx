import React from 'react';

import SpendingPlanContent from './SpendingPlanContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Home() {
  return (
    <UseSideBar content={<SpendingPlanContent />} />
  );
}