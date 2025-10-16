import React from 'react';
import ReactECharts from 'echarts-for-react';
import GlassCard from '../../components/project-command/GlassCard';
import ScannerRing from '../../components/project-command/ScannerRing';
import HexKPI from '../../components/project-command/HexKPI';
import MapPanel from '../../components/project-command/MapPanel';
import { 
  mockData, 
  getDonutChartConfig, 
  getBarChartConfig, 
  getLineChartConfig 
} from '../../data/projectCommandMockData';

const ProjectCommandRoomDashboard = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0F1E' }}>
      {/* Header Bar - Sticky như trong ảnh */}
      <div style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '16px 24px',
        borderBottom: '1px solid rgba(34, 211, 238, 0.3)',
        backgroundColor: '#0A0F1E'
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#22D3EE',
            letterSpacing: '0.05em',
            margin: 0
          }}>
            Project Command Room
          </h1>
        </div>
      </div>

      {/* Main Layout - 3 Columns */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        padding: '16px', 
        minHeight: 'calc(100vh - 80px)' 
      }}>
        {/* Left Column - Fixed 280px */}
        <div style={{ 
          width: '280px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          {/* Project Description + Time Remaining */}
          <GlassCard title="Project Overview">
            <ScannerRing
              title={mockData.scannerInfo.title}
              days={mockData.scannerInfo.days}
              subtitle={mockData.scannerInfo.subtitle}
              totalDays={mockData.scannerInfo.totalDays}
            />
          </GlassCard>

          {/* Resource Investment */}
          <GlassCard title="Resource Investment">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {mockData.resourceInvestment.map((resource, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '11px' 
                  }}>
                    <span style={{ color: '#22D3EE' }}>{resource.label}</span>
                    <span style={{ color: '#94A3B8' }}>Remained</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    <span style={{ color: '#22D3EE' }}>{resource.used}</span>
                    <span style={{ color: '#94A3B8' }}>{resource.remaining}</span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    backgroundColor: 'rgba(148, 163, 184, 0.2)', 
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        width: `${resource.used}%`,
                        height: '100%',
                        backgroundColor: resource.color,
                        boxShadow: `0 0 6px ${resource.color}66`,
                        transition: 'all 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quality Analysis */}
          <GlassCard title="Quality Analysis">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <ReactECharts
                  option={getDonutChartConfig(mockData.qualityAnalysis.ringA)}
                  style={{ height: '100px' }}
                  opts={{ renderer: 'canvas' }}
                />
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>
                  Quality Ring A
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <ReactECharts
                  option={getDonutChartConfig(mockData.qualityAnalysis.ringB)}
                  style={{ height: '100px' }}
                  opts={{ renderer: 'canvas' }}
                />
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>
                  Quality Ring B
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Quality Rank */}
          <GlassCard title="Quality Rank">
            <ReactECharts
              option={getBarChartConfig(mockData.qualityRank)}
              style={{ height: '160px' }}
              opts={{ renderer: 'canvas' }}
            />
          </GlassCard>
        </div>

        {/* Center Column - Flex 1 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <GlassCard title="Command Center Map">
            <div style={{ height: '700px' }}>
              <MapPanel pipelineGroups={mockData.pipelineGroups} />
            </div>
          </GlassCard>
        </div>

        {/* Right Column - 320px */}
        <div style={{ 
          width: '320px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          {/* Labor Plan */}
          <GlassCard title="Labor Plan">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#F59E0B', 
                  marginBottom: '4px' 
                }}>
                  {mockData.laborPlan.accumulated.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>Accumulated Labor</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#22D3EE', 
                  marginBottom: '4px' 
                }}>
                  {mockData.laborPlan.remained.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>Remained Labor</div>
              </div>
            </div>
          </GlassCard>

          {/* Project Schedule */}
          <GlassCard title="Project Schedule">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mockData.scheduleRows.map((row, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px 0',
                  borderBottom: index < mockData.scheduleRows.length - 1 ? '1px solid rgba(148, 163, 184, 0.2)' : 'none'
                }}>
                  <div>
                    <div style={{ color: '#E2E8F0', fontWeight: '500', fontSize: '13px' }}>{row.city}</div>
                    <div style={{ color: '#94A3B8', fontSize: '11px' }}>{row.leader} • {row.dept}</div>
                  </div>
                  <div style={{ color: '#22D3EE', fontWeight: 'bold', fontSize: '14px' }}>{row.days}d</div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Staff KPIs */}
          <GlassCard title="Staff">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <HexKPI
                value={mockData.staffKPIs.total}
                label="Total Staff"
                color="#22D3EE"
                size="sm"
              />
              <HexKPI
                value={mockData.staffKPIs.active}
                label="Active Staff"
                color="#34D399"
                size="sm"
              />
            </div>
          </GlassCard>

          {/* Construction Data */}
          <GlassCard title="Construction Data">
            <ReactECharts
              option={getLineChartConfig(mockData.constructionSeries)}
              style={{ height: '140px' }}
              opts={{ renderer: 'canvas' }}
            />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ProjectCommandRoomDashboard;
