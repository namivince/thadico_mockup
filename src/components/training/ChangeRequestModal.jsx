import React, { useState } from 'react';
import { 
  Modal, 
  Form, 
  Select, 
  Input, 
  Upload, 
  Button, 
  Alert,
  Space,
  Timeline,
  Tag,
  Typography
} from 'antd';
import { 
  UploadOutlined, 
  ClockCircleOutlined,
  CloseCircleOutlined,
  SwapOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

/**
 * Modal tạo Change Request cho kế hoạch đào tạo
 * Hỗ trợ: Hoãn / Hủy / Thay thế
 */
const ChangeRequestModal = ({ 
  visible, 
  onClose, 
  onSubmit,
  planName,
  currentVersion = 1,
  versionHistory = []
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const changeRequest = {
        ...values,
        attachments: fileList.map(file => file.name),
        version: currentVersion + 1,
        created_by: 'Current User', // Mock
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      await onSubmit(changeRequest);
      
      form.resetFields();
      setFileList([]);
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const getChangeTypeIcon = (type) => {
    switch (type) {
      case 'postpone':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'cancel':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'replace':
        return <SwapOutlined style={{ color: '#1890ff' }} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      title={
        <Space>
          <HistoryOutlined />
          Tạo Change Request
        </Space>
      }
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Gửi yêu cầu"
      cancelText="Hủy"
      width={700}
      okButtonProps={{ loading }}
    >
      <Alert
        message={`Kế hoạch: ${planName}`}
        description={`Phiên bản hiện tại: v${currentVersion}`}
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="change_type"
          label="Loại thay đổi"
          rules={[{ required: true, message: 'Vui lòng chọn loại thay đổi' }]}
        >
          <Select 
            placeholder="Chọn loại thay đổi"
            size="large"
          >
            <Option value="postpone">
              <Space>
                <ClockCircleOutlined style={{ color: '#faad14' }} />
                Hoãn kế hoạch
              </Space>
            </Option>
            <Option value="cancel">
              <Space>
                <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                Hủy kế hoạch
              </Space>
            </Option>
            <Option value="replace">
              <Space>
                <SwapOutlined style={{ color: '#1890ff' }} />
                Thay thế nội dung
              </Space>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="reason"
          label="Lý do thay đổi"
          rules={[
            { required: true, message: 'Vui lòng nhập lý do' },
            { min: 20, message: 'Lý do phải có ít nhất 20 ký tự' }
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Mô tả chi tiết lý do cần thay đổi kế hoạch..."
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="File đính kèm (nếu có)"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>
              Chọn file
            </Button>
          </Upload>
          <Text type="secondary" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
            Hỗ trợ: PDF, Word, Excel. Tối đa 10MB
          </Text>
        </Form.Item>
      </Form>

      {versionHistory.length > 0 && (
        <>
          <Alert
            message="Lịch sử thay đổi"
            type="default"
            style={{ marginTop: '24px', marginBottom: '16px' }}
          />
          <Timeline
            style={{ marginTop: '16px' }}
            items={versionHistory.map((item, index) => ({
              color: item.status === 'approved' ? 'green' : 'blue',
              dot: getChangeTypeIcon(item.change_type),
              children: (
                <Space direction="vertical" size={4}>
                  <Space>
                    <Tag color={item.status === 'approved' ? 'success' : 'processing'}>
                      v{item.version}
                    </Tag>
                    <Text strong>{item.change_type_label}</Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {item.created_by} • {dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}
                  </Text>
                  <Text style={{ fontSize: '13px' }}>{item.reason}</Text>
                </Space>
              )
            }))}
          />
        </>
      )}
    </Modal>
  );
};

export default ChangeRequestModal;
