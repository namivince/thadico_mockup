import React, { useState } from 'react';
import { Card, List, Tag, Button, Modal, Typography, Space, Divider } from 'antd';
import { 
  BellOutlined, 
  WarningOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './UnifiedAlerts.css';

const { Title, Text, Paragraph } = Typography;

/**
 * Component hiển thị Unified Alerts cho 3 luồng
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const UnifiedAlerts = ({ data, loading }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);

  // Xử lý khi click vào alert
  const handleAlertClick = (alert) => {
    setCurrentAlert(alert);
    setModalVisible(true);
  };

  // Xử lý khi click vào action button
  const handleActionClick = (href) => {
    setModalVisible(false);
    navigate(href);
  };

  // Render icon theo flow
  const renderFlowIcon = (flow) => {
    switch (flow) {
      case 'F1':
        return <Tag color="#7C4DFF">Khảo sát</Tag>;
      case 'F2':
        return <Tag color="#10BDBD">Đào tạo</Tag>;
      case 'F3':
        return <Tag color="#FF9800">Đánh giá</Tag>;
      default:
        return null;
    }
  };

  // Render icon theo severity
  const renderSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <ExclamationCircleOutlined style={{ color: '#f5222d' }} />;
      case 'medium':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'low':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return null;
    }
  };

  // Render màu theo severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#f5222d';
      case 'medium':
        return '#faad14';
      case 'low':
        return '#52c41a';
      default:
        return '#1890ff';
    }
  };

  return (
    <>
      <Card 
        title={
          <div className="alerts-card-title">
            <BellOutlined style={{ marginRight: 8 }} />
            <span>Cảnh báo & Nhắc việc</span>
          </div>
        }
        className="alerts-card"
        loading={loading}
      >
        <List
          dataSource={data?.alerts || []}
          renderItem={item => (
            <List.Item 
              className="alert-item"
              onClick={() => handleAlertClick(item)}
            >
              <List.Item.Meta
                avatar={renderSeverityIcon(item.severity)}
                title={
                  <div className="alert-title">
                    {renderFlowIcon(item.flow)}
                    <Text>{item.title}</Text>
                  </div>
                }
              />
              <RightOutlined className="alert-arrow" />
            </List.Item>
          )}
          locale={{ emptyText: 'Không có cảnh báo nào' }}
        />
      </Card>

      {/* Modal chi tiết cảnh báo */}
      <Modal
        title={
          <div className="alert-modal-title">
            <Space>
              {currentAlert && renderSeverityIcon(currentAlert.severity)}
              <span>Chi tiết cảnh báo</span>
            </Space>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
          currentAlert && (
            <Button 
              key="action" 
              type="primary" 
              onClick={() => handleActionClick(currentAlert.action.href)}
            >
              {currentAlert.action.label}
            </Button>
          )
        ]}
      >
        {currentAlert && (
          <div className="alert-detail">
            <div className="alert-flow">
              {renderFlowIcon(currentAlert.flow)}
            </div>
            
            <Divider />
            
            <Paragraph>
              <Text strong>Nội dung:</Text> {currentAlert.title}
            </Paragraph>
            
            <Paragraph>
              <Text strong>Mức độ:</Text>{' '}
              <Tag color={getSeverityColor(currentAlert.severity)}>
                {currentAlert.severity === 'high' ? 'Cao' : 
                 currentAlert.severity === 'medium' ? 'Trung bình' : 'Thấp'}
              </Tag>
            </Paragraph>
            
            <Paragraph>
              <Text strong>Hành động đề xuất:</Text>{' '}
              {currentAlert.action.label}
            </Paragraph>
            
            <Paragraph type="secondary">
              Nhấn nút "{currentAlert.action.label}" để xử lý ngay.
            </Paragraph>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UnifiedAlerts;
