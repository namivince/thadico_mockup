import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Tooltip, 
  Popconfirm,
  message
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  LinkOutlined
} from '@ant-design/icons';
import './ConnectionList.css';

// Mock data for connections
const mockConnections = [
  {
    id: 1,
    name: 'HR Connect',
    type: 'HRMS',
    status: 'active',
    lastSync: '2025-09-30T15:30:00',
    frequency: '1 hour',
    url: 'https://api.hrms.example.com/v1',
    authMethod: 'oauth2',
    dataTypes: ['users', 'departments'],
    syncDirection: 'one-way',
    conflictResolution: 'source'
  },
  {
    id: 2,
    name: 'LMS Link',
    type: 'LMS',
    status: 'active',
    lastSync: '2025-09-30T15:00:00',
    frequency: '6 hours',
    url: 'https://api.lms.example.com/v2',
    authMethod: 'api_key',
    dataTypes: ['courses', 'enrollments', 'completions'],
    syncDirection: 'two-way',
    conflictResolution: 'target'
  },
  {
    id: 3,
    name: 'BI Portal',
    type: 'BI Tool',
    status: 'error',
    lastSync: '2025-09-30T14:00:00',
    frequency: '12 hours',
    url: 'https://api.bi.example.com/v1',
    authMethod: 'basic',
    dataTypes: ['assessment_results', 'survey_results'],
    syncDirection: 'one-way',
    conflictResolution: 'source'
  },
  {
    id: 4,
    name: 'Email Service',
    type: 'Email',
    status: 'active',
    lastSync: '2025-09-30T12:00:00',
    frequency: '1 hour',
    url: 'https://api.email.example.com/v1',
    authMethod: 'oauth2',
    dataTypes: ['notifications'],
    syncDirection: 'one-way',
    conflictResolution: 'source'
  },
  {
    id: 5,
    name: 'Calendar Integration',
    type: 'Calendar',
    status: 'paused',
    lastSync: '2025-09-29T10:00:00',
    frequency: '24 hours',
    url: 'https://api.calendar.example.com/v1',
    authMethod: 'oauth2',
    dataTypes: ['events', 'reminders'],
    syncDirection: 'two-way',
    conflictResolution: 'both'
  }
];

const ConnectionList = ({ onEdit, onAdd, onTest }) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load connections
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConnections(mockConnections);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle delete connection
  const handleDelete = (id) => {
    setConnections(connections.filter(conn => conn.id !== id));
    message.success('Đã xóa kết nối thành công');
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // Render connection status
  const renderStatus = (status) => {
    switch (status) {
      case 'active':
        return <Tag icon={<CheckCircleOutlined />} color="success">Hoạt động</Tag>;
      case 'paused':
        return <Tag icon={<SyncOutlined spin />} color="warning">Tạm dừng</Tag>;
      case 'error':
        return <Tag icon={<CloseCircleOutlined />} color="error">Lỗi</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Tên kết nối',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="connection-name">{text}</span>
    },
    {
      title: 'Loại hệ thống',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'HRMS', value: 'HRMS' },
        { text: 'LMS', value: 'LMS' },
        { text: 'BI Tool', value: 'BI Tool' },
        { text: 'Email', value: 'Email' },
        { text: 'Calendar', value: 'Calendar' }
      ],
      onFilter: (value, record) => record.type === value
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatus(status),
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Tạm dừng', value: 'paused' },
        { text: 'Lỗi', value: 'error' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Đồng bộ gần nhất',
      dataIndex: 'lastSync',
      key: 'lastSync',
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.lastSync) - new Date(b.lastSync)
    },
    {
      title: 'Tần suất',
      dataIndex: 'frequency',
      key: 'frequency'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Kiểm tra kết nối">
            <Button 
              type="text" 
              icon={<LinkOutlined />} 
              onClick={() => onTest(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa kết nối này?"
              description="Bạn có chắc chắn muốn xóa kết nối này? Hành động này không thể hoàn tác."
              onConfirm={() => handleDelete(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <Card 
      title="Danh sách kết nối"
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={onAdd}
        >
          Thêm kết nối mới
        </Button>
      }
      className="connection-list-card"
    >
      <Table
        columns={columns}
        dataSource={connections}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default ConnectionList;
