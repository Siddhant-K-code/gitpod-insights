import React, { useState } from "react";
import FileInput from "./components/file-input";
import ChartContainer from "./components/chart-container";
import MonthlyWidgetContainer from "./components/monthly-widget-container";
import { getCsvFile, UsageReportEntry } from "./csv-reader";

export interface UsageReportCsvEntry {
  userName: string;
  teamId: string;
  startTime: string;
  contextUrl: string;
  credits: number;
  workspaceId: string;
  workspaceType: string;
}

const App = (): JSX.Element => {
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);
  const handleFileSubmit = (file: File) => {
    getCsvFile(file).then((res) => setCsvData(res));
  };

  return (
    <div className="App">
      <FileInput onSubmit={handleFileSubmit} />
      {csvData && <MonthlyWidgetContainer csvData={csvData} />}
      {csvData && <ChartContainer csvData={csvData} />}
    </div>
  );
};

export default App;
