import * as React from "react";

import RecurringContent from "./RecurringContent";
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Recurring() {
  return (
    <UseSideBar content={<RecurringContent />} />
  );
}