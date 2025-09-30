import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Tooltip, 
  Modal,
  Typography,
  Badge,
  message
} from 'antd';
import { 
  CloseCircleOutlined, 
  EyeOutlined, 
  CheckOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import './ErrorLog.css';

const { Text, Paragraph } = Typography;

// Mock data for error logs
const mockErrorLogs = [
  {
    id: 1,
    time: '2025-09-30T14:00:00',
    connectionId: 3,
    connectionName: 'BI Portal',
    errorCode: 401,
    errorMessage: 'Unauthorized Access',
    recordId: null,
    resolved: false,
    details: 'API key may have expired or been revoked. Please check authentication settings.'
  },
  {
    id: 2,
    time: '2025-09-29T10:00:00',
    connectionId: 5,
    connectionName: 'Calendar Integration',
    errorCode: 409,
    errorMessage: 'Conflict - Event already exists',
    recordId: 'event_12345',
    resolved: false,
    details: 'Attempted to create an event that already exists in the target system.'
  },
  {
    id: 3,
    time: '2025-09-28T16:45:00',
    connectionId: 2,
    connectionName: 'LMS Link',
    errorCode: 404,
    errorMessage: 'Course not found',
    recordId: 'course_789',
    resolved: true,
    details: 'The referenced course could not be found in the LMS system.',
    resolvedAt: '2025-09-28T17:30:00',
    resolvedBy: 'Admin User'
  },
  {
    id: 4,
    time: '2025-09-27T11:20:00',
    connectionId: 1,
    connectionName: 'HR Connect',
    errorCode: 500,
    errorMessage: 'Internal Server Error',
    recordId: 'user_456',
    resolved: true,
    details: 'The HRMS system encountered an internal error while processing the request.',
    resolvedAt: '2025-09-27T14:15:00',
    resolvedBy: 'System Admin'
  },
  {
    id: 5,
    time: '2025-09-26T09:10:00',
    connectionId: 4,
    connectionName: 'Email Service',
    errorCode: 429,
    errorMessage: 'Too Many Requests',
    recordId: null,
    resolved: false,
    details: 'Rate limit exceeded for the email service API. Consider adjusting the sync frequency.'
  }
];

const ErrorLog = () => {
  const [errorLogs, setErrorLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedError, setSelectedError] = useState(null);

  // Load error logs
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setErrorLogs(mockErrorLogs);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle view details
  const handleViewDetails = (record) => {
    setSelectedError(record);
    setDetailVisible(true);
  };

  // Handle mark as resolved
  const handleMarkResolved = (record) => {
    // In a real application, you would update the error status in the database
    const updatedLogs = errorLogs.map(log => 
      log.id === record.id 
        ? { 
            ...log, 
            resolved: true, 
            resolvedAt: new Date().toISOString(), 
            resolvedBy: 'Current User' 
          } 
        : log
    );
    
    setErrorLogs(updatedLogs);
    message.success(`Đã đánh dấu lỗi #${record.id} là đã xử lý`);
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

  // Render error severity
  const renderErrorSeverity = (errorCode) => {
    if (errorCode >= 500) {
      return <Badge status="error" text="Nghiêm trọng" />;
    } else if (errorCode >= 400) {
      return <Badge status="warning" text="Cảnh báo" />;
    } else {
      return <Badge status="default" text="Thông tin" />;
    }
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
      filters: Array.from(new Set(mockErrorLogs.map(item => item.connectionName)))
        .map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.connectionName === value
    },
    {
      title: 'Mã lỗi',
      dataIndex: 'errorCode',
      key: 'errorCode',
      sorter: (a, b) => a.errorCode - b.errorCode
    },
    {
      title: 'Mức độ',
      key: 'severity',
      render: (_, record) => renderErrorSeverity(record.errorCode)
    },
    {
      title: 'Mô tả lỗi',
      dataIndex: 'errorMessage',
      key: 'errorMessage',
      ellipsis: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'resolved',
      key: 'resolved',
      render: (resolved) => (
        resolved ? 
          <Tag color="success">Đã xử lý</Tag> : 
          <Tag color="error">Chưa xử lý</Tag>
      ),
      filters: [
        { text: 'Đã xử lý', value: true },
        { text: 'Chưa xử lý', value: false }
      ],
      onFilter: (value, record) => record.resolved === value
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
          {!record.resolved && (
            <Tooltip title="Đánh dấu đã xử lý">
              <Button 
                type="text" 
                icon={<CheckOutlined />} 
                onClick={() => handleMarkResolved(record)}
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
            <CloseCircleOutlined />
            <span>Nhật ký lỗi</span>
          </Space>
        }
        className="error-log-card"
      >
        <Table
          columns={columns}
          dataSource={errorLogs}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Error Detail Modal */}
      {selectedError && (
        <Modal
          title={`Chi tiết lỗi - ${selectedError.connectionName}`}
          open={detailVisible}
          onCancel={() => setDetailVisible(false)}
          footer={[
            !selectedError.resolved && (
              <Button 
                key="resolve" 
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={() => {
                  handleMarkResolved(selectedError);
                  setDetailVisible(false);
                }}
              >
                Đánh dấu đã xử lý
              </Button>
            ),
            <Button key="close" onClick={() => setDetailVisible(false)}>
              Đóng
            </Button>
          ]}
          width={600}
          className="error-detail-modal"
        >
          <div className="error-header">
            <div className="error-code">
              <Text type="danger" strong style={{ fontSize: 24 }}>{selectedError.errorCode}</Text>
              {renderErrorSeverity(selectedError.errorCode)}
            </div>
            <div className="error-message">
              <Text strong>{selectedError.errorMessage}</Text>
            </div>
          </div>

          <div className="error-info">
            <p><strong>Thời gian:</strong> {formatDate(selectedError.time)}</p>
            <p><strong>Kết nối:</strong> {selectedError.connectionName}</p>
            {selectedError.recordId && (
              <p><strong>ID bản ghi:</strong> {selectedError.recordId}</p>
            )}
            <p><strong>Trạng thái:</strong> {selectedError.resolved ? 'Đã xử lý' : 'Chưa xử lý'}</p>
            {selectedError.resolved && (
              <>
                <p><strong>Thời gian xử lý:</strong> {formatDate(selectedError.resolvedAt)}</p>
                <p><strong>Người xử lý:</strong> {selectedError.resolvedBy}</p>
              </>
            )}
          </div>

          <div className="error-details">
            <Text strong>Chi tiết:</Text>
            <Paragraph>{selectedError.details}</Paragraph>
          </div>

          <div className="error-suggestion">
            <Text strong>Gợi ý xử lý:</Text>
            <Paragraph>
              {selectedError.errorCode === 401 && 'Kiểm tra lại thông tin xác thực API. Có thể API key đã hết hạn hoặc bị thu hồi.'}
              {selectedError.errorCode === 404 && 'Kiểm tra xem bản ghi có tồn tại trong hệ thống nguồn không.'}
              {selectedError.errorCode === 409 && 'Kiểm tra xem bản ghi đã tồn tại trong hệ thống đích chưa.'}
              {selectedError.errorCode === 429 && 'Giảm tần suất đồng bộ hoặc liên hệ với nhà cung cấp API để tăng giới hạn.'}
              {selectedError.errorCode === 500 && 'Liên hệ với quản trị viên hệ thống nguồn để kiểm tra lỗi máy chủ.'}
            </Paragraph>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ErrorLog;
