import React, { useState } from 'react';
import { Card, List, Tag, Button, Modal, Typography, Space, Divider, Badge, Tabs, Select, Tooltip } from 'antd';
import { 
  BellOutlined, 
  WarningOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  RightOutlined,
  ClockCircleOutlined,
  SendOutlined,
  CheckOutlined,
  CloseOutlined,
  PauseOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './UnifiedAlerts.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * Component hiển thị Unified Alerts cho 3 luồng
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const UnifiedAlerts = ({ data, loading }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterFlow, setFilterFlow] = useState('all');

  // Xử lý khi click vào alert
  const handleAlertClick = (alert) => {
    setCurrentAlert(alert);
    setModalVisible(true);
  };

  // Xử lý khi click vào action button
  const handleActionClick = (e, action, alert) => {
    e.stopPropagation();
    
    if (action.type === 'navigate') {
      navigate(action.href);
    } else if (action.type === 'reminder') {
      // Mock gửi nhắc nhở
      Modal.success({
        title: 'Đã gửi nhắc nhở',
        content: `Đã gửi nhắc nhở cho ${alert.target || 'người dùng'}`
      });
    } else if (action.type === 'approve') {
      // Mock phê duyệt
      Modal.success({
        title: 'Đã phê duyệt',
        content: `Đã phê duyệt ${alert.title}`
      });
    } else if (action.type === 'extend') {
      // Mock gia hạn
      Modal.success({
        title: 'Đã gia hạn',
        content: `Đã gia hạn ${alert.title}`
      });
    }
  };
  
  // Lọc cảnh báo theo tab, severity và flow
  const getFilteredAlerts = () => {
    if (!data?.alerts) return [];
    
    return data.alerts.filter(alert => {
      // Lọc theo tab
      if (activeTab !== 'all' && alert.type !== activeTab) {
        return false;
      }
      
      // Lọc theo severity
      if (filterSeverity !== 'all' && alert.severity !== filterSeverity) {
        return false;
      }
      
      // Lọc theo flow
      if (filterFlow !== 'all' && alert.flow !== filterFlow) {
        return false;
      }
      
      return true;
    });
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
  
  // Render icon theo alert type
  const renderTypeIcon = (type) => {
    switch (type) {
      case 'overdue':
        return <ClockCircleOutlined style={{ color: '#f5222d' }} />;
      case 'approvalSLA':
        return <CheckOutlined style={{ color: '#faad14' }} />;
      case 'holdExpiring':
        return <PauseOutlined style={{ color: '#faad14' }} />;
      case 'gradingSLA':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return <BellOutlined style={{ color: '#1890ff' }} />;
    }
  };
  
  // Render action button
  const renderActionButton = (action, alert) => {
    let icon = <RightOutlined />;
    let color = '#1890ff';
    
    switch (action.type) {
      case 'reminder':
        icon = <SendOutlined />;
        color = '#1890ff';
        break;
      case 'approve':
        icon = <CheckOutlined />;
        color = '#52c41a';
        break;
      case 'reject':
        icon = <CloseOutlined />;
        color = '#f5222d';
        break;
      case 'extend':
        icon = <PauseOutlined />;
        color = '#faad14';
        break;
    }
    
    return (
      <Button 
        type="text" 
        icon={icon}
        style={{ color }}
        onClick={(e) => handleActionClick(e, action, alert)}
      >
        {action.label}
      </Button>
    );
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
            <Badge 
              count={data?.alerts?.filter(a => a.severity === 'high').length || 0} 
              style={{ marginLeft: 8 }}
            />
          </div>
        }
        className="alerts-card"
        loading={loading}
        extra={
          <Space>
            <Select 
              value={filterSeverity} 
              onChange={setFilterSeverity}
              size="small"
              style={{ width: 100 }}
              placeholder="Mức độ"
              suffixIcon={<FilterOutlined />}
            >
              <Select.Option value="all">Tất cả</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="low">Thấp</Select.Option>
            </Select>
            
            <Select 
              value={filterFlow} 
              onChange={setFilterFlow}
              size="small"
              style={{ width: 100 }}
              placeholder="Luồng"
              suffixIcon={<FilterOutlined />}
            >
              <Select.Option value="all">Tất cả</Select.Option>
              <Select.Option value="F1">Khảo sát</Select.Option>
              <Select.Option value="F2">Đào tạo</Select.Option>
              <Select.Option value="F3">Đánh giá</Select.Option>
            </Select>
          </Space>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<Badge count={data?.alerts?.length || 0} overflowCount={99}>Tất cả</Badge>} key="all" />
          <TabPane tab={<Badge count={data?.alerts?.filter(a => a.type === 'overdue').length || 0}>Quá hạn</Badge>} key="overdue" />
          <TabPane tab={<Badge count={data?.alerts?.filter(a => a.type === 'approvalSLA' || a.type === 'holdExpiring').length || 0}>Chờ duyệt</Badge>} key="approval" />
          <TabPane tab={<Badge count={data?.alerts?.filter(a => a.type === 'gradingSLA').length || 0}>SLA</Badge>} key="sla" />
        </Tabs>
        
        <List
          dataSource={getFilteredAlerts()}
          renderItem={item => (
            <List.Item 
              className="alert-item"
              onClick={() => handleAlertClick(item)}
            >
              <List.Item.Meta
                avatar={
                  <Badge 
                    count={renderSeverityIcon(item.severity)} 
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {renderTypeIcon(item.type)}
                  </Badge>
                }
                title={
                  <div className="alert-title">
                    {renderFlowIcon(item.flow)}
                    <Tooltip title={`Hạn: ${item.dueAt}`}>
                      <Text>{item.title}</Text>
                    </Tooltip>
                  </div>
                }
                description={
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Hạn: {item.dueAt}
                  </Text>
                }
              />
              {item.action && renderActionButton(item.action, item)}
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
              {currentAlert && (
                <Badge 
                  count={renderSeverityIcon(currentAlert.severity)} 
                  style={{ backgroundColor: 'transparent' }}
                >
                  {currentAlert && renderTypeIcon(currentAlert.type)}
                </Badge>
              )}
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
          currentAlert && currentAlert.action && (
            <Button 
              key="action" 
              type="primary" 
              onClick={(e) => handleActionClick(e, currentAlert.action, currentAlert)}
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
              <Text strong>Hạn xử lý:</Text>{' '}
              <Tag color={new Date(currentAlert.dueAt) < new Date() ? '#f5222d' : '#52c41a'}>
                {currentAlert.dueAt}
              </Tag>
            </Paragraph>
            
            <Paragraph>
              <Text strong>Loại cảnh báo:</Text>{' '}
              <Tag>
                {currentAlert.type === 'overdue' ? 'Quá hạn' : 
                 currentAlert.type === 'approvalSLA' ? 'Chờ phê duyệt' :
                 currentAlert.type === 'holdExpiring' ? 'Sắp hết hạn tạm hoãn' :
                 currentAlert.type === 'gradingSLA' ? 'SLA chấm điểm' : 'Cảnh báo'}
              </Tag>
            </Paragraph>
            
            <Paragraph>
              <Text strong>Hành động đề xuất:</Text>{' '}
              {currentAlert.action?.label || 'Không có'}
            </Paragraph>
            
            <Paragraph type="secondary">
              {currentAlert.action ? 
                `Nhấn nút "${currentAlert.action.label}" để xử lý ngay.` : 
                'Không có hành động cần thực hiện.'}
            </Paragraph>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UnifiedAlerts;
