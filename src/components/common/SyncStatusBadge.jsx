import React from 'react';
import { Tag, Space, Typography, Tooltip } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  SyncOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

const { Text } = Typography;

/**
 * Badge hiển thị trạng thái đồng bộ LMS/Calendar
 */
const SyncStatusBadge = ({ 
  status = 'synced', // synced, failed, syncing, pending
  lastSyncTime,
  errorMessage,
  onRetry
}) => {
  const getConfig = () => {
    switch (status) {
      case 'synced':
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
          text: 'Synced',
          tooltip: 'Đã đồng bộ thành công'
        };
      case 'failed':
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
          text: 'Failed',
          tooltip: errorMessage || 'Đồng bộ thất bại'
        };
      case 'syncing':
        return {
          color: 'processing',
          icon: <SyncOutlined spin />,
          text: 'Syncing...',
          tooltip: 'Đang đồng bộ'
        };
      case 'pending':
        return {
          color: 'warning',
          icon: <ClockCircleOutlined />,
          text: 'Pending',
          tooltip: 'Chờ đồng bộ'
        };
      default:
        return {
          color: 'default',
          icon: null,
          text: 'Unknown',
          tooltip: ''
        };
    }
  };

  const config = getConfig();

  const formatLastSync = () => {
    if (!lastSyncTime) return '';
    return `Last sync at ${dayjs(lastSyncTime).format('HH:mm DD/MM')}`;
  };

  return (
    <Space direction="vertical" size={4}>
      <Tooltip title={config.tooltip}>
        <Tag 
          icon={config.icon} 
          color={config.color}
          style={{ 
            fontSize: '13px',
            padding: '4px 12px',
            borderRadius: '6px'
          }}
        >
          {config.text}
        </Tag>
      </Tooltip>
      {lastSyncTime && (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {formatLastSync()}
        </Text>
      )}
      {status === 'failed' && onRetry && (
        <a 
          onClick={onRetry}
          style={{ fontSize: '12px' }}
        >
          Retry
        </a>
      )}
    </Space>
  );
};

export default SyncStatusBadge;
