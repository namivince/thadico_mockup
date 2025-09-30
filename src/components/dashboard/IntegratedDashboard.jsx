import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Select, 
  Button, 
  Table, 
  List, 
  Typography, 
  Space, 
  Divider, 
  Alert, 
  Spin,
  Badge,
  Tooltip,
  DatePicker
} from 'antd';
import { 
  ReloadOutlined, 
  RiseOutlined, 
  FormOutlined, 
  BookOutlined, 
  AuditOutlined, 
  TeamOutlined,
  PlusOutlined,
  RightOutlined,
  BellOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  UserOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import './IntegratedDashboard.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for statistics
const mockStatistics = {
  activeSurveys: 12,
  activeTrainingPlans: 8,
  activeAssessments: 5,
  totalParticipants: 245
};

// Mock data for activity trend
const mockActivityTrend = [
  { name: 'T1', surveys: 5, trainings: 3, assessments: 2 },
  { name: 'T2', surveys: 7, trainings: 4, assessments: 3 },
  { name: 'T3', surveys: 10, trainings: 6, assessments: 4 },
  { name: 'T4', surveys: 8, trainings: 5, assessments: 3 },
  { name: 'T5', surveys: 12, trainings: 8, assessments: 5 },
  { name: 'T6', surveys: 9, trainings: 7, assessments: 4 },
  { name: 'T7', surveys: 11, trainings: 9, assessments: 6 }
];

// Mock data for department distribution
const mockDepartmentDistribution = [
  { name: 'Nhân sự', value: 25 },
  { name: 'IT', value: 20 },
  { name: 'Marketing', value: 15 },
  { name: 'Kinh doanh', value: 30 },
  { name: 'Kế toán', value: 10 }
];

// Mock data for completion rate
const mockCompletionRate = [
  { name: 'Khảo sát', completed: 75, pending: 25 },
  { name: 'Đào tạo', completed: 60, pending: 40 },
  { name: 'Đánh giá', completed: 80, pending: 20 }
];

// Mock data for assessment results
const mockAssessmentResults = [
  { name: 'Kỹ năng lãnh đạo', before: 65, after: 85 },
  { name: 'Excel nâng cao', before: 50, after: 80 },
  { name: 'Kỹ năng giao tiếp', before: 70, after: 90 },
  { name: 'Quản lý dự án', before: 60, after: 75 }
];

// Mock data for recent activities
const mockRecentActivities = [
  { 
    id: 1, 
    type: 'survey', 
    title: 'Khảo sát nhu cầu đào tạo Q3/2025', 
    date: '2025-09-25', 
    status: 'active' 
  },
  { 
    id: 2, 
    type: 'training', 
    title: 'Kế hoạch đào tạo kỹ năng mềm 2025', 
    date: '2025-09-24', 
    status: 'active' 
  },
  { 
    id: 3, 
    type: 'assessment', 
    title: 'Đánh giá kỹ năng lập trình', 
    date: '2025-09-22', 
    status: 'active' 
  },
  { 
    id: 4, 
    type: 'survey', 
    title: 'Khảo sát mức độ hài lòng', 
    date: '2025-09-20', 
    status: 'completed' 
  },
  { 
    id: 5, 
    type: 'training', 
    title: 'Kế hoạch đào tạo Excel nâng cao', 
    date: '2025-09-18', 
    status: 'completed' 
  }
];

// Mock data for notifications
const mockNotifications = [
  { 
    id: 1, 
    content: 'Có 3 khảo sát cần phê duyệt', 
    type: 'approval', 
    priority: 'high',
    link: '/surveys/approval'
  },
  { 
    id: 2, 
    content: '2 kế hoạch đào tạo sắp hết hạn', 
    type: 'deadline', 
    priority: 'medium',
    link: '/training/plans'
  },
  { 
    id: 3, 
    content: '5 yêu cầu phúc khảo đang chờ xử lý', 
    type: 'appeal', 
    priority: 'high',
    link: '/assessment/appeals/history'
  },
  { 
    id: 4, 
    content: 'Cuộc họp đánh giá kết quả đào tạo - 30/09/2025, 14:00', 
    type: 'event', 
    priority: 'medium',
    link: '/calendar'
  }
];

// Colors for charts
const COLORS = ['#7C4DFF', '#10BDBD', '#FF9800', '#22C55E', '#EF4444'];

const IntegratedDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('month');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statistics, setStatistics] = useState({});
  const [activityTrend, setActivityTrend] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [completionRate, setCompletionRate] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
    
    // Auto refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      loadDashboardData(false);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [timeFilter, departmentFilter]);

  // Load dashboard data function
  const loadDashboardData = (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    
    // Simulate API call
    setTimeout(() => {
      setStatistics(mockStatistics);
      setActivityTrend(mockActivityTrend);
      setDepartmentDistribution(mockDepartmentDistribution);
      setCompletionRate(mockCompletionRate);
      setAssessmentResults(mockAssessmentResults);
      setRecentActivities(mockRecentActivities);
      setNotifications(mockNotifications);
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  // Handle refresh
  const handleRefresh = () => {
    loadDashboardData();
  };

  // Handle time filter change
  const handleTimeFilterChange = (value) => {
    setTimeFilter(value);
  };

  // Handle department filter change
  const handleDepartmentFilterChange = (value) => {
    setDepartmentFilter(value);
  };

  // Handle quick access click
  const handleQuickAccess = (path) => {
    navigate(path);
  };

  // Handle view all click
  const handleViewAll = (type) => {
    switch (type) {
      case 'surveys':
        navigate('/surveys');
        break;
      case 'trainings':
        navigate('/training/plans');
        break;
      case 'assessments':
        navigate('/assessment/rounds');
        break;
      case 'notifications':
        navigate('/alerts');
        break;
      default:
        break;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Render activity icon based on type
  const renderActivityIcon = (type) => {
    switch (type) {
      case 'survey':
        return <FormOutlined style={{ color: '#7C4DFF' }} />;
      case 'training':
        return <BookOutlined style={{ color: '#10BDBD' }} />;
      case 'assessment':
        return <AuditOutlined style={{ color: '#FF9800' }} />;
      default:
        return null;
    }
  };

  // Render notification priority
  const renderNotificationPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge status="error" />;
      case 'medium':
        return <Badge status="warning" />;
      case 'low':
        return <Badge status="default" />;
      default:
        return null;
    }
  };

  return (
    <div className="integrated-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <Title level={4}>Bảng điều khiển tích hợp</Title>
          {lastUpdated && (
            <Text type="secondary">
              Cập nhật lần cuối: {lastUpdated.toLocaleTimeString('vi-VN')}
            </Text>
          )}
        </div>
        <div className="dashboard-filters">
          <Select
            defaultValue="month"
            style={{ width: 120, marginRight: 8 }}
            onChange={handleTimeFilterChange}
          >
            <Option value="today">Hôm nay</Option>
            <Option value="week">Tuần này</Option>
            <Option value="month">Tháng này</Option>
            <Option value="quarter">Quý này</Option>
            <Option value="year">Năm nay</Option>
          </Select>
          <Select
            defaultValue="all"
            style={{ width: 180, marginRight: 8 }}
            onChange={handleDepartmentFilterChange}
          >
            <Option value="all">Tất cả phòng ban</Option>
            <Option value="hr">Phòng Nhân sự</Option>
            <Option value="it">Phòng IT</Option>
            <Option value="marketing">Phòng Marketing</Option>
            <Option value="sales">Phòng Kinh doanh</Option>
            <Option value="accounting">Phòng Kế toán</Option>
          </Select>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={handleRefresh}
          >
            Làm mới
          </Button>
        </div>
      </div>

      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        <div className="dashboard-content">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]} className="statistics-row">
            <Col xs={24} sm={12} md={6}>
              <Card className="statistic-card survey-card">
                <Statistic
                  title="Khảo sát đang hoạt động"
                  value={statistics.activeSurveys}
                  prefix={<FormOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="statistic-card training-card">
                <Statistic
                  title="Đào tạo đang triển khai"
                  value={statistics.activeTrainingPlans}
                  prefix={<BookOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="statistic-card assessment-card">
                <Statistic
                  title="Đánh giá đang diễn ra"
                  value={statistics.activeAssessments}
                  prefix={<AuditOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="statistic-card participants-card">
                <Statistic
                  title="Người tham gia"
                  value={statistics.totalParticipants}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row gutter={[16, 16]} className="charts-row">
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <LineChartOutlined />
                    <span>Xu hướng hoạt động</span>
                  </Space>
                }
                className="chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={activityTrend}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="surveys" 
                      name="Khảo sát" 
                      stroke="#7C4DFF" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="trainings" 
                      name="Đào tạo" 
                      stroke="#10BDBD" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="assessments" 
                      name="Đánh giá" 
                      stroke="#FF9800" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card 
                title={
                  <Space>
                    <PieChartOutlined />
                    <span>Phân bổ theo phòng ban</span>
                  </Space>
                }
                className="chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card 
                title={
                  <Space>
                    <BarChartOutlined />
                    <span>Tỷ lệ hoàn thành</span>
                  </Space>
                }
                className="chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={completionRate}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Hoàn thành" stackId="a" fill="#22C55E" />
                    <Bar dataKey="pending" name="Chưa hoàn thành" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="charts-row">
            <Col xs={24}>
              <Card 
                title={
                  <Space>
                    <BarChartOutlined />
                    <span>So sánh kết quả đánh giá trước và sau đào tạo</span>
                  </Space>
                }
                className="chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={assessmentResults}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="before" name="Trước đào tạo" fill="#FF9800" />
                    <Bar dataKey="after" name="Sau đào tạo" fill="#22C55E" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Recent Activities and Quick Access */}
          <Row gutter={[16, 16]} className="activities-row">
            <Col xs={24} md={16}>
              <Card 
                title={
                  <Space>
                    <HistoryOutlined />
                    <span>Hoạt động gần đây</span>
                  </Space>
                }
                className="activities-card"
              >
                <List
                  dataSource={recentActivities}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button 
                          type="link" 
                          onClick={() => navigate(`/${item.type === 'survey' ? 'surveys' : item.type === 'training' ? 'training/plans' : 'assessment/rounds'}/${item.id}`)}
                        >
                          Xem chi tiết
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={renderActivityIcon(item.type)}
                        title={item.title}
                        description={
                          <Space>
                            <CalendarOutlined />
                            <span>{formatDate(item.date)}</span>
                            <Badge 
                              status={item.status === 'active' ? 'processing' : 'success'} 
                              text={item.status === 'active' ? 'Đang hoạt động' : 'Đã hoàn thành'} 
                            />
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                  footer={
                    <div className="view-all">
                      <Button 
                        type="link" 
                        onClick={() => handleViewAll('activities')}
                      >
                        Xem tất cả <RightOutlined />
                      </Button>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card 
                title={
                  <Space>
                    <PlusOutlined />
                    <span>Truy cập nhanh</span>
                  </Space>
                }
                className="quick-access-card"
              >
                <List
                  dataSource={[
                    { title: 'Tạo khảo sát', icon: <FormOutlined />, path: '/surveys/create' },
                    { title: 'Tạo kế hoạch đào tạo', icon: <BookOutlined />, path: '/training/plans/create' },
                    { title: 'Tạo đánh giá', icon: <AuditOutlined />, path: '/assessment/campaigns/create' },
                    { title: 'Xem báo cáo', icon: <FileTextOutlined />, path: '/reports' },
                    { title: 'Trung tâm cảnh báo', icon: <BellOutlined />, path: '/alerts' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Button 
                        type="text" 
                        icon={item.icon}
                        onClick={() => handleQuickAccess(item.path)}
                        block
                      >
                        {item.title}
                      </Button>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          {/* Notifications */}
          <Row gutter={[16, 16]} className="notifications-row">
            <Col xs={24}>
              <Card 
                title={
                  <Space>
                    <BellOutlined />
                    <span>Thông báo và nhắc nhở</span>
                  </Space>
                }
                className="notifications-card"
              >
                <List
                  dataSource={notifications}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button 
                          type="link" 
                          onClick={() => navigate(item.link)}
                        >
                          Xem chi tiết
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={renderNotificationPriority(item.priority)}
                        title={item.content}
                      />
                    </List.Item>
                  )}
                  footer={
                    <div className="view-all">
                      <Button 
                        type="link" 
                        onClick={() => handleViewAll('notifications')}
                      >
                        Xem tất cả thông báo <RightOutlined />
                      </Button>
                    </div>
                  }
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default IntegratedDashboard;
