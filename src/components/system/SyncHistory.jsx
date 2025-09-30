import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Tooltip, 
  Progress,
  Modal,
  Typography,
  Descriptions,
  Divider,
  message
} from 'antd';
import { 
  SyncOutlined, 
  EyeOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import './SyncHistory.css';

const { Title, Text } = Typography;

// Mock data for sync history
const mockSyncHistory = [
  {
    id: 1,
    time: '2025-09-30T15:30:00',
    connectionId: 1,
    connectionName: 'HR Connect',
    dataType: 'users',
    recordsTotal: 150,
    recordsProcessed: 150,
    errors: 0,
    status: 'success',
    details: {
      added: 5,
      updated: 145,
      deleted: 0,
      failed: 0,
      duration: '00:02:15',
      startTime: '2025-09-30T15:28:00',
      endTime: '2025-09-30T15:30:15'
    }
  },
  {
    id: 2,
    time: '2025-09-30T15:00:00',
    connectionId: 2,
    connectionName: 'LMS Link',
    dataType: 'courses',
    recordsTotal: 45,
    recordsProcessed: 45,
    errors: 0,
    status: 'success',
    details: {
      added: 2,
      updated: 43,
      deleted: 0,
      failed: 0,
      duration: '00:01:30',
      startTime: '2025-09-30T14:58:30',
      endTime: '2025-09-30T15:00:00'
    }
  },
  {
    id: 3,
    time: '2025-09-30T14:00:00',
    connectionId: 3,
    connectionName: 'BI Portal',
    dataType: 'assessment_results',
    recordsTotal: 350,
    recordsProcessed: 230,
    errors: 120,
    status: 'error',
    details: {
      added: 150,
      updated: 80,
      deleted: 0,
      failed: 120,
      duration: '00:05:45',
      startTime: '2025-09-30T13:55:00',
      endTime: '2025-09-30T14:00:45',
      errorDetails: [
        { code: 401, message: 'Unauthorized Access', count: 120 }
      ]
    }
  },
  {
    id: 4,
    time: '2025-09-30T12:00:00',
    connectionId: 4,
    connectionName: 'Email Service',
    dataType: 'notifications',
    recordsTotal: 75,
    recordsProcessed: 75,
    errors: 0,
    status: 'success',
    details: {
      added: 75,
      updated: 0,
      deleted: 0,
      failed: 0,
      duration: '00:00:45',
      startTime: '2025-09-30T11:59:15',
      endTime: '2025-09-30T12:00:00'
    }
  },
  {
    id: 5,
    time: '2025-09-29T10:00:00',
    connectionId: 5,
    connectionName: 'Calendar Integration',
    dataType: 'events',
    recordsTotal: 120,
    recordsProcessed: 115,
    errors: 5,
    status: 'partial',
    details: {
      added: 20,
      updated: 95,
      deleted: 0,
      failed: 5,
      duration: '00:03:20',
      startTime: '2025-09-29T09:57:00',
      endTime: '2025-09-29T10:00:20',
      errorDetails: [
        { code: 409, message: 'Conflict - Event already exists', count: 5 }
      ]
    }
  }
];

const SyncHistory = ({ onSync }) => {
  const [syncHistory, setSyncHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedSync, setSelectedSync] = useState(null);

  // Load sync history
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSyncHistory(mockSyncHistory);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle view details
  const handleViewDetails = (record) => {
    setSelectedSync(record);
    setDetailVisible(true);
  };

  // Handle sync again
  const handleSyncAgain = (record) => {
    message.loading(`Đang đồng bộ lại ${record.connectionName} - ${record.dataType}...`);
    
    // Simulate sync
    setTimeout(() => {
      message.success(`Đã bắt đầu đồng bộ lại ${record.connectionName} - ${record.dataType}`);
      onSync && onSync(record);
    }, 1500);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render sync status
  const renderStatus = (status, record) => {
    switch (status) {
      case 'success':
        return <Tag icon={<CheckCircleOutlined />} color="success">Thành công</Tag>;
      case 'error':
        return <Tag icon={<CloseCircleOutlined />} color="error">Lỗi</Tag>;
      case 'partial':
        return <Tag icon={<InfoCircleOutlined />} color="warning">Một phần</Tag>;
      case 'running':
        return <Tag icon={<SyncOutlined spin />} color="processing">Đang chạy</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  // Render progress
  const renderProgress = (record) => {
    const percent = Math.round((record.recordsProcessed / record.recordsTotal) * 100);
    const status = record.status === 'success' ? 'success' : 
                  record.status === 'error' ? 'exception' : 
                  record.status === 'partial' ? 'normal' : 'active';
    
    return (
      <Tooltip title={`${record.recordsProcessed}/${record.recordsTotal} bản ghi`}>
        <Progress percent={percent} size="small" status={status} />
      </Tooltip>
    );
  };

  // Table columns
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(b.time) - new Date(a.time),
      defaultSortOrder: 'descend'
    },
    {
      title: 'Kết nối',
      dataIndex: 'connectionName',
      key: 'connectionName',
      filters: Array.from(new Set(mockSyncHistory.map(item => item.connectionName)))
        .map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.connectionName === value
    },
    {
      title: 'Loại dữ liệu',
      dataIndex: 'dataType',
      key: 'dataType',
      filters: Array.from(new Set(mockSyncHistory.map(item => item.dataType)))
        .map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.dataType === value,
      render: (text) => {
        const dataTypeMap = {
          'users': 'Người dùng',
          'departments': 'Phòng ban',
          'courses': 'Khóa học',
          'enrollments': 'Đăng ký khóa học',
          'completions': 'Hoàn thành khóa học',
          'assessment_results': 'Kết quả đánh giá',
          'survey_results': 'Kết quả khảo sát',
          'notifications': 'Thông báo',
          'events': 'Sự kiện',
          'reminders': 'Nhắc nhở'
        };
        return dataTypeMap[text] || text;
      }
    },
    {
      title: 'Tiến độ',
      key: 'progress',
      render: (_, record) => renderProgress(record)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => renderStatus(status, record),
      filters: [
        { text: 'Thành công', value: 'success' },
        { text: 'Lỗi', value: 'error' },
        { text: 'Một phần', value: 'partial' },
        { text: 'Đang chạy', value: 'running' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          {(record.status === 'error' || record.status === 'partial') && (
            <Tooltip title="Đồng bộ lại">
              <Button 
                type="text" 
                icon={<SyncOutlined />} 
                onClick={() => handleSyncAgain(record)}
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  return (
    <>
      <Card 
        title={
          <Space>
            <HistoryOutlined />
            <span>Lịch sử đồng bộ</span>
          </Space>
        }
        className="sync-history-card"
      >
        <Table
          columns={columns}
          dataSource={syncHistory}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Sync Detail Modal */}
      {selectedSync && (
        <Modal
          title={`Chi tiết đồng bộ - ${selectedSync.connectionName}`}
          open={detailVisible}
          onCancel={() => setDetailVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailVisible(false)}>
              Đóng
            </Button>
          ]}
          width={700}
          className="sync-detail-modal"
        >
          <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Kết nối">{selectedSync.connectionName}</Descriptions.Item>
            <Descriptions.Item label="Loại dữ liệu">{selectedSync.dataType}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{renderStatus(selectedSync.status)}</Descriptions.Item>
            <Descriptions.Item label="Thời gian bắt đầu">{formatDate(selectedSync.details.startTime)}</Descriptions.Item>
            <Descriptions.Item label="Thời gian kết thúc">{formatDate(selectedSync.details.endTime)}</Descriptions.Item>
            <Descriptions.Item label="Thời gian thực hiện">{selectedSync.details.duration}</Descriptions.Item>
          </Descriptions>

          <Divider />
          
          <Title level={5}>Thống kê</Title>
          <div className="sync-stats">
            <div className="stat-item">
              <Text type="secondary">Tổng số bản ghi</Text>
              <Text strong>{selectedSync.recordsTotal}</Text>
            </div>
            <div className="stat-item">
              <Text type="secondary">Đã xử lý</Text>
              <Text strong>{selectedSync.recordsProcessed}</Text>
            </div>
            <div className="stat-item">
              <Text type="secondary">Thêm mới</Text>
              <Text strong type="success">{selectedSync.details.added}</Text>
            </div>
            <div className="stat-item">
              <Text type="secondary">Cập nhật</Text>
              <Text strong type="warning">{selectedSync.details.updated}</Text>
            </div>
            <div className="stat-item">
              <Text type="secondary">Xóa</Text>
              <Text strong>{selectedSync.details.deleted}</Text>
            </div>
            <div className="stat-item">
              <Text type="secondary">Lỗi</Text>
              <Text strong type="danger">{selectedSync.details.failed}</Text>
            </div>
          </div>

          {selectedSync.details.errorDetails && selectedSync.details.errorDetails.length > 0 && (
            <>
              <Divider />
              <Title level={5}>Chi tiết lỗi</Title>
              <Table
                dataSource={selectedSync.details.errorDetails}
                columns={[
                  { title: 'Mã lỗi', dataIndex: 'code', key: 'code' },
                  { title: 'Mô tả', dataIndex: 'message', key: 'message' },
                  { title: 'Số lượng', dataIndex: 'count', key: 'count' }
                ]}
                pagination={false}
                rowKey="code"
                size="small"
              />
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default SyncHistory;
