import React from 'react';
import { UsageReportEntry } from '.././csv-reader';
import { ComputeSizeChart } from './enterprise-compute-size-chart';
import { SessionDurationChart } from './enterprise-session-duration-chart';
import { UserDistributionChart } from './enterprise-user-distribution-chart';
import './enterprise-dashboard.css';

interface EnterpriseDashboardProps {
  csvData: UsageReportEntry[];
}

export const EnterpriseDashboard = ({ csvData }: { csvData: UsageReportEntry[] }): JSX.Element => {
  return (
    <div className="enterprise-dashboard">
      <div className="dashboard-grid">
        <div className="chart-container">
          <ComputeSizeChart csvData={csvData} />
          <div className="data-table">
            {/* Workspace Distribution Table */}
          </div>
        </div>

        <div className="chart-container">
          <SessionDurationChart csvData={csvData} />
          <div className="data-table">
            {/* Session Duration Table */}
          </div>
        </div>

        <div className="chart-container">
          <UserDistributionChart csvData={csvData} />
          <div className="data-table">
            {/* User Distribution Table */}
          </div>
        </div>
      </div>
    </div>
  );
};

