import React, { useState, useEffect } from 'react';
import { 
  Card, 
  List, 
  Badge, 
  Tag, 
  Button, 
  Space, 
  Row, 
  Col, 
  Select, 
  Input, 
  Statistic, 
  Divider,
  Tooltip,
  message,
  Typography,
  Empty
} from 'antd';
import { 
  BellOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined,
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  FormOutlined,
  RocketOutlined,
  TrophyOutlined,
  UserOutlined,
  CalendarOutlined,
  FileSearchOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './AlertCenter.css';

const { Option } = Select;
const { Search } = Input;
const { Text, Title } = Typography;

// Mock data for alerts
const mockAlerts = [
  {
    id: 1,
    title: 'Khảo sát "Nhu cầu đào tạo Q3" sắp hết hạn',
    description: 'Còn 2 ngày nữa sẽ kết thúc. 15/45 CBNV chưa hoàn thành.',
    type: 'survey', // F1
    priority: 'high',
    status: 'unread',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    actions: ['remind', 'extend', 'view'],
    relatedId: 5,
    relatedType: 'survey'
  },
  {
    id: 2,
    title: '5 CBNV chưa tham gia khảo sát "Đánh giá khóa học"',
    description: 'Khảo sát đã hoàn thành 50% thời gian.',
    type: 'survey', // F1
    priority: 'medium',
    status: 'read',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    actions: ['remind', 'view'],
    relatedId: 3,
    relatedType: 'survey'
  },
  {
    id: 3,
    title: 'Kế hoạch "Đào tạo kỹ năng mềm" đang chờ phê duyệt',
    description: 'Đã chờ phê duyệt 3 ngày. Cần phê duyệt cấp 2.',
    type: 'plan', // F2
    priority: 'medium',
    status: 'processed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    actions: ['view'],
    relatedId: 6,
    relatedType: 'plan'
  },
  {
    id: 4,
    title: 'Quá hạn chấm bài đánh giá "Kỹ năng lập trình"',
    description: 'Đã quá hạn 2 ngày. 5/20 bài thi chưa được chấm.',
    type: 'assessment', // F3
    priority: 'high',
    status: 'unread',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    actions: ['grade', 'reassign', 'view'],
    relatedId: 8,
    relatedType: 'assessment'
  },
  {
    id: 5,
    title: 'Kế hoạch "Đào tạo Q4" sắp triển khai',
    description: 'Kế hoạch sẽ bắt đầu triển khai trong 3 ngày tới.',
    type: 'plan', // F2
    priority: 'medium',
    status: 'unread',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    actions: ['view', 'deploy'],
    relatedId: 7,
    relatedType: 'plan'
  },
  {
    id: 6,
    title: 'Yêu cầu phúc khảo mới cho đánh giá "Kỹ năng giao tiếp"',
    description: 'Nhân viên Nguyễn Văn A đã gửi yêu cầu phúc khảo.',
    type: 'assessment', // F3
    priority: 'low',
    status: 'unread',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    actions: ['review', 'view'],
    relatedId: 10,
    relatedType: 'appeal'
  },
  {
    id: 7,
    title: 'Khảo sát "Đánh giá nhu cầu đào tạo 2025" đã quá hạn',
    description: 'Khảo sát đã quá hạn 1 ngày. 10/50 CBNV chưa hoàn thành.',
    type: 'survey', // F1
    priority: 'high',
    status: 'read',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
    actions: ['close', 'extend', 'view'],
    relatedId: 2,
    relatedType: 'survey'
  },
  {
    id: 8,
    title: 'Cập nhật kế hoạch đào tạo sau khảo sát',
    description: 'Khảo sát "Nhu cầu đào tạo Q3" đã hoàn thành. Cần cập nhật kế hoạch.',
    type: 'plan', // F2
    priority: 'low',
    status: 'unread',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    actions: ['update', 'view'],
    relatedId: 5,
    relatedType: 'survey'
  },
  {
    id: 9,
    title: 'Sắp hết hạn chấm bài đánh giá "Kỹ năng quản lý"',
    description: 'Còn 1 ngày nữa sẽ hết hạn chấm bài. 8/15 bài đã được chấm.',
    type: 'assessment', // F3
    priority: 'medium',
    status: 'processed',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    actions: ['grade', 'view'],
    relatedId: 9,
    relatedType: 'assessment'
  },
  {
    id: 10,
    title: 'Khảo sát "Đánh giá chất lượng đào tạo" cần được tạo',
    description: 'Khóa học "Excel nâng cao" đã kết thúc. Cần tạo khảo sát đánh giá.',
    type: 'survey', // F1
    priority: 'low',
    status: 'read',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    actions: ['create', 'view'],
    relatedId: 4,
    relatedType: 'course'
  },
  {
    id: 11,
    title: 'Kế hoạch "Đào tạo an toàn lao động" đã hoàn thành',
    description: 'Kế hoạch đã hoàn thành 100%. Cần tổng kết và báo cáo.',
    type: 'plan', // F2
    priority: 'medium',
    status: 'unread',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    actions: ['report', 'view'],
    relatedId: 10,
    relatedType: 'plan'
  },
  {
    id: 12,
    title: 'Chiến dịch đánh giá "Kỹ năng lãnh đạo" cần được phê duyệt',
    description: 'Chiến dịch đã được tạo và đang chờ phê duyệt.',
    type: 'assessment', // F3
    priority: 'low',
    status: 'processed',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    actions: ['approve', 'view'],
    relatedId: 11,
    relatedType: 'assessment'
  }
];

const AlertCenter = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all',
    search: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    high: 0,
    medium: 0,
    low: 0,
    survey: 0,
    plan: 0,
    assessment: 0,
    processed: 0
  });

  // Fetch alerts
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    if (alerts.length > 0) {
      let result = [...alerts];
      
      // Filter by type
      if (filters.type !== 'all') {
        result = result.filter(alert => alert.type === filters.type);
      }
      
      // Filter by priority
      if (filters.priority !== 'all') {
        result = result.filter(alert => alert.priority === filters.priority);
      }
      
      // Filter by status
      if (filters.status !== 'all') {
        result = result.filter(alert => alert.status === filters.status);
      }
      
      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(alert => 
          alert.title.toLowerCase().includes(searchLower) || 
          alert.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Sort by priority and date
      result.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setFilteredAlerts(result);
      
      // Calculate stats
      const newStats = {
        total: alerts.length,
        unread: alerts.filter(a => a.status === 'unread').length,
        high: alerts.filter(a => a.priority === 'high').length,
        medium: alerts.filter(a => a.priority === 'medium').length,
        low: alerts.filter(a => a.priority === 'low').length,
        survey: alerts.filter(a => a.type === 'survey').length,
        plan: alerts.filter(a => a.type === 'plan').length,
        assessment: alerts.filter(a => a.type === 'assessment').length,
        processed: alerts.filter(a => a.status === 'processed').length
      };
      setStats(newStats);
    }
  }, [alerts, filters]);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };

  // Handle search
  const handleSearch = (value) => {
    setFilters({
      ...filters,
      search: value
    });
  };

  // Mark alert as read/unread
  const handleToggleRead = (id, currentStatus) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    const updatedAlerts = alerts.map(alert => 
      alert.id === id ? { ...alert, status: newStatus } : alert
    );
    setAlerts(updatedAlerts);
    message.success(`Đã đánh dấu ${newStatus === 'read' ? 'đã đọc' : 'chưa đọc'}`);
  };

  // Mark alert as processed
  const handleMarkProcessed = (id) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'processed' } : alert
    );
    setAlerts(updatedAlerts);
    message.success('Đã đánh dấu xử lý xong');
  };

  // Delete alert
  const handleDeleteAlert = (id) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== id);
    setAlerts(updatedAlerts);
    message.success('Đã xóa cảnh báo');
  };

  // Handle alert actions
  const handleAlertAction = (action, alert) => {
    switch (action) {
      case 'remind':
        message.success('Đã gửi nhắc nhở');
        handleMarkProcessed(alert.id);
        break;
      case 'extend':
        message.success('Đã gia hạn thêm 7 ngày');
        handleMarkProcessed(alert.id);
        break;
      case 'view':
        // Navigate based on related type
        switch (alert.relatedType) {
          case 'survey':
            navigate(`/surveys/${alert.relatedId}`);
            break;
          case 'plan':
            navigate(`/training/plans/${alert.relatedId}`);
            break;
          case 'assessment':
            navigate(`/assessment/rounds/${alert.relatedId}`);
            break;
          case 'appeal':
            navigate(`/assessment/rounds/${alert.relatedId}/appeals`);
            break;
          case 'course':
            navigate(`/training/courses/${alert.relatedId}`);
            break;
          default:
            navigate('/dashboard');
        }
        handleToggleRead(alert.id, 'unread');
        break;
      case 'grade':
        navigate(`/assessment/rounds/${alert.relatedId}/grading`);
        handleMarkProcessed(alert.id);
        break;
      case 'reassign':
        message.success('Đã mở hộp thoại phân công lại');
        break;
      case 'deploy':
        navigate(`/training/plans/${alert.relatedId}/deploy`);
        handleMarkProcessed(alert.id);
        break;
      case 'review':
        navigate(`/assessment/rounds/${alert.relatedId}/appeals`);
        handleMarkProcessed(alert.id);
        break;
      case 'close':
        message.success('Đã đóng khảo sát');
        handleMarkProcessed(alert.id);
        break;
      case 'update':
        navigate('/training/plans/auto-suggest');
        handleMarkProcessed(alert.id);
        break;
      case 'create':
        navigate('/surveys/new');
        handleMarkProcessed(alert.id);
        break;
      case 'report':
        message.success('Đã mở hộp thoại tạo báo cáo');
        handleMarkProcessed(alert.id);
        break;
      case 'approve':
        navigate(`/assessment/rounds/${alert.relatedId}/grading`);
        handleMarkProcessed(alert.id);
        break;
      default:
        message.info('Chức năng đang phát triển');
    }
  };

  // Render alert icon based on type
  const renderAlertIcon = (type) => {
    switch (type) {
      case 'survey':
        return <Badge count={<FormOutlined style={{ color: '#7C4DFF' }} />} style={{ backgroundColor: '#F5F0FF' }} />;
      case 'plan':
        return <Badge count={<RocketOutlined style={{ color: '#10BDBD' }} />} style={{ backgroundColor: '#E6FFFB' }} />;
      case 'assessment':
        return <Badge count={<TrophyOutlined style={{ color: '#FF9800' }} />} style={{ backgroundColor: '#FFF8E6' }} />;
      default:
        return <Badge count={<BellOutlined style={{ color: '#8A8FA3' }} />} style={{ backgroundColor: '#F9FAFB' }} />;
    }
  };

  // Render priority tag
  const renderPriorityTag = (priority) => {
    switch (priority) {
      case 'high':
        return <Tag color="error" icon={<ExclamationCircleOutlined />}>Cao</Tag>;
      case 'medium':
        return <Tag color="warning" icon={<ClockCircleOutlined />}>Trung bình</Tag>;
      case 'low':
        return <Tag color="success" icon={<CheckCircleOutlined />}>Thấp</Tag>;
      default:
        return null;
    }
  };

  // Render time ago
  const renderTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) return 'Vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay < 30) return `${diffDay} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'unread':
        return <Tag color="blue">Chưa đọc</Tag>;
      case 'read':
        return <Tag color="default">Đã đọc</Tag>;
      case 'processed':
        return <Tag color="success">Đã xử lý</Tag>;
      default:
        return null;
    }
  };

  // Render action buttons
  const renderActionButtons = (actions, alert) => {
    return (
      <Space>
        {actions.includes('remind') && (
          <Button 
            size="small" 
            type="primary" 
            ghost 
            onClick={() => handleAlertAction('remind', alert)}
          >
            Nhắc nhở
          </Button>
        )}
        {actions.includes('extend') && (
          <Button 
            size="small" 
            onClick={() => handleAlertAction('extend', alert)}
          >
            Gia hạn
          </Button>
        )}
        {actions.includes('grade') && (
          <Button 
            size="small" 
            type="primary" 
            onClick={() => handleAlertAction('grade', alert)}
          >
            Chấm ngay
          </Button>
        )}
        {actions.includes('reassign') && (
          <Button 
            size="small" 
            onClick={() => handleAlertAction('reassign', alert)}
          >
            Phân công lại
          </Button>
        )}
        {actions.includes('deploy') && (
          <Button 
            size="small" 
            type="primary" 
            ghost 
            onClick={() => handleAlertAction('deploy', alert)}
          >
            Triển khai
          </Button>
        )}
        {actions.includes('review') && (
          <Button 
            size="small" 
            type="primary" 
            ghost 
            onClick={() => handleAlertAction('review', alert)}
          >
            Xem xét
          </Button>
        )}
        {actions.includes('close') && (
          <Button 
            size="small" 
            danger 
            onClick={() => handleAlertAction('close', alert)}
          >
            Đóng
          </Button>
        )}
        {actions.includes('update') && (
          <Button 
            size="small" 
            type="primary" 
            ghost 
            onClick={() => handleAlertAction('update', alert)}
          >
            Cập nhật
          </Button>
        )}
        {actions.includes('create') && (
          <Button 
            size="small" 
            type="primary" 
            ghost 
            onClick={() => handleAlertAction('create', alert)}
          >
            Tạo mới
          </Button>
        )}
        {actions.includes('report') && (
          <Button 
            size="small" 
            onClick={() => handleAlertAction('report', alert)}
          >
            Báo cáo
          </Button>
        )}
        {actions.includes('approve') && (
          <Button 
            size="small" 
            type="primary" 
            ghost 
            onClick={() => handleAlertAction('approve', alert)}
          >
            Phê duyệt
          </Button>
        )}
        {actions.includes('view') && (
          <Button 
            size="small" 
            onClick={() => handleAlertAction('view', alert)}
          >
            Xem chi tiết
          </Button>
        )}
      </Space>
    );
  };

  return (
    <div className="alert-center">
      <Card 
        title={
          <div className="alert-center-header">
            <BellOutlined className="alert-icon" />
            <span>Trung tâm cảnh báo và nhắc nhở</span>
            {stats.unread > 0 && (
              <Badge count={stats.unread} overflowCount={99} style={{ marginLeft: 8 }} />
            )}
          </div>
        }
        className="alert-center-card"
      >
        {/* Filters */}
        <div className="alert-filters">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={6} md={5} lg={4}>
              <Select
                value={filters.type}
                onChange={(value) => handleFilterChange('type', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả loại</Option>
                <Option value="survey">
                  <Badge color="#7C4DFF" text="Khảo sát" />
                </Option>
                <Option value="plan">
                  <Badge color="#10BDBD" text="Kế hoạch" />
                </Option>
                <Option value="assessment">
                  <Badge color="#FF9800" text="Đánh giá" />
                </Option>
              </Select>
            </Col>
            <Col xs={24} sm={6} md={5} lg={4}>
              <Select
                value={filters.priority}
                onChange={(value) => handleFilterChange('priority', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả mức độ</Option>
                <Option value="high">
                  <Badge color="#EF4444" text="Cao" />
                </Option>
                <Option value="medium">
                  <Badge color="#F59E0B" text="Trung bình" />
                </Option>
                <Option value="low">
                  <Badge color="#22C55E" text="Thấp" />
                </Option>
              </Select>
            </Col>
            <Col xs={24} sm={6} md={5} lg={4}>
              <Select
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="unread">Chưa đọc</Option>
                <Option value="read">Đã đọc</Option>
                <Option value="processed">Đã xử lý</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6} md={9} lg={12}>
              <Search
                placeholder="Tìm kiếm cảnh báo"
                onSearch={handleSearch}
                allowClear
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </div>

        {/* Statistics */}
        <div className="alert-stats">
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="Tổng cảnh báo" value={stats.total} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="Chưa đọc" value={stats.unread} valueStyle={{ color: '#1890ff' }} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="Ưu tiên cao" value={stats.high} valueStyle={{ color: '#EF4444' }} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="Trung bình" value={stats.medium} valueStyle={{ color: '#F59E0B' }} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="Thấp" value={stats.low} valueStyle={{ color: '#22C55E' }} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="F1 (Khảo sát)" value={stats.survey} valueStyle={{ color: '#7C4DFF' }} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="F2 (Kế hoạch)" value={stats.plan} valueStyle={{ color: '#10BDBD' }} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Statistic title="F3 (Đánh giá)" value={stats.assessment} valueStyle={{ color: '#FF9800' }} />
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Alerts List */}
        <List
          className="alert-list"
          loading={loading}
          itemLayout="vertical"
          dataSource={filteredAlerts}
          locale={{ emptyText: <Empty description="Không có cảnh báo nào" /> }}
          renderItem={alert => (
            <List.Item
              key={alert.id}
              className={`alert-item ${alert.status === 'unread' ? 'unread' : ''}`}
              actions={[
                <div className="alert-meta">
                  {renderPriorityTag(alert.priority)}
                  <span className="alert-time">{renderTimeAgo(alert.createdAt)}</span>
                  {renderStatusBadge(alert.status)}
                </div>,
                <div className="alert-actions">
                  {renderActionButtons(alert.actions, alert)}
                  <Space style={{ marginLeft: 8 }}>
                    <Tooltip title={alert.status === 'unread' ? 'Đánh dấu đã đọc' : 'Đánh dấu chưa đọc'}>
                      <Button 
                        type="text" 
                        icon={alert.status === 'unread' ? <EyeOutlined /> : <EyeInvisibleOutlined />} 
                        onClick={() => handleToggleRead(alert.id, alert.status)}
                      />
                    </Tooltip>
                    <Tooltip title="Xóa cảnh báo">
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteAlert(alert.id)}
                      />
                    </Tooltip>
                  </Space>
                </div>
              ]}
            >
              <List.Item.Meta
                avatar={renderAlertIcon(alert.type)}
                title={<Text strong>{alert.title}</Text>}
                description={alert.description}
              />
            </List.Item>
          )}
        />

        {filteredAlerts.length > 0 && (
          <div className="alert-footer">
            <Button>Tải thêm</Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AlertCenter;
