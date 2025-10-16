import React from 'react';
import ReactECharts from 'echarts-for-react';
import { getAreaChartOption } from '../../data/salesMockData';
import './AreaStacked.css';

const AreaStacked = ({ title = 'Converted Leads to Wins' }) => {
  const option = getAreaChartOption();

  return (
    <div className="area-stacked">
      <ReactECharts
        option={option}
        style={{ height: '300px', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default AreaStacked;
