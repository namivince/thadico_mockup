import React, { useState, useEffect } from 'react';
import { Badge, Space, Typography } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

const { Text } = Typography;

/**
 * Badge hiển thị trạng thái realtime sync
 */
const RealtimeBadge = ({ lastSyncTime, isRealtime = true }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!lastSyncTime) {
        setTimeAgo('Chưa đồng bộ');
        return;
      }

      const now = dayjs();
      const syncTime = dayjs(lastSyncTime);
      const diffSeconds = now.diff(syncTime, 'second');

      if (diffSeconds < 60) {
        setTimeAgo(`${diffSeconds}s ago`);
      } else if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(diffSeconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000); // Update every 10s

    return () => clearInterval(interval);
  }, [lastSyncTime]);

  return (
    <Space size="small">
      {isRealtime ? (
        <Badge 
          status="processing" 
          text={
            <Text strong style={{ color: '#52c41a' }}>
              🟢 Realtime
            </Text>
          }
        />
      ) : (
        <Badge 
          status="default" 
          text={
            <Text type="secondary">
              Offline
            </Text>
          }
        />
      )}
      <Text type="secondary" style={{ fontSize: '12px' }}>
        <SyncOutlined spin={isRealtime} /> Synced {timeAgo}
      </Text>
    </Space>
  );
};

export default RealtimeBadge;
