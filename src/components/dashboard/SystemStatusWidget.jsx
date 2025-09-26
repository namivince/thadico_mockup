import React from 'react';
import { Card, Row, Col, Progress, Badge } from 'antd';
import { 
  DatabaseOutlined, 
  CloudServerOutlined, 
  WifiOutlined, 
  SafetyOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

/**
 * Component hiển thị trạng thái hệ thống
 */
const SystemStatusWidget = ({ loading }) => {
  const systemStatus = {
    database: { status: 'good', value: 95, label: 'Database' },
    server: { status: 'good', value: 88, label: 'Server' },
    network: { status: 'warning', value: 72, label: 'Network' },
    security: { status: 'good', value: 98, label: 'Security' }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#52c41a';
      case 'warning': return '#faad14';
      case 'error': return '#f5222d';
      default: return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning': return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'error': return <WarningOutlined style={{ color: '#f5222d' }} />;
      default: return <CheckCircleOutlined style={{ color: '#666' }} />;
    }
  };

  const services = [
    { 
      icon: <DatabaseOutlined />, 
      name: 'Database', 
      ...systemStatus.database 
    },
    { 
      icon: <CloudServerOutlined />, 
      name: 'Server', 
      ...systemStatus.server 
    },
    { 
      icon: <WifiOutlined />, 
      name: 'Network', 
      ...systemStatus.network 
    },
    { 
      icon: <SafetyOutlined />, 
      name: 'Security', 
      ...systemStatus.security 
    }
  ];

  const overallHealth = Math.round(
    services.reduce((sum, service) => sum + service.value, 0) / services.length
  );

  return (
    <Card 
      title="Trạng thái hệ thống"
      className="system-status-widget"
      loading={loading}
      extra={
        <Badge 
          status={overallHealth >= 90 ? 'success' : overallHealth >= 70 ? 'warning' : 'error'}
          text={`${overallHealth}%`}
        />
      }
    >
      {/* Overall Health */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '16px',
        padding: '12px',
        background: `linear-gradient(135deg, ${getStatusColor(overallHealth >= 90 ? 'good' : overallHealth >= 70 ? 'warning' : 'error')}20, ${getStatusColor(overallHealth >= 90 ? 'good' : overallHealth >= 70 ? 'warning' : 'error')}10)`,
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: getStatusColor(overallHealth >= 90 ? 'good' : overallHealth >= 70 ? 'warning' : 'error') }}>
          {overallHealth}%
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Tình trạng tổng thể
        </div>
      </div>

      {/* Individual Services */}
      <Row gutter={[8, 12]}>
        {services.map((service, index) => (
          <Col key={index} span={12}>
            <div style={{ 
              padding: '8px',
              border: `1px solid ${getStatusColor(service.status)}30`,
              borderRadius: '6px',
              backgroundColor: `${getStatusColor(service.status)}10`
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '6px',
                fontSize: '12px'
              }}>
                <span style={{ color: getStatusColor(service.status), marginRight: '6px' }}>
                  {service.icon}
                </span>
                <span style={{ flex: 1, fontWeight: '500' }}>{service.name}</span>
                {getStatusIcon(service.status)}
              </div>
              <Progress 
                percent={service.value} 
                size="small" 
                strokeColor={getStatusColor(service.status)}
                showInfo={false}
                strokeWidth={4}
              />
              <div style={{ 
                fontSize: '10px', 
                color: '#666', 
                textAlign: 'right',
                marginTop: '2px'
              }}>
                {service.value}%
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Status Summary */}
      <div style={{ 
        marginTop: '12px', 
        padding: '8px', 
        backgroundColor: '#f6f6f6', 
        borderRadius: '6px',
        fontSize: '11px',
        color: '#666'
      }}>
        <Row gutter={[8, 4]}>
          <Col span={8}>
            <div>🟢 Tốt: {services.filter(s => s.status === 'good').length}</div>
          </Col>
          <Col span={8}>
            <div>🟡 Cảnh báo: {services.filter(s => s.status === 'warning').length}</div>
          </Col>
          <Col span={8}>
            <div>🔴 Lỗi: {services.filter(s => s.status === 'error').length}</div>
          </Col>
        </Row>
        <div style={{ marginTop: '4px', textAlign: 'center' }}>
          Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}
        </div>
      </div>
    </Card>
  );
};

export default SystemStatusWidget;
