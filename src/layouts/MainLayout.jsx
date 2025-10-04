import React, { useEffect, useState } from 'react';
import { Layout, Badge, Button, Avatar, Dropdown, Menu } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  BellOutlined,
  DownOutlined
} from '@ant-design/icons';
import SideMenu from '../components/dashboard/SideMenu';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const { Header, Content, Sider } = Layout;

/**
 * Layout chính cho toàn bộ ứng dụng
 */
const MainLayout = () => {
  const [user, setUser] = useState(null);

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);

  return (
    <Layout className="admin-dashboard">
      <Sider width={250} theme="light" className="dashboard-sider">
        <SideMenu />
      </Sider>
      
      <Layout className="dashboard-main">
        <Header className="dashboard-header">
          <div className="header-right">
            <Badge count={3} size="small" style={{ marginRight: '16px' }}>
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                style={{ 
                  fontSize: '18px', 
                  color: '#666',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </Badge>
            
            <Dropdown 
              overlay={
                <Menu
                  style={{
                    minWidth: '200px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <Menu.Item 
                    key="profile" 
                    icon={<UserOutlined />}
                    style={{ borderRadius: '8px', margin: '4px 8px' }}
                  >
                    Thông tin cá nhân
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item 
                    key="logout" 
                    icon={<LogoutOutlined />} 
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}
                    style={{ borderRadius: '8px', margin: '4px 8px', color: '#f5222d' }}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <Button className="user-btn">
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />} 
                  style={{ 
                    backgroundColor: '#667eea',
                    marginRight: '8px'
                  }}
                />
                <span style={{ fontWeight: '600' }}>
                  {user?.name || 'Nguyễn Phúc Vinh'}
                </span>
                <DownOutlined style={{ fontSize: '10px', marginLeft: '8px' }} />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
