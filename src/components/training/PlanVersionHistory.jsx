import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Table, 
  Button, 
  Space, 
  Tabs, 
  Descriptions, 
  Tag, 
  Row, 
  Col, 
  Card, 
  Typography, 
  Divider,
  List,
  Tooltip,
  message,
  Popconfirm,
  Badge
} from 'antd';
import { 
  HistoryOutlined, 
  EyeOutlined, 
  SwapOutlined, 
  RollbackOutlined,
  FileExcelOutlined,
  PlusOutlined,
  MinusOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import './PlanVersionHistory.css';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

// Mock data for plan versions
const mockPlanVersions = [
  {
    id: 1,
    version: 'v2.0',
    date: '2025-02-25T15:30:00',
    user: 'Trần Thị B',
    description: 'Cập nhật ngân sách và thêm khóa học',
    details: {
      name: 'Đào tạo kỹ năng mềm 2025',
      description: 'Kế hoạch đào tạo kỹ năng mềm cho nhân viên marketing',
      budget: 250000000,
      timeRange: ['2025-04-01', '2025-06-30'],
      courses: [
        { id: 1, name: 'Kỹ năng thuyết trình', status: 'active' },
        { id: 2, name: 'Kỹ năng làm việc nhóm', status: 'active' },
        { id: 3, name: 'Kỹ năng quản lý thời gian', status: 'active' },
        { id: 4, name: 'Kỹ năng giao tiếp', status: 'active' },
        { id: 5, name: 'Kỹ năng đàm phán', status: 'active' },
        { id: 6, name: 'Kỹ năng giải quyết vấn đề', status: 'active' },
        { id: 7, name: 'Kỹ năng tư duy sáng tạo', status: 'active' },
        { id: 8, name: 'Kỹ năng lãnh đạo', status: 'active', isNew: true }
      ],
      department: 'Phòng Marketing',
      status: 'waiting_approval',
      approvalLevel: 2,
      changes: [
        { type: 'update', field: 'budget', oldValue: '220,000,000', newValue: '250,000,000' },
        { type: 'add', field: 'courses', value: 'Kỹ năng lãnh đạo' }
      ]
    }
  },
  {
    id: 2,
    version: 'v1.1',
    date: '2025-02-20T10:15:00',
    user: 'Hoàng Thị E',
    description: 'Điều chỉnh thời gian thực hiện',
    details: {
      name: 'Đào tạo kỹ năng mềm 2025',
      description: 'Kế hoạch đào tạo kỹ năng mềm cho nhân viên marketing',
      budget: 220000000,
      timeRange: ['2025-04-01', '2025-06-30'],
      courses: [
        { id: 1, name: 'Kỹ năng thuyết trình', status: 'active' },
        { id: 2, name: 'Kỹ năng làm việc nhóm', status: 'active' },
        { id: 3, name: 'Kỹ năng quản lý thời gian', status: 'active' },
        { id: 4, name: 'Kỹ năng giao tiếp', status: 'active' },
        { id: 5, name: 'Kỹ năng đàm phán', status: 'active' },
        { id: 6, name: 'Kỹ năng giải quyết vấn đề', status: 'active' },
        { id: 7, name: 'Kỹ năng tư duy sáng tạo', status: 'active' }
      ],
      department: 'Phòng Marketing',
      status: 'waiting_approval',
      approvalLevel: 1,
      changes: [
        { type: 'update', field: 'timeRange', oldValue: '01/03/2025 - 31/05/2025', newValue: '01/04/2025 - 30/06/2025' }
      ]
    }
  },
  {
    id: 3,
    version: 'v1.0',
    date: '2025-02-15T09:45:00',
    user: 'Hoàng Thị E',
    description: 'Phiên bản ban đầu',
    details: {
      name: 'Đào tạo kỹ năng mềm 2025',
      description: 'Kế hoạch đào tạo kỹ năng mềm cho nhân viên marketing',
      budget: 220000000,
      timeRange: ['2025-03-01', '2025-05-31'],
      courses: [
        { id: 1, name: 'Kỹ năng thuyết trình', status: 'active' },
        { id: 2, name: 'Kỹ năng làm việc nhóm', status: 'active' },
        { id: 3, name: 'Kỹ năng quản lý thời gian', status: 'active' },
        { id: 4, name: 'Kỹ năng giao tiếp', status: 'active' },
        { id: 5, name: 'Kỹ năng đàm phán', status: 'active' },
        { id: 6, name: 'Kỹ năng giải quyết vấn đề', status: 'active' },
        { id: 7, name: 'Kỹ năng tư duy sáng tạo', status: 'active' }
      ],
      department: 'Phòng Marketing',
      status: 'draft',
      approvalLevel: 0,
      changes: []
    }
  }
];

const PlanVersionHistory = ({ visible, onClose, planId }) => {
  const [activeTab, setActiveTab] = useState('list');
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [compareVersions, setCompareVersions] = useState({
    left: null,
    right: null
  });

  // Fetch versions data
  useEffect(() => {
    if (visible) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setVersions(mockPlanVersions);
        setLoading(false);
        
        // Set default selected version to latest
        if (mockPlanVersions.length > 0) {
          setSelectedVersion(mockPlanVersions[0]);
          
          // Set default compare versions if there are at least 2 versions
          if (mockPlanVersions.length >= 2) {
            setCompareVersions({
              left: mockPlanVersions[1],
              right: mockPlanVersions[0]
            });
          }
        }
      }, 1000);
    }
  }, [visible, planId]);

  // Handle view version
  const handleViewVersion = (version) => {
    setSelectedVersion(version);
    setActiveTab('view');
  };

  // Handle compare versions
  const handleCompareVersions = (version1, version2) => {
    setCompareVersions({
      left: version1,
      right: version2
    });
    setActiveTab('compare');
  };

  // Handle restore version
  const handleRestoreVersion = (version) => {
    message.success(`Đã khôi phục về phiên bản ${version.version}`);
    onClose();
  };

  // Handle export report
  const handleExportReport = () => {
    message.success('Đang xuất báo cáo lịch sử phiên bản...');
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

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Format date range
  const formatDateRange = (dateRange) => {
    if (!dateRange || dateRange.length !== 2) return '';
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
    return `${startDate.toLocaleDateString('vi-VN')} - ${endDate.toLocaleDateString('vi-VN')}`;
  };

  // Render change type icon
  const renderChangeTypeIcon = (type) => {
    switch (type) {
      case 'add':
        return <PlusOutlined style={{ color: '#22C55E' }} />;
      case 'remove':
        return <MinusOutlined style={{ color: '#EF4444' }} />;
      case 'update':
        return <EditOutlined style={{ color: '#F59E0B' }} />;
      default:
        return null;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Phiên bản',
      dataIndex: 'version',
      key: 'version',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Ngày chỉnh sửa',
      dataIndex: 'date',
      key: 'date',
      render: (date) => formatDate(date)
    },
    {
      title: 'Người chỉnh sửa',
      dataIndex: 'user',
      key: 'user'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            size="small" 
            onClick={() => handleViewVersion(record)}
          >
            Xem
          </Button>
          <Button 
            icon={<SwapOutlined />} 
            size="small"
            onClick={() => {
              // Compare with the next version if available, otherwise with the previous
              const currentIndex = versions.findIndex(v => v.id === record.id);
              const compareWithIndex = currentIndex < versions.length - 1 ? currentIndex + 1 : currentIndex - 1;
              if (compareWithIndex >= 0) {
                handleCompareVersions(versions[compareWithIndex], record);
              } else {
                message.info('Không có phiên bản để so sánh');
              }
            }}
            disabled={versions.length < 2}
          >
            So sánh
          </Button>
          <Popconfirm
            title="Khôi phục phiên bản này?"
            description="Bạn có chắc chắn muốn khôi phục về phiên bản này? Hệ thống sẽ tạo một phiên bản mới dựa trên phiên bản này."
            onConfirm={() => handleRestoreVersion(record)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button 
              icon={<RollbackOutlined />} 
              size="small"
              type="primary"
              ghost
            >
              Khôi phục
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  // Render version details
  const renderVersionDetails = (version) => {
    if (!version) return null;
    
    return (
      <div className="version-details">
        <Descriptions 
          title={<Space><Tag color="blue">{version.version}</Tag> Chi tiết phiên bản</Space>}
          bordered
          column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Tên kế hoạch">{version.details.name}</Descriptions.Item>
          <Descriptions.Item label="Ngày chỉnh sửa">{formatDate(version.date)}</Descriptions.Item>
          <Descriptions.Item label="Người chỉnh sửa">{version.user}</Descriptions.Item>
          <Descriptions.Item label="Mô tả kế hoạch">{version.details.description}</Descriptions.Item>
          <Descriptions.Item label="Phòng ban">{version.details.department}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {version.details.status === 'draft' && <Tag color="default">Nháp</Tag>}
            {version.details.status === 'waiting_approval' && (
              <Tag color="warning">Chờ duyệt (Cấp {version.details.approvalLevel}/3)</Tag>
            )}
            {version.details.status === 'approved' && <Tag color="success">Đã duyệt</Tag>}
            {version.details.status === 'deployed' && <Tag color="processing">Đang triển khai</Tag>}
            {version.details.status === 'completed' && <Tag color="cyan">Hoàn thành</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Ngân sách" span={2}>
            {formatCurrency(version.details.budget)}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian thực hiện" span={2}>
            {formatDateRange(version.details.timeRange)}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Danh sách khóa học ({version.details.courses.length})</Divider>
        
        <List
          bordered
          dataSource={version.details.courses}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    {item.name}
                    {item.isNew && <Badge count="Mới" style={{ backgroundColor: '#52c41a' }} />}
                  </Space>
                }
                description={
                  <Tag color={item.status === 'active' ? 'green' : 'default'}>
                    {item.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </Tag>
                }
              />
            </List.Item>
          )}
        />

        {version.details.changes.length > 0 && (
          <>
            <Divider orientation="left">Các thay đổi</Divider>
            <List
              bordered
              dataSource={version.details.changes}
              renderItem={item => (
                <List.Item>
                  <Space>
                    {renderChangeTypeIcon(item.type)}
                    <Text strong>{item.field === 'courses' ? 'Khóa học' : 'Ngân sách'}</Text>
                    {item.type === 'add' && (
                      <Text type="success">Thêm mới: {item.value}</Text>
                    )}
                    {item.type === 'remove' && (
                      <Text type="danger">Xóa bỏ: {item.value}</Text>
                    )}
                    {item.type === 'update' && (
                      <>
                        <Text type="warning">Thay đổi từ: {item.oldValue}</Text>
                        <Text type="warning">thành: {item.newValue}</Text>
                      </>
                    )}
                  </Space>
                </List.Item>
              )}
            />
          </>
        )}
      </div>
    );
  };

  // Render version comparison
  const renderVersionComparison = () => {
    const { left, right } = compareVersions;
    if (!left || !right) return <div>Vui lòng chọn hai phiên bản để so sánh</div>;

    // Helper function to determine if a field has changed
    const hasChanged = (field) => {
      if (field === 'courses') {
        return JSON.stringify(left.details.courses.map(c => c.name).sort()) !== 
               JSON.stringify(right.details.courses.map(c => c.name).sort());
      }
      return left.details[field] !== right.details[field];
    };

    // Helper function to get added courses
    const getAddedCourses = () => {
      const leftCourses = left.details.courses.map(c => c.name);
      return right.details.courses.filter(c => !leftCourses.includes(c.name));
    };

    // Helper function to get removed courses
    const getRemovedCourses = () => {
      const rightCourses = right.details.courses.map(c => c.name);
      return left.details.courses.filter(c => !rightCourses.includes(c.name));
    };

    return (
      <div className="version-comparison">
        <Title level={4}>So sánh phiên bản</Title>
        
        <Row gutter={16}>
          <Col span={12}>
            <Card 
              title={
                <Space>
                  <Tag color="blue">{left.version}</Tag>
                  <Text>{formatDate(left.date)}</Text>
                  <Text type="secondary">({left.user})</Text>
                </Space>
              }
              className="comparison-card"
            >
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Tên kế hoạch">{left.details.name}</Descriptions.Item>
                <Descriptions.Item label="Mô tả">{left.details.description}</Descriptions.Item>
                <Descriptions.Item 
                  label="Ngân sách"
                  className={hasChanged('budget') ? 'highlight-changed' : ''}
                >
                  {formatCurrency(left.details.budget)}
                </Descriptions.Item>
                <Descriptions.Item 
                  label="Thời gian thực hiện"
                  className={hasChanged('timeRange') ? 'highlight-changed' : ''}
                >
                  {formatDateRange(left.details.timeRange)}
                </Descriptions.Item>
                <Descriptions.Item label="Phòng ban">{left.details.department}</Descriptions.Item>
                <Descriptions.Item 
                  label="Trạng thái"
                  className={hasChanged('status') ? 'highlight-changed' : ''}
                >
                  {left.details.status === 'draft' && <Tag color="default">Nháp</Tag>}
                  {left.details.status === 'waiting_approval' && (
                    <Tag color="warning">Chờ duyệt (Cấp {left.details.approvalLevel}/3)</Tag>
                  )}
                  {left.details.status === 'approved' && <Tag color="success">Đã duyệt</Tag>}
                  {left.details.status === 'deployed' && <Tag color="processing">Đang triển khai</Tag>}
                  {left.details.status === 'completed' && <Tag color="cyan">Hoàn thành</Tag>}
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Danh sách khóa học ({left.details.courses.length})</Divider>
              
              <List
                size="small"
                bordered
                dataSource={left.details.courses}
                renderItem={item => {
                  const isRemoved = getRemovedCourses().some(c => c.name === item.name);
                  return (
                    <List.Item className={isRemoved ? 'highlight-removed' : ''}>
                      <Space>
                        {isRemoved && <MinusOutlined style={{ color: '#EF4444' }} />}
                        {item.name}
                      </Space>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Col>
          
          <Col span={12}>
            <Card 
              title={
                <Space>
                  <Tag color="blue">{right.version}</Tag>
                  <Text>{formatDate(right.date)}</Text>
                  <Text type="secondary">({right.user})</Text>
                </Space>
              }
              className="comparison-card"
            >
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Tên kế hoạch">{right.details.name}</Descriptions.Item>
                <Descriptions.Item label="Mô tả">{right.details.description}</Descriptions.Item>
                <Descriptions.Item 
                  label="Ngân sách"
                  className={hasChanged('budget') ? 'highlight-changed' : ''}
                >
                  {formatCurrency(right.details.budget)}
                </Descriptions.Item>
                <Descriptions.Item 
                  label="Thời gian thực hiện"
                  className={hasChanged('timeRange') ? 'highlight-changed' : ''}
                >
                  {formatDateRange(right.details.timeRange)}
                </Descriptions.Item>
                <Descriptions.Item label="Phòng ban">{right.details.department}</Descriptions.Item>
                <Descriptions.Item 
                  label="Trạng thái"
                  className={hasChanged('status') ? 'highlight-changed' : ''}
                >
                  {right.details.status === 'draft' && <Tag color="default">Nháp</Tag>}
                  {right.details.status === 'waiting_approval' && (
                    <Tag color="warning">Chờ duyệt (Cấp {right.details.approvalLevel}/3)</Tag>
                  )}
                  {right.details.status === 'approved' && <Tag color="success">Đã duyệt</Tag>}
                  {right.details.status === 'deployed' && <Tag color="processing">Đang triển khai</Tag>}
                  {right.details.status === 'completed' && <Tag color="cyan">Hoàn thành</Tag>}
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Danh sách khóa học ({right.details.courses.length})</Divider>
              
              <List
                size="small"
                bordered
                dataSource={right.details.courses}
                renderItem={item => {
                  const isAdded = getAddedCourses().some(c => c.name === item.name);
                  return (
                    <List.Item className={isAdded ? 'highlight-added' : ''}>
                      <Space>
                        {isAdded && <PlusOutlined style={{ color: '#22C55E' }} />}
                        {item.name}
                      </Space>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Col>
        </Row>

        <div className="comparison-legend">
          <Title level={5}>Chú thích:</Title>
          <Space>
            <Badge color="#FFF8E6" text="Thay đổi" />
            <Badge color="#F0FDF4" text="Thêm mới" />
            <Badge color="#FEF2F2" text="Xóa bỏ" />
          </Space>
        </div>
      </div>
    );
  };

  return (
    <Modal
      title={
        <Space>
          <HistoryOutlined />
          <span>Lịch sử phiên bản kế hoạch đào tạo</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={1000}
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
          onClick={onClose}
        >
          Đóng
        </Button>
      ]}
      className="version-history-modal"
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><HistoryOutlined /> Danh sách phiên bản</span>} 
          key="list"
        >
          <Table
            columns={columns}
            dataSource={versions}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </TabPane>
        <TabPane 
          tab={<span><EyeOutlined /> Xem chi tiết</span>} 
          key="view"
          disabled={!selectedVersion}
        >
          {renderVersionDetails(selectedVersion)}
        </TabPane>
        <TabPane 
          tab={<span><SwapOutlined /> So sánh phiên bản</span>} 
          key="compare"
          disabled={versions.length < 2}
        >
          {renderVersionComparison()}
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default PlanVersionHistory;
