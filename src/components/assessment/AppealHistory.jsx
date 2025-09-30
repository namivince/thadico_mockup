import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Tag, 
  Select, 
  DatePicker, 
  Input, 
  Tabs, 
  Descriptions, 
  Divider, 
  Timeline,
  Typography,
  Row,
  Col,
  List,
  Badge,
  Tooltip,
  message,
  Modal
} from 'antd';
import { 
  HistoryOutlined, 
  FileSearchOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  FileExcelOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
  SendOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './AppealHistory.css';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// Mock data for appeals
const mockAppeals = [
  {
    id: 'AP001',
    assessmentId: 8,
    assessmentName: 'Đánh giá kỹ năng lập trình',
    submittedAt: '2025-09-22T10:30:00',
    submittedBy: 'Nguyễn Văn A',
    status: 'completed',
    result: '+5 điểm',
    reason: 'Tôi cho rằng câu trả lời của tôi về thiết kế cơ sở dữ liệu đã đáp ứng đầy đủ yêu cầu của đề bài và xứng đáng được điểm cao hơn.',
    questions: [
      {
        id: 3,
        number: 3,
        content: 'Thiết kế cơ sở dữ liệu',
        maxScore: 15,
        scoreBefore: 8,
        scoreAfter: 13,
        explanation: 'Thiết kế của tôi đã bao gồm đầy đủ các bảng và mối quan hệ theo yêu cầu.'
      }
    ],
    attachments: [
      { name: 'thiet_ke_csdl.pdf', url: '#' }
    ],
    history: [
      { time: '2025-09-22T10:30:00', action: 'Yêu cầu được gửi', actor: 'Nguyễn Văn A' },
      { time: '2025-09-23T14:15:00', action: 'Yêu cầu được tiếp nhận', actor: 'Hệ thống' },
      { time: '2025-09-24T09:45:00', action: 'Yêu cầu đang được xem xét', actor: 'Trần Thị B' },
      { time: '2025-09-25T11:20:00', action: 'Yêu cầu đã được xử lý', actor: 'Trần Thị B' }
    ],
    reviewResult: {
      reviewer: 'Trần Thị B',
      reviewedAt: '2025-09-25T11:20:00',
      decision: 'accept',
      reason: 'Sau khi xem xét lại bài làm và tài liệu đính kèm, tôi nhận thấy thiết kế đã đáp ứng đầy đủ yêu cầu và có một số điểm sáng tạo.',
      scoreBefore: 8,
      scoreAfter: 13
    }
  },
  {
    id: 'AP002',
    assessmentId: 9,
    assessmentName: 'Đánh giá kỹ năng giao tiếp',
    submittedAt: '2025-09-23T15:45:00',
    submittedBy: 'Trần Thị B',
    status: 'reviewing',
    reason: 'Tôi đã trình bày đầy đủ các kỹ năng giao tiếp phi ngôn ngữ nhưng chỉ được 7/15 điểm.',
    questions: [
      {
        id: 2,
        number: 2,
        content: 'Kỹ năng giao tiếp phi ngôn ngữ',
        maxScore: 15,
        scoreBefore: 7,
        explanation: 'Tôi đã trình bày đầy đủ các yếu tố như ánh mắt, cử chỉ, tư thế và biểu cảm khuôn mặt.'
      }
    ],
    attachments: [],
    history: [
      { time: '2025-09-23T15:45:00', action: 'Yêu cầu được gửi', actor: 'Trần Thị B' },
      { time: '2025-09-24T10:20:00', action: 'Yêu cầu được tiếp nhận', actor: 'Hệ thống' },
      { time: '2025-09-25T14:30:00', action: 'Yêu cầu đang được xem xét', actor: 'Lê Thị D' }
    ]
  },
  {
    id: 'AP003',
    assessmentId: 10,
    assessmentName: 'Đánh giá kỹ năng quản lý',
    submittedAt: '2025-09-25T09:15:00',
    submittedBy: 'Lê Văn C',
    status: 'pending',
    reason: 'Tôi cho rằng phần trình bày về quản lý xung đột của tôi đã đáp ứng đầy đủ yêu cầu.',
    questions: [
      {
        id: 4,
        number: 4,
        content: 'Kỹ năng quản lý xung đột',
        maxScore: 20,
        scoreBefore: 12,
        explanation: 'Tôi đã trình bày đầy đủ các phương pháp giải quyết xung đột và đưa ra ví dụ cụ thể.'
      }
    ],
    attachments: [
      { name: 'quan_ly_xung_dot.docx', url: '#' }
    ],
    history: [
      { time: '2025-09-25T09:15:00', action: 'Yêu cầu được gửi', actor: 'Lê Văn C' },
      { time: '2025-09-25T10:30:00', action: 'Yêu cầu được tiếp nhận', actor: 'Hệ thống' }
    ]
  }
];

// Mock data for assessments
const mockAssessments = [
  { id: 8, name: 'Đánh giá kỹ năng lập trình' },
  { id: 9, name: 'Đánh giá kỹ năng giao tiếp' },
  { id: 10, name: 'Đánh giá kỹ năng quản lý' },
  { id: 11, name: 'Đánh giá kỹ năng lãnh đạo' }
];

const AppealHistory = () => {
  const navigate = useNavigate();
  const [appeals, setAppeals] = useState([]);
  const [filteredAppeals, setFilteredAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [filters, setFilters] = useState({
    assessment: 'all',
    status: 'all',
    dateRange: null,
    search: ''
  });

  // Fetch appeals data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAppeals(mockAppeals);
      setFilteredAppeals(mockAppeals);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    if (appeals.length > 0) {
      let result = [...appeals];
      
      // Filter by assessment
      if (filters.assessment !== 'all') {
        result = result.filter(appeal => appeal.assessmentId === parseInt(filters.assessment));
      }
      
      // Filter by status
      if (filters.status !== 'all') {
        result = result.filter(appeal => appeal.status === filters.status);
      }
      
      // Filter by date range
      if (filters.dateRange && filters.dateRange.length === 2) {
        const startDate = filters.dateRange[0].startOf('day');
        const endDate = filters.dateRange[1].endOf('day');
        result = result.filter(appeal => {
          const submittedDate = new Date(appeal.submittedAt);
          return submittedDate >= startDate && submittedDate <= endDate;
        });
      }
      
      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(appeal => 
          appeal.id.toLowerCase().includes(searchLower) || 
          appeal.assessmentName.toLowerCase().includes(searchLower) ||
          appeal.submittedBy.toLowerCase().includes(searchLower) ||
          appeal.reason.toLowerCase().includes(searchLower)
        );
      }
      
      setFilteredAppeals(result);
    }
  }, [appeals, filters]);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };

  // Handle search
  const handleSearch = (value) => {
    setFilters({
      ...filters,
      search: value
    });
  };

  // Handle view appeal details
  const handleViewAppeal = (appeal) => {
    setSelectedAppeal(appeal);
    setDetailVisible(true);
  };

  // Handle process appeal
  const handleProcessAppeal = (appeal) => {
    navigate(`/assessment/rounds/${appeal.assessmentId}/appeals/${appeal.id}/process`);
  };

  // Handle export report
  const handleExportReport = () => {
    message.success('Đang xuất báo cáo lịch sử phúc khảo...');
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render status tag
  const renderStatusTag = (status) => {
    switch (status) {
      case 'pending':
        return <Tag icon={<ClockCircleOutlined />} color="default">Đang chờ xử lý</Tag>;
      case 'reviewing':
        return <Tag icon={<ExclamationCircleOutlined />} color="processing">Đang xem xét</Tag>;
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">Đã hoàn thành</Tag>;
      case 'rejected':
        return <Tag icon={<CloseCircleOutlined />} color="error">Đã từ chối</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'Đánh giá',
      dataIndex: 'assessmentName',
      key: 'assessmentName',
      ellipsis: true
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (date) => formatDate(date)
    },
    {
      title: 'Người gửi',
      dataIndex: 'submittedBy',
      key: 'submittedBy'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status)
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      render: (result) => result ? <Text strong>{result}</Text> : '-'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            size="small" 
            onClick={() => handleViewAppeal(record)}
          >
            Xem
          </Button>
          {(record.status === 'pending' || record.status === 'reviewing') && (
            <Button 
              icon={<EditOutlined />} 
              size="small"
              type="primary"
              onClick={() => handleProcessAppeal(record)}
            >
              Xử lý
            </Button>
          )}
        </Space>
      )
    }
  ];

  // Render appeal detail modal
  const renderAppealDetail = () => {
    if (!selectedAppeal) return null;
    
    return (
      <Modal
        title={
          <Space>
            <FileSearchOutlined />
            <span>Chi tiết yêu cầu phúc khảo</span>
          </Space>
        }
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        width={800}
        footer={[
          <Button 
            key="export" 
            icon={<FileExcelOutlined />} 
            onClick={handleExportReport}
          >
            Xuất báo cáo
          </Button>,
          <Button 
            key="close" 
            onClick={() => setDetailVisible(false)}
          >
            Đóng
          </Button>
        ]}
        className="appeal-detail-modal"
      >
        <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Mã yêu cầu">{selectedAppeal.id}</Descriptions.Item>
          <Descriptions.Item label="Đánh giá">{selectedAppeal.assessmentName}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">{renderStatusTag(selectedAppeal.status)}</Descriptions.Item>
          <Descriptions.Item label="Người gửi">{selectedAppeal.submittedBy}</Descriptions.Item>
          <Descriptions.Item label="Ngày gửi" span={2}>{formatDate(selectedAppeal.submittedAt)}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Lý do phúc khảo</Divider>
        <Paragraph>{selectedAppeal.reason}</Paragraph>

        <Divider orientation="left">Câu hỏi cần phúc khảo</Divider>
        <List
          bordered
          dataSource={selectedAppeal.questions}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`Câu ${item.number}: ${item.content} (${item.maxScore} điểm)`}
                description={
                  <Space direction="vertical">
                    <Text>Điểm trước phúc khảo: {item.scoreBefore}/{item.maxScore}</Text>
                    {item.scoreAfter && (
                      <Text strong type="success">Điểm sau phúc khảo: {item.scoreAfter}/{item.maxScore} ({item.scoreAfter > item.scoreBefore ? '+' : ''}{item.scoreAfter - item.scoreBefore} điểm)</Text>
                    )}
                    <Text type="secondary">Giải thích: {item.explanation}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />

        {selectedAppeal.attachments.length > 0 && (
          <>
            <Divider orientation="left">Tài liệu đính kèm</Divider>
            <List
              bordered
              dataSource={selectedAppeal.attachments}
              renderItem={item => (
                <List.Item>
                  <Space>
                    <FileTextOutlined />
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                    <Button size="small" icon={<DownloadOutlined />}>Tải xuống</Button>
                  </Space>
                </List.Item>
              )}
            />
          </>
        )}

        <Divider orientation="left">Lịch sử xử lý</Divider>
        <Timeline mode="left">
          {selectedAppeal.history.map((item, index) => (
            <Timeline.Item 
              key={index} 
              label={formatDate(item.time)}
              color={
                item.action.includes('gửi') ? 'blue' :
                item.action.includes('tiếp nhận') ? 'gray' :
                item.action.includes('xem xét') ? 'orange' :
                item.action.includes('xử lý') ? 'green' : 'blue'
              }
            >
              <Space>
                <Text>{item.action}</Text>
                <Text type="secondary">bởi {item.actor}</Text>
              </Space>
            </Timeline.Item>
          ))}
        </Timeline>

        {selectedAppeal.reviewResult && (
          <>
            <Divider orientation="left">Kết quả phúc khảo</Divider>
            <Card className="review-result-card">
              <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                <Descriptions.Item label="Người xử lý">{selectedAppeal.reviewResult.reviewer}</Descriptions.Item>
                <Descriptions.Item label="Ngày xử lý">{formatDate(selectedAppeal.reviewResult.reviewedAt)}</Descriptions.Item>
                <Descriptions.Item label="Quyết định">
                  {selectedAppeal.reviewResult.decision === 'accept' ? (
                    <Tag color="success">Chấp nhận</Tag>
                  ) : (
                    <Tag color="error">Từ chối</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Thay đổi điểm">
                  <Text strong>{selectedAppeal.reviewResult.scoreBefore} → {selectedAppeal.reviewResult.scoreAfter} ({selectedAppeal.reviewResult.scoreAfter > selectedAppeal.reviewResult.scoreBefore ? '+' : ''}{selectedAppeal.reviewResult.scoreAfter - selectedAppeal.reviewResult.scoreBefore})</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Lý do" span={2}>
                  {selectedAppeal.reviewResult.reason}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </>
        )}
      </Modal>
    );
  };

  return (
    <div className="appeal-history">
      <Card 
        title={
          <Space>
            <HistoryOutlined />
            <span>Lịch sử phúc khảo</span>
          </Space>
        }
        className="appeal-history-card"
      >
        {/* Filters */}
        <div className="appeal-filters">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={6} md={5} lg={5}>
              <Select
                placeholder="Chọn đánh giá"
                value={filters.assessment}
                onChange={(value) => handleFilterChange('assessment', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả đánh giá</Option>
                {mockAssessments.map(assessment => (
                  <Option key={assessment.id} value={assessment.id}>{assessment.name}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={6} md={5} lg={5}>
              <Select
                placeholder="Chọn trạng thái"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="pending">Đang chờ xử lý</Option>
                <Option value="reviewing">Đang xem xét</Option>
                <Option value="completed">Đã hoàn thành</Option>
                <Option value="rejected">Đã từ chối</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6}>
              <RangePicker
                placeholder={['Từ ngày', 'Đến ngày']}
                onChange={(dates) => handleFilterChange('dateRange', dates)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={6} md={8} lg={8}>
              <Search
                placeholder="Tìm kiếm yêu cầu phúc khảo"
                onSearch={handleSearch}
                allowClear
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </div>

        {/* Appeals Table */}
        <Table
          columns={columns}
          dataSource={filteredAppeals}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          className="appeals-table"
        />

        {/* Appeal Detail Modal */}
        {renderAppealDetail()}
      </Card>
    </div>
  );
};

export default AppealHistory;
