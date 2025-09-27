import React from 'react';
import { Card, List, Badge, Tag, Button, Typography, Space } from 'antd';
import { 
  WarningOutlined, 
  ClockCircleOutlined, 
  FileExclamationOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Text } = Typography;

/**
 * Component hiển thị trung tâm cảnh báo
 */
const AlertCenter = ({ alerts, loading }) => {
  // Xử lý khi click vào action của alert
  const handleAlertAction = (alert) => {
    console.log('Alert action clicked:', alert);
    // Xử lý action tương ứng với alert
  };

  // Lấy icon tương ứng với loại alert
  const getAlertIcon = (type) => {
    switch (type) {
      case 'overdue':
        return <WarningOutlined style={{ color: '#f5222d' }} />;
      case 'dueIn3Days':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'approvalSLA':
        return <FileExclamationOutlined style={{ color: '#1890ff' }} />;
      case 'budgetOver':
        return <DollarOutlined style={{ color: '#f5222d' }} />;
      default:
        return <WarningOutlined />;
    }
  };

  // Lấy màu tag tương ứng với mức độ nghiêm trọng
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  // Lấy label cho flow
  const getFlowLabel = (flow) => {
    switch (flow) {
      case 'F1':
        return <Tag color="purple">Khảo sát</Tag>;
      case 'F2':
        return <Tag color="cyan">Kế hoạch đào tạo</Tag>;
      case 'F3':
        return <Tag color="orange">Đánh giá</Tag>;
      default:
        return <Tag>Khác</Tag>;
    }
  };

  // Dữ liệu mẫu cho alerts
  const mockAlerts = [
    {
      id: 1,
      flow: 'F1',
      type: 'overdue',
      title: 'Khảo sát "Nhu cầu đào tạo Q4" đã quá hạn',
      dueAt: '2025-09-25',
      severity: 'high',
      action: { label: 'Đóng khảo sát', href: '/surveys/123/close' }
    },
    {
      id: 2,
      flow: 'F2',
      type: 'approvalSLA',
      title: 'Kế hoạch đào tạo chờ phê duyệt quá 48h',
      dueAt: '2025-09-26',
      severity: 'medium',
      action: { label: 'Gửi nhắc nhở', href: '/training/plans/456/remind' }
    },
    {
      id: 3,
      flow: 'F3',
      type: 'dueIn3Days',
      title: 'Đánh giá năng lực Q3 sắp hết hạn',
      dueAt: '2025-09-30',
      severity: 'low',
      action: { label: 'Xem chi tiết', href: '/assessment/rounds/789' }
    },
    {
      id: 4,
      flow: 'F2',
      type: 'budgetOver',
      title: 'Kế hoạch đào tạo Q3 vượt ngân sách 15%',
      dueAt: '2025-09-27',
      severity: 'high',
      action: { label: 'Xem báo cáo', href: '/training/plans/234/budget' }
    }
  ];

  // Sử dụng alerts từ props hoặc dữ liệu mẫu
  const displayAlerts = alerts || mockAlerts;

  return (
    <Card 
      title={
        <div className="alert-center-title">
          <WarningOutlined style={{ marginRight: 8 }} />
          <span>Trung tâm cảnh báo</span>
          <Badge count={displayAlerts.length} style={{ marginLeft: 8 }} />
        </div>
      }
      className="alert-center-widget"
      loading={loading}
    >
      {displayAlerts.length === 0 ? (
        <div className="empty-alerts">
          <Text type="secondary">Không có cảnh báo nào</Text>
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={displayAlerts}
          renderItem={alert => (
            <List.Item
              actions={[
                <Button 
                  type="link" 
                  size="small"
                  onClick={() => handleAlertAction(alert)}
                >
                  {alert.action.label}
                </Button>
              ]}
              className="alert-item"
            >
              <List.Item.Meta
                avatar={getAlertIcon(alert.type)}
                title={
                  <Space>
                    {getFlowLabel(alert.flow)}
                    <Text strong>{alert.title}</Text>
                  </Space>
                }
                description={
                  <Space>
                    <Tag color={getSeverityColor(alert.severity)}>
                      {alert.severity === 'high' ? 'Cao' : alert.severity === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Tag>
                    <Text type="secondary">
                      {alert.type === 'overdue' ? 'Quá hạn từ: ' : 'Hạn: '}
                      {alert.dueAt}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default AlertCenter;
