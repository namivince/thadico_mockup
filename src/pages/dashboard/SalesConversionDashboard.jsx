import React from 'react';
import KpiChip from '../../components/dashboard/KpiChip';
import Card from '../../components/dashboard/Card';
import AreaStacked from '../../components/dashboard/AreaStacked';
import DonutRatio from '../../components/dashboard/DonutRatio';
import AgentList from '../../components/dashboard/AgentList';
import ThemeToggle from '../../components/dashboard/ThemeToggle';
import {
  kpiMetrics,
  leadToOpportunityRatio,
  opportunityToWinRatio,
  topConvertingAgents,
  nonConvertingAgents
} from '../../data/salesMockData';
import '../../styles/design-tokens.css';
import './SalesConversionDashboard.css';

const SalesConversionDashboard = () => {
  // Force dark theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div className="sales-conversion-dashboard" data-theme="dark">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="dashboard-title">Sales Conversion - Multiple Agents</h1>
              <p className="dashboard-subtitle">Real-time sales performance and conversion tracking</p>
            </div>
            <div className="header-right">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid">
          {/* Row 1: 5 KPI Chips */}
          {kpiMetrics.map((kpi, index) => (
            <div key={index} className="col-span-2">
              <KpiChip
                title={kpi.title}
                value={kpi.value}
                delta={kpi.delta}
                deltaDir={kpi.deltaDir}
                subtitle={kpi.subtitle}
                color={kpi.color}
              />
            </div>
          ))}

          {/* Row 2: Area Chart (8 cols) + 2 Donuts (4 cols) */}
          <div className="col-span-8">
            <Card title="Converted Leads to Wins">
              <AreaStacked />
            </Card>
          </div>

          <div className="col-span-4">
            <div className="donut-stack">
              <Card title={leadToOpportunityRatio.title} className="donut-card">
                <DonutRatio
                  title={leadToOpportunityRatio.title}
                  value={leadToOpportunityRatio.value}
                  delta={leadToOpportunityRatio.delta}
                  deltaDir={leadToOpportunityRatio.deltaDir}
                  subnote={leadToOpportunityRatio.subnote}
                />
              </Card>
              
              <Card title={opportunityToWinRatio.title} className="donut-card">
                <DonutRatio
                  title={opportunityToWinRatio.title}
                  value={opportunityToWinRatio.value}
                  delta={opportunityToWinRatio.delta}
                  deltaDir={opportunityToWinRatio.deltaDir}
                  subnote={opportunityToWinRatio.subnote}
                />
              </Card>
            </div>
          </div>

          {/* Row 3: Agent Lists */}
          <div className="col-span-6">
            <Card title="Top Overall 3 Converting Sales Agents">
              <AgentList agents={topConvertingAgents} />
            </Card>
          </div>

          <div className="col-span-6">
            <Card title="Top Overall 3 Non-converting Sales Agents">
              <AgentList agents={nonConvertingAgents} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesConversionDashboard;
