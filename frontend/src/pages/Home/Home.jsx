import * as React from 'react';

import HomeContent from './HomeContent';
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Home() {
  return (
    <UseSideBar content={<HomeContent />} />
  );
}