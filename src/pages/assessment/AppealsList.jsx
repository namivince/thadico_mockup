import React, { useState, useEffect } from 'react';
import { 
  Card, Typography, Button, Table, Space, Tag, 
  Modal, Form, Input, InputNumber, Select, 
  Drawer, Timeline, Divider, Badge, message,
  Alert, Row, Col, Statistic, Tooltip, Popconfirm,
  Upload, List, Avatar
} from 'antd';
import { 
  CheckOutlined, CloseOutlined, SearchOutlined, 
  FilterOutlined, UserOutlined, InfoCircleOutlined,
  ClockCircleOutlined, CheckCircleOutlined, 
  ExclamationCircleOutlined, UploadOutlined,
  FileTextOutlined, FilePdfOutlined, FileExcelOutlined,
  LockOutlined, UnlockOutlined
} from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import './AppealsList.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AppealsList = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(null);
  const [appeals, setAppeals] = useState([]);
  const [filteredAppeals, setFilteredAppeals] = useState([]);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [openWindowLoading, setOpenWindowLoading] = useState(false);
  const [closeWindowLoading, setCloseWindowLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Fetch round and appeals data
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
        status: 'completed',
        creator: 'Nguyễn Phúc Vinh',
        createdAt: '2025-07-10',
        completionRate: 100,
        participantCount: 150,
        submissionCount: 150,
        gradingCount: 150,
        resultsPublished: true,
        publishedAt: '2025-08-05',
        appealWindow: {
          isOpen: true,
          openedAt: '2025-08-10',
          closesAt: '2025-08-20',
          limit: 2,
          daysLimit: 10
        }
      };
      
      setRound(mockRound);
      
      // Generate mock appeals
      const statuses = ['pending', 'approved', 'rejected'];
      const mockAppeals = Array(15).fill(0).map((_, index) => {
        const status = index < 8 ? 'pending' : 
                      index < 12 ? 'approved' : 'rejected';
        
        return {
          id: index + 1,
          employeeId: 1000 + index,
          employeeName: `Nhân viên ${index + 1}`,
          department: ['Phòng Nhân sự', 'Phòng Kỹ thuật', 'Phòng Kinh doanh'][Math.floor(Math.random() * 3)],
          position: index % 10 === 0 ? 'Trưởng phòng' : 
                   index % 5 === 0 ? 'Team Leader' : 'Nhân viên',
          criterionId: Math.floor(Math.random() * 5) + 1,
          criterionName: ['Kỹ năng giao tiếp', 'Kỹ năng làm việc nhóm', 'Trách nhiệm', 'Chủ động', 'Kiến thức chuyên môn'][Math.floor(Math.random() * 5)],
          originalScore: (Math.random() * 2 + 2).toFixed(1),
          requestedScore: (Math.random() * 2 + 3).toFixed(1),
          finalScore: status === 'approved' ? (Math.random() * 2 + 3).toFixed(1) : null,
          reason: 'Tôi nghĩ rằng điểm đánh giá chưa phản ánh đúng năng lực của tôi trong tiêu chí này.',
          evidence: ['Báo cáo dự án.pdf', 'Đánh giá từ khách hàng.xlsx'],
          submittedAt: moment().subtract(Math.floor(Math.random() * 5) + 1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          status,
          reviewerId: status !== 'pending' ? 500 : null,
          reviewerName: status !== 'pending' ? 'Nguyễn Phúc Vinh' : null,
          reviewedAt: status !== 'pending' ? moment().subtract(Math.floor(Math.random() * 2), 'days').format('YYYY-MM-DD HH:mm:ss') : null,
          reviewNote: status !== 'pending' ? 'Đã xem xét bằng chứng và điều chỉnh điểm phù hợp.' : null,
          history: [
            {
              time: moment().subtract(Math.floor(Math.random() * 5) + 1, 'days').format('YYYY-MM-DD HH:mm:ss'),
              action: 'submitted',
              actor: `Nhân viên ${index + 1}`,
              note: 'Đã gửi yêu cầu phúc khảo'
            }
          ]
        };
      });
      
      // Add more history items based on status
      mockAppeals.forEach(appeal => {
        if (appeal.status !== 'pending') {
          appeal.history.push({
            time: appeal.reviewedAt,
            action: appeal.status,
            actor: appeal.reviewerName,
            note: appeal.status === 'approved' ? 
              `Đã phê duyệt và điều chỉnh điểm từ ${appeal.originalScore} thành ${appeal.finalScore}` : 
              'Đã từ chối yêu cầu phúc khảo'
          });
        }
      });
      
      setAppeals(mockAppeals);
      setFilteredAppeals(mockAppeals);
      
      // Calculate stats
      const stats = {
        total: mockAppeals.length,
        pending: mockAppeals.filter(a => a.status === 'pending').length,
        approved: mockAppeals.filter(a => a.status === 'approved').length,
        rejected: mockAppeals.filter(a => a.status === 'rejected').length
      };
      
      setStats(stats);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Apply filters
  useEffect(() => {
    if (!appeals.length) return;
    
    let filtered = [...appeals];
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(a => a.status === filterStatus);
    }
    
    // Apply search
    if (searchText) {
      filtered = filtered.filter(a => 
        a.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
        a.criterionName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredAppeals(filtered);
  }, [appeals, filterStatus, searchText]);

  // Show appeal details
  const showAppealDetails = (appeal) => {
    setSelectedAppeal(appeal);
    setDrawerVisible(true);
  };

  // Handle open appeal window
  const handleOpenWindow = async () => {
    try {
      const values = await form.validateFields();
      
      setOpenWindowLoading(true);
      
      // Mock API call
      setTimeout(() => {
        setRound(prev => ({
          ...prev,
          appealWindow: {
            isOpen: true,
            openedAt: moment().format('YYYY-MM-DD'),
            closesAt: moment().add(values.daysLimit, 'days').format('YYYY-MM-DD'),
            limit: values.limit,
            daysLimit: values.daysLimit
          }
        }));
        
        message.success('Đã mở cửa sổ phúc khảo thành công');
        setOpenWindowLoading(false);
        setModalVisible(false);
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle close appeal window
  const handleCloseWindow = () => {
    setCloseWindowLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setRound(prev => ({
        ...prev,
        appealWindow: {
          ...prev.appealWindow,
          isOpen: false
        }
      }));
      
      message.success('Đã đóng cửa sổ phúc khảo thành công');
      setCloseWindowLoading(false);
    }, 1000);
  };

  // Handle approve appeal
  const handleApprove = async () => {
    try {
      const values = await form.validateFields();
      
      setApproveLoading(true);
      
      // Prepare data
      const updatedAppeal = { ...selectedAppeal };
      updatedAppeal.status = 'approved';
      updatedAppeal.reviewerId = 500;
      updatedAppeal.reviewerName = 'Nguyễn Phúc Vinh';
      updatedAppeal.reviewedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      updatedAppeal.reviewNote = values.reviewNote;
      updatedAppeal.finalScore = values.finalScore;
      
      // Add history item
      updatedAppeal.history.push({
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        action: 'approved',
        actor: 'Nguyễn Phúc Vinh',
        note: `Đã phê duyệt và điều chỉnh điểm từ ${updatedAppeal.originalScore} thành ${values.finalScore}`
      });
      
      // Mock API call
      setTimeout(() => {
        // Update appeals
        setAppeals(prev => 
          prev.map(a => a.id === updatedAppeal.id ? updatedAppeal : a)
        );
        
        // Update stats
        setStats(prev => ({
          ...prev,
          pending: prev.pending - 1,
          approved: prev.approved + 1
        }));
        
        message.success('Đã phê duyệt yêu cầu phúc khảo thành công');
        setApproveLoading(false);
        setDrawerVisible(false);
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle reject appeal
  const handleReject = async () => {
    try {
      const values = await form.validateFields(['reviewNote']);
      
      setRejectLoading(true);
      
      // Prepare data
      const updatedAppeal = { ...selectedAppeal };
      updatedAppeal.status = 'rejected';
      updatedAppeal.reviewerId = 500;
      updatedAppeal.reviewerName = 'Nguyễn Phúc Vinh';
      updatedAppeal.reviewedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      updatedAppeal.reviewNote = values.reviewNote;
      
      // Add history item
      updatedAppeal.history.push({
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        action: 'rejected',
        actor: 'Nguyễn Phúc Vinh',
        note: 'Đã từ chối yêu cầu phúc khảo'
      });
      
      // Mock API call
      setTimeout(() => {
        // Update appeals
        setAppeals(prev => 
          prev.map(a => a.id === updatedAppeal.id ? updatedAppeal : a)
        );
        
        // Update stats
        setStats(prev => ({
          ...prev,
          pending: prev.pending - 1,
          rejected: prev.rejected + 1
        }));
        
        message.success('Đã từ chối yêu cầu phúc khảo thành công');
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

  // Get file icon
  const getFileIcon = (filename) => {
    if (filename.endsWith('.pdf')) {
      return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
    } else if (filename.endsWith('.xlsx') || filename.endsWith('.xls')) {
      return <FileExcelOutlined style={{ color: '#52c41a' }} />;
    } else {
      return <FileTextOutlined />;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Người yêu cầu',
      key: 'employee',
      render: (_, record) => (
        <div>
          <div>{record.employeeName}</div>
          <Text type="secondary">{record.department}</Text>
        </div>
      )
    },
    {
      title: 'Tiêu chí',
      dataIndex: 'criterionName',
      key: 'criterionName'
    },
    {
      title: 'Điểm cũ',
      dataIndex: 'originalScore',
      key: 'originalScore',
      render: (score) => <Badge count={score} style={{ backgroundColor: '#faad14' }} />
    },
    {
      title: 'Đề nghị',
      dataIndex: 'requestedScore',
      key: 'requestedScore',
      render: (score) => <Badge count={score} style={{ backgroundColor: '#1890ff' }} />
    },
    {
      title: 'Điểm mới',
      key: 'finalScore',
      render: (_, record) => (
        record.finalScore ? 
        <Badge count={record.finalScore} style={{ backgroundColor: '#52c41a' }} /> : 
        '-'
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => getStatusTag(record.status)
    },
    {
      title: 'Ngày gửi',
      key: 'submittedAt',
      render: (_, record) => moment(record.submittedAt).format('DD/MM/YYYY')
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => showAppealDetails(record)}
        >
          {record.status === 'pending' ? 'Xem xét' : 'Chi tiết'}
        </Button>
      )
    }
  ];

  return (
    <div className="appeals-list-container">
      <div className="appeals-list-header">
        <div className="appeals-list-title">
          <Title level={2}>Phúc khảo</Title>
          <Text>{round?.name}</Text>
        </div>
        <div className="appeals-list-actions">
          <Space>
            {round?.appealWindow?.isOpen ? (
              <Popconfirm
                title="Đóng cửa sổ phúc khảo"
                description="Bạn có chắc chắn muốn đóng cửa sổ phúc khảo? Nhân viên sẽ không thể gửi yêu cầu phúc khảo mới."
                onConfirm={handleCloseWindow}
                okText="Đóng"
                cancelText="Hủy"
              >
                <Button 
                  type="primary" 
                  danger
                  icon={<LockOutlined />}
                  loading={closeWindowLoading}
                >
                  Đóng cửa sổ phúc khảo
                </Button>
              </Popconfirm>
            ) : (
              <Button 
                type="primary" 
                icon={<UnlockOutlined />}
                onClick={() => setModalVisible(true)}
              >
                Mở cửa sổ phúc khảo
              </Button>
            )}
            <Button>
              <Link to={`/assessment/rounds/${round?.id}/results`}>Xem kết quả</Link>
            </Button>
            <Button>
              <Link to="/assessment/rounds">Quay lại danh sách</Link>
            </Button>
          </Space>
        </div>
      </div>
      
      {round?.appealWindow?.isOpen ? (
        <Alert
          message="Cửa sổ phúc khảo đang mở"
          description={`Nhân viên có thể gửi tối đa ${round.appealWindow.limit} yêu cầu phúc khảo từ ${moment(round.appealWindow.openedAt).format('DD/MM/YYYY')} đến ${moment(round.appealWindow.closesAt).format('DD/MM/YYYY')}.`}
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
      ) : (
        <Alert
          message="Cửa sổ phúc khảo đang đóng"
          description="Nhân viên không thể gửi yêu cầu phúc khảo mới. Bạn có thể mở cửa sổ phúc khảo bằng cách nhấn nút 'Mở cửa sổ phúc khảo'."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      <Row gutter={16} className="appeals-stats">
        <Col span={6}>
          <Card>
            <Statistic 
              title="Tổng số yêu cầu" 
              value={stats.total} 
              valueStyle={{ color: '#1890ff' }}
            />
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
      
      <Card className="appeals-list-filters">
        <div className="filter-container">
          <Space>
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
                placeholder="Tìm kiếm theo tên, tiêu chí..."
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
      
      <Card className="appeals-list-table">
        <Table
          dataSource={filteredAppeals}
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
              {selectedAppeal?.employeeName}
              <div className="drawer-subtitle">
                <Text type="secondary">{selectedAppeal?.position} - {selectedAppeal?.department}</Text>
              </div>
            </div>
            <div>
              {selectedAppeal && getStatusTag(selectedAppeal.status)}
            </div>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={700}
        footer={
          selectedAppeal?.status === 'pending' ? (
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
        {selectedAppeal && (
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              finalScore: selectedAppeal.requestedScore,
              reviewNote: selectedAppeal.reviewNote || ''
            }}
          >
            <div className="appeal-details">
              <div className="appeal-summary">
                <div className="summary-item">
                  <Text>Tiêu chí:</Text>
                  <Text strong>{selectedAppeal.criterionName}</Text>
                </div>
                <div className="summary-item">
                  <Text>Điểm cũ:</Text>
                  <Badge count={selectedAppeal.originalScore} style={{ backgroundColor: '#faad14' }} />
                </div>
                <div className="summary-item">
                  <Text>Đề nghị:</Text>
                  <Badge count={selectedAppeal.requestedScore} style={{ backgroundColor: '#1890ff' }} />
                </div>
                {selectedAppeal.finalScore && (
                  <div className="summary-item">
                    <Text>Điểm mới:</Text>
                    <Badge count={selectedAppeal.finalScore} style={{ backgroundColor: '#52c41a' }} />
                  </div>
                )}
              </div>
              
              <Divider />
              
              <div className="appeal-reason">
                <Title level={5}>Lý do yêu cầu phúc khảo:</Title>
                <Paragraph>{selectedAppeal.reason}</Paragraph>
              </div>
              
              <div className="appeal-evidence">
                <Title level={5}>Bằng chứng đính kèm:</Title>
                <List
                  size="small"
                  dataSource={selectedAppeal.evidence}
                  renderItem={item => (
                    <List.Item>
                      <Space>
                        {getFileIcon(item)}
                        <Text>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
              
              <Divider />
              
              {selectedAppeal.status === 'pending' ? (
                <div className="appeal-review">
                  <Title level={5}>Xem xét yêu cầu:</Title>
                  <Form.Item
                    name="finalScore"
                    label="Điểm sau phúc khảo"
                    rules={[{ required: true, message: 'Vui lòng nhập điểm sau phúc khảo' }]}
                  >
                    <InputNumber 
                      min={1} 
                      max={5} 
                      step={0.1} 
                      style={{ width: '100%' }} 
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="reviewNote"
                    label="Ghi chú"
                    rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="Nhập ghi chú về quyết định phúc khảo"
                    />
                  </Form.Item>
                </div>
              ) : (
                <div className="appeal-review">
                  <Title level={5}>Kết quả xem xét:</Title>
                  <div className="review-info">
                    <div className="review-item">
                      <Text>Người xem xét:</Text>
                      <Text strong>{selectedAppeal.reviewerName}</Text>
                    </div>
                    <div className="review-item">
                      <Text>Ngày xem xét:</Text>
                      <Text>{moment(selectedAppeal.reviewedAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
                    </div>
                    <div className="review-item">
                      <Text>Ghi chú:</Text>
                      <Paragraph>{selectedAppeal.reviewNote}</Paragraph>
                    </div>
                  </div>
                </div>
              )}
              
              <Divider />
              
              <div className="appeal-history">
                <Title level={5}>Nhật ký:</Title>
                <Timeline>
                  {selectedAppeal.history.map((item, index) => (
                    <Timeline.Item 
                      key={index} 
                      color={
                        item.action === 'submitted' ? 'blue' : 
                        item.action === 'approved' ? 'green' : 
                        item.action === 'rejected' ? 'red' : 'gray'
                      }
                    >
                      <div className="timeline-item">
                        <div className="timeline-content">
                          <Text strong>{item.actor}</Text>: {item.note}
                        </div>
                        <div className="timeline-time">{moment(item.time).format('DD/MM/YYYY HH:mm:ss')}</div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </div>
          </Form>
        )}
      </Drawer>
      
      <Modal
        title="Mở cửa sổ phúc khảo"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleOpenWindow}
            loading={openWindowLoading}
          >
            Mở
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            limit: 2,
            daysLimit: 10
          }}
        >
          <Form.Item
            name="limit"
            label="Số lượng yêu cầu tối đa mỗi người"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng yêu cầu tối đa' }]}
          >
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="daysLimit"
            label="Thời hạn (ngày)"
            rules={[{ required: true, message: 'Vui lòng nhập thời hạn' }]}
          >
            <InputNumber min={1} max={30} style={{ width: '100%' }} />
          </Form.Item>
          
          <Alert
            message="Lưu ý"
            description="Sau khi mở cửa sổ phúc khảo, nhân viên có thể gửi yêu cầu phúc khảo trong thời hạn quy định. Bạn có thể đóng cửa sổ phúc khảo bất cứ lúc nào."
            type="info"
            showIcon
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AppealsList;
