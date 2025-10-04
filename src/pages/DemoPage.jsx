import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Typography, Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

/**
 * Trang demo để điều hướng giữa các màn hình
 */
const DemoPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsLoggedIn(user && user.role === 'ADMIN');
  }, []);

  // Hàm đăng nhập tự động với quyền admin
  const handleAutoLogin = () => {
    const adminUser = {
      id: 'admin-123',
      name: 'Admin User',
      email: 'admin@thadico.com',
      role: 'ADMIN',
      permissions: ['all']
    };
    localStorage.setItem('user', JSON.stringify(adminUser));
    setIsLoggedIn(true);
    message.success('Đăng nhập thành công với quyền Admin');
  };

  // Các luồng demo
  const demoFlows = [
    {
      title: 'Luồng 1: Tạo & Thiết lập chiến dịch',
      description: 'Demo luồng tạo chiến dịch đánh giá tay nghề, thiết lập SLA chấm và cửa sổ phúc khảo',
      steps: [
        { label: 'Tạo chiến dịch mới', path: '/assessment/campaigns/new' }
      ]
    },
    {
      title: 'Luồng 2: Học viên làm bài',
      description: 'Demo luồng học viên làm bài thi (trắc nghiệm + tự luận)',
      steps: [
        { label: 'Mở bài thi mẫu', path: '/test/demo-token-123' }
      ]
    },
    {
      title: 'Luồng 3: Giảng viên chấm bài',
      description: 'Demo luồng chấm bài với SLA đếm ngược và cảnh báo quá hạn',
      steps: [
        { label: 'Mở Kết quả đánh giá', path: '/assessment/grading?campaignId=cmp_01' }
      ]
    },
    {
      title: 'Luồng 4: Xử lý phúc khảo',
      description: 'Demo luồng tiếp nhận và xử lý phúc khảo',
      steps: [
        { label: 'Danh sách phúc khảo', path: '/assessment/appeals?campaignId=cmp_01' }
      ]
    },
    {
      title: 'Luồng 5: Dashboard tổng quan',
      description: 'Dashboard tổng quan với các KPI của 3 luồng chính',
      steps: [
        { label: 'Mở Dashboard', path: '/dashboard' }
      ]
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        Demo Thadico - Đánh giá tay nghề
      </Title>
      
      <Text style={{ display: 'block', textAlign: 'center', marginBottom: '32px' }}>
        Chọn một trong các luồng demo bên dưới để bắt đầu. Mỗi luồng sẽ demo một phần của quy trình đánh giá tay nghề.
      </Text>
      
      <Row gutter={[24, 24]}>
        {demoFlows.map((flow, index) => (
          <Col xs={24} md={12} key={index}>
            <Card 
              title={flow.title}
              hoverable
              style={{ height: '100%' }}
            >
              <Text style={{ display: 'block', marginBottom: '16px' }}>
                {flow.description}
              </Text>
              
              <Divider />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {flow.steps.map((step, stepIndex) => (
                  <Button 
                    key={stepIndex}
                    type="primary"
                    onClick={() => navigate(step.path)}
                    style={{ width: '100%' }}
                  >
                    {step.label}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Divider />
      
      <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '20px' }}>
        <Text type="secondary">
          Demo được tạo dựa trên các file spec: SCR_ASM_CAMPAIGN_FORM, SCR_TEST_RUNNER, SCR_GRADING_CONSOLE, SCR_ASM_APPEAL_LIST, SCR_APPEAL_DETAIL_MODAL
        </Text>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        {!isLoggedIn ? (
          <Button 
            type="primary" 
            onClick={handleAutoLogin}
            style={{ marginTop: '16px' }}
          >
            Đăng nhập tự động với quyền Admin
          </Button>
        ) : (
          <Button 
            type="primary" 
            onClick={() => navigate('/dashboard')}
            style={{ marginTop: '16px' }}
          >
            Vào trang Dashboard Admin
          </Button>
        )}
      </div>
    </div>
  );
};

export default DemoPage;
