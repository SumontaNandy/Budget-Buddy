import React from 'react';

import AccountDetailsContent from './AccountDetailsContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function AccountDetails() {
  return (
    <UseSideBar content={<AccountDetailsContent />} />
  );
}