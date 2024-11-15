import React from 'react';
import { UsageReportEntry } from '.././csv-reader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';

export const SessionDurationChart = ({ csvData }: { csvData: UsageReportEntry[] }): JSX.Element => {
  const sessionData = csvData.map(entry => {
    const startTime = new Date(entry.startTime);
    const duration = entry.credits; // Using credits as a proxy for duration

    return {
      date: format(parseISO(entry.startTime), 'MM/dd/yyyy'),
      duration: Number(duration.toFixed(2))
    };
  });

  return (
    <div className="session-duration-chart">
      <h3>Session Activity Over Time</h3>
      <LineChart width={600} height={300} data={sessionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Activity', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="duration"
          stroke="#82ca9d"
          name="Session Activity"
        />
      </LineChart>
    </div>
  );
};
