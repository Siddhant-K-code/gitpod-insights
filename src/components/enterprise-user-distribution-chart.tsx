import React from 'react';
import { UsageReportEntry } from '.././csv-reader';
import './user-distribution.css';

export const UserDistributionChart = ({
  csvData,
}: {
  csvData: UsageReportEntry[];
}): JSX.Element => {
  const userProjectData = csvData.reduce((acc: { [key: string]: Set<string> }, entry) => {
    const project = entry.contextUrl || 'unknown';
    if (!acc[project]) {
      acc[project] = new Set();
    }
    acc[project].add(entry.userName);
    return acc;
  }, {});

  const tableData = Object.entries(userProjectData)
    .map(([project, users]) => ({
      project,
      userCount: users.size,
    }))
    .sort((a, b) => b.userCount - a.userCount);

  const totalUniqueUsers = new Set(csvData.map((entry) => entry.userName)).size;

  return (
    <div className="user-distribution-chart">
      <h3>Project Usage Distribution (Total Unique Users: {totalUniqueUsers})</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Project URL</th>
              <th>User Count</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.project}</td>
                <td>{row.userCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
