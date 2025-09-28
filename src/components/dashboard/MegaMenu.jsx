import React, { useState } from 'react';
import { Menu, Dropdown, Button, Avatar, Badge } from 'antd';
import { 
  DownOutlined, 
  LogoutOutlined, 
  UserOutlined,
  ApartmentOutlined,
  TeamOutlined,
  DollarOutlined,
  TrophyOutlined,
  UserAddOutlined,
  BookOutlined,
  SettingOutlined,
  BellOutlined
} from '@ant-design/icons';
import { menuItems } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

/**
 * Component hiển thị mega menu trên cùng của dashboard
 */
const MegaMenu = ({ onMenuSelect }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();
  
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Icon mapping cho từng menu
  const menuIcons = {
    'assessment': <TrophyOutlined />,
    'training': <BookOutlined />,
    'admin': <SettingOutlined />
  };

  // Sử dụng dữ liệu mẫu cho menu
  const mainMenuItems = menuItems.map(item => ({
    key: item.key,
    label: item.label,
    icon: menuIcons[item.key]
  }));

  // Tạo cấu trúc submenu từ dữ liệu mẫu
  const subMenus = menuItems.reduce((acc, item) => {
    if (item.children && item.children.length > 0) {
      acc[item.key] = item.children;
    }
    return acc;
  }, {});

  // Xử lý khi chọn menu
  const handleMenuClick = (e, path) => {
    setSelectedMenu(e.key);
    
    // Nếu có đường dẫn trực tiếp, điều hướng đến đó
    if (path) {
      navigate(path);
      return;
    }
    
    // Các đường dẫn cũ (giữ lại để tương thích ngược)
    // Handle navigation for specific menu items
    if (e.key === 'admin:surveys') {
      navigate('/surveys');
      return;
    }

    // Training routes
    if (e.key === 'training:demands') {
      navigate('/training/demands');
      return;
    }
    if (e.key === 'training:plans') {
      navigate('/training/plans');
      return;
    }
    if (e.key === 'training:courses') {
      navigate('/training/courses');
      return;
    }
    
    if (onMenuSelect) {
      onMenuSelect(e.key);
    }
  };

  // Tạo dropdown menu cho từng menu chính
  const renderDropdownMenu = (menuKey) => {
    const items = subMenus[menuKey] || [];
    return (
      <Menu 
        className="mega-menu-dropdown"
        style={{
          minWidth: '250px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        {items.map((item) => (
          <Menu.Item 
            key={item.key}
            onClick={(e) => handleMenuClick(e, item.path)}
            style={{
              borderRadius: '8px',
              margin: '4px 8px',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {item.label}
            </span>
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  
  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="mega-menu">
      <div className="mega-menu__container">
        <div className="mega-menu__logo">
          <h1 className="logo-text">THADICO</h1>
        </div>
        <div className="mega-menu__left">
          {mainMenuItems.map((item) => (
            <Dropdown 
              key={item.key} 
              overlay={renderDropdownMenu(item.key)} 
              placement="bottomLeft"
              arrow={{ pointAtCenter: true }}
              trigger={['hover', 'click']}
            >
              <Button 
                type={selectedMenu === item.key ? 'primary' : 'default'}
                className="mega-menu__item"
                style={{
                  fontWeight: 600,
                  padding: '0 16px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
                <span style={{ marginLeft: '6px', marginRight: '4px' }}>
                  {item.label}
                </span>
                <DownOutlined style={{ fontSize: '10px' }} />
              </Button>
            </Dropdown>
          ))}
        </div>
        
        <div className="mega-menu__right">
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
                  onClick={handleLogout}
                  style={{ borderRadius: '8px', margin: '4px 8px', color: '#f5222d' }}
                >
                  Đăng xuất
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Button className="mega-menu__user-btn">
              <Avatar 
                size="small" 
                icon={<UserOutlined />} 
                style={{ 
                  backgroundColor: '#667eea',
                  marginRight: '8px'
                }}
              />
              <span style={{ fontWeight: '600' }}>
                {user.name || 'Nguyễn Phúc Vinh'}
              </span>
              <DownOutlined style={{ fontSize: '10px', marginLeft: '8px' }} />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
