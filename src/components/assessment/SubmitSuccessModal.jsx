import React from 'react';
import { Modal, Result, Typography, Space } from 'antd';
import { CheckCircleOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

const { Text, Paragraph } = Typography;

/**
 * Modal hiển thị sau khi học viên submit bài đánh giá
 */
const SubmitSuccessModal = ({ 
  visible, 
  onClose, 
  resultDate,
  campaignName 
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
    >
      <Result
        status="success"
        icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
        title={<span style={{ fontSize: '20px', fontWeight: 600 }}>Bài thi đã được ghi nhận!</span>}
        subTitle={
          <Space direction="vertical" size="middle" style={{ marginTop: '16px', width: '100%' }}>
            <Paragraph style={{ fontSize: '15px', marginBottom: 0 }}>
              Cảm ơn bạn đã hoàn thành <strong>{campaignName}</strong>.
            </Paragraph>
            
            <div style={{ 
              background: '#f0f5ff', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #adc6ff'
            }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                  <Text strong>Kết quả sẽ được công bố trước ngày:</Text>
                </div>
                <Text style={{ fontSize: '16px', color: '#1890ff', fontWeight: 600, marginLeft: '24px' }}>
                  {dayjs(resultDate).format('DD/MM/YYYY')}
                </Text>
              </Space>
            </div>

            <div style={{ 
              background: '#fff7e6', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #ffd591'
            }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MailOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />
                  <Text strong>Thông báo kết quả:</Text>
                </div>
                <Text style={{ fontSize: '14px', marginLeft: '24px' }}>
                  Bạn sẽ nhận email thông báo khi kết quả được công bố
                </Text>
              </Space>
            </div>

            <Paragraph 
              type="secondary" 
              style={{ 
                fontSize: '13px', 
                marginTop: '16px',
                marginBottom: 0,
                textAlign: 'center'
              }}
            >
              Nếu có thắc mắc, vui lòng liên hệ bộ phận Nhân sự
            </Paragraph>
          </Space>
        }
      />
    </Modal>
  );
};

export default SubmitSuccessModal;
