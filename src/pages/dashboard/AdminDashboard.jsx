import React, { useEffect, useState } from 'react';
import { Layout, Typography, Spin, message, Row, Col, Tabs } from 'antd';
import { DashboardOutlined, CalendarOutlined, BarChartOutlined, BellOutlined } from '@ant-design/icons';
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
                    {/* KPI Section */}
                    <section className="dashboard-section">
                      <KpiWidget data={kpiData} loading={loading} />
                    </section>

                    {/* Charts Section */}
                    <section className="dashboard-section">
                      <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                          <Row gutter={[16, 16]}>
                            <Col xs={24}>
                              <DepartmentChart loading={loading} />
                            </Col>
                            <Col xs={24}>
                              <PerformanceWidget loading={loading} />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={24} lg={8}>
                          <Row gutter={[16, 16]}>
                            <Col xs={24}>
                              <WeatherWidget loading={loading} />
                            </Col>
                            <Col xs={24}>
                              <TasksWidget loading={loading} />
                            </Col>
                            <Col xs={24}>
                              <SystemStatusWidget loading={loading} />
                            </Col>
                          </Row>
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
