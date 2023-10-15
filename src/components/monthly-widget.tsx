import React, { useContext } from "react";
import { UsageReportMonth } from "../group-entries";
import { LineChart, Line, YAxis } from "recharts";
import { groupEntriesPerDay } from "../group-entries";
import { WidgetContext } from "./widget-context";
import "./monthly-widget.css";

interface MonthlyWidgetProps {
  monthlyEntry: UsageReportMonth;
  maxValueOfYAxis: number;
}
interface MonthlyWidgetProps {
  monthlyEntry: UsageReportMonth;
}

// const MonthlyWidget = ({ monthlyEntry }: MonthlyWidgetProps): JSX.Element => {
//   const entriesGroupedPerDay = groupEntriesPerDay(monthlyEntry.entries);
//   return (
//     <div style={{ margin: "10px" }}>
//       <div>
//         <h4>{monthlyEntry.monthName}</h4>
//         <p>{`${Math.round(monthlyEntry.totalCredits * 100) / 100}`}</p>
//       </div>
//       <LineChart
//         width={100}
//         height={50}
//         data={entriesGroupedPerDay}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <Line
//           type="monotone"
//           dataKey="totalCredits"
//           stroke="#82ca9d"
//           dot={false}
//         />
//       </LineChart>
//     </div>
//   );
// };

// export default MonthlyWidget;

export const MonthlyWidget = ({
  monthlyEntry,
  maxValueOfYAxis,
}: MonthlyWidgetProps): JSX.Element => {
  const { activeMonth, setActiveMonth } = useContext(WidgetContext);
  const entriesGroupedPerDay = groupEntriesPerDay(monthlyEntry.entries);

  return (
    <div
      className={
        "monthly-widget" +
        (activeMonth.monthName === monthlyEntry.monthName
          ? " monthly-widget-active"
          : "")
      }
      onClick={() =>
        setActiveMonth(monthlyEntry.monthName, monthlyEntry.entries)
      }
    >
      <div style={{padding: 10}}>
        <h4>{monthlyEntry.monthName}</h4>
        <p>{`${Math.round(monthlyEntry.totalCredits * 100) / 100} credits`}</p>
      </div>
      <LineChart
        width={100}
        height={50}
        data={entriesGroupedPerDay}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        className={"mini-chart"}
      >
        <YAxis hide={true} domain={[0, maxValueOfYAxis]} />
        <Line
          type="monotone"
          dataKey="totalCredits"
          stroke="#82ca9d"
          dot={false}
        />
      </LineChart>
    </div>
  );
};
