import React from "react";
import { UsageReportEntry } from "../csv-reader";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  groupEntriesPerDay,
  groupEntriesPerWeek,
  getCreditByUserName,
} from "../group-entries";
import "react-dropdown/style.css";
import { lightFormat } from "date-fns";

interface TestLineChartProps {
  csvData: UsageReportEntry[];
  groupedBy: "daily" | "weekly";
  maxValueOfYAxis: number;
}

export const BillingLineChart = ({
  csvData,
  groupedBy,
  maxValueOfYAxis,
}: TestLineChartProps): JSX.Element => {
  const entriesGroupedPerDay = groupEntriesPerDay(csvData);
  const entriesGroupedPerWeek = groupEntriesPerWeek(csvData);

  const userNames = [
    // @ts-ignore
    ...new Set(csvData.map((entry) => entry.userName)),
  ];
  const colors = [
    "#5121ae",
    "#a191e2",
    "#A7B1CF",
    "#63615e",
    "#ff8a00",
    "#0527cb",
    "#d07862",
    "#f4b9b3",
    "#692b7e",
    "#8e939e",
    "#b3482f",
    "#937008",
    "#0970c7",
    "#1f964b",
    "#1dbae2",
    "#e5db7d",
    "#072d28",
    "#7a27a1",
    "#fe2b78",
    "#fbba7c",
    "#551ed8",
    "#9f5776",
    "#a0a53a",
    "#a4a139",
    "#3d48a5",
    "#87a5ee",
    "#d76fb0",
    "#50cf06",
    "#fd6223",
    "#7f706e",
    "#3ea193",
    "#8fd31e",
    "#cacf86",
    "#0307a5",
    "#d15536",
    "#13a971",
    "#6a7db2",
    "#9349a8",
    "#e71e2b",
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
          top: 20,
          right: 30,
          left: 25,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey={groupedBy === "daily" ? "day" : "week"}
          tickFormatter={(tick) =>
            Date.parse(tick) ? lightFormat(new Date(tick), "dd.MM.") : tick
          }
          interval="preserveStart"
        />
        <YAxis />
        {/*labelFormatter checks if the given label has the right format*/}
        <Tooltip
          labelFormatter={(label) =>
            Date.parse(label) ? lightFormat(new Date(label), "dd.MM.") : label
          }
          contentStyle={{ backgroundColor: "#f5f4f4" }}
        />
        <Legend />
        {userNames.map((userName, index) => {
          return (
            <Line
              type="monotone"
              stroke={colors[index]}
              dataKey={(currentEntry) =>
                getCreditByUserName(userName, currentEntry.entries)
              }
              key={index}
              name={userName}
              strokeWidth={4}
              dot={false}
            />
          );
        })}
      </LineChart>
    </>
  );
};
