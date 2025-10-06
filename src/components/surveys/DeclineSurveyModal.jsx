import React, { useState } from 'react';
import { Modal, Form, Input, message, Alert } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const { TextArea } = Input;

/**
 * Modal từ chối tham gia khảo sát
 * Bắt buộc nhập lý do
 */
const DeclineSurveyModal = ({ 
  visible, 
  onClose, 
  onSubmit, 
  surveyName 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // Submit lý do từ chối
      await onSubmit({
        reason: values.reason,
        declined_at: new Date().toISOString()
      });

      message.success('Đã ghi nhận lý do từ chối');
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <span>
          <WarningOutlined style={{ color: '#faad14', marginRight: '8px' }} />
          Từ chối tham gia khảo sát
        </span>
      }
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Xác nhận từ chối"
      cancelText="Hủy"
      okButtonProps={{ 
        danger: true,
        loading: loading
      }}
      width={600}
    >
      <Alert
        message="Lưu ý"
        description={`Bạn đang từ chối tham gia khảo sát "${surveyName}". Vui lòng cho biết lý do để chúng tôi cải thiện.`}
        type="warning"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="reason"
          label="Lý do từ chối"
          rules={[
            { required: true, message: 'Vui lòng nhập lý do từ chối' },
            { min: 10, message: 'Lý do phải có ít nhất 10 ký tự' }
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Ví dụ: Đang bận dự án khẩn cấp, không có thời gian tham gia..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Alert
          message="Lý do của bạn sẽ được gửi đến bộ phận Nhân sự để xem xét"
          type="info"
          showIcon
        />
      </Form>
    </Modal>
  );
};

export default DeclineSurveyModal;
