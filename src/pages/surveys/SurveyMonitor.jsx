import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  Table, 
  Button, 
  Tag, 
  Space,
  Dropdown,
  Menu,
  Modal,
  message,
  Tooltip,
  Timeline,
  List,
  Avatar
} from 'antd';
import { 
  ArrowLeftOutlined,
  DownloadOutlined,
  ReloadOutlined,
  SendOutlined,
  EyeOutlined,
  BarChartOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { surveys, surveyResponses, surveyAnalytics } from '../../data/mockData';
import dayjs from '../../utils/dayjs';
import './SurveyMonitor.css';

/**
 * Màn hình theo dõi khảo sát real-time
 */
const SurveyMonitor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(null);

  // Load data
  useEffect(() => {
    loadSurveyData();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(loadSurveyData, 30000);
    setRefreshInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id]);

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls
      const surveyData = surveys.find(s => s.id === parseInt(id));
      const responsesData = surveyResponses.filter(r => r.surveyId === parseInt(id));
      const analyticsData = surveyAnalytics[id];
      
      setSurvey(surveyData);
      setResponses(responsesData);
      setAnalytics(analyticsData);
    } catch (error) {
      message.error('Không thể tải dữ liệu khảo sát');
    } finally {
      setLoading(false);
    }
  };

  // Handle actions
  const handleRefresh = () => {
    loadSurveyData();
    message.success('Dữ liệu đã được cập nhật');
  };

  const handleSendReminder = () => {
    Modal.confirm({
      title: 'Gửi nhắc nhở',
      content: 'Bạn có chắc chắn muốn gửi email nhắc nhở đến những người chưa trả lời?',
      onOk: () => {
        message.success('Đã gửi email nhắc nhở thành công');
      }
    });
  };

  const handleExport = (format) => {
    message.success(`Đang xuất dữ liệu định dạng ${format.toUpperCase()}...`);
    // Simulate export
  };

  const handleCloseSurvey = () => {
    Modal.confirm({
      title: 'Đóng khảo sát',
      content: 'Bạn có chắc chắn muốn đóng khảo sát này? Sau khi đóng sẽ không thể nhận thêm phản hồi.',
      okType: 'danger',
      onOk: () => {
        message.success('Khảo sát đã được đóng');
        navigate('/surveys');
      }
    });
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  // Export menu
  const exportMenu = (
    <Menu onClick={({ key }) => handleExport(key)}>
      <Menu.Item key="csv">CSV</Menu.Item>
      <Menu.Item key="xlsx">Excel</Menu.Item>
      <Menu.Item key="pdf">PDF Report</Menu.Item>
    </Menu>
  );

  // Response status columns
  const responseColumns = [
    {
      title: 'Người trả lời',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: '500' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.department}</div>
        </div>
      )
    },
    {
      title: 'Thời gian trả lời',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (date) => (
        <div>
          <div>{dayjs(date).format('DD/MM/YYYY')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {dayjs(date).format('HH:mm')}
          </div>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: () => (
        <Tag color="green" icon={<CheckCircleOutlined />}>
          Đã hoàn thành
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EyeOutlined />}
          onClick={() => {
            Modal.info({
              title: 'Chi tiết phản hồi',
              content: (
                <div>
                  <p><strong>Người trả lời:</strong> {record.userName}</p>
                  <p><strong>Phòng ban:</strong> {record.department}</p>
                  <p><strong>Thời gian:</strong> {dayjs(record.submittedAt).format('DD/MM/YYYY HH:mm')}</p>
                  <div>
                    <strong>Câu trả lời:</strong>
                    <ul>
                      {record.answers.map((answer, index) => (
                        <li key={index}>
                          Câu {answer.questionId}: {answer.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
              width: 600
            });
          }}
        >
          Xem chi tiết
        </Button>
      )
    }
  ];

  // Department progress data
  const departmentProgress = analytics?.departmentStats || [];

  return (
    <div className="survey-monitor-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/surveys')}
            style={{ marginRight: '12px' }}
          />
          <div>
            <h2>{survey.name}</h2>
            <p>Theo dõi tiến độ khảo sát real-time</p>
          </div>
        </div>
        
        <Space>
          <Button 
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          >
            Làm mới
          </Button>
          
          <Button 
            icon={<SendOutlined />}
            onClick={handleSendReminder}
          >
            Gửi nhắc nhở
          </Button>
          
          <Dropdown overlay={exportMenu}>
            <Button icon={<DownloadOutlined />}>
              Xuất dữ liệu
            </Button>
          </Dropdown>
          
          {survey.status === 'running' && (
            <Button 
              danger
              onClick={handleCloseSurvey}
            >
              Đóng khảo sát
            </Button>
          )}
        </Space>
      </div>

      {/* Overview Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Tổng lời mời"
              value={survey.totalInvitations}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Đã trả lời"
              value={survey.totalResponses}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Tỷ lệ phản hồi"
              value={survey.responseRate}
              suffix="%"
              prefix={<BarChartOutlined />}
              valueStyle={{ 
                color: survey.responseRate >= 70 ? '#52c41a' : 
                       survey.responseRate >= 50 ? '#faad14' : '#f5222d' 
              }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Thời gian còn lại"
              value={dayjs(survey.dueAt).diff(dayjs(), 'day')}
              suffix="ngày"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Progress by Department */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="Tiến độ theo phòng ban" className="progress-card">
            <div className="department-progress">
              {departmentProgress.map((dept, index) => (
                <div key={index} className="dept-item">
                  <div className="dept-header">
                    <span className="dept-name">{dept.department}</span>
                    <span className="dept-stats">
                      {dept.responded}/{dept.invited} ({dept.rate}%)
                    </span>
                  </div>
                  <Progress 
                    percent={dept.rate} 
                    strokeColor={
                      dept.rate >= 70 ? '#52c41a' : 
                      dept.rate >= 50 ? '#faad14' : '#f5222d'
                    }
                    strokeWidth={8}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="Hoạt động gần đây" className="activity-card">
            <Timeline size="small">
              <Timeline.Item 
                dot={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                color="green"
              >
                <div>
                  <div>Trần Thị B đã trả lời</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    2 phút trước
                  </div>
                </div>
              </Timeline.Item>
              
              <Timeline.Item 
                dot={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                color="green"
              >
                <div>
                  <div>Nguyễn Văn A đã trả lời</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    15 phút trước
                  </div>
                </div>
              </Timeline.Item>
              
              <Timeline.Item 
                dot={<SendOutlined style={{ color: '#1890ff' }} />}
                color="blue"
              >
                <div>
                  <div>Gửi email nhắc nhở</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    1 giờ trước
                  </div>
                </div>
              </Timeline.Item>
              
              <Timeline.Item 
                dot={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
                color="orange"
              >
                <div>
                  <div>Khảo sát được phát hành</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {dayjs(survey.startAt).fromNow()}
                  </div>
                </div>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Response Details */}
      <Card title="Chi tiết phản hồi" className="responses-card">
        <Table
          columns={responseColumns}
          dataSource={responses}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} phản hồi`
          }}
        />
      </Card>

      {/* Question Analytics */}
      {analytics?.questionStats && (
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          {analytics.questionStats.map((question, index) => (
            <Col key={question.questionId} xs={24} lg={12}>
              <Card 
                title={`Câu hỏi ${question.questionId}`}
                className="question-analytics-card"
              >
                {question.type === 'multiple_choice' && (
                  <div className="choice-analytics">
                    {question.responses.map((response, i) => (
                      <div key={i} className="choice-item">
                        <div className="choice-header">
                          <span>{response.option}</span>
                          <span>{response.count} ({response.percentage}%)</span>
                        </div>
                        <Progress 
                          percent={response.percentage} 
                          strokeColor="#667eea"
                          strokeWidth={6}
                          showInfo={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === 'rating' && (
                  <div className="rating-analytics">
                    <div className="average-rating">
                      <Statistic
                        title="Điểm trung bình"
                        value={question.averageRating}
                        precision={1}
                        suffix="/ 5"
                        valueStyle={{ color: '#667eea' }}
                      />
                    </div>
                    <div className="rating-distribution">
                      {question.distribution.map((dist, i) => (
                        <div key={i} className="rating-item">
                          <span>{dist.rating} sao</span>
                          <Progress 
                            percent={(dist.count / survey.totalResponses) * 100} 
                            strokeColor="#faad14"
                            strokeWidth={4}
                            format={() => dist.count}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default SurveyMonitor;
