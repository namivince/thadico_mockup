import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import { 
  DashboardOutlined, 
  BarChartOutlined, 
  ProjectOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './DashboardIndex.css';

const { Title, Text } = Typography;

const DashboardIndex = () => {
  const navigate = useNavigate();

  const dashboards = [
    {
      id: 'admin',
      title: 'Admin Dashboard',
      description: 'Tổng quan quản trị hệ thống với các KPIs chính, tiến độ và cảnh báo',
      icon: <DashboardOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      path: '/dashboard',
      color: '#1890ff',
      features: ['Hero KPIs', 'Progress Board', 'Unified Alerts', 'Trends Charts', 'Radar Charts']
    },
    {
      id: 'sales',
      title: 'Sales Conversion Dashboard',
      description: 'Theo dõi hiệu suất bán hàng và tỷ lệ chuyển đổi của nhiều agent',
      icon: <BarChartOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      path: '/dashboard/sales-conversion',
      color: '#52c41a',
      features: ['Conversion Metrics', 'Lead Tracking', 'Agent Performance', 'Win Ratios', 'Sales Funnel']
    },
    {
      id: 'project',
      title: 'Project Command Room',
      description: 'Trung tâm điều khiển dự án với theo dõi tiến độ và chất lượng thời gian thực',
      icon: <ProjectOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      path: '/dashboard/project-command-room',
      color: '#722ed1',
      features: ['Project Status', 'Quality Analysis', 'Resource Utilization', 'Pipeline Tracking', 'Team Performance']
    }
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-index">
      <div className="dashboard-index-header">
        <Title level={1} style={{ color: '#fff', textAlign: 'center', marginBottom: '16px' }}>
          Dashboard Center
        </Title>
        <Text style={{ color: '#94a3b8', fontSize: '18px', display: 'block', textAlign: 'center' }}>
          Chọn dashboard phù hợp với nhu cầu của bạn
        </Text>
      </div>

      <Row gutter={[32, 32]} className="dashboard-cards">
        {dashboards.map((dashboard) => (
          <Col xs={24} lg={8} key={dashboard.id}>
            <Card 
              className="dashboard-card"
              style={{ borderTop: `4px solid ${dashboard.color}` }}
              hoverable
              onClick={() => handleNavigate(dashboard.path)}
            >
              <div className="dashboard-card-content">
                <div className="dashboard-icon">
                  {dashboard.icon}
                </div>
                
                <div className="dashboard-info">
                  <Title level={3} style={{ marginBottom: '12px', color: '#1f2937' }}>
                    {dashboard.title}
                  </Title>
                  
                  <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6' }}>
                    {dashboard.description}
                  </Text>
                  
                  <div className="dashboard-features">
                    <Text strong style={{ color: '#374151', fontSize: '14px' }}>
                      Tính năng chính:
                    </Text>
                    <ul className="features-list">
                      {dashboard.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{ 
                      backgroundColor: dashboard.color, 
                      borderColor: dashboard.color,
                      marginTop: '20px',
                      width: '100%'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(dashboard.path);
                    }}
                  >
                    Truy cập Dashboard
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardIndex;
