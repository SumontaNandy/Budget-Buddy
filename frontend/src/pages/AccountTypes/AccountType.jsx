import * as React from 'react';

import AccountTypeContent from './AccountTypeContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Home() {
  return (
    <UseSideBar content={<AccountTypeContent />} />
  );
}