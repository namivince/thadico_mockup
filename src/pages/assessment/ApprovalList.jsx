import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Typography, Button, Space, Tag, 
  Drawer, Form, Input, Rate, Radio, Divider, 
  Progress, Select, Badge, message, Tooltip,
  Alert, Tabs, Row, Col, Statistic
} from 'antd';
import { 
  CheckOutlined, CloseOutlined, SearchOutlined, 
  FilterOutlined, UserOutlined, InfoCircleOutlined,
  ClockCircleOutlined, CheckCircleOutlined, 
  ExclamationCircleOutlined, SyncOutlined
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './ApprovalList.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const ApprovalList = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Fetch round and submissions data
  useEffect(() => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      const mockRound = {
        id: parseInt(id),
        name: 'Đánh giá KPI Q3/2025',
        startDate: '2025-07-20',
        endDate: '2025-07-31',
        objective: 'Đánh giá KPI nhân viên quý 3',
        status: 'grading',
        creator: 'Nguyễn Phúc Vinh',
        createdAt: '2025-07-10',
        completionRate: 85,
        participantCount: 150,
        submissionCount: 130,
        gradingCount: 110,
        resultsPublished: false
      };
      
      setRound(mockRound);
      
      // Generate mock departments
      const mockDepartments = ['Phòng Nhân sự', 'Phòng Kỹ thuật', 'Phòng Kinh doanh', 'Phòng Tài chính', 'Ban Giám đốc'];
      setDepartments(mockDepartments);
      
      // Generate mock submissions
      const statuses = ['pending', 'approved', 'rejected'];
      const mockSubmissions = Array(130).fill(0).map((_, index) => {
        const department = mockDepartments[Math.floor(Math.random() * mockDepartments.length)];
        const status = index < 20 ? 'pending' : 
                      index < 110 ? 'approved' : 'rejected';
        
        return {
          id: index + 1,
          employeeId: 1000 + index,
          employeeName: `Nhân viên ${index + 1}`,
          department,
          position: index % 10 === 0 ? 'Trưởng phòng' : 
                   index % 5 === 0 ? 'Team Leader' : 'Nhân viên',
          submittedAt: moment().subtract(Math.floor(Math.random() * 10), 'days').format('YYYY-MM-DD HH:mm:ss'),
          status,
          reviewerId: status !== 'pending' ? 500 : null,
          reviewerName: status !== 'pending' ? 'Nguyễn Phúc Vinh' : null,
          reviewedAt: status !== 'pending' ? moment().subtract(Math.floor(Math.random() * 5), 'days').format('YYYY-MM-DD HH:mm:ss') : null,
          dueDate: moment().add(5, 'days').format('YYYY-MM-DD'),
          criteria: [
            { 
              id: 1, 
              code: 'KN01', 
              name: 'Kỹ năng giao tiếp', 
              weight: 20,
              selfScore: Math.floor(Math.random() * 5) + 1,
              selfNote: 'Tôi đã cải thiện kỹ năng giao tiếp trong quý này',
              managerScore: status !== 'pending' ? Math.floor(Math.random() * 5) + 1 : null,
              managerNote: status !== 'pending' ? 'Nhân viên có kỹ năng giao tiếp tốt' : null
            },
            { 
              id: 2, 
              code: 'KN02', 
              name: 'Kỹ năng làm việc nhóm', 
              weight: 20,
              selfScore: Math.floor(Math.random() * 5) + 1,
              selfNote: 'Tôi luôn hỗ trợ đồng nghiệp khi cần',
              managerScore: status !== 'pending' ? Math.floor(Math.random() * 5) + 1 : null,
              managerNote: status !== 'pending' ? 'Nhân viên làm việc nhóm hiệu quả' : null
            },
            { 
              id: 3, 
              code: 'TĐ01', 
              name: 'Trách nhiệm', 
              weight: 15,
              selfScore: Math.floor(Math.random() * 5) + 1,
              selfNote: 'Tôi luôn hoàn thành công việc đúng hạn',
              managerScore: status !== 'pending' ? Math.floor(Math.random() * 5) + 1 : null,
              managerNote: status !== 'pending' ? 'Nhân viên có tinh thần trách nhiệm cao' : null
            },
            { 
              id: 4, 
              code: 'TĐ02', 
              name: 'Chủ động', 
              weight: 15,
              selfScore: Math.floor(Math.random() * 5) + 1,
              selfNote: 'Tôi chủ động đề xuất ý tưởng mới',
              managerScore: status !== 'pending' ? Math.floor(Math.random() * 5) + 1 : null,
              managerNote: status !== 'pending' ? 'Nhân viên có tính chủ động tốt' : null
            },
            { 
              id: 5, 
              code: 'KT01', 
              name: 'Kiến thức chuyên môn', 
              weight: 30,
              selfScore: Math.floor(Math.random() * 5) + 1,
              selfNote: 'Tôi đã học thêm nhiều kỹ năng mới',
              managerScore: status !== 'pending' ? Math.floor(Math.random() * 5) + 1 : null,
              managerNote: status !== 'pending' ? 'Nhân viên có kiến thức chuyên môn tốt' : null
            }
          ],
          overallSelfNote: 'Tôi đã cố gắng hoàn thành tốt công việc trong quý này',
          overallManagerNote: status !== 'pending' ? 'Nhân viên có kết quả công việc tốt trong quý này' : null,
          averageSelfScore: (Math.random() * 2 + 3).toFixed(1),
          averageManagerScore: status !== 'pending' ? (Math.random() * 2 + 3).toFixed(1) : null
        };
      });
      
      setSubmissions(mockSubmissions);
      setFilteredSubmissions(mockSubmissions);
      
      // Calculate stats
      const stats = {
        total: mockSubmissions.length,
        pending: mockSubmissions.filter(s => s.status === 'pending').length,
        approved: mockSubmissions.filter(s => s.status === 'approved').length,
        rejected: mockSubmissions.filter(s => s.status === 'rejected').length
      };
      
      setStats(stats);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Apply filters
  useEffect(() => {
    if (!submissions.length) return;
    
    let filtered = [...submissions];
    
    // Apply department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(s => s.department === filterDepartment);
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }
    
    // Apply search
    if (searchText) {
      filtered = filtered.filter(s => 
        s.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
        s.position.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredSubmissions(filtered);
  }, [submissions, filterDepartment, filterStatus, searchText]);

  // Show submission details
  const showSubmissionDetails = (submission) => {
    setSelectedSubmission(submission);
    setDrawerVisible(true);
    
    // Initialize form values
    if (submission.status === 'pending') {
      const initialValues = {
        overallNote: ''
      };
      
      submission.criteria.forEach(criterion => {
        initialValues[`score_${criterion.id}`] = null;
        initialValues[`note_${criterion.id}`] = '';
      });
      
      form.setFieldsValue(initialValues);
    } else {
      const initialValues = {
        overallNote: submission.overallManagerNote
      };
      
      submission.criteria.forEach(criterion => {
        initialValues[`score_${criterion.id}`] = criterion.managerScore;
        initialValues[`note_${criterion.id}`] = criterion.managerNote;
      });
      
      form.setFieldsValue(initialValues);
    }
  };

  // Handle approve submission
  const handleApprove = async () => {
    try {
      await form.validateFields();
      
      setApproveLoading(true);
      
      // Get form values
      const values = form.getFieldsValue();
      
      // Prepare data
      const updatedSubmission = { ...selectedSubmission };
      updatedSubmission.status = 'approved';
      updatedSubmission.reviewerId = 500;
      updatedSubmission.reviewerName = 'Nguyễn Phúc Vinh';
      updatedSubmission.reviewedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      updatedSubmission.overallManagerNote = values.overallNote;
      
      // Update criteria scores and notes
      updatedSubmission.criteria.forEach(criterion => {
        criterion.managerScore = values[`score_${criterion.id}`];
        criterion.managerNote = values[`note_${criterion.id}`];
      });
      
      // Calculate average score
      const totalScore = updatedSubmission.criteria.reduce((sum, criterion) => {
        return sum + (criterion.managerScore * (criterion.weight / 100));
      }, 0);
      
      updatedSubmission.averageManagerScore = totalScore.toFixed(1);
      
      // Mock API call
      setTimeout(() => {
        // Update submissions
        setSubmissions(prev => 
          prev.map(s => s.id === updatedSubmission.id ? updatedSubmission : s)
        );
        
        // Update stats
        setStats(prev => ({
          ...prev,
          pending: prev.pending - 1,
          approved: prev.approved + 1
        }));
        
        message.success('Đã phê duyệt đánh giá thành công');
        setApproveLoading(false);
        setDrawerVisible(false);
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle reject submission
  const handleReject = async () => {
    try {
      await form.validateFields();
      
      setRejectLoading(true);
      
      // Get form values
      const values = form.getFieldsValue();
      
      // Prepare data
      const updatedSubmission = { ...selectedSubmission };
      updatedSubmission.status = 'rejected';
      updatedSubmission.reviewerId = 500;
      updatedSubmission.reviewerName = 'Nguyễn Phúc Vinh';
      updatedSubmission.reviewedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      updatedSubmission.overallManagerNote = values.overallNote;
      
      // Update criteria scores and notes
      updatedSubmission.criteria.forEach(criterion => {
        criterion.managerScore = values[`score_${criterion.id}`];
        criterion.managerNote = values[`note_${criterion.id}`];
      });
      
      // Calculate average score
      const totalScore = updatedSubmission.criteria.reduce((sum, criterion) => {
        return sum + (criterion.managerScore * (criterion.weight / 100));
      }, 0);
      
      updatedSubmission.averageManagerScore = totalScore.toFixed(1);
      
      // Mock API call
      setTimeout(() => {
        // Update submissions
        setSubmissions(prev => 
          prev.map(s => s.id === updatedSubmission.id ? updatedSubmission : s)
        );
        
        // Update stats
        setStats(prev => ({
          ...prev,
          pending: prev.pending - 1,
          rejected: prev.rejected + 1
        }));
        
        message.success('Đã từ chối đánh giá thành công');
        setRejectLoading(false);
        setDrawerVisible(false);
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Get status tag
  const getStatusTag = (status) => {
    switch (status) {
      case 'pending':
        return <Tag icon={<ClockCircleOutlined />} color="processing">Chờ duyệt</Tag>;
      case 'approved':
        return <Tag icon={<CheckCircleOutlined />} color="success">Đã duyệt</Tag>;
      case 'rejected':
        return <Tag icon={<CloseOutlined />} color="error">Từ chối</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Get SLA status
  const getSlaStatus = (dueDate) => {
    const now = moment();
    const due = moment(dueDate);
    const daysLeft = due.diff(now, 'days');
    
    if (daysLeft < 0) {
      return <Tag color="error">Quá hạn</Tag>;
    } else if (daysLeft <= 2) {
      return <Tag color="warning">Còn {daysLeft} ngày</Tag>;
    } else {
      return <Tag color="green">Còn {daysLeft} ngày</Tag>;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Nhân viên',
      key: 'employee',
      render: (_, record) => (
        <div>
          <div>{record.employeeName}</div>
          <Text type="secondary">{record.position}</Text>
        </div>
      )
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: 'Ngày nộp',
      key: 'submittedAt',
      render: (_, record) => moment(record.submittedAt).format('DD/MM/YYYY')
    },
    {
      title: 'Điểm tự đánh giá',
      dataIndex: 'averageSelfScore',
      key: 'averageSelfScore',
      render: (score) => <Badge count={score} style={{ backgroundColor: '#1890ff' }} />
    },
    {
      title: 'Điểm quản lý',
      key: 'averageManagerScore',
      render: (_, record) => (
        record.averageManagerScore ? 
        <Badge count={record.averageManagerScore} style={{ backgroundColor: '#52c41a' }} /> : 
        '-'
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => getStatusTag(record.status)
    },
    {
      title: 'Hạn duyệt',
      key: 'dueDate',
      render: (_, record) => record.status === 'pending' ? getSlaStatus(record.dueDate) : '-'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => showSubmissionDetails(record)}
        >
          {record.status === 'pending' ? 'Chấm điểm' : 'Xem chi tiết'}
        </Button>
      )
    }
  ];

  return (
    <div className="approval-list-container">
      <div className="approval-list-header">
        <div className="approval-list-title">
          <Title level={2}>Chấm điểm & Phê duyệt</Title>
          <Text>{round?.name}</Text>
        </div>
      </div>
      
      <Row gutter={16} className="approval-stats">
        <Col span={6}>
          <Card>
            <Statistic 
              title="Tổng số đánh giá" 
              value={stats.total} 
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress 
              percent={Math.round(((stats.approved + stats.rejected) / stats.total) * 100)} 
              size="small" 
              style={{ marginTop: 8 }}
            />
            <div className="stat-detail">
              <Text type="secondary">{stats.approved + stats.rejected} đã xử lý</Text>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Chờ duyệt" 
              value={stats.pending} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Đã duyệt" 
              value={stats.approved} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Từ chối" 
              value={stats.rejected} 
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>
      
      <Card className="approval-list-filters">
        <div className="filter-container">
          <Space>
            <div className="filter-item">
              <Text>Phòng ban:</Text>
              <Select 
                value={filterDepartment} 
                onChange={setFilterDepartment}
                style={{ width: 200 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả phòng ban</Option>
                {departments.map(dept => (
                  <Option key={dept} value={dept}>{dept}</Option>
                ))}
              </Select>
            </div>
            
            <div className="filter-item">
              <Text>Trạng thái:</Text>
              <Select 
                value={filterStatus} 
                onChange={setFilterStatus}
                style={{ width: 200 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="pending">Chờ duyệt</Option>
                <Option value="approved">Đã duyệt</Option>
                <Option value="rejected">Từ chối</Option>
              </Select>
            </div>
            
            <div className="filter-item">
              <Input.Search
                placeholder="Tìm kiếm theo tên, vị trí..."
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
            </div>
          </Space>
        </div>
      </Card>
      
      <Card className="approval-list-table">
        <Table
          dataSource={filteredSubmissions}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
      
      <Drawer
        title={
          <div className="drawer-title">
            <div>
              {selectedSubmission?.employeeName}
              <div className="drawer-subtitle">
                <Text type="secondary">{selectedSubmission?.position} - {selectedSubmission?.department}</Text>
              </div>
            </div>
            <div>
              {selectedSubmission && getStatusTag(selectedSubmission.status)}
            </div>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={700}
        footer={
          selectedSubmission?.status === 'pending' ? (
            <div className="drawer-footer">
              <Button 
                onClick={() => setDrawerVisible(false)}
                style={{ marginRight: 8 }}
              >
                Hủy
              </Button>
              <Button 
                type="primary" 
                danger
                onClick={handleReject}
                loading={rejectLoading}
              >
                Từ chối
              </Button>
              <Button 
                type="primary" 
                onClick={handleApprove}
                loading={approveLoading}
              >
                Phê duyệt
              </Button>
            </div>
          ) : null
        }
      >
        {selectedSubmission && (
          <Form
            form={form}
            layout="vertical"
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Đánh giá chi tiết" key="1">
                <div className="submission-summary">
                  <div className="summary-item">
                    <Text>Điểm tự đánh giá:</Text>
                    <Text strong>{selectedSubmission.averageSelfScore}</Text>
                  </div>
                  <div className="summary-item">
                    <Text>Điểm quản lý:</Text>
                    <Text strong>{selectedSubmission.averageManagerScore || '-'}</Text>
                  </div>
                  <div className="summary-item">
                    <Text>Ngày nộp:</Text>
                    <Text>{moment(selectedSubmission.submittedAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
                  </div>
                </div>
                
                <Divider />
                
                {selectedSubmission.criteria.map(criterion => (
                  <div key={criterion.id} className="criterion-review">
                    <div className="criterion-header">
                      <div className="criterion-title">
                        <Text strong>{criterion.code} - {criterion.name}</Text>
                        <Tag color="blue">{criterion.weight}%</Tag>
                      </div>
                    </div>
                    
                    <div className="criterion-content">
                      <div className="criterion-self">
                        <Text type="secondary">Tự đánh giá:</Text>
                        <div className="criterion-score">
                          <Rate disabled value={criterion.selfScore} />
                          <Badge 
                            count={criterion.selfScore} 
                            style={{ backgroundColor: '#1890ff' }} 
                          />
                        </div>
                        <div className="criterion-note">
                          <Text type="secondary">Ghi chú:</Text>
                          <Paragraph>{criterion.selfNote || 'Không có ghi chú'}</Paragraph>
                        </div>
                      </div>
                      
                      <Divider dashed />
                      
                      <div className="criterion-manager">
                        <Text type="secondary">Đánh giá của quản lý:</Text>
                        <div className="criterion-score">
                          {selectedSubmission.status === 'pending' ? (
                            <Form.Item
                              name={`score_${criterion.id}`}
                              rules={[{ required: true, message: 'Vui lòng đánh giá tiêu chí này' }]}
                            >
                              <Rate />
                            </Form.Item>
                          ) : (
                            <div className="criterion-score">
                              <Rate disabled value={criterion.managerScore} />
                              <Badge 
                                count={criterion.managerScore} 
                                style={{ backgroundColor: '#52c41a' }} 
                              />
                            </div>
                          )}
                        </div>
                        <div className="criterion-note">
                          <Text type="secondary">Ghi chú:</Text>
                          {selectedSubmission.status === 'pending' ? (
                            <Form.Item
                              name={`note_${criterion.id}`}
                            >
                              <TextArea 
                                rows={2} 
                                placeholder="Nhập ghi chú đánh giá (không bắt buộc)"
                              />
                            </Form.Item>
                          ) : (
                            <Paragraph>{criterion.managerNote || 'Không có ghi chú'}</Paragraph>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Divider />
                  </div>
                ))}
                
                <div className="overall-notes">
                  <div className="overall-self">
                    <Text strong>Nhận xét tổng thể của nhân viên:</Text>
                    <Paragraph>{selectedSubmission.overallSelfNote}</Paragraph>
                  </div>
                  
                  <div className="overall-manager">
                    <Text strong>Nhận xét tổng thể của quản lý:</Text>
                    {selectedSubmission.status === 'pending' ? (
                      <Form.Item
                        name="overallNote"
                        rules={[{ required: true, message: 'Vui lòng nhập nhận xét tổng thể' }]}
                      >
                        <TextArea 
                          rows={4} 
                          placeholder="Nhập nhận xét tổng thể về nhân viên"
                        />
                      </Form.Item>
                    ) : (
                      <Paragraph>{selectedSubmission.overallManagerNote}</Paragraph>
                    )}
                  </div>
                </div>
              </TabPane>
              
              <TabPane tab="Lịch sử đánh giá" key="2">
                <Alert
                  message="Chức năng đang phát triển"
                  description="Lịch sử đánh giá sẽ được cập nhật trong phiên bản tiếp theo."
                  type="info"
                  showIcon
                />
              </TabPane>
            </Tabs>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default ApprovalList;
