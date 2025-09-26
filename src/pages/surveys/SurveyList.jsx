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
  Statistic
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
  FilterOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { surveys } from '../../data/mockData';
import dayjs from '../../utils/dayjs';
import './SurveyList.css';

const { Search } = Input;
const { Option } = Select;

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

  // Get status tag
  const getStatusTag = (status) => {
    const statusConfig = {
      draft: { color: 'default', text: 'Bản nháp' },
      published: { color: 'blue', text: 'Đã phát hành' },
      running: { color: 'green', text: 'Đang chạy' },
      closed: { color: 'red', text: 'Đã đóng' },
      archived: { color: 'gray', text: 'Lưu trữ' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return <Tag color={config.color}>{config.text}</Tag>;
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

  // Table columns
  const columns = [
    {
      title: 'Tên khảo sát',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.description}</div>
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
      title: 'Tiến độ',
      key: 'progress',
      width: 200,
      render: (_, record) => (
        <div>
          <Progress 
            percent={record.responseRate} 
            size="small" 
            status={record.responseRate < 50 ? 'exception' : 'success'}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            {record.totalResponses}/{record.totalInvitations} phản hồi
          </div>
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
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleView(record)}
            />
          </Tooltip>
          
          {record.status === 'draft' && (
            <Tooltip title="Chỉnh sửa">
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
          )}
          
          {record.status === 'draft' && (
            <Tooltip title="Phát hành">
              <Button 
                type="text" 
                icon={<PlayCircleOutlined />} 
                onClick={() => handlePublish(record)}
              />
            </Tooltip>
          )}
          
          {(record.status === 'running' || record.status === 'closed') && (
            <Tooltip title="Theo dõi">
              <Button 
                type="text" 
                icon={<BarChartOutlined />} 
                onClick={() => handleMonitor(record)}
              />
            </Tooltip>
          )}
          
          {record.status !== 'running' && (
            <Tooltip title="Xóa">
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => handleDelete(record)}
              />
            </Tooltip>
          )}
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
    <div className="survey-list-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <h2>Danh sách khảo sát</h2>
          <p>Quản lý các khảo sát nhu cầu đào tạo</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/surveys/new')}
        >
          Tạo khảo sát mới
        </Button>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Tổng số" value={stats.total} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Bản nháp" value={stats.draft} valueStyle={{ color: '#666' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Đang chạy" value={stats.running} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Đã đóng" value={stats.closed} valueStyle={{ color: '#f5222d' }} />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="filter-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Tìm kiếm khảo sát..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              placeholder="Lọc theo trạng thái"
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="draft">Bản nháp</Option>
              <Option value="published">Đã phát hành</Option>
              <Option value="running">Đang chạy</Option>
              <Option value="closed">Đã đóng</Option>
              <Option value="archived">Lưu trữ</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={10}>
            <Space>
              {selectedRowKeys.length > 0 && (
                <>
                  <Button icon={<DeleteOutlined />}>
                    Xóa ({selectedRowKeys.length})
                  </Button>
                  <Button icon={<PlayCircleOutlined />}>
                    Phát hành ({selectedRowKeys.length})
                  </Button>
                </>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} khảo sát`
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default SurveyList;
