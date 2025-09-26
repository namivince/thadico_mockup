import React from 'react';
import { Card, List, Avatar, Tag, Typography, Row, Col, Timeline } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BellOutlined
} from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

const { Text } = Typography;

/**
 * Component hiển thị hoạt động gần đây và thông báo
 */
const RecentActivities = ({ activities, notifications, loading }) => {
  // Dữ liệu hoạt động mẫu
  const defaultActivities = [
    {
      id: 1,
      type: 'user_added',
      title: 'Thêm nhân viên mới',
      description: 'Nguyễn Văn A đã được thêm vào phòng Kỹ thuật',
      user: 'Admin',
      timestamp: dayjs().subtract(10, 'minute'),
      icon: <UserOutlined />,
      color: '#52c41a'
    },
    {
      id: 2,
      type: 'report_submitted',
      title: 'Nộp báo cáo',
      description: 'Báo cáo hiệu suất tháng 6 đã được nộp',
      user: 'Trần Thị B',
      timestamp: dayjs().subtract(1, 'hour'),
      icon: <FileTextOutlined />,
      color: '#1890ff'
    },
    {
      id: 3,
      type: 'evaluation_completed',
      title: 'Hoàn thành đánh giá',
      description: 'Đánh giá hiệu suất Q2 cho 15 nhân viên',
      user: 'Lê Văn C',
      timestamp: dayjs().subtract(2, 'hour'),
      icon: <CheckCircleOutlined />,
      color: '#722ed1'
    },
    {
      id: 4,
      type: 'deadline_reminder',
      title: 'Nhắc nhở deadline',
      description: 'Báo cáo tháng sẽ đến hạn trong 2 ngày',
      user: 'System',
      timestamp: dayjs().subtract(4, 'hour'),
      icon: <ClockCircleOutlined />,
      color: '#faad14'
    },
    {
      id: 5,
      type: 'training_scheduled',
      title: 'Lên lịch đào tạo',
      description: 'Khóa đào tạo "Kỹ năng lãnh đạo" cho 20 nhân viên',
      user: 'Phạm Thị D',
      timestamp: dayjs().subtract(6, 'hour'),
      icon: <BellOutlined />,
      color: '#13c2c2'
    }
  ];

  // Dữ liệu thông báo mẫu
  const defaultNotifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'Cần phê duyệt',
      message: '5 đơn xin nghỉ phép đang chờ phê duyệt',
      timestamp: dayjs().subtract(30, 'minute'),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống sẽ bảo trì từ 22:00 - 02:00 đêm nay',
      timestamp: dayjs().subtract(2, 'hour'),
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Hoàn thành mục tiêu',
      message: 'Phòng Kinh doanh đã đạt 105% mục tiêu tháng',
      timestamp: dayjs().subtract(1, 'day'),
      read: true
    }
  ];

  const activityData = activities || defaultActivities;
  const notificationData = notifications || defaultNotifications;

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent': return '#f5222d';
      case 'warning': return '#faad14';
      case 'success': return '#52c41a';
      default: return '#1890ff';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return <ExclamationCircleOutlined />;
      case 'warning': return <ClockCircleOutlined />;
      case 'success': return <CheckCircleOutlined />;
      default: return <BellOutlined />;
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {/* Recent Activities */}
      <Col xs={24} lg={14}>
        <Card 
          title="Hoạt động gần đây"
          className="recent-activities-widget"
          loading={loading}
          extra={
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Cập nhật liên tục
            </Text>
          }
        >
          <Timeline
            items={activityData.map(activity => ({
              dot: (
                <Avatar 
                  size="small" 
                  style={{ backgroundColor: activity.color }}
                  icon={activity.icon}
                />
              ),
              children: (
                <div>
                  <div style={{ marginBottom: '4px' }}>
                    <Text strong style={{ fontSize: '13px' }}>
                      {activity.title}
                    </Text>
                    <Tag 
                      size="small" 
                      style={{ marginLeft: '8px', fontSize: '10px' }}
                    >
                      {activity.user}
                    </Tag>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                    {activity.description}
                  </div>
                  <div style={{ fontSize: '11px', color: '#999' }}>
                    {activity.timestamp.fromNow()}
                  </div>
                </div>
              )
            }))}
          />
        </Card>
      </Col>

      {/* Notifications */}
      <Col xs={24} lg={10}>
        <Card 
          title="Thông báo"
          className="notifications-widget"
          loading={loading}
          extra={
            <Tag color="red" size="small">
              {notificationData.filter(n => !n.read).length} mới
            </Tag>
          }
        >
          <List
            size="small"
            dataSource={notificationData}
            renderItem={notification => (
              <List.Item
                style={{
                  backgroundColor: notification.read ? 'transparent' : '#f6f6f6',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '8px'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      size="small"
                      style={{ 
                        backgroundColor: getNotificationColor(notification.type),
                        fontSize: '12px'
                      }}
                      icon={getNotificationIcon(notification.type)}
                    />
                  }
                  title={
                    <div style={{ fontSize: '13px', fontWeight: notification.read ? 'normal' : 'bold' }}>
                      {notification.title}
                    </div>
                  }
                  description={
                    <div>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                        {notification.message}
                      </div>
                      <div style={{ fontSize: '11px', color: '#999' }}>
                        {notification.timestamp.fromNow()}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: 'Không có thông báo nào' }}
          />
        </Card>

        {/* Quick Stats */}
        <Card 
          title="Thống kê nhanh"
          size="small"
          style={{ marginTop: '16px' }}
          loading={loading}
        >
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <div style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                  {activityData.length}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  Hoạt động hôm nay
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f5222d' }}>
                  {notificationData.filter(n => !n.read).length}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  Thông báo chưa đọc
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#52c41a' }}>
                  {activityData.filter(a => a.type === 'evaluation_completed').length}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  Đánh giá hoàn thành
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#722ed1' }}>
                  {activityData.filter(a => a.type === 'user_added').length}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  Nhân viên mới
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default RecentActivities;
