import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Alert, Select } from 'antd';
import { UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/mockData';
import './LoginForm.css';

const { Option } = Select;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('ADMIN');
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setError('');
    
    // Giả lập API đăng nhập với dữ liệu mẫu
    setTimeout(() => {
      // Trong môi trường demo, chỉ cần chọn vai trò và bấm đăng nhập
      // Không cần nhập tên đăng nhập/mật khẩu
      const username = values.username || `demo_${selectedRole.toLowerCase()}`;
      
      const demoUser = {
        id: `user-${Date.now()}`,
        username: username,
        name: getUserNameByRole(selectedRole),
        role: selectedRole,
        email: `${username.toLowerCase()}@thadico.com`,
        department: getDepartmentByRole(selectedRole),
        position: getPositionByRole(selectedRole),
        token: `demo-token-${Date.now()}`
      };
      
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      // Chuyển hướng đến trang dashboard
      navigate('/dashboard');
      setLoading(false);
    }, 800); // Giảm thời gian chờ xuống 800ms
  };
  
  // Hàm lấy phòng ban dựa trên vai trò
  const getDepartmentByRole = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'Ban Giám đốc';
      case 'MANAGER':
        return 'Phòng Nhân sự';
      case 'HR':
        return 'Phòng Nhân sự';
      case 'EMPLOYEE':
        return 'Phòng Kỹ thuật';
      default:
        return 'Phòng Nhân sự';
    }
  };
  
  // Hàm lấy vị trí dựa trên vai trò
  const getPositionByRole = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'Giám đốc';
      case 'MANAGER':
        return 'Trưởng phòng';
      case 'HR':
        return 'Chuyên viên HR';
      case 'EMPLOYEE':
        return 'Nhân viên';
      default:
        return 'Nhân viên';
    }
  };
  
  // Hàm lấy tên người dùng dựa trên vai trò
  const getUserNameByRole = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'Nguyễn Phúc Vinh';
      case 'MANAGER':
        return 'Trần Văn Quản Lý';
      case 'HR':
        return 'Lê Thị Nhân Sự';
      case 'EMPLOYEE':
        return 'Phạm Văn Nhân Viên';
      default:
        return 'Người dùng Demo';
    }
  };
  
  // Xử lý khi thay đổi vai trò
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-logo">
          <h2 className="logo-text">THADICO</h2>
        </div>
        
        {error && <Alert message={error} type="error" showIcon className="login-alert" />}
        
        
        
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: false }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#1890ff' }} />} 
              placeholder="Tự động theo vai trò (không cần nhập)" 
              size="large" 
              className="login-input"
              disabled
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: false }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="Tự động theo vai trò (không cần nhập)"
              size="large"
              className="login-input"
              disabled
            />
          </Form.Item>
          
          <div className="role-selector-container">
            <div className="role-label-line">
              <span>Chọn vai trò để đăng nhập</span>
            </div>
          </div>
          <Form.Item
            name="role"
          >
            <Select 
              value={selectedRole} 
              onChange={handleRoleChange}
              size="large"
              style={{ width: '100%' }}
              dropdownStyle={{ borderRadius: '8px' }}
              suffixIcon={<TeamOutlined style={{ color: '#1890ff' }} />}
            >
              <Option value="ADMIN">
                <div className="role-option">
                  <div className="role-icon admin"><TeamOutlined /></div>
                  <span>Super Admin</span>
                </div>
              </Option>
              <Option value="MANAGER">
                <div className="role-option">
                  <div className="role-icon manager"><TeamOutlined /></div>
                  <span>Quản lý</span>
                </div>
              </Option>
              <Option value="HR">
                <div className="role-option">
                  <div className="role-icon hr"><TeamOutlined /></div>
                  <span>HR</span>
                </div>
              </Option>
              <Option value="EMPLOYEE">
                <div className="role-option">
                  <div className="role-icon employee"><TeamOutlined /></div>
                  <span>Nhân viên</span>
                </div>
              </Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/forgot-password">
              Quên mật khẩu
            </a>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              loading={loading}
              size="large"
              block
            >
              <span className="login-button-text">Đăng nhập</span>
              <span className="login-button-arrow">→</span>
            </Button>
          </Form.Item>
        </Form>
        
        <div className="login-footer">
          <p>© {new Date().getFullYear()} Thadico. All rights reserved.</p>
          <div className="login-footer-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
