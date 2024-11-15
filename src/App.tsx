import React, { useState } from "react";
import { FileInput } from "./components/file-input";
import { ChartContainer } from "./components/chart-container";
import { MonthlyWidgetContainer } from "./components/monthly-widget-container";
import { getCsvFile, UsageReportEntry } from "./csv-reader";
import { WidgetContext } from "./components/widget-context";
import { Headline } from "./components/headline";
import { DashboardToggle } from "./components/mode-toggle";
import { EnterpriseDashboard } from "./components/enterprise-dashboard-container";

const App = (): JSX.Element => {
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);
  const [dashboardMode, setDashboardMode] = useState<'enterprise' | 'payg'>('payg');

  const handleInput = (file: File) => {
    getCsvFile(file).then((res) => {
      setCsvData(res);
    });
  };

  const handleWidgetClick = (month: string, data: UsageReportEntry[]) => {
    if (month === selectedMonthFromWidget.monthName) {
      setSelectedMonthFromWidget({ monthName: "", data: [] });
    } else {
      setSelectedMonthFromWidget({ monthName: month, data: data });
    }
  };
  const [selectedMonthFromWidget, setSelectedMonthFromWidget] = useState<{
    monthName: string;
    data: UsageReportEntry[];
  }>({ monthName: "", data: [] });

  return (
    <WidgetContext.Provider value={{
      activeMonth: selectedMonthFromWidget,
      setActiveMonth: (month: string, data: UsageReportEntry[]) => handleWidgetClick(month, data),
    }}>
      <div className="App">
        <Headline />
        <FileInput onInput={handleInput} />
        <DashboardToggle
          mode={dashboardMode}
          onToggle={(mode) => setDashboardMode(mode)}
        />
        {csvData && dashboardMode === 'payg' && (
          <>
            <MonthlyWidgetContainer csvData={csvData} />
            <ChartContainer csvData={csvData} />
          </>
        )}
        {csvData && dashboardMode === 'enterprise' && (
          <EnterpriseDashboard csvData={csvData} />
        )}
      </div>
    </WidgetContext.Provider>
  );
};

export default App;
