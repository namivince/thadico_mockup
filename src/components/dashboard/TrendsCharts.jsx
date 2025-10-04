import React, { useState } from 'react';
import { Row, Col, Card, Radio, Typography, Tabs } from 'antd';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import './TrendsCharts.css';

const { Title } = Typography;
const { TabPane } = Tabs;

/**
 * Component hiển thị Trends Charts cho F1 và F2
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const TrendsCharts = ({ data, loading }) => {
  const [f1Range, setF1Range] = useState('6m');
  const [f2Range, setF2Range] = useState('6m');
  const [f3Range, setF3Range] = useState('6m');
  const [activeTab, setActiveTab] = useState('1');

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
  
  // Xử lý khi thay đổi range cho F3
  const handleF3RangeChange = (e) => {
    setF3Range(e.target.value);
    // Trong thực tế, sẽ gọi API để lấy dữ liệu mới
  };
  
  // Xử lý khi thay đổi tab
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  // Màu sắc cho biểu đồ tròn
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Card
      className="trends-charts-container"
      tabList={[
        { key: '1', tab: 'Biểu đồ xu hướng' },
        { key: '2', tab: 'Thống kê tham gia' },
        { key: '3', tab: 'Chi phí đào tạo' }
      ]}
      activeTabKey={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === '1' && (
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
                  data={data?.f1Trends || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} />
                  <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="responseRate" 
                    name="Tỷ lệ phản hồi" 
                    stroke="#7C4DFF" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    name="Hoàn thành" 
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
                  <Title level={5}>Ngân sách theo quý</Title>
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
                  data={data?.f2BudgetTrend || []}
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
          
          {/* F3 Score Trend - Area Chart */}
          <Col xs={24}>
            <Card 
              title={
                <div className="chart-card-header">
                  <Title level={5}>Điểm đánh giá trung bình</Title>
                  <Radio.Group value={f3Range} onChange={handleF3RangeChange} size="small">
                    <Radio.Button value="3m">3 tháng</Radio.Button>
                    <Radio.Button value="6m">6 tháng</Radio.Button>
                    <Radio.Button value="12m">12 tháng</Radio.Button>
                  </Radio.Group>
                </div>
              }
              className="chart-card f3-chart"
              loading={loading}
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={data?.f3ScoreTrend || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[6, 9]} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="avg" 
                    name="Điểm trung bình" 
                    stroke="#FF9800" 
                    fill="#FFD180" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stdev" 
                    name="Độ lệch chuẩn" 
                    stroke="#FF5722" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      )}
      
      {activeTab === '2' && (
        <Row gutter={[16, 16]}>
          {/* Biểu đồ tròn tỷ lệ tham gia của nhân sự */}
          <Col xs={24} md={12}>
            <Card 
              title={
                <div className="chart-card-header">
                  <Title level={5}>Tỷ lệ tham gia của nhân sự</Title>
                </div>
              }
              className="chart-card"
              loading={loading}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Đã tham gia', value: data?.staffStats?.participated || 0 },
                      { name: 'Chưa tham gia', value: data?.staffStats?.notParticipated || 0 },
                      { name: 'Từ chối', value: data?.staffStats?.declined || 0 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: 'Đã tham gia', value: data?.staffStats?.participated || 0 },
                      { name: 'Chưa tham gia', value: data?.staffStats?.notParticipated || 0 },
                      { name: 'Từ chối', value: data?.staffStats?.declined || 0 }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} người`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          
          {/* Biểu đồ tròn tỷ lệ tham gia của giảng viên */}
          <Col xs={24} md={12}>
            <Card 
              title={
                <div className="chart-card-header">
                  <Title level={5}>Tỷ lệ tham gia của giảng viên</Title>
                </div>
              }
              className="chart-card"
              loading={loading}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Đã tham gia', value: data?.teacherStats?.participated || 0 },
                      { name: 'Chưa tham gia', value: data?.teacherStats?.notParticipated || 0 },
                      { name: 'Bị thay thế', value: data?.teacherStats?.replaced || 0 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: 'Đã tham gia', value: data?.teacherStats?.participated || 0 },
                      { name: 'Chưa tham gia', value: data?.teacherStats?.notParticipated || 0 },
                      { name: 'Bị thay thế', value: data?.teacherStats?.replaced || 0 }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} người`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      )}
      
      {activeTab === '3' && (
        <Row gutter={[16, 16]}>
          {/* Biểu đồ chi phí kế hoạch vs phát sinh */}
          <Col xs={24}>
            <Card 
              title={
                <div className="chart-card-header">
                  <Title level={5}>Chi phí kế hoạch vs phát sinh</Title>
                </div>
              }
              className="chart-card"
              loading={loading}
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={[
                    { name: 'Tổng chi phí', plan: data?.courseStats?.totalBudget || 0, actual: data?.courseStats?.actualBudget || 0, extra: data?.courseStats?.extraBudget || 0 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                  <Legend />
                  <Bar dataKey="plan" name="Kế hoạch" stackId="a" fill="#10BDBD" />
                  <Bar dataKey="actual" name="Thực chi" stackId="a" fill="#64D6D6" />
                  <Bar dataKey="extra" name="Phát sinh" stackId="a" fill="#FF5722" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default TrendsCharts;
