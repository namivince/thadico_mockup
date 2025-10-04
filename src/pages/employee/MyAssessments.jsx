import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Space, Typography, Tabs, Badge, Progress, Row, Col, Statistic, Modal } from 'antd';
import { 
  TrophyOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  FormOutlined,
  FileExcelOutlined,
  RadarChartOutlined,
  RiseOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './MyAssessments.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * Trang đánh giá của tôi cho nhân viên
 */
const MyAssessments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  
  // Mock data cho đánh giá
  const myAssessments = [
    { 
      id: 'a1', 
      title: 'Đánh giá năng lực Q3/2025', 
      status: 'pending', 
      dueDate: '2025-10-15',
      progress: 0,
      type: 'self',
      description: 'Đánh giá năng lực bản thân theo các tiêu chí đã đề ra'
    },
    { 
      id: 'a2', 
      title: 'Đánh giá năng lực Q2/2025', 
      status: 'completed', 
      completedDate: '2025-07-10',
      progress: 100,
      type: 'self',
      description: 'Đánh giá năng lực bản thân theo các tiêu chí đã đề ra',
      result: {
        overall: 8.2,
        strengths: ['Giao tiếp', 'Làm việc nhóm', 'Quản lý thời gian'],
        improvements: ['Ra quyết định', 'Giải quyết vấn đề phức tạp'],
        competencies: [
          { subject: 'Giao tiếp', score: 8.5, avg: 7.8 },
          { subject: 'Làm việc nhóm', score: 8.7, avg: 7.9 },
          { subject: 'Quản lý thời gian', score: 8.3, avg: 7.5 },
          { subject: 'Ra quyết định', score: 7.2, avg: 7.6 },
          { subject: 'Giải quyết vấn đề', score: 7.5, avg: 7.7 }
        ]
      }
    },
    { 
      id: 'a3', 
      title: 'Đánh giá năng lực Q1/2025', 
      status: 'completed', 
      completedDate: '2025-04-05',
      progress: 100,
      type: 'self',
      description: 'Đánh giá năng lực bản thân theo các tiêu chí đã đề ra',
      result: {
        overall: 7.8,
        strengths: ['Giao tiếp', 'Làm việc nhóm'],
        improvements: ['Ra quyết định', 'Quản lý thời gian', 'Giải quyết vấn đề phức tạp'],
        competencies: [
          { subject: 'Giao tiếp', score: 8.2, avg: 7.6 },
          { subject: 'Làm việc nhóm', score: 8.4, avg: 7.7 },
          { subject: 'Quản lý thời gian', score: 7.1, avg: 7.4 },
          { subject: 'Ra quyết định', score: 7.0, avg: 7.5 },
          { subject: 'Giải quyết vấn đề', score: 7.2, avg: 7.6 }
        ]
      }
    },
    { 
      id: 'a4', 
      title: 'Đánh giá năng lực Q4/2024', 
      status: 'completed', 
      completedDate: '2025-01-10',
      progress: 100,
      type: 'self',
      description: 'Đánh giá năng lực bản thân theo các tiêu chí đã đề ra',
      result: {
        overall: 7.5,
        strengths: ['Giao tiếp'],
        improvements: ['Ra quyết định', 'Quản lý thời gian', 'Làm việc nhóm', 'Giải quyết vấn đề phức tạp'],
        competencies: [
          { subject: 'Giao tiếp', score: 8.0, avg: 7.5 },
          { subject: 'Làm việc nhóm', score: 7.2, avg: 7.6 },
          { subject: 'Quản lý thời gian', score: 7.0, avg: 7.3 },
          { subject: 'Ra quyết định', score: 6.8, avg: 7.4 },
          { subject: 'Giải quyết vấn đề', score: 7.0, avg: 7.5 }
        ]
      }
    }
  ];
  
  // Load data
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setLoading(true);
      // Trong thực tế, sẽ gọi API để lấy dữ liệu
      // Giả lập delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };
  
  // Xử lý khi thay đổi tab
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  // Xử lý khi click vào nút làm đánh giá
  const handleTakeAssessment = (assessment) => {
    // Trong thực tế, sẽ điều hướng đến trang làm đánh giá
    console.log('Taking assessment:', assessment);
  };
  
  // Xử lý khi click vào nút xem kết quả
  const handleViewResults = (assessment) => {
    setSelectedAssessment(assessment);
    setResultModalVisible(true);
  };
  
  // Lọc dữ liệu theo tab
  const getFilteredData = () => {
    if (!myAssessments) return [];
    
    return myAssessments.filter(item => {
      if (activeTab === 'pending') {
        return item.status === 'pending';
      } else if (activeTab === 'completed') {
        return item.status === 'completed';
      }
      return true;
    });
  };
  
  // Cột cho bảng
  const columns = [
    {
      title: 'Tên đánh giá',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        if (type === 'self') {
          return <Tag color="blue">Tự đánh giá</Tag>;
        } else if (type === 'peer') {
          return <Tag color="green">Đánh giá đồng nghiệp</Tag>;
        } else if (type === 'manager') {
          return <Tag color="purple">Đánh giá từ quản lý</Tag>;
        }
        return <Tag>{type}</Tag>;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        if (status === 'completed') {
          return (
            <Space direction="vertical" size="small">
              <Tag icon={<CheckCircleOutlined />} color="success">Đã hoàn thành</Tag>
              <Text type="secondary">Ngày: {record.completedDate}</Text>
            </Space>
          );
        } else if (status === 'pending') {
          return (
            <Space direction="vertical" size="small">
              <Tag icon={<ClockCircleOutlined />} color="processing">Chưa hoàn thành</Tag>
              <Text type="secondary">Hạn: {record.dueDate}</Text>
            </Space>
          );
        }
        return <Tag>{status}</Tag>;
      }
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => (
        <Progress percent={progress} size="small" />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => {
        if (record.status === 'pending') {
          return (
            <Button 
              type="primary" 
              icon={<FormOutlined />}
              onClick={() => handleTakeAssessment(record)}
            >
              Làm đánh giá
            </Button>
          );
        } else if (record.status === 'completed') {
          return (
            <Button 
              icon={<TrophyOutlined />}
              onClick={() => handleViewResults(record)}
            >
              Xem kết quả
            </Button>
          );
        }
        return null;
      }
    }
  ];
  
  return (
    <div className="my-assessments-container">
      <div className="page-header">
        <div>
          <Title level={2}>Đánh giá của tôi</Title>
          <Text type="secondary">Danh sách đánh giá năng lực cần thực hiện và đã hoàn thành</Text>
        </div>
        <Button 
          type="primary" 
          icon={<FileExcelOutlined />}
        >
          Xuất báo cáo
        </Button>
      </div>
      
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane 
          tab={
            <Badge count={myAssessments?.filter(item => item.status === 'pending').length || 0}>
              Chưa hoàn thành
            </Badge>
          } 
          key="pending" 
        >
          <Card>
            <Table 
              columns={columns} 
              dataSource={getFilteredData()} 
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        <TabPane 
          tab={
            <Badge count={myAssessments?.filter(item => item.status === 'completed').length || 0}>
              Đã hoàn thành
            </Badge>
          } 
          key="completed" 
        >
          <Card>
            <Table 
              columns={columns} 
              dataSource={getFilteredData()} 
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="Xu hướng" key="trends">
          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card title="Điểm trung bình">
                  <div className="trend-chart">
                    {myAssessments
                      .filter(item => item.status === 'completed')
                      .sort((a, b) => new Date(a.completedDate) - new Date(b.completedDate))
                      .map(item => (
                        <div key={item.id} className="trend-item">
                          <div className="trend-label">{item.title.replace('Đánh giá năng lực ', '')}</div>
                          <div className="trend-value">{item.result.overall}</div>
                        </div>
                      ))}
                    <div className="trend-line"></div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={16}>
                <Card title="Năng lực theo thời gian">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={myAssessments[1]?.result?.competencies || []}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis domain={[0, 10]} />
                      <Radar name="Điểm số" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="Trung bình" dataKey="avg" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
      
      {/* Modal kết quả đánh giá */}
      <Modal
        title={
          <Space>
            <TrophyOutlined style={{ color: '#faad14' }} />
            <span>Kết quả đánh giá</span>
          </Space>
        }
        open={resultModalVisible}
        onCancel={() => setResultModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setResultModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={800}
      >
        {selectedAssessment && selectedAssessment.result && (
          <div className="assessment-result">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic
                    title="Điểm trung bình"
                    value={selectedAssessment.result.overall}
                    precision={1}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<StarOutlined />}
                    suffix="/10"
                  />
                </Card>
              </Col>
              <Col xs={24} md={16}>
                <Card title="Điểm mạnh">
                  <ul className="strength-list">
                    {selectedAssessment.result.strengths.map((item, index) => (
                      <li key={index}>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} /> {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
              <Col xs={24}>
                <Card title="Cần cải thiện">
                  <ul className="improvement-list">
                    {selectedAssessment.result.improvements.map((item, index) => (
                      <li key={index}>
                        <RiseOutlined style={{ color: '#faad14' }} /> {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
              <Col xs={24}>
                <Card title="Biểu đồ năng lực">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={selectedAssessment.result.competencies}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis domain={[0, 10]} />
                      <Radar name="Điểm số" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="Trung bình" dataKey="avg" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyAssessments;
