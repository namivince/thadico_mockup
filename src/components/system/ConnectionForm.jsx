import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Radio, 
  Checkbox, 
  Button, 
  Space, 
  Divider,
  message
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined
} from '@ant-design/icons';
import './ConnectionForm.css';

const { Option } = Select;
const { TextArea } = Input;

// System types
const systemTypes = [
  { value: 'HRMS', label: 'HRMS' },
  { value: 'LMS', label: 'LMS' },
  { value: 'BI Tool', label: 'BI Tool' },
  { value: 'Email', label: 'Email' },
  { value: 'Calendar', label: 'Calendar' },
  { value: 'CRM', label: 'CRM' },
  { value: 'ERP', label: 'ERP' },
  { value: 'Custom', label: 'Hệ thống tùy chỉnh' }
];

// Auth methods
const authMethods = [
  { value: 'api_key', label: 'API Key' },
  { value: 'oauth2', label: 'OAuth 2.0' },
  { value: 'basic', label: 'Basic Auth' },
  { value: 'jwt', label: 'JWT' }
];

// Sync frequencies
const syncFrequencies = [
  { value: '15 minutes', label: '15 phút' },
  { value: '30 minutes', label: '30 phút' },
  { value: '1 hour', label: '1 giờ' },
  { value: '6 hours', label: '6 giờ' },
  { value: '12 hours', label: '12 giờ' },
  { value: '24 hours', label: '24 giờ' }
];

// Data types
const dataTypes = [
  { value: 'users', label: 'Người dùng' },
  { value: 'departments', label: 'Phòng ban' },
  { value: 'courses', label: 'Khóa học' },
  { value: 'enrollments', label: 'Đăng ký khóa học' },
  { value: 'completions', label: 'Hoàn thành khóa học' },
  { value: 'assessment_results', label: 'Kết quả đánh giá' },
  { value: 'survey_results', label: 'Kết quả khảo sát' },
  { value: 'notifications', label: 'Thông báo' },
  { value: 'events', label: 'Sự kiện' },
  { value: 'reminders', label: 'Nhắc nhở' }
];

