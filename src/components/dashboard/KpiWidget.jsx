import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { TeamOutlined, UserAddOutlined, UserDeleteOutlined, SwapOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

/**
 * Component hiển thị widget KPI nhân sự
 */
const KpiWidget = ({ data, loading }) => {
  const navigate = useNavigate();

  // Xử lý khi click vào KPI để điều hướng
  const handleKpiClick = (path) => {
    navigate(path);
  };

  return (
    <div className="kpi-widgets">
      <Row gutter={[16, 16]}>
        {/* Widget Tổng hợp nhân sự */}
        <Col xs={24} sm={12} lg={8}>
          <Card 
            title="Tổng hợp nhân sự" 
            className="kpi-card"
            loading={loading}
            onClick={() => handleKpiClick('/people/list')}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic 
                  title="Tổng số" 
                  value={data?.totalEmployees || 0} 
                  prefix={<TeamOutlined />} 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="Chính thức" 
                  value={data?.officialEmployees || 0} 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="Thử việc" 
                  value={data?.probationEmployees || 0} 
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Widget Biến động tháng */}
        <Col xs={24} sm={12} lg={8}>
          <Card 
            title="Biến động tháng" 
            className="kpi-card"
            loading={loading}
            onClick={() => handleKpiClick('/people/movement')}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic 
                  title="Nhân sự mới" 
                  value={data?.newEmployees || 0} 
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<UserAddOutlined />} 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="Nghỉ việc" 
                  value={data?.resignedEmployees || 0} 
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<UserDeleteOutlined />} 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="Thay đổi ròng" 
                  value={data?.netChange || 0} 
                  valueStyle={{ color: data?.netChange >= 0 ? '#3f8600' : '#cf1322' }}
                  prefix={<SwapOutlined />} 
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KpiWidget;
