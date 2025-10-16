import React from 'react';
import ReactECharts from 'echarts-for-react';
import { getSparklineOption } from '../../data/salesMockData';
import './AgentList.css';

const AgentItem = ({ agent }) => {
  const sparklineOption = getSparklineOption(agent.sparkline);
  const deltaColor = agent.delta >= 0 ? '#34D399' : '#EF4444';
  
  return (
    <div className="agent-item">
      <div className="agent-avatar-container">
        <img 
          src={agent.avatar} 
          alt={agent.name}
          className="agent-avatar-img"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="agent-avatar-fallback" style={{ display: 'none' }}>
          {agent.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      
      <div className="agent-percent">
        {agent.percent}%
      </div>
      
      <div className="agent-info">
        <div className="agent-name">{agent.name}</div>
        <div className="agent-delta" style={{ color: deltaColor }}>
          {agent.delta >= 0 ? '+' : ''}{agent.delta}% ▼
        </div>
      </div>
      
      <div className="agent-sparkline">
        <ReactECharts
          option={sparklineOption}
          style={{ height: '32px', width: '120px' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
};

const AgentList = ({ title, agents }) => {
  return (
    <div className="agent-list">
      <div className="agent-list-items">
        {agents.map((agent, index) => (
          <AgentItem key={index} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentList;
