import React, { useState, useEffect } from 'react';
import { 
  Layout, Table, Tag, Badge, Button, Drawer, Tabs, 
  Form, Input, Radio, Select, Statistic, Card, 
  Typography, Space, Row, Col, Divider, Alert, Progress
} from 'antd';
import { 
  ClockCircleOutlined, CheckCircleOutlined, 
  CloseCircleOutlined, WarningOutlined, 
  SaveOutlined, CheckOutlined, FilterOutlined,
  SyncOutlined, FileOutlined, HomeOutlined
} from '@ant-design/icons';
import moment from 'moment';
import CountdownTimer from '../common/CountdownTimer';
import './GradingConsole.css';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Countdown } = Statistic;

/**
 * Component Kết quả đánh giá (Grading Console)
 * Theo spec: SCR_GRADING_CONSOLE
 */
const GradingConsole = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [gradingForm] = Form.useForm();
  const [filterStatus, setFilterStatus] = useState('all');
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Mock API call để lấy dữ liệu
  const fetchData = async () => {
    setLoading(true);
    
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock campaign info
    setCampaignInfo({
      id: 'cmp_01',
      name: 'Đánh giá tay nghề Q4/2025',
      gradeDueAt: moment().add(2, 'days').valueOf(),
      totalAssignments: 50,
      gradedAssignments: 28,
      overdueAssignments: 5
    });
    
    // Mock assignments data với SLA deadline - NHIỀU DATA HƠN
    const mockData = [
      {
        id: 'as_01',
        empId: 'u_1001',
        empName: 'Nguyễn Văn A',
        unit: 'Xưởng A',
        status: 'pending',
        slaLeftMin: 720,
        sla_deadline: moment().add(30, 'hours').toISOString(),
        can_extend: true,
        score: null,
        comment: null
      },
      {
        id: 'as_02',
        empId: 'u_1002',
        empName: 'Trần Thị B',
        unit: 'Xưởng B',
        status: 'overdue',
        slaLeftMin: -120,
        sla_deadline: moment().subtract(2, 'hours').toISOString(),
        can_extend: true,
        score: null,
        comment: null
      },
      {
        id: 'as_03',
        empId: 'u_1003',
        empName: 'Lê Văn C',
        unit: 'Xưởng A',
        status: 'in_progress',
        slaLeftMin: 360,
        sla_deadline: moment().add(4, 'hours').toISOString(),
        can_extend: true,
        score: 7.5,
        comment: 'Cần cải thiện phần thao tác máy'
      },
      {
        id: 'as_04',
        empId: 'u_1004',
        empName: 'Phạm Thị D',
        unit: 'Xưởng C',
        status: 'completed',
        slaLeftMin: 480,
        sla_deadline: moment().add(20, 'hours').toISOString(),
        can_extend: false,
        score: 8.5,
        comment: 'Thực hiện tốt các quy trình an toàn'
      },
      {
        id: 'as_05',
        empId: 'u_1005',
        empName: 'Hoàng Văn E',
        unit: 'Xưởng A',
        status: 'overdue',
        slaLeftMin: -360,
        sla_deadline: moment().subtract(6, 'hours').toISOString(),
        can_extend: true,
        score: null,
        comment: null
      },
      {
        id: 'as_06',
        empId: 'u_1006',
        empName: 'Võ Thị F',
        unit: 'Xưởng B',
        status: 'overdue',
        slaLeftMin: -180,
        sla_deadline: moment().subtract(3, 'hours').toISOString(),
        can_extend: true,
        score: null,
        comment: null
      },
      {
        id: 'as_07',
        empId: 'u_1007',
        empName: 'Đặng Văn G',
        unit: 'Xưởng C',
        status: 'pending',
        slaLeftMin: 180,
        sla_deadline: moment().add(3, 'hours').toISOString(),
        can_extend: true,
        score: null,
        comment: null
      },
      {
        id: 'as_08',
        empId: 'u_1008',
        empName: 'Bùi Thị H',
        unit: 'Xưởng A',
        status: 'in_progress',
        slaLeftMin: 240,
        sla_deadline: moment().add(4, 'hours').toISOString(),
        can_extend: true,
        score: 6.5,
        comment: 'Đang xem xét'
      },
      {
        id: 'as_09',
        empId: 'u_1009',
        empName: 'Lý Văn I',
        unit: 'Xưởng B',
        status: 'completed',
        slaLeftMin: 600,
        sla_deadline: moment().add(10, 'hours').toISOString(),
        can_extend: false,
        score: 9.0,
        comment: 'Xuất sắc, thực hiện đúng quy trình'
      },
      {
        id: 'as_10',
        empId: 'u_1010',
        empName: 'Mai Thị K',
        unit: 'Xưởng C',
        status: 'completed',
        slaLeftMin: 540,
        sla_deadline: moment().add(9, 'hours').toISOString(),
        can_extend: false,
        score: 7.8,
        comment: 'Tốt, cần duy trì'
      },
      {
        id: 'as_11',
        empId: 'u_1011',
        empName: 'Phan Văn L',
        unit: 'Xưởng A',
        status: 'overdue',
        slaLeftMin: -60,
        sla_deadline: moment().subtract(1, 'hours').toISOString(),
        can_extend: true,
        score: null,
        comment: null
      },
      {
        id: 'as_12',
        empId: 'u_1012',
        empName: 'Trương Thị M',
        unit: 'Xưởng B',
        status: 'pending',
        slaLeftMin: 420,
        sla_deadline: moment().add(7, 'hours').toISOString(),
        can_extend: true,
        score: null,
        comment: null
      }
    ];
    
    setAssignments(mockData);
    setLoading(false);
  };

  // Xử lý khi click vào một assignment để chấm
  const handleGradeClick = (assignment) => {
    setCurrentAssignment(assignment);
    
    // Reset form với giá trị hiện tại (nếu có)
    gradingForm.setFieldsValue({
      score: assignment.score,
      comment: assignment.comment,
      level: assignment.level || 'meets'
    });
    
    setDrawerVisible(true);
  };

  // Xử lý lưu kết quả chấm
  const handleSaveGrade = () => {
    gradingForm.validateFields().then(values => {
      setSaveLoading(true);
      
      // Mock API call
      setTimeout(() => {
        // Cập nhật local state
        const updatedAssignments = assignments.map(item => {
          if (item.id === currentAssignment.id) {
            return {
              ...item,
              score: values.score,
              comment: values.comment,
              level: values.level,
              status: 'in_progress'
            };
          }
          return item;
        });
        
        setAssignments(updatedAssignments);
        setCurrentAssignment({
          ...currentAssignment,
          score: values.score,
          comment: values.comment,
          level: values.level,
          status: 'in_progress'
        });
        
        setSaveLoading(false);
      }, 1000);
    });
  };

  // Xử lý hoàn tất chấm
  const handleCompleteGrade = () => {
    gradingForm.validateFields().then(values => {
      setCompleteLoading(true);
      
      // Mock API call
      setTimeout(() => {
        // Cập nhật local state
        const updatedAssignments = assignments.map(item => {
          if (item.id === currentAssignment.id) {
            return {
              ...item,
              score: values.score,
              comment: values.comment,
              level: values.level,
              status: 'completed'
            };
          }
          return item;
        });
        
        setAssignments(updatedAssignments);
        setDrawerVisible(false);
        setCompleteLoading(false);
      }, 1500);
    });
  };

  // Xử lý gia hạn SLA
  const handleExtendSLA = (assignmentId) => {
    const updatedAssignments = assignments.map(item => {
      if (item.id === assignmentId) {
        return {
          ...item,
          sla_deadline: moment().add(24, 'hours').toISOString(),
          status: 'pending'
        };
      }
      return item;
    });
    
    setAssignments(updatedAssignments);
    alert('Đã gia hạn SLA thêm 24 giờ');
  };

  // Filter assignments theo trạng thái
  const filteredAssignments = filterStatus === 'all' 
    ? assignments 
    : assignments.filter(item => item.status === filterStatus);

  // Columns cho bảng assignments
  const columns = [
    {
      title: 'Nhân viên',
      dataIndex: 'empName',
      key: 'empName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>ID: {record.empId}</Text>
        </div>
      )
    },
    {
      title: 'Phòng ban',
      dataIndex: 'unit',
      key: 'unit'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color, text;
        switch(status) {
          case 'pending':
            color = 'blue';
            text = 'Chưa chấm';
            break;
          case 'in_progress':
            color = 'orange';
            text = 'Đang chấm';
            break;
          case 'overdue':
            color = 'red';
            text = 'Quá hạn';
            break;
          case 'completed':
            color = 'green';
            text = 'Đã chấm';
            break;
          default:
            color = 'default';
            text = status;
        }
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'SLA',
      dataIndex: 'sla_deadline',
      key: 'sla',
      render: (deadline, record) => {
        if (record.status === 'completed') {
          return <Tag color="green">Hoàn thành</Tag>;
        }
        
        return (
          <CountdownTimer 
            deadline={deadline}
            onExtend={() => handleExtendSLA(record.id)}
            canExtend={record.can_extend}
          />
        );
      }
    },
    {
      title: 'SLA (Old)',
      dataIndex: 'slaLeftMin',
      key: 'slaLeftMin',
      render: (mins, record) => {
        if (record.status === 'completed') {
          return null;
        }
        
        if (mins < 0) {
          return null;
        }
        
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return (
          <span>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            {hours}h {minutes}m
          </span>
        );
      },
      sorter: (a, b) => a.slaLeftMin - b.slaLeftMin
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
      render: score => score ? score.toFixed(1) : '-'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
      render: comment => comment || '-'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type={record.status === 'completed' ? 'default' : 'primary'} 
          onClick={() => handleGradeClick(record)}
        >
          {record.status === 'completed' ? 'Xem' : 'Chấm'}
        </Button>
      )
    }
  ];

  // Render nội dung bài nộp
  const renderSubmissionContent = () => {
    // Mock data cho bài nộp
    const submission = {
      mcqAnswers: [
        { questionId: 'q1', question: 'Quy trình an toàn lao động gồm những bước nào?', answer: 'B', correct: true },
        { questionId: 'q2', question: 'Khi gặp sự cố máy móc, thứ tự xử lý đúng là gì?', answer: 'A', correct: false }
      ],
      essayAnswers: [
        { 
          questionId: 'q3', 
          question: 'Mô tả quy trình thao tác máy X theo tiêu chuẩn ISO 9001', 
          answer: 'Quy trình thao tác máy X bao gồm các bước: (1) Kiểm tra thiết bị trước khi vận hành, (2) Cài đặt thông số kỹ thuật theo tiêu chuẩn, (3) Vận hành theo quy trình chuẩn, (4) Kiểm tra sản phẩm đầu ra, (5) Ghi nhận kết quả vào sổ theo dõi.' 
        }
      ],
      attachments: [
        { name: 'minh_chung.pdf', size: '2.3 MB' }
      ]
    };
    
    return (
      <div className="submission-content">
        {/* MCQ Section */}
        <div className="mcq-section">
          <Title level={5}>Câu hỏi trắc nghiệm</Title>
          {submission.mcqAnswers.map((item, index) => (
            <Card 
              key={item.questionId} 
              size="small" 
              className="mcq-card"
              title={`Câu ${index + 1}`}
              extra={item.correct ? 
                <Badge status="success" text="Đúng" /> : 
                <Badge status="error" text="Sai" />
              }
            >
              <div className="question-text">{item.question}</div>
              <div className="answer-text">
                <strong>Đáp án đã chọn:</strong> {item.answer}
              </div>
            </Card>
          ))}
        </div>
        
        <Divider />
        
        {/* Essay Section */}
        <div className="essay-section">
          <Title level={5}>Câu hỏi tự luận</Title>
          {submission.essayAnswers.map((item, index) => (
            <Card 
              key={item.questionId} 
              size="small" 
              className="essay-card"
              title={`Câu ${index + 1}`}
            >
              <div className="question-text">{item.question}</div>
              <div className="answer-text">
                <Paragraph>{item.answer}</Paragraph>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Attachments Section */}
        {submission.attachments.length > 0 && (
          <>
            <Divider />
            <div className="attachments-section">
              <Title level={5}>File đính kèm</Title>
              {submission.attachments.map((file, index) => (
                <Button key={index} type="link" icon={<FileOutlined />}>
                  {file.name} ({file.size})
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Layout className="grading-console">
      {/* Campaign Info Header */}
      <div className="campaign-header">
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Title level={3}>{campaignInfo?.name || 'Đang tải...'}</Title>
            <Text type="secondary">Kết quả đánh giá</Text>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<HomeOutlined />} 
              onClick={() => window.location.href = '/dashboard'}
              style={{ marginRight: '16px' }}
            >
              Về Dashboard
            </Button>
            {campaignInfo && (
              <Card className="countdown-card">
                <Countdown
                  title="Thời gian còn lại để chấm"
                  value={campaignInfo.gradeDueAt}
                  format="D [ngày] H [giờ] m [phút]"
                />
              </Card>
            )}
          </Col>
        </Row>
        
        <Row gutter={16} className="campaign-stats">
          <Col span={8}>
            <Card size="small">
              <Statistic 
                title="Tổng số bài" 
                value={campaignInfo?.totalAssignments || 0} 
                prefix={<FileOutlined />} 
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic 
                title="Đã chấm" 
                value={campaignInfo?.gradedAssignments || 0} 
                prefix={<CheckCircleOutlined />} 
                valueStyle={{ color: '#3f8600' }}
              />
              {campaignInfo && (
                <Progress 
                  percent={Math.round((campaignInfo.gradedAssignments / campaignInfo.totalAssignments) * 100)} 
                  size="small" 
                  status="active" 
                />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic 
                title="Quá hạn" 
                value={campaignInfo?.overdueAssignments || 0} 
                prefix={<WarningOutlined />} 
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      
      <Layout className="grading-content">
        {/* Filter Sidebar */}
        <Sider width={250} theme="light" className="grading-sider">
          <div className="filter-header">
            <FilterOutlined /> Bộ lọc
          </div>
          <div className="filter-content">
            <div className="filter-section">
              <div className="filter-title">Trạng thái</div>
              <Radio.Group 
                value={filterStatus} 
                onChange={e => setFilterStatus(e.target.value)}
                className="filter-options"
              >
                <Radio.Button value="all">Tất cả</Radio.Button>
                <Radio.Button value="pending">Chưa chấm</Radio.Button>
                <Radio.Button value="in_progress">Đang chấm</Radio.Button>
                <Radio.Button value="overdue">Quá hạn</Radio.Button>
                <Radio.Button value="completed">Đã chấm</Radio.Button>
              </Radio.Group>
            </div>
            
            <div className="filter-section">
              <div className="filter-title">Phòng ban</div>
              <Select 
                placeholder="Chọn phòng ban" 
                style={{ width: '100%' }}
                allowClear
              >
                <Select.Option value="xuong_a">Xưởng A</Select.Option>
                <Select.Option value="xuong_b">Xưởng B</Select.Option>
                <Select.Option value="xuong_c">Xưởng C</Select.Option>
              </Select>
            </div>
            
            <div className="filter-actions">
              <Button 
                type="primary" 
                icon={<SyncOutlined />} 
                onClick={fetchData}
                loading={loading}
              >
                Làm mới
              </Button>
            </div>
          </div>
        </Sider>
        
        {/* Main Content */}
        <Content className="grading-table-container">
          <Table 
            columns={columns} 
            dataSource={filteredAssignments} 
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            rowClassName={record => record.status === 'overdue' ? 'overdue-row' : ''}
          />
        </Content>
      </Layout>
      
      {/* Grading Drawer */}
      <Drawer
        title={
          <div>
            <div>Chấm bài: {currentAssignment?.empName}</div>
            <Text type="secondary">Phòng ban: {currentAssignment?.unit}</Text>
          </div>
        }
        width={720}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button 
              onClick={() => setDrawerVisible(false)} 
              style={{ marginRight: 8 }}
            >
              Đóng
            </Button>
            <Button 
              icon={<SaveOutlined />} 
              onClick={handleSaveGrade}
              loading={saveLoading}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Button>
            <Button 
              type="primary" 
              icon={<CheckOutlined />} 
              onClick={handleCompleteGrade}
              loading={completeLoading}
              disabled={currentAssignment?.status === 'completed'}
            >
              Hoàn tất
            </Button>
          </div>
        }
      >
        <Tabs defaultActiveKey="submission">
          <TabPane tab="Bài nộp" key="submission">
            {renderSubmissionContent()}
          </TabPane>
          
          <TabPane tab="Chấm điểm" key="grading">
            <Form 
              form={gradingForm} 
              layout="vertical"
              disabled={currentAssignment?.status === 'completed'}
            >
              <Form.Item 
                name="score" 
                label="Điểm số" 
                rules={[{ required: true, message: 'Vui lòng nhập điểm' }]}
              >
                <Input type="number" min={0} max={10} step={0.1} />
              </Form.Item>
              
              <Form.Item name="level" label="Đánh giá nhanh">
                <Radio.Group>
                  <Radio.Button value="below">Chưa đạt</Radio.Button>
                  <Radio.Button value="meets">Đạt</Radio.Button>
                  <Radio.Button value="exceeds">Vượt mong đợi</Radio.Button>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item name="comment" label="Nhận xét">
                <TextArea rows={4} placeholder="Nhập nhận xét về bài làm" />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Drawer>
    </Layout>
  );
};

export default GradingConsole;
