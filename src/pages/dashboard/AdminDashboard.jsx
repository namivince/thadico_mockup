import React, { useEffect, useState } from 'react';
import { Layout, Typography, Spin, message, Row, Col, Tabs, Card, Alert, Progress, Badge } from 'antd';
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  BarChartOutlined, 
  BellOutlined,
  FormOutlined,
  RocketOutlined,
  TrophyOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  FileExclamationOutlined
} from '@ant-design/icons';
import MegaMenu from '../../components/dashboard/MegaMenu';
import KpiWidget from '../../components/dashboard/KpiWidget';
import ShortcutWidget from '../../components/dashboard/ShortcutWidget';
import DepartmentChart from '../../components/dashboard/DepartmentChart';
import PerformanceWidget from '../../components/dashboard/PerformanceWidget';
import CalendarWidget from '../../components/dashboard/CalendarWidget';
import RecentActivities from '../../components/dashboard/RecentActivities';
import QuickReports from '../../components/dashboard/QuickReports';
import WeatherWidget from '../../components/dashboard/WeatherWidget';
import TasksWidget from '../../components/dashboard/TasksWidget';
import SystemStatusWidget from '../../components/dashboard/SystemStatusWidget';
import AlertCenter from '../../components/dashboard/AlertCenter';
import { dashboardApi } from '../../services/api/dashboardApi';
import './AdminDashboard.css';

const { Header, Content } = Layout;
const { Title } = Typography;

/**
 * Trang Dashboard quản trị
 */
