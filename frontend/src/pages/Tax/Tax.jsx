import * as React from 'react';

import TaxContent from './TaxContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Transaction() {
  return (
    <UseSideBar content={<TaxContent />} />
  )
}