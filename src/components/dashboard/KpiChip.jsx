import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './KpiChip.css';

const KpiChip = ({ title, value, delta, deltaDir, subtitle, color }) => {
  const deltaColor = deltaDir === 'up' ? '#34D399' : '#EF4444';
  const DeltaIcon = deltaDir === 'up' ? ArrowUpOutlined : ArrowDownOutlined;

  return (
    <div className="kpi-chip" style={{ borderTopColor: color }}>
      <div className="kpi-chip-header">
        <div className="kpi-value" style={{ color }}>
          {title}
        </div>
        <div className="kpi-delta" style={{ color: deltaColor }}>
          <DeltaIcon className="delta-icon" />
          {Math.abs(delta)}%
        </div>
      </div>
      
      <div className="kpi-subtitle">
        {subtitle}
      </div>
      
      <div className="kpi-period">
        vs previous period
      </div>
    </div>
  );
};

export default KpiChip;
