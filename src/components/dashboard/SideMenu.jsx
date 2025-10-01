import React, { useState } from 'react';
import { Menu } from 'antd';
import { 
  TrophyOutlined,
  BookOutlined,
  FormOutlined,
  ShareAltOutlined,
  DashboardOutlined,
  FileAddOutlined,
  AuditOutlined,
  RocketOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './SideMenu.css';

const { SubMenu } = Menu;

/**
 * Component hiển thị menu bên trái của dashboard
 */
const SideMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState(['admin']);
  const navigate = useNavigate();

  // Xử lý khi chọn menu
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
    
    // Điều hướng dựa trên key của menu
    switch (e.key) {
      // Đánh giá
      case 'assessment:rounds':
        navigate('/assessment/rounds');
        break;
      case 'assessment:create':
        navigate('/assessment/campaigns/new');
        break;
      case 'assessment:criteria':
        navigate('/assessment/rubrics/new/builder');
        break;
      case 'assessment:grading':
        navigate('/assessment/grading');
        break;
      case 'assessment:appeals':
        navigate('/assessment/appeals');
        break;
      
      // Đào tạo
      case 'training:demands':
        navigate('/training/demands');
        break;
      case 'training:plans':
        navigate('/training/plans');
        break;
      case 'training:courses':
        navigate('/training/courses');
        break;
      
      // Khảo sát
      case 'admin:surveys':
        navigate('/surveys');
        break;
      
      // Demo
      case 'demo':
        navigate('/demo');
        break;
        
      default:
        break;
    }
  };

  // Xử lý khi mở/đóng submenu
  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="side-menu">
      <div className="side-menu-logo">
        <img 
          src={process.env.PUBLIC_URL + '/logo2-Photoroom.png'} 
          alt="Thadico Logo" 
          className="logo-image" 
        />
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        onClick={handleMenuClick}
        className="side-menu-items"
        style={{ width: '100%' }}
      >
        <SubMenu
          key="admin"
          title="KHẢO SÁT"
          icon={<FormOutlined />}
        >
          <Menu.Item key="admin:surveys">Chương trình khảo sát</Menu.Item>
        </SubMenu>
        
        <SubMenu
          key="training"
          title="ĐÀO TẠO"
          icon={<BookOutlined />}
        >
          <Menu.Item key="training:demands">Nhu cầu đào tạo</Menu.Item>
          <Menu.Item key="training:plans">Kế hoạch đào tạo</Menu.Item>
          <Menu.Item key="training:courses">Khóa học</Menu.Item>
        </SubMenu>
        
        <SubMenu
          key="assessment"
          title="ĐÁNH GIÁ"
          icon={<TrophyOutlined />}
        >
          <Menu.Item key="assessment:rounds">Vòng đánh giá</Menu.Item>
          <Menu.Item key="assessment:create">Tạo chiến dịch</Menu.Item>
          <Menu.Item key="assessment:criteria">Bộ tiêu chí</Menu.Item>
          <Menu.Item key="assessment:grading">Bảng chấm bài</Menu.Item>
          <Menu.Item key="assessment:appeals">Phúc khảo</Menu.Item>
        </SubMenu>
        
        {/* <Menu.Item key="demo" icon={<RocketOutlined />}>
          Demo các tính năng
        </Menu.Item> */}
      </Menu>
    </div>
  );
};

export default SideMenu;
