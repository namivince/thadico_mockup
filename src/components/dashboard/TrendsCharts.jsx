import React, { useState } from 'react';
import { Row, Col, Card, Radio, Typography } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TrendsCharts.css';

const { Title } = Typography;

/**
 * Component hiển thị Trends Charts cho F1 và F2
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const TrendsCharts = ({ data, loading }) => {
  const [f1Range, setF1Range] = useState('6m');
  const [f2Range, setF2Range] = useState('6m');

  // Xử lý khi thay đổi range cho F1
  const handleF1RangeChange = (e) => {
    setF1Range(e.target.value);
    // Trong thực tế, sẽ gọi API để lấy dữ liệu mới
  };

  // Xử lý khi thay đổi range cho F2
  const handleF2RangeChange = (e) => {
    setF2Range(e.target.value);
    // Trong thực tế, sẽ gọi API để lấy dữ liệu mới
  };

  return (
    <Row gutter={[16, 16]}>
      {/* F1 Trend - Line Chart */}
      <Col xs={24} md={12}>
        <Card 
          title={
            <div className="chart-card-header">
              <Title level={5}>Tỷ lệ phản hồi khảo sát</Title>
              <Radio.Group value={f1Range} onChange={handleF1RangeChange} size="small">
                <Radio.Button value="3m">3 tháng</Radio.Button>
                <Radio.Button value="6m">6 tháng</Radio.Button>
                <Radio.Button value="12m">12 tháng</Radio.Button>
              </Radio.Group>
            </div>
          }
          className="chart-card f1-chart"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data?.F1_trend_6m || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="responseRate" 
                name="Tỷ lệ phản hồi (%)" 
                stroke="#7C4DFF" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                name="Hoàn thành (%)" 
                stroke="#B39DDB" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      {/* F2 Budget vs Actual - Bar Chart */}
      <Col xs={24} md={12}>
        <Card 
          title={
            <div className="chart-card-header">
              <Title level={5}>Ngân sách vs Thực chi</Title>
              <Radio.Group value={f2Range} onChange={handleF2RangeChange} size="small">
                <Radio.Button value="3m">3 tháng</Radio.Button>
                <Radio.Button value="6m">6 tháng</Radio.Button>
                <Radio.Button value="12m">12 tháng</Radio.Button>
              </Radio.Group>
            </div>
          }
          className="chart-card f2-chart"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data?.F2_budget_6m || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="plan" name="Kế hoạch" fill="#10BDBD" />
              <Bar dataKey="actual" name="Thực chi" fill="#64D6D6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default TrendsCharts;
