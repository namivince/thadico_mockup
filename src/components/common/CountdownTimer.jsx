import React, { useState, useEffect } from 'react';
import { Tag, Button, Space, Tooltip } from 'antd';
import { ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

/**
 * Countdown Timer với SLA tracking
 * Hiển thị thời gian còn lại với màu sắc theo mức độ khẩn cấp
 */
const CountdownTimer = ({ 
  deadline, 
  onExtend, 
  canExtend = false,
  showExtendButton = true 
}) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState('normal'); // normal, warning, overdue

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const end = dayjs(deadline);
      const diff = end.diff(now, 'second');

      if (diff <= 0) {
        setStatus('overdue');
        setTimeLeft(0);
        return;
      }

      setTimeLeft(diff);

      // Xác định status dựa trên thời gian còn lại
      const hoursLeft = diff / 3600;
      if (hoursLeft > 24) {
        setStatus('normal');
      } else if (hoursLeft > 6) {
        setStatus('warning');
      } else {
        setStatus('critical');
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const formatTime = (seconds) => {
    if (seconds === null) return '--:--:--';
    if (seconds <= 0) return 'Quá hạn';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getColor = () => {
    switch (status) {
      case 'normal':
        return 'success'; // Xanh
      case 'warning':
        return 'warning'; // Cam
      case 'critical':
        return 'error'; // Đỏ
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getIcon = () => {
    if (status === 'overdue') {
      return <WarningOutlined />;
    }
    return <ClockCircleOutlined />;
  };

  const getTooltip = () => {
    switch (status) {
      case 'normal':
        return 'Còn nhiều thời gian';
      case 'warning':
        return 'Sắp hết hạn - Vui lòng ưu tiên';
      case 'critical':
        return 'Khẩn cấp - Còn ít thời gian!';
      case 'overdue':
        return 'Đã quá hạn SLA';
      default:
        return '';
    }
  };

  if (status === 'overdue') {
    return (
      <Space>
        <Tag 
          color="error" 
          icon={<WarningOutlined />}
          style={{ 
            fontSize: '14px', 
            padding: '4px 12px',
            fontWeight: 600
          }}
        >
          QUÁ HẠN SLA
        </Tag>
        {canExtend && showExtendButton && (
          <Button 
            size="small" 
            type="primary" 
            danger
            onClick={onExtend}
          >
            Gia hạn
          </Button>
        )}
      </Space>
    );
  }

  return (
    <Tooltip title={getTooltip()}>
      <Tag 
        color={getColor()} 
        icon={getIcon()}
        style={{ 
          fontSize: '14px', 
          padding: '4px 12px',
          fontWeight: status === 'critical' ? 600 : 500,
          animation: status === 'critical' ? 'pulse 2s infinite' : 'none'
        }}
      >
        {formatTime(timeLeft)}
      </Tag>
    </Tooltip>
  );
};

export default CountdownTimer;
