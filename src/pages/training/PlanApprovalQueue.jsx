import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Steps, 
  Button, 
  Space, 
  Divider, 
  Tabs, 
  Table, 
  Tag, 
  Timeline, 
  Comment, 
  Avatar, 
  Form, 
  Input, 
  Row, 
  Col,
  Typography,
  Tooltip,
  Badge,
  Modal,
  message,
  Select,
  Spin,
  Empty
} from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  CommentOutlined,
  DiffOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
  SendOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './PlanApprovalQueue.css';

const { Step } = Steps;
const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const PlanApprovalQueue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);
  const [approvalData, setApprovalData] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('overview');
  const [diffVersions, setDiffVersions] = useState({
    from: 1,
    to: 2
  });
  const [submitting, setSubmitting] = useState(false);
  
  // Fetch plan data
  useEffect(() => {
    fetchPlanData();
    fetchApprovalData();
    fetchComments();
  }, [id]);
  
  const fetchPlanData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API call
      const mockPlan = {
        id: 2,
        name: 'Kế hoạch đào tạo Q2/2025',
        year: 2025,
        description: 'Kế hoạch đào tạo quý 2 năm 2025',
        budget: 250000000,
        status: 'waiting_approval',
        createdBy: 'Trần Thị B',
        createdAt: '2025-03-10',
        department: 'Phòng Nhân sự',
        objectives: ['Nâng cao kỹ năng lãnh đạo', 'Phát triển kỹ năng chuyên môn'],
        items: [
          {
            id: 1,
            courseName: 'Kỹ năng lãnh đạo',
            targetDepartment: 'Ban Giám đốc',
            participants: 5,
            cost: 75000000,
            schedule: 'Q2/2025'
          },
          {
            id: 2,
            courseName: 'Tiếng Anh giao tiếp',
            targetDepartment: 'Phòng Kinh doanh',
            participants: 10,
            cost: 80000000,
            schedule: 'Q2/2025'
          },
          {
            id: 3,
            courseName: 'Excel nâng cao',
            targetDepartment: 'Phòng Kế toán',
            participants: 8,
            cost: 40000000,
            schedule: 'Q2/2025'
          }
        ],
        versions: [
          { id: 1, version: 1, createdAt: '2025-03-10', note: 'Phiên bản đầu tiên' },
          { id: 2, version: 2, createdAt: '2025-03-15', note: 'Cập nhật sau feedback' }
        ]
      };
      
      setPlanData(mockPlan);
    } catch (error) {
      console.error('Error fetching plan data:', error);
      message.error('Không thể tải dữ liệu kế hoạch');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchApprovalData = async () => {
    try {
      // Mock data - replace with API call
      const mockApprovals = [
        {
          level: 1,
          title: 'Trưởng phòng',
          approver: 'Nguyễn Văn A',
          status: 'approved',
          dueDate: '2025-03-20',
          completedDate: '2025-03-18',
          comment: 'Đã duyệt, cần lưu ý về ngân sách'
        },
        {
          level: 2,
          title: 'Giám đốc Nhân sự',
          approver: 'Lê Thị B',
          status: 'waiting',
          dueDate: '2025-03-25',
          completedDate: null,
          comment: null
        },
        {
          level: 3,
          title: 'Tổng Giám đốc',
          approver: 'Trần Văn C',
          status: 'pending',
          dueDate: '2025-03-30',
          completedDate: null,
          comment: null
        }
      ];
      
      setApprovalData(mockApprovals);
    } catch (error) {
      console.error('Error fetching approval data:', error);
    }
  };
  
  const fetchComments = async () => {
    try {
      // Mock data - replace with API call
      const mockComments = [
        {
          id: 1,
          author: 'Nguyễn Văn A',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'Kế hoạch này cần xem xét lại ngân sách cho khóa học tiếng Anh.',
          datetime: '2025-03-18 10:30',
          role: 'Trưởng phòng'
        },
        {
          id: 2,
          author: 'Trần Thị B',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'Đã điều chỉnh ngân sách theo góp ý.',
          datetime: '2025-03-18 11:15',
          role: 'HR Manager'
        }
      ];
      
      setComments(mockComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  // Handle approve action
  const handleApprove = () => {
    Modal.confirm({
      title: 'Xác nhận phê duyệt',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      content: 'Bạn có chắc chắn muốn phê duyệt kế hoạch này?',
      onOk: () => {
        setSubmitting(true);
        
        // Mock API call
        setTimeout(() => {
          message.success('Đã phê duyệt kế hoạch thành công');
          
          // Update approval data
          const currentLevel = approvalData.find(a => a.status === 'waiting')?.level;
          if (currentLevel) {
            setApprovalData(approvalData.map(a => 
              a.level === currentLevel 
                ? { ...a, status: 'approved', completedDate: new Date().toISOString().split('T')[0] }
                : a.level === currentLevel + 1
                  ? { ...a, status: 'waiting' }
                  : a
            ));
          }
          
          setSubmitting(false);
        }, 1000);
      }
    });
  };
  
  // Handle reject action
  const handleReject = () => {
    Modal.confirm({
      title: 'Xác nhận từ chối',
      icon: <CloseCircleOutlined style={{ color: '#f5222d' }} />,
      content: (
        <Form layout="vertical">
          <Form.Item
            name="rejectReason"
            label="Lý do từ chối"
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        setSubmitting(true);
        
        // Mock API call
        setTimeout(() => {
          message.success('Đã từ chối kế hoạch');
          navigate('/training/plans');
          setSubmitting(false);
        }, 1000);
      }
    });
  };
  
  // Handle request changes action
  const handleRequestChanges = () => {
    Modal.confirm({
      title: 'Yêu cầu chỉnh sửa',
      icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      content: (
        <Form layout="vertical">
          <Form.Item
            name="changeRequest"
            label="Nội dung cần chỉnh sửa"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung cần chỉnh sửa' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        setSubmitting(true);
        
        // Mock API call
        setTimeout(() => {
          message.success('Đã gửi yêu cầu chỉnh sửa');
          navigate('/training/plans');
          setSubmitting(false);
        }, 1000);
      }
    });
  };
  
  // Handle add comment
  const handleAddComment = (values) => {
    const newComment = {
      id: comments.length + 1,
      author: 'Lê Thị B',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: values.comment,
      datetime: new Date().toLocaleString('vi-VN'),
      role: 'Giám đốc Nhân sự'
    };
    
    setComments([...comments, newComment]);
    commentForm.resetFields();
  };
  
  // Render approval timeline
  const renderApprovalTimeline = () => {
    return (
      <Card className="approval-timeline-card">
        <Title level={5}>Quy trình phê duyệt</Title>
        <Steps direction="vertical" current={approvalData.findIndex(a => a.status === 'waiting')}>
          {approvalData.map((approval, index) => {
            let icon;
            let status;
            
            switch (approval.status) {
              case 'approved':
                icon = <CheckCircleOutlined />;
                status = 'finish';
                break;
              case 'rejected':
                icon = <CloseCircleOutlined />;
                status = 'error';
                break;
              case 'waiting':
                icon = <ClockCircleOutlined />;
                status = 'process';
                break;
              default:
                icon = <ClockCircleOutlined />;
                status = 'wait';
            }
            
            return (
              <Step
                key={approval.level}
                title={approval.title}
                description={
                  <div>
                    <div>{approval.approver}</div>
                    <div>
                      {approval.status === 'approved' ? (
                        <Text type="success">Đã duyệt: {approval.completedDate}</Text>
                      ) : approval.status === 'rejected' ? (
                        <Text type="danger">Đã từ chối: {approval.completedDate}</Text>
                      ) : (
                        <Text type="secondary">
                          Hạn duyệt: {approval.dueDate}
                          {isOverdue(approval.dueDate) && approval.status === 'waiting' && (
                            <Tag color="error" style={{ marginLeft: 8 }}>Quá hạn</Tag>
                          )}
                        </Text>
                      )}
                    </div>
                    {approval.comment && (
                      <div>
                        <Text italic>{approval.comment}</Text>
                      </div>
                    )}
                  </div>
                }
                icon={icon}
                status={status}
              />
            );
          })}
        </Steps>
      </Card>
    );
  };
  
  // Check if date is overdue
  const isOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  };
  
  // Render overview tab
  const renderOverviewTab = () => {
    if (!planData) return null;
    
    const columns = [
      {
        title: 'Khóa học',
        dataIndex: 'courseName',
        key: 'courseName'
      },
      {
        title: 'Đơn vị',
        dataIndex: 'targetDepartment',
        key: 'targetDepartment'
      },
      {
        title: 'Số người',
        dataIndex: 'participants',
        key: 'participants',
        align: 'center'
      },
      {
        title: 'Chi phí',
        dataIndex: 'cost',
        key: 'cost',
        render: (cost) => (
          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cost)}</span>
        )
      },
      {
        title: 'Thời gian',
        dataIndex: 'schedule',
        key: 'schedule'
      }
    ];
    
    return (
      <div className="overview-tab">
        <Card className="plan-info-card">
          <Row gutter={16}>
            <Col span={6}>
              <Text type="secondary">Người tạo:</Text>
              <div>{planData.createdBy}</div>
            </Col>
            <Col span={6}>
              <Text type="secondary">Ngày tạo:</Text>
              <div>{new Date(planData.createdAt).toLocaleDateString('vi-VN')}</div>
            </Col>
            <Col span={6}>
              <Text type="secondary">Đơn vị:</Text>
              <div>{planData.department}</div>
            </Col>
            <Col span={6}>
              <Text type="secondary">Ngân sách:</Text>
              <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(planData.budget)}</div>
            </Col>
          </Row>
          
          <Divider />
          
          <div>
            <Text type="secondary">Mục tiêu:</Text>
            <ul>
              {planData.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
          
          <Divider />
          
          <Table
            columns={columns}
            dataSource={planData.items}
            rowKey="id"
            pagination={false}
            summary={(pageData) => {
              const totalCost = pageData.reduce((total, item) => total + item.cost, 0);
              const totalParticipants = pageData.reduce((total, item) => total + item.participants, 0);
              
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}><strong>Tổng cộng</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="center"><strong>{totalParticipants}</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalCost)}</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={4}></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </Card>
      </div>
    );
  };
  
  // Render diff tab
  const renderDiffTab = () => {
    if (!planData) return null;
    
    return (
      <div className="diff-tab">
        <Card className="diff-control-card">
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item label="So sánh từ phiên bản">
                <Select
                  value={diffVersions.from}
                  onChange={(value) => setDiffVersions({ ...diffVersions, from: value })}
                >
                  {planData.versions.map(version => (
                    <Option key={version.id} value={version.id}>
                      V{version.version} ({new Date(version.createdAt).toLocaleDateString('vi-VN')})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Đến phiên bản">
                <Select
                  value={diffVersions.to}
                  onChange={(value) => setDiffVersions({ ...diffVersions, to: value })}
                >
                  {planData.versions.map(version => (
                    <Option key={version.id} value={version.id}>
                      V{version.version} ({new Date(version.createdAt).toLocaleDateString('vi-VN')})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button type="primary" icon={<DiffOutlined />}>So sánh</Button>
            </Col>
          </Row>
        </Card>
        
        <Card className="diff-result-card">
          <div className="diff-content">
            <Title level={5}>Thay đổi trong phiên bản</Title>
            
            <Divider orientation="left">Thông tin cơ bản</Divider>
            <div className="diff-item">
              <div className="diff-label">Ngân sách:</div>
              <div className="diff-value">
                <div className="diff-old">200,000,000 VND</div>
                <div className="diff-new">250,000,000 VND</div>
              </div>
            </div>
            
            <Divider orientation="left">Mục tiêu</Divider>
            <div className="diff-item">
              <div className="diff-label">Mục tiêu:</div>
              <div className="diff-value">
                <div className="diff-old">Nâng cao kỹ năng lãnh đạo</div>
                <div className="diff-new">Nâng cao kỹ năng lãnh đạo, Phát triển kỹ năng chuyên môn</div>
              </div>
            </div>
            
            <Divider orientation="left">Khóa học</Divider>
            <div className="diff-item added">
              <div className="diff-label">Thêm mới:</div>
              <div className="diff-value">
                <div className="diff-new">Excel nâng cao - Phòng Kế toán - 8 người - 40,000,000 VND</div>
              </div>
            </div>
            
            <div className="diff-item modified">
              <div className="diff-label">Thay đổi:</div>
              <div className="diff-value">
                <div className="diff-old">Tiếng Anh giao tiếp - Phòng Kinh doanh - 5 người - 40,000,000 VND</div>
                <div className="diff-new">Tiếng Anh giao tiếp - Phòng Kinh doanh - 10 người - 80,000,000 VND</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };
  
  // Render comments tab
  const renderCommentsTab = () => {
    return (
      <div className="comments-tab">
        <Card className="comments-card">
          <Timeline>
            {comments.map(comment => (
              <Timeline.Item key={comment.id}>
                <Comment
                  author={<><Text strong>{comment.author}</Text> <Tag color="blue">{comment.role}</Tag></>}
                  avatar={<Avatar src={comment.avatar} alt={comment.author} />}
                  content={<p>{comment.content}</p>}
                  datetime={comment.datetime}
                />
              </Timeline.Item>
            ))}
          </Timeline>
          
          <Divider />
          
          <Form form={commentForm} onFinish={handleAddComment}>
            <Form.Item
              name="comment"
              rules={[{ required: true, message: 'Vui lòng nhập bình luận' }]}
            >
              <TextArea rows={4} placeholder="Nhập bình luận của bạn..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<CommentOutlined />}>
                Gửi bình luận
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };
  
  // Render action buttons
  const renderActionButtons = () => {
    // Find current approval level
    const currentApproval = approvalData.find(a => a.status === 'waiting');
    
    if (!currentApproval) {
      return null;
    }
    
    return (
      <div className="approval-actions">
        <Space>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleApprove}
            loading={submitting}
          >
            Phê duyệt
          </Button>
          <Button
            danger
            icon={<CloseCircleOutlined />}
            onClick={handleReject}
            loading={submitting}
          >
            Từ chối
          </Button>
          <Button
            icon={<ExclamationCircleOutlined />}
            onClick={handleRequestChanges}
            loading={submitting}
          >
            Yêu cầu chỉnh sửa
          </Button>
        </Space>
      </div>
    );
  };
  
  if (loading) {
    return <Spin size="large" />;
  }
  
  if (!planData) {
    return <Empty description="Không tìm thấy kế hoạch" />;
  }
  
  return (
    <div className="plan-approval-container">
      <div className="approval-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/training/plans')}
        >
          Quay lại
        </Button>
        <div className="approval-title">
          <Title level={4}>{planData.name}</Title>
          <Tag color="processing">Chờ phê duyệt</Tag>
        </div>
      </div>
      
      <Row gutter={16} className="approval-content">
        <Col span={18}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Tổng quan" key="overview">
              {renderOverviewTab()}
            </TabPane>
            <TabPane tab="So sánh phiên bản" key="diff">
              {renderDiffTab()}
            </TabPane>
            <TabPane tab="Bình luận" key="comments">
              {renderCommentsTab()}
            </TabPane>
          </Tabs>
        </Col>
        <Col span={6}>
          {renderApprovalTimeline()}
        </Col>
      </Row>
      
      {renderActionButtons()}
    </div>
  );
};

export default PlanApprovalQueue;
