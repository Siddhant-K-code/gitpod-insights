import React from 'react';
import './dashboard-toggle.css';


interface DashboardToggleProps {
  mode: 'enterprise' | 'payg';
  onToggle: (mode: 'enterprise' | 'payg') => void;
}

export const DashboardToggle = ({ mode, onToggle }: DashboardToggleProps): JSX.Element => {
  return (
    <div className="dashboard-toggle">
      <button
        className={`toggle-btn ${mode === 'payg' ? 'active' : ''}`}
        onClick={() => onToggle('payg')}
      >
        Gitpod PAYG
      </button>
      <button
        className={`toggle-btn ${mode === 'enterprise' ? 'active' : ''}`}
        onClick={() => onToggle('enterprise')}
      >
        Gitpod Enterprise
      </button>
    </div>
  );
};

