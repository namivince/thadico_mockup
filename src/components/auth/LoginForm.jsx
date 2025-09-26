import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/mockData';
import './LoginForm.css';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setError('');
    
    // Giả lập API đăng nhập với dữ liệu mẫu
    setTimeout(() => {
      // Kiểm tra thông tin đăng nhập từ dữ liệu mẫu
      const user = users.find(u => u.username === values.username && u.password === values.password);
      
      if (user) {
        // Lưu thông tin đăng nhập vào localStorage (bỏ qua mật khẩu)
        const userInfo = {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          email: user.email,
          department: user.department,
          position: user.position,
          token: `demo-token-${user.id}`
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // Chuyển hướng đến trang dashboard
        navigate('/dashboard');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-logo">
          <h1>THADICO</h1>
          <p>Hệ thống quản lý nhân sự</p>
        </div>
        
        {error && <Alert message={error} type="error" showIcon className="login-alert" />}
        
        <div className="login-hint">
          <p>Thông tin đăng nhập mẫu:</p>
          <ul>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>Manager:</strong> manager / manager123</li>
            <li><strong>Employee:</strong> employee / employee123</li>
          </ul>
        </div>
        
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Tên đăng nhập" 
              size="large" 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              size="large"
            />
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
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        
        <div className="login-footer">
          <p>© {new Date().getFullYear()} Thadico. All rights reserved.</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