const AdminDashboard = () => {
  const [kpiData, setKpiData] = useState(null);
  const [shortcuts, setShortcuts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');
  const [user, setUser] = useState(null);

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);
  
  // Lấy dữ liệu KPI và shortcuts khi component được mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Lấy dữ liệu KPI
        const kpisResponse = await dashboardApi.getKpis();
        setKpiData(kpisResponse);
        
        // Lấy danh sách shortcuts
        const shortcutsResponse = await dashboardApi.getShortcuts();
        setShortcuts(shortcutsResponse);
        
        // Lấy tháng hiện tại
        const date = new Date();
        setCurrentMonth(`${date.getMonth() + 1}/${date.getFullYear()}`);
      } catch (error) {
        message.error('Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Xử lý khi chọn menu
  const handleMenuSelect = (menuKey) => {
    console.log('Menu selected:', menuKey);
    // Xử lý điều hướng hoặc hiển thị nội dung tương ứng
  };

  return (
    <Layout className="admin-dashboard">
      <Header className="dashboard-header">
        <MegaMenu onMenuSelect={handleMenuSelect} />
      </Header>
      
      <Content className="dashboard-content">
        <div className="dashboard-title">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2}>Dashboard</Title>
              <Typography.Text type="secondary">
                Dữ liệu cập nhật tháng {currentMonth}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text strong>
                Xin chào, {user?.name || 'Người dùng'}!
              </Typography.Text>
            </Col>
          </Row>
        </div>

        {loading ? (
          <div className="loading-container">
            <Spin size="large" tip="Đang tải dữ liệu..." />
          </div>
        ) : (
          <Tabs
            defaultActiveKey="overview"
            type="card"
            className="dashboard-tabs"
            items={[
              {
                key: 'overview',
                label: (
                  <span>
                    <DashboardOutlined />
                    Tổng quan
                  </span>
                ),
                children: (
                  <>
                    {/* KPI Section - 3 luồng chính */}
                    <section className="dashboard-section">
                      <KpiWidget data={kpiData} loading={loading} />
                    </section>

                    {/* Tiến độ & Cảnh báo */}
                    <section className="dashboard-section">
                      <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                          <Card 
                            title={
                              <div className="progress-board-title">
                                <BarChartOutlined style={{ marginRight: 8 }} />
                                <span>Tiến độ & Phân tích</span>
                              </div>
                            }
                            className="progress-board-widget"
                            loading={loading}
                          >
                            <Row gutter={[16, 16]}>
                              {/* F1 - Surveys Trend */}
                              <Col xs={24} md={8}>
                                <Card 
                                  title="Tỷ lệ phản hồi khảo sát" 
                                  size="small" 
                                  className="trend-card f1-trend"
                                >
                                  <div className="trend-value">
                                    <span className="trend-number">{kpiData?.surveys?.responseRate || 0}%</span>
                                    <Badge 
                                      count="+5.2%" 
                                      style={{ backgroundColor: '#52c41a' }} 
                                    />
                                  </div>
                                  <Progress 
                                    percent={kpiData?.surveys?.responseRate || 0} 
                                    strokeColor="#722ed1" 
                                    showInfo={false} 
                                  />
                                  <div className="trend-footer">
                                    <span>Mục tiêu: 80%</span>
                                    <span>6 tháng gần nhất</span>
                                  </div>
                                </Card>
                              </Col>
                              
                              {/* F2 - Budget vs Actual */}
                              <Col xs={24} md={8}>
                                <Card 
                                  title="Ngân sách vs Thực chi" 
                                  size="small" 
                                  className="trend-card f2-trend"
                                >
                                  <div className="trend-value">
                                    <span className="trend-number">
                                      {new Intl.NumberFormat('vi-VN', { 
                                        style: 'currency', 
                                        currency: 'VND',
                                        notation: 'compact',
                                        maximumFractionDigits: 1
                                      }).format(kpiData?.trainingPlans?.budget?.actual || 0)}
                                    </span>
                                    <Badge 
                                      count="-20.8%" 
                                      style={{ backgroundColor: '#52c41a' }} 
                                    />
                                  </div>
                                  <Progress 
                                    percent={kpiData?.trainingPlans?.budget?.actual / kpiData?.trainingPlans?.budget?.plan * 100 || 0} 
                                    strokeColor="#13c2c2" 
                                    showInfo={false} 
                                  />
                                  <div className="trend-footer">
                                    <span>Kế hoạch: {new Intl.NumberFormat('vi-VN', { 
                                      style: 'currency', 
                                      currency: 'VND',
                                      notation: 'compact',
                                      maximumFractionDigits: 1
                                    }).format(kpiData?.trainingPlans?.budget?.plan || 0)}</span>
                                    <span>Quý hiện tại</span>
                                  </div>
                                </Card>
                              </Col>
                              
                              {/* F3 - Score Distribution */}
                              <Col xs={24} md={8}>
                                <Card 
                                  title="Điểm đánh giá trung bình" 
                                  size="small" 
                                  className="trend-card f3-trend"
                                >
                                  <div className="trend-value">
                                    <span className="trend-number">{kpiData?.assessments?.avgScore || 0}</span>
                                    <Badge 
                                      count={`${kpiData?.assessments?.gap > 0 ? '+' : ''}${kpiData?.assessments?.gap || 0}`} 
                                      style={{ 
                                        backgroundColor: kpiData?.assessments?.gap >= 0 ? '#52c41a' : '#f5222d' 
                                      }} 
                                    />
                                  </div>
                                  <Progress 
                                    percent={(kpiData?.assessments?.avgScore / 10) * 100 || 0} 
                                    strokeColor="#fa8c16" 
                                    showInfo={false} 
                                  />
                                  <div className="trend-footer">
                                    <span>Tiêu chuẩn: 7.5</span>
                                    <span>Kỳ hiện tại</span>
                                  </div>
                                </Card>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                        
                        {/* Alert Center */}
                        <Col xs={24} lg={8}>
                          <AlertCenter loading={loading} />
                        </Col>
                      </Row>
                    </section>

                    {/* Shortcuts Section */}
                    <section className="dashboard-section">
                      <ShortcutWidget shortcuts={shortcuts} loading={loading} />
                    </section>
                  </>
                )
              },
              {
                key: 'calendar',
                label: (
                  <span>
                    <CalendarOutlined />
                    Lịch & Sự kiện
                  </span>
                ),
                children: (
                  <section className="dashboard-section">
                    <CalendarWidget loading={loading} />
                  </section>
                )
              },
              {
                key: 'activities',
                label: (
                  <span>
                    <BellOutlined />
                    Hoạt động
                  </span>
                ),
                children: (
                  <section className="dashboard-section">
                    <RecentActivities loading={loading} />
                  </section>
                )
              },
              {
                key: 'reports',
                label: (
                  <span>
                    <BarChartOutlined />
                    Báo cáo
                  </span>
                ),
                children: (
                  <section className="dashboard-section">
                    <QuickReports loading={loading} />
                  </section>
                )
              }
            ]}
          />
        )}
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
