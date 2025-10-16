import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { getDonutOption } from '../../data/salesMockData';
import './DonutRatio.css';

const DonutRatio = ({ title, value, delta, deltaDir, subnote }) => {
  const option = getDonutOption(value);
  const deltaColor = deltaDir === 'up' ? '#34D399' : '#EF4444';
  const DeltaIcon = deltaDir === 'up' ? ArrowUpOutlined : ArrowDownOutlined;

  return (
    <div className="donut-ratio">
      <div className="donut-chart-container">
        <ReactECharts
          option={option}
          style={{ height: '120px', width: '120px' }}
          opts={{ renderer: 'canvas' }}
        />
        <div className="donut-center-text">
          <span className="donut-percentage">{value}%</span>
        </div>
      </div>
      
      <div className="donut-info">
        <div className="donut-delta" style={{ color: deltaColor }}>
          <DeltaIcon className="delta-icon" />
          {Math.abs(delta)}%
        </div>
        <div className="donut-subnote">
          {subnote}
        </div>
      </div>
    </div>
  );
};

export default DonutRatio;