const ConnectionForm = ({ connection, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [authMethod, setAuthMethod] = useState('api_key');
  const [systemType, setSystemType] = useState('HRMS');
  const [loading, setLoading] = useState(false);
  const isEditing = !!connection;

  // Initialize form with connection data if editing
  useEffect(() => {
    if (connection) {
      form.setFieldsValue({
        name: connection.name,
        type: connection.type,
        url: connection.url,
        authMethod: connection.authMethod,
        clientId: connection.clientId,
        clientSecret: connection.clientSecret,
        apiKey: connection.apiKey,
        username: connection.username,
        password: connection.password,
        frequency: connection.frequency,
        dataTypes: connection.dataTypes,
        syncDirection: connection.syncDirection || 'one-way',
        conflictResolution: connection.conflictResolution || 'source'
      });
      setAuthMethod(connection.authMethod);
      setSystemType(connection.type);
    }
  }, [connection, form]);

  // Handle auth method change
  const handleAuthMethodChange = (value) => {
    setAuthMethod(value);
  };

  // Handle system type change
  const handleSystemTypeChange = (value) => {
    setSystemType(value);
  };

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // Prepare connection data
      const connectionData = {
        ...values,
        id: connection ? connection.id : Date.now(),
        status: connection ? connection.status : 'active',
        lastSync: connection ? connection.lastSync : null
      };
      
      // Simulate API call
      setTimeout(() => {
        onSave(connectionData);
        setLoading(false);
        message.success(`Đã ${isEditing ? 'cập nhật' : 'thêm'} kết nối thành công`);
      }, 1000);
    });
  };

  // Render auth method fields
  const renderAuthFields = () => {
    switch (authMethod) {
      case 'api_key':
        return (
          <Form.Item
            name="apiKey"
            label="API Key"
            rules={[{ required: true, message: 'Vui lòng nhập API Key' }]}
          >
            <Input.Password placeholder="Nhập API Key" />
          </Form.Item>
        );
      case 'oauth2':
        return (
          <>
            <Form.Item
              name="clientId"
              label="Client ID"
              rules={[{ required: true, message: 'Vui lòng nhập Client ID' }]}
            >
              <Input placeholder="Nhập Client ID" />
            </Form.Item>
            <Form.Item
              name="clientSecret"
              label="Client Secret"
              rules={[{ required: true, message: 'Vui lòng nhập Client Secret' }]}
            >
              <Input.Password placeholder="Nhập Client Secret" />
            </Form.Item>
          </>
        );
      case 'basic':
        return (
          <>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
            >
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          </>
        );
      case 'jwt':
        return (
          <Form.Item
            name="token"
            label="JWT Token"
            rules={[{ required: true, message: 'Vui lòng nhập JWT Token' }]}
          >
            <TextArea rows={3} placeholder="Nhập JWT Token" />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      title={`${isEditing ? 'Chỉnh sửa' : 'Thêm'} kết nối`}
      className="connection-form-card"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          type: 'HRMS',
          authMethod: 'api_key',
          frequency: '1 hour',
          syncDirection: 'one-way',
          conflictResolution: 'source',
          dataTypes: ['users', 'departments']
        }}
      >
        <Form.Item
          name="name"
          label="Tên kết nối"
          rules={[{ required: true, message: 'Vui lòng nhập tên kết nối' }]}
        >
          <Input placeholder="Nhập tên kết nối" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại hệ thống"
          rules={[{ required: true, message: 'Vui lòng chọn loại hệ thống' }]}
        >
          <Select 
            placeholder="Chọn loại hệ thống" 
            onChange={handleSystemTypeChange}
          >
            {systemTypes.map(type => (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="url"
          label="URL API"
          rules={[
            { required: true, message: 'Vui lòng nhập URL API' },
            { type: 'url', message: 'Vui lòng nhập URL hợp lệ' }
          ]}
        >
          <Input placeholder="Ví dụ: https://api.example.com/v1" />
        </Form.Item>

        <Form.Item
          name="authMethod"
          label="Phương thức xác thực"
          rules={[{ required: true, message: 'Vui lòng chọn phương thức xác thực' }]}
        >
          <Select 
            placeholder="Chọn phương thức xác thực" 
            onChange={handleAuthMethodChange}
          >
            {authMethods.map(method => (
              <Option key={method.value} value={method.value}>{method.label}</Option>
            ))}
          </Select>
        </Form.Item>

        {renderAuthFields()}

        <Form.Item
          name="frequency"
          label="Tần suất đồng bộ"
          rules={[{ required: true, message: 'Vui lòng chọn tần suất đồng bộ' }]}
        >
          <Select placeholder="Chọn tần suất đồng bộ">
            {syncFrequencies.map(freq => (
              <Option key={freq.value} value={freq.value}>{freq.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="dataTypes"
          label="Loại dữ liệu đồng bộ"
          rules={[{ required: true, message: 'Vui lòng chọn ít nhất một loại dữ liệu' }]}
        >
          <Checkbox.Group>
            <div className="data-types-grid">
              {dataTypes.map(type => (
                <Checkbox key={type.value} value={type.value}>{type.label}</Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="syncDirection"
          label="Hướng đồng bộ"
          rules={[{ required: true, message: 'Vui lòng chọn hướng đồng bộ' }]}
        >
          <Radio.Group>
            <Radio value="one-way">Một chiều (Hệ thống nguồn → Hệ thống đích)</Radio>
            <Radio value="two-way">Hai chiều (Đồng bộ cả hai hệ thống)</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="conflictResolution"
          label="Xử lý xung đột"
          rules={[{ required: true, message: 'Vui lòng chọn cách xử lý xung đột' }]}
        >
          <Radio.Group>
            <Radio value="source">Ưu tiên hệ thống nguồn</Radio>
            <Radio value="target">Ưu tiên hệ thống đích</Radio>
            <Radio value="both">Giữ cả hai phiên bản</Radio>
          </Radio.Group>
        </Form.Item>

        <Divider />

        <div className="form-actions">
          <Space>
            <Button 
              icon={<CloseOutlined />} 
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSubmit}
              loading={loading}
            >
              {isEditing ? 'Cập nhật' : 'Lưu'} cấu hình
            </Button>
          </Space>
        </div>
      </Form>
    </Card>
  );
};

export default ConnectionForm;
