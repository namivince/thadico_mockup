import React from 'react';
import { Card, Row, Col, Progress, Statistic } from 'antd';
import { TrophyOutlined, RiseOutlined, FallOutlined, BarChartOutlined } from '@ant-design/icons';

/**
 * Component hiển thị widget hiệu suất và thành tích
 */
const PerformanceWidget = ({ data, loading }) => {
  // Dữ liệu mẫu cho biểu đồ cột
  const defaultChartData = [
    { month: 'T1', performance: 85, target: 90 },
    { month: 'T2', performance: 92, target: 90 },
    { month: 'T3', performance: 78, target: 90 },
    { month: 'T4', performance: 95, target: 90 },
    { month: 'T5', performance: 88, target: 90 },
    { month: 'T6', performance: 91, target: 90 }
  ];

  // Dữ liệu KPI hiệu suất
  const defaultKpiData = {
    overallPerformance: 88.5,
    targetAchievement: 92.3,
    improvement: 5.2,
    topPerformers: 15
  };

  const chartData = data?.chartData || defaultChartData;
  const kpiData = data?.kpiData || defaultKpiData;

  return (
    <Row gutter={[16, 16]}>
      {/* KPI Cards */}
      <Col xs={24} lg={12}>
        <Card title="Chỉ số hiệu suất" className="performance-kpi-card" loading={loading}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="Hiệu suất tổng thể"
                value={kpiData.overallPerformance}
                suffix="%"
                valueStyle={{ color: kpiData.overallPerformance >= 85 ? '#3f8600' : '#cf1322' }}
                prefix={<TrophyOutlined />}
              />
              <Progress 
                percent={kpiData.overallPerformance} 
                size="small" 
                strokeColor={kpiData.overallPerformance >= 85 ? '#52c41a' : '#ff4d4f'}
                showInfo={false}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Đạt mục tiêu"
                value={kpiData.targetAchievement}
                suffix="%"
                valueStyle={{ color: '#1890ff' }}
                prefix={<RiseOutlined />}
              />
              <Progress 
                percent={kpiData.targetAchievement} 
                size="small" 
                strokeColor="#1890ff"
                showInfo={false}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Cải thiện"
                value={kpiData.improvement}
                suffix="%"
                valueStyle={{ color: kpiData.improvement > 0 ? '#3f8600' : '#cf1322' }}
                prefix={kpiData.improvement > 0 ? <RiseOutlined /> : <FallOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Nhân viên xuất sắc"
                value={kpiData.topPerformers}
                valueStyle={{ color: '#722ed1' }}
                prefix={<TrophyOutlined />}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      {/* Performance Chart */}
      <Col xs={24} lg={12}>
        <Card 
          title="Xu hướng hiệu suất 6 tháng" 
          className="performance-chart-card"
          loading={loading}
          extra={
            <span style={{ fontSize: '12px', color: '#666' }}>
              Mục tiêu: 90%
            </span>
          }
        >
          {/* Simple bar chart using Progress components */}
          <div style={{ padding: '16px 0' }}>
            {chartData.map((item, index) => (
              <div key={item.month} style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    <BarChartOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
                    {item.month}
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    color: item.performance >= item.target ? '#52c41a' : '#faad14'
                  }}>
                    {item.performance}%
                  </span>
                </div>
                <Progress 
                  percent={item.performance} 
                  strokeColor={item.performance >= item.target ? '#52c41a' : '#faad14'}
                  showInfo={false}
                  strokeWidth={12}
                />
                {/* Target line indicator */}
                <div style={{ 
                  position: 'relative', 
                  height: '2px', 
                  marginTop: '-14px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: `${item.target}%`,
                    width: '2px',
                    height: '16px',
                    backgroundColor: '#f5222d',
                    top: '-2px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '12px', 
            padding: '12px', 
            backgroundColor: '#f6f6f6', 
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <div>📈 Trung bình 6 tháng:</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1890ff' }}>
                  {(chartData.reduce((sum, item) => sum + item.performance, 0) / chartData.length).toFixed(1)}%
                </div>
              </Col>
              <Col span={12}>
                <div>🎯 Đạt mục tiêu:</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#52c41a' }}>
                  {chartData.filter(item => item.performance >= item.target).length}/{chartData.length} tháng
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default PerformanceWidget;
