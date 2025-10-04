import React, { useEffect, useState } from 'react';
import { Typography, Spin, message, Row, Col, Tabs, Card, Alert, Button } from 'antd';
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  BarChartOutlined, 
  HomeOutlined
} from '@ant-design/icons';

// Import các component mới
import HeroKPIs from '../../components/dashboard/HeroKPIs';
import ProgressBoard from '../../components/dashboard/ProgressBoard';
import UnifiedAlerts from '../../components/dashboard/UnifiedAlerts';
import TrendsCharts from '../../components/dashboard/TrendsCharts';
import RadarCharts from '../../components/dashboard/RadarCharts';
import QuickShortcuts from '../../components/dashboard/QuickShortcuts';

// Import mock data
import { 
  heroKpis, 
  progressBoard, 
  alerts, 
  trends, 
  competencyRadar, 
  roleRadar, 
  shortcuts,
  roles,
  organizations
} from '../../mock/dashboardData';

import './AdminDashboard.css';

const { Title } = Typography;

/**
 * Trang Dashboard quản trị
 */
const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');
  const [user, setUser] = useState(null);
  
  // Mock data cho dashboard
  const [dashboardData, setDashboardData] = useState({
    kpis: heroKpis,
    progress: progressBoard,
    alertsData: alerts,
    trendsData: {
      ...trends,
      staffStats: {
        participated: 120,
        notParticipated: 15,
        declined: 5
      },
      teacherStats: {
        participated: 18,
        notParticipated: 2,
        replaced: 3
      },
      courseStats: {
        totalBudget: 1200000000,
        actualBudget: 950000000,
        extraBudget: 50000000
      },
      subjectStats: {
        completed: 32,
        pending: 8
      }
    },
    competencyRadarData: competencyRadar,
    roleRadarData: roleRadar,
    shortcutsData: shortcuts
  });

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);
  
  // Giả lập việc tải dữ liệu
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Giả lập delay để tạo trải nghiệm loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Lấy tháng hiện tại
        const date = new Date();
        setCurrentMonth(`${date.getMonth() + 1}/${date.getFullYear()}`);
        
        // Dữ liệu đã được import từ mock data
        message.success('Dữ liệu dashboard đã được tải thành công');
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
    <div className="admin-dashboard-content">
          <div className="welcome-banner">
            <div className="welcome-message">
              <h2>Chào mừng trở lại <span role="img" aria-label="wave">👋</span></h2>
              <h1>{user?.name || 'Trần Đắc Thiên Thạch'}</h1>
              <p>Chúc bạn có một ngày làm việc hiệu quả, phát triển năng lượng!</p>
            </div>
          </div>
          
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
            <div className="dashboard-content-inner">
              {/* Tiêu đề trang */}
              <div className="dashboard-title-section">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={2}>Super Admin Overview</Title>
                    <Typography.Text type="secondary">
                      Dữ liệu cập nhật tháng {currentMonth}
                    </Typography.Text>
                  </Col>
                  <Col>
                    {/* <Button 
                      type="primary" 
                      icon={<HomeOutlined />}
                      onClick={() => window.location.href = '/demo'}
                    >
                      Về trang demo
                    </Button> */}
                  </Col>
                </Row>
              </div>
              
              {/* Hàng 1: Hero KPIs */}
              <section className="dashboard-section">
                <HeroKPIs data={dashboardData.kpis} loading={loading} />
              </section>

              {/* Hàng 2: Tiến độ & Cảnh báo */}
              <section className="dashboard-section">
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <ProgressBoard data={dashboardData.progress} loading={loading} />
                  </Col>
                  <Col xs={24} lg={8}>
                    <UnifiedAlerts data={dashboardData.alertsData} loading={loading} />
                  </Col>
                </Row>
              </section>

              {/* Hàng 3: Trends & Radar Charts */}
              <section className="dashboard-section">
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={24}>
                    <TrendsCharts data={dashboardData.trendsData} loading={loading} />
                  </Col>
                </Row>
              </section>
              
              <section className="dashboard-section">
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={24}>
                    <RadarCharts 
                      data={{
                        F3_radar_competency: dashboardData.competencyRadarData.F3_radar_competency,
                        F3_radar_role: dashboardData.roleRadarData.F3_radar_role
                      }} 
                      roles={roles}
                      organizations={organizations}
                      loading={loading} 
                    />
                  </Col>
                </Row>
              </section>

              {/* Hàng 4: Quick Shortcuts */}
              <section className="dashboard-section">
                <QuickShortcuts data={dashboardData.shortcutsData} loading={loading} />
              </section>
            </div>
          )}
    </div>
  );
};

export default AdminDashboard;
