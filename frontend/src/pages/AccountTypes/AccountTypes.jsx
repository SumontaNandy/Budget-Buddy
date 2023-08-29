import * as React from 'react';

import AccountTypesContent from './AccountTypesContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Home() {
  return (
    <UseSideBar content={<AccountTypesContent />} />
  );
}