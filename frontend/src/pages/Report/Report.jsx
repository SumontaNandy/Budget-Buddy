import * as React from "react";

import ReportContent from "./ReportContent";
import UseSideBar from "../../components/Menu/UseSideBar";

export default function Report() {
  return (
    <UseSideBar content={<ReportContent />} />
  );
}