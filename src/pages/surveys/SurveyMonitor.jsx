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
import { surveyResponses } from '../../mock/dashboardData';
import dayjs from '../../utils/dayjs';
import RealtimeBadge from '../../components/common/RealtimeBadge';
import './SurveyMonitor.css';

/**
 * Màn hình Báo cáo khảo sát real-time
 */
const SurveyMonitor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [activeTab, setActiveTab] = useState('responded');
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toISOString());
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
      // Sử dụng mock data từ file dashboardData.ts
      const surveyData = {
        id: id || 's1',
        title: 'Khảo sát nhu cầu đào tạo Q4/2025',
        status: 'running',
        responseRate: 0.75,
        dueDate: '2025-10-15',
        department: 'Toàn công ty',
        totalInvitations: 50,
        totalResponses: 35,
        responseRate: 70,
        startAt: '2025-10-01',
        dueAt: '2025-10-15'
      };
      
      // Phân loại responses theo trạng thái
      const responsesData = surveyResponses;
      
      // Tạo dữ liệu phân tích giả
      const analyticsData = {
        departmentStats: [
          { department: 'Nhân sự', invited: 10, responded: 8, rate: 80 },
          { department: 'Kỹ thuật', invited: 15, responded: 10, rate: 67 },
          { department: 'Tài chính', invited: 8, responded: 5, rate: 63 },
          { department: 'Kinh doanh', invited: 12, responded: 7, rate: 58 },
          { department: 'Marketing', invited: 5, responded: 5, rate: 100 }
        ],
        questionStats: []
      };
      
      setSurvey(surveyData);
      setResponses(responsesData);
      setAnalytics(analyticsData);
      setLastSyncTime(new Date().toISOString());
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

  // Columns cho người đã trả lời
  const respondedColumns = [
    {
      title: 'Người trả lời',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: '500' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.department}</div>
        </div>
      )
    },
    {
      title: 'Thời gian trả lời',
      dataIndex: 'respondedAt',
      key: 'respondedAt',
      render: (date) => date ? (
        <div>
          <div>{dayjs(date).format('DD/MM/YYYY')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {dayjs(date).format('HH:mm')}
          </div>
        </div>
      ) : '-'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
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
                  <p><strong>Người trả lời:</strong> {record.employeeName}</p>
                  <p><strong>Phòng ban:</strong> {record.department}</p>
                  <p><strong>Thời gian:</strong> {record.respondedAt ? dayjs(record.respondedAt).format('DD/MM/YYYY HH:mm') : '-'}</p>
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
  
  // Columns cho người chưa trả lời
  const pendingColumns = [
    {
      title: 'Người được mời',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: '500' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.department}</div>
        </div>
      )
    },
    {
      title: 'Lần nhắc gần nhất',
      dataIndex: 'lastRemindedAt',
      key: 'lastRemindedAt',
      render: (date) => date ? (
        <div>
          <div>{dayjs(date).format('DD/MM/YYYY')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {dayjs(date).format('HH:mm')}
          </div>
        </div>
      ) : 'Chưa nhắc'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Tag color="orange" icon={<ClockCircleOutlined />}>
          Chưa trả lời
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<SendOutlined />}
            onClick={() => {
              message.success(`Đã gửi nhắc nhở đến ${record.employeeName}`);
            }}
          >
            Nhắc nhở
          </Button>
        </Space>
      )
    }
  ];
  
  // Columns cho người từ chối
  const declinedColumns = [
    {
      title: 'Người từ chối',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: '500' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.department}</div>
        </div>
      )
    },
    {
      title: 'Thời gian từ chối',
      dataIndex: 'respondedAt',
      key: 'respondedAt',
      render: (date) => date ? (
        <div>
          <div>{dayjs(date).format('DD/MM/YYYY')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {dayjs(date).format('HH:mm')}
          </div>
        </div>
      ) : '-'
    },
    {
      title: 'Lý do từ chối',
      dataIndex: 'declineReason',
      key: 'declineReason',
      ellipsis: true,
      render: (reason) => (
        <Tooltip title={reason}>
          <span>{reason}</span>
        </Tooltip>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Tag color="red" icon={<ExclamationCircleOutlined />}>
          Đã từ chối
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
            setSelectedEmployee(record);
            setDeclineModalVisible(true);
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
            <Space>
              <p>Theo dõi tiến độ khảo sát real-time</p>
              <RealtimeBadge 
                lastSyncTime={lastSyncTime}
                isRealtime={true}
              />
            </Space>
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
      <Card 
        title="Chi tiết phản hồi" 
        className="responses-card"
        tabList={[
          { key: 'responded', tab: 'Đã trả lời' },
          { key: 'pending', tab: 'Chưa trả lời' },
          { key: 'declined', tab: 'Từ chối' },
        ]}
        activeTabKey={activeTab}
        onTabChange={key => setActiveTab(key)}
      >
        {activeTab === 'responded' && (
          <Table
            columns={respondedColumns}
            dataSource={responses.filter(r => r.status === 'responded')}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} phản hồi`
            }}
          />
        )}
        
        {activeTab === 'pending' && (
          <Table
            columns={pendingColumns}
            dataSource={responses.filter(r => r.status === 'pending')}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} người chưa trả lời`
            }}
          />
        )}
        
        {activeTab === 'declined' && (
          <Table
            columns={declinedColumns}
            dataSource={responses.filter(r => r.status === 'declined')}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} người từ chối`
            }}
          />
        )}
      </Card>
      
      {/* Modal xem chi tiết lý do từ chối */}
      <Modal
        title="Chi tiết từ chối khảo sát"
        visible={declineModalVisible}
        onCancel={() => setDeclineModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDeclineModalVisible(false)}>
            Đóng
          </Button>,
          <Button 
            key="approve" 
            type="primary"
            onClick={() => {
              message.success('Đã chấp nhận lý do từ chối');
              setDeclineModalVisible(false);
            }}
          >
            Chấp nhận lý do
          </Button>
        ]}
      >
        {selectedEmployee && (
          <div>
            <p><strong>Người từ chối:</strong> {selectedEmployee.employeeName}</p>
            <p><strong>Phòng ban:</strong> {selectedEmployee.department}</p>
            <p><strong>Thời gian từ chối:</strong> {dayjs(selectedEmployee.respondedAt).format('DD/MM/YYYY HH:mm')}</p>
            
            <div style={{ marginTop: '16px' }}>
              <p><strong>Lý do từ chối:</strong></p>
              <div style={{ 
                padding: '12px', 
                background: '#f5f5f5', 
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                {selectedEmployee.declineReason}
              </div>
            </div>
            
            {selectedEmployee.attachments && selectedEmployee.attachments.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <p><strong>Tệp đính kèm:</strong></p>
                <List
                  size="small"
                  dataSource={selectedEmployee.attachments}
                  renderItem={item => (
                    <List.Item>
                      <Button type="link" icon={<DownloadOutlined />}>
                        {item.name}
                      </Button>
                    </List.Item>
                  )}
                />
              </div>
            )}
          </div>
        )}
      </Modal>

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
