import React from "react";
import { UsageReportEntry } from "../csv-reader";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  groupEntriesPerDay,
  groupEntriesPerWeek,
  getCreditByUserName,
} from "../group-entries";
import "react-dropdown/style.css";

interface TestLineChartProps {
  csvData: UsageReportEntry[];
  groupedBy: "daily" | "weekly";
}

const BillingLineChart = ({
  csvData,
  groupedBy,
}: TestLineChartProps): JSX.Element => {
  const entriesGroupedPerDay = groupEntriesPerDay(csvData);
  const entriesGroupedPerWeek = groupEntriesPerWeek(csvData);

  // @ts-ignore
  const repositoryNames = [...new Set(csvData.map((entry) => entry.userName))];
  const colors = [
    "#233666",
    "#96ADEA",
    "#4F79E6",
    "#414C66",
    "#3D5EB3",
    "#233666",
    "#96ADEA",
    "#4F79E6",
    "#414C66",
    "#3D5EB3",
  ];

  return (
    <>
      <LineChart
        width={1000}
        height={600}
        data={
          groupedBy === "daily" ? entriesGroupedPerDay : entriesGroupedPerWeek
        }
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey={groupedBy === "daily" ? "day" : "week"} />
        <YAxis />
        <Tooltip />
        <Legend />
        {repositoryNames.map((repositoryName, index) => {
          return (
            <Line
              type="monotone"
              stroke={colors[index]}
              dataKey={(currentEntry) =>
                getCreditByUserName(repositoryName, currentEntry.entries)
              }
              key={index}
              name={repositoryName}
              strokeWidth={4}
              dot={false}
            />
          );
        })}
      </LineChart>
    </>
  );
};

export default BillingLineChart;
