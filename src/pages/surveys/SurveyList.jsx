import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Progress, 
  Tooltip,
  Modal,
  message,
  Row,
  Col,
  Statistic,
  Badge,
  Avatar,
  Typography,
  Dropdown,
  Menu,
  Empty
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EyeOutlined, 
  EditOutlined, 
  PlayCircleOutlined,
  PauseCircleOutlined,
  BarChartOutlined,
  DeleteOutlined,
  FilterOutlined,
  MoreOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SendOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { surveys } from '../../data/mockData';
import dayjs from '../../utils/dayjs';
import DeclineSurveyModal from '../../components/surveys/DeclineSurveyModal';
import './SurveyList.css';

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

/**
 * Màn hình danh sách khảo sát
 */
const SurveyList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [surveyData, setSurveyData] = useState(surveys);
  const [filteredData, setFilteredData] = useState(surveys);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  // Filter data based on search and status
  useEffect(() => {
    let filtered = surveyData;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(survey => 
        survey.name.toLowerCase().includes(searchText.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchText.toLowerCase()) ||
        survey.createdBy.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(survey => survey.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchText, statusFilter, surveyData]);

  // Get status tag with modern design
  const getStatusTag = (status) => {
    const statusConfig = {
      draft: { 
        color: '#8c8c8c', 
        bg: '#f5f5f5', 
        text: 'Bản nháp',
        icon: <FileTextOutlined /> 
      },
      published: { 
        color: '#1890ff', 
        bg: '#e6f7ff', 
        text: 'Đã phát hành',
        icon: <SendOutlined />
      },
      running: { 
        color: '#52c41a', 
        bg: '#f6ffed', 
        text: 'Đang chạy',
        icon: <ClockCircleOutlined />
      },
      closed: { 
        color: '#ff4d4f', 
        bg: '#fff1f0', 
        text: 'Đã đóng',
        icon: <CloseCircleOutlined />
      },
      archived: { 
        color: '#d9d9d9', 
        bg: '#fafafa', 
        text: 'Lưu trữ',
        icon: <CheckCircleOutlined />
      }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Tag 
        icon={config.icon}
        style={{ 
          color: config.color,
          background: config.bg,
          border: `1px solid ${config.color}`,
          borderRadius: '6px',
          padding: '4px 12px',
          fontWeight: 500
        }}
      >
        {config.text}
      </Tag>
    );
  };

  // Handle actions
  const handleView = (record) => {
    navigate(`/surveys/${record.id}`);
  };

  const handleEdit = (record) => {
    if (record.status === 'running' || record.status === 'closed') {
      message.warning('Không thể chỉnh sửa khảo sát đang chạy hoặc đã đóng');
      return;
    }
    navigate(`/surveys/${record.id}/edit`);
  };

  const handlePublish = (record) => {
    if (record.status !== 'draft') {
      message.warning('Chỉ có thể phát hành khảo sát ở trạng thái bản nháp');
      return;
    }
    
    Modal.confirm({
      title: 'Phát hành khảo sát',
      content: `Bạn có chắc chắn muốn phát hành khảo sát "${record.name}"?`,
      onOk: () => {
        // Simulate API call
        message.success('Khảo sát đã được phát hành thành công');
        // Update status
        setSurveyData(prev => prev.map(s => 
          s.id === record.id ? { ...s, status: 'published' } : s
        ));
      }
    });
  };

  const handleMonitor = (record) => {
    navigate(`/surveys/${record.id}/monitor`);
  };

  const handleDelete = (record) => {
    if (record.status === 'running') {
      message.warning('Không thể xóa khảo sát đang chạy');
      return;
    }

    Modal.confirm({
      title: 'Xóa khảo sát',
      content: `Bạn có chắc chắn muốn xóa khảo sát "${record.name}"?`,
      okType: 'danger',
      onOk: () => {
        setSurveyData(prev => prev.filter(s => s.id !== record.id));
        message.success('Khảo sát đã được xóa');
      }
    });
  };

  // Render action menu
  const renderActionMenu = (record) => {
    const items = [
      {
        key: 'view',
        label: 'Xem chi tiết',
        icon: <EyeOutlined />,
        onClick: () => handleView(record)
      },
      record.status === 'draft' && {
        key: 'edit',
        label: 'Chỉnh sửa',
        icon: <EditOutlined />,
        onClick: () => handleEdit(record)
      },
      record.status === 'draft' && {
        key: 'publish',
        label: 'Phát hành',
        icon: <PlayCircleOutlined />,
        onClick: () => handlePublish(record)
      },
      (record.status === 'running' || record.status === 'closed') && {
        key: 'monitor',
        label: 'Theo dõi',
        icon: <BarChartOutlined />,
        onClick: () => handleMonitor(record)
      },
      record.status === 'running' && {
        key: 'decline',
        label: 'Từ chối tham gia',
        icon: <CloseCircleOutlined />,
        danger: true,
        onClick: () => {
          setSelectedSurvey(record);
          setDeclineModalVisible(true);
        }
      },
      { type: 'divider' },
      record.status !== 'running' && {
        key: 'delete',
        label: 'Xóa',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDelete(record)
      }
    ].filter(Boolean);

    return <Menu items={items} />;
  };

  // Handle decline survey
  const handleDecline = async (data) => {
    try {
      // Mock API call
      console.log('Decline survey:', selectedSurvey.id, data);
      message.success('Đã ghi nhận lý do từ chối');
      setDeclineModalVisible(false);
      setSelectedSurvey(null);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  // Table columns with modern design
  const columns = [
    {
      title: 'Tên khảo sát',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size={48}
            style={{ 
              backgroundColor: '#1890ff',
              flexShrink: 0
            }}
            icon={<FileTextOutlined />}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontWeight: 600, 
              fontSize: '14px',
              marginBottom: '4px',
              color: '#262626',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {text}
            </div>
            <div style={{ 
              fontSize: '13px', 
              color: '#8c8c8c',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {record.description}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Tiến độ phản hồi',
      key: 'progress',
      width: 220,
      render: (_, record) => (
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <Text strong style={{ fontSize: '14px' }}>
              {record.responseRate.toFixed(1)}%
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.totalResponses}/{record.totalInvitations}
            </Text>
          </div>
          <Progress 
            percent={record.responseRate} 
            size="small"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            status={record.responseRate < 50 ? 'exception' : 'success'}
            showInfo={false}
          />
        </div>
      )
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 150
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Hạn cuối',
      dataIndex: 'dueAt',
      key: 'dueAt',
      width: 120,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '-'
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleView(record)}
              style={{ color: '#1890ff' }}
            />
          </Tooltip>
          <Dropdown 
            overlay={renderActionMenu(record)}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button 
              type="text" 
              icon={<MoreOutlined />}
              style={{ color: '#8c8c8c' }}
            />
          </Dropdown>
        </Space>
      )
    }
  ];

  // Row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.status === 'running'
    })
  };

  // Summary statistics
  const stats = {
    total: surveyData.length,
    draft: surveyData.filter(s => s.status === 'draft').length,
    running: surveyData.filter(s => s.status === 'running').length,
    closed: surveyData.filter(s => s.status === 'closed').length
  };

  return (
    <div className="survey-list-page" style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>
            📋 Phân phối Khảo sát
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Quản lý và theo dõi các khảo sát nhu cầu đào tạo
          </Text>
        </div>
        <Button 
          type="primary" 
          size="large"
          icon={<PlusOutlined />}
          onClick={() => navigate('/surveys/new')}
          style={{
            borderRadius: '8px',
            height: '44px',
            paddingLeft: '24px',
            paddingRight: '24px',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(24, 144, 255, 0.2)'
          }}
        >
          Tạo khảo sát mới
        </Button>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <Statistic 
              title={<span style={{ fontSize: '14px', color: '#8c8c8c' }}>Tổng số khảo sát</span>}
              value={stats.total} 
              prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#262626', fontSize: '28px', fontWeight: 600 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <Statistic 
              title={<span style={{ fontSize: '14px', color: '#8c8c8c' }}>Bản nháp</span>}
              value={stats.draft} 
              prefix={<EditOutlined style={{ color: '#8c8c8c' }} />}
              valueStyle={{ color: '#8c8c8c', fontSize: '28px', fontWeight: 600 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <Statistic 
              title={<span style={{ fontSize: '14px', color: '#8c8c8c' }}>Đang chạy</span>}
              value={stats.running} 
              prefix={<ClockCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontSize: '28px', fontWeight: 600 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <Statistic 
              title={<span style={{ fontSize: '14px', color: '#8c8c8c' }}>Đã hoàn thành</span>}
              value={stats.closed} 
              prefix={<CheckCircleOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f', fontSize: '28px', fontWeight: 600 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card 
        bordered={false}
        style={{ 
          marginBottom: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={10}>
            <Search
              placeholder="Tìm kiếm theo tên, mô tả, người tạo..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size="large"
              style={{ width: '100%' }}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              size="large"
              style={{ width: '100%' }}
              placeholder="Lọc theo trạng thái"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="draft">Bản nháp</Option>
              <Option value="published">Đã phát hành</Option>
              <Option value="running">Đang chạy</Option>
              <Option value="closed">Đã đóng</Option>
              <Option value="archived">Lưu trữ</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Space wrap>
              {selectedRowKeys.length > 0 && (
                <>
                  <Badge count={selectedRowKeys.length} offset={[-5, 5]}>
                    <Button 
                      icon={<DeleteOutlined />}
                      danger
                      style={{ borderRadius: '6px' }}
                    >
                      Xóa đã chọn
                    </Button>
                  </Badge>
                  <Badge count={selectedRowKeys.length} offset={[-5, 5]}>
                    <Button 
                      icon={<PlayCircleOutlined />}
                      type="primary"
                      style={{ borderRadius: '6px' }}
                    >
                      Phát hành
                    </Button>
                  </Badge>
                </>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card 
        bordered={false}
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Chưa có khảo sát nào"
              >
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/surveys/new')}
                >
                  Tạo khảo sát đầu tiên
                </Button>
              </Empty>
            )
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ x: 1200 }}
          rowClassName={(record, index) => 
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
        />
      </Card>

      <DeclineSurveyModal 
        visible={declineModalVisible}
        onClose={() => {
          setDeclineModalVisible(false);
          setSelectedSurvey(null);
        }}
        onSubmit={handleDecline}
        surveyName={selectedSurvey?.name || ''}
      />
    </div>
  );
};

export default SurveyList;
