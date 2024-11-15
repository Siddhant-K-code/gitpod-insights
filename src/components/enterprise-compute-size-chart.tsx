import React from 'react';
import { UsageReportEntry } from '.././csv-reader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const ComputeSizeChart = ({ csvData }: { csvData: UsageReportEntry[] }): JSX.Element => {
  const computeSizeData = csvData.reduce((acc: { [key: string]: number }, entry) => {
    const size = entry.workspaceId || 'unknown';
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(computeSizeData).map(([size, count]) => ({
    size,
    count
  }));

  return (
    <div className="compute-size-chart">
      <h3>Workspace Distribution</h3>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="size" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" name="Number of Workspaces" />
      </BarChart>
    </div>
  );
};
