import React, { useState, useEffect } from 'react';
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
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  CalendarOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileExcelOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideMenu.css';
import { userRoles } from '../../mock/dashboardData';

const { SubMenu } = Menu;

/**
 * Component hiển thị menu bên trái của dashboard
 */
const SideMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState(['admin']);
  const [userRole, setUserRole] = useState('');
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy vai trò người dùng từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role) {
      setUserRole(user.role);
    } else {
      // Nếu không có vai trò, chuyển hướng về trang đăng nhập
      navigate('/login');
    }
  }, [navigate]);
  
  // Xác định key được chọn dựa trên URL hiện tại
  useEffect(() => {
    const path = location.pathname;
    
    // F1 - Quản lý khảo sát
    if (path.includes('/courses')) {
      setSelectedKeys(['f1:setup']);
      setOpenKeys(['f1']);
    } else if (path.includes('/surveys')) {
      if (path.includes('/reports')) {
        setSelectedKeys(['f1:report']);
      } else {
        setSelectedKeys(['f1:distribute']);
      }
      setOpenKeys(['f1']);
    }
    // F2 - Lập kế hoạch đào tạo
    else if (path.includes('/training')) {
      if (path.includes('/demands')) {
        setSelectedKeys(['f2:demands']);
      } else if (path.includes('/plans')) {
        if (path.includes('/split')) {
          setSelectedKeys(['f2:split']);
        } else {
          setSelectedKeys(['f2:plans']);
        }
      } else if (path.includes('/deploy')) {
        setSelectedKeys(['f2:execute']);
      }
      setOpenKeys(['f2']);
    }
    // F3 - Đánh giá năng lực
    else if (path.includes('/assessment')) {
      if (path.includes('/rubrics')) {
        setSelectedKeys(['f3:rubrics']);
      } else if (path.includes('/rounds')) {
        if (path.includes('/new')) {
          setSelectedKeys(['f3:create']);
        } else {
          setSelectedKeys(['f3:run']);
        }
      } else if (path.includes('/results')) {
        setSelectedKeys(['f3:results']);
      } else if (path.includes('/appeals')) {
        setSelectedKeys(['f3:appeals']);
      }
      setOpenKeys(['f3']);
    }
    // Các route khác
    else if (path.includes('/dashboard')) {
      setSelectedKeys(['dashboard']);
    } else if (path.includes('/alerts')) {
      setSelectedKeys(['alerts']);
    } else if (path.includes('/reports')) {
      setSelectedKeys(['reports']);
    } else if (path.includes('/config')) {
      setSelectedKeys(['config']);
    } else if (path.includes('/my-surveys')) {
      setSelectedKeys(['my:surveys']);
    } else if (path.includes('/my-classes')) {
      setSelectedKeys(['my:classes']);
    } else if (path.includes('/my-assessments')) {
      setSelectedKeys(['my:assessments']);
    }
  }, [location]);
  
  // Lấy quyền dựa trên vai trò
  useEffect(() => {
    if (userRole && userRoles[userRole]) {
      setPermissions(userRoles[userRole].permissions);
    }
  }, [userRole]);
  
  // Kiểm tra quyền
  const hasPermission = (permission) => {
    return permissions.includes('all') || permissions.includes(permission);
  };

  // Xử lý khi chọn menu
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
    
    // Điều hướng dựa trên key của menu
    switch (e.key) {
      // Dashboard
      case 'dashboard':
        navigate('/dashboard');
        break;
        
      // F1 - Quản lý khảo sát
      case 'f1:setup':
        navigate('/courses');
        break;
      case 'f1:distribute':
        navigate('/surveys');
        break;
      case 'f1:report':
        navigate('/surveys/reports');
        break;
      
      // F2 - Lập kế hoạch đào tạo
      case 'f2:demands':
        navigate('/training/demands');
        break;
      case 'f2:plans':
        navigate('/training/plans');
        break;
      case 'f2:split':
        navigate('/training/plans/split');
        break;
      case 'f2:execute':
        navigate('/training/deploy');
        break;
      
      // F3 - Đánh giá năng lực
      case 'f3:rubrics':
        navigate('/assessment/rubrics');
        break;
      case 'f3:create':
        navigate('/assessment/rounds/new');
        break;
      case 'f3:run':
        navigate('/assessment/rounds');
        break;
      case 'f3:results':
        navigate('/assessment/results');
        break;
      case 'f3:appeals':
        navigate('/assessment/appeals');
        break;
      
      // Cá nhân
      case 'my:surveys':
        navigate('/my-surveys');
        break;
      case 'my:classes':
        navigate('/my-classes');
        break;
      case 'my:assessments':
        navigate('/my-assessments');
        break;
      
      // Thông báo
      case 'alerts':
        navigate('/alerts');
        break;
      
      // Báo cáo
      case 'reports':
        navigate('/reports');
        break;
      
      // Cấu hình
      case 'config':
        navigate('/config');
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

  // Render menu dựa trên vai trò
  const renderMenu = () => {
    // Menu cho nhân viên
    if (userRole === 'EMPLOYEE') {
      return (
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          className="side-menu-items"
          style={{ width: '100%' }}
        >
          <Menu.Item key="my:surveys" icon={<FormOutlined />}>Khảo sát của tôi</Menu.Item>
          <Menu.Item key="my:classes" icon={<CalendarOutlined />}>Lớp học của tôi</Menu.Item>
          <Menu.Item key="my:assessments" icon={<TrophyOutlined />}>Đánh giá của tôi</Menu.Item>
          <Menu.Item key="alerts" icon={<BellOutlined />}>Thông báo</Menu.Item>
        </Menu>
      );
    }
    
    // Menu cho HR/Manager
    else if (userRole === 'HR' || userRole === 'MANAGER') {
      return (
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
            key="f1"
            title="QUẢN LÝ KHẢO SÁT"
            icon={<FormOutlined />}
          >
            <Menu.Item key="f1:distribute">Phân phối khảo sát</Menu.Item>
            <Menu.Item key="f1:report">Báo cáo khảo sát</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f2"
            title="LẬP KẾ HOẠCH ĐÀO TẠO"
            icon={<BookOutlined />}
          >
            <Menu.Item key="f2:plans">Lập kế hoạch đào tạo</Menu.Item>
            {hasPermission('plan.approve') && (
              <Menu.Item key="f2:split">Phân rã kế hoạch</Menu.Item>
            )}
            <Menu.Item key="f2:execute">Thực hiện kế hoạch</Menu.Item>
          </SubMenu>
          
          <Menu.Item key="alerts" icon={<BellOutlined />}>Thông báo</Menu.Item>
          <Menu.Item key="reports" icon={<BarChartOutlined />}>Báo cáo</Menu.Item>
        </Menu>
      );
    }
    
    // Menu cho Admin (mặc định)
    else {
      return (
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          className="side-menu-items"
          style={{ width: '100%' }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
          
          <SubMenu
            key="f1"
            title="QUẢN LÝ KHẢO SÁT"
            icon={<FormOutlined />}
          >
            <Menu.Item key="f1:setup">Thiết lập dữ liệu</Menu.Item>
            <Menu.Item key="f1:distribute">Phân phối khảo sát</Menu.Item>
            <Menu.Item key="f1:report">Báo cáo khảo sát</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f2"
            title="LẬP KẾ HOẠCH ĐÀO TẠO"
            icon={<BookOutlined />}
          >
            <Menu.Item key="f2:demands">Nhu cầu đào tạo</Menu.Item>
            <Menu.Item key="f2:plans">Lập kế hoạch đào tạo</Menu.Item>
            <Menu.Item key="f2:split">Phân rã kế hoạch</Menu.Item>
            <Menu.Item key="f2:execute">Thực hiện kế hoạch</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f3"
            title="ĐÁNH GIÁ NĂNG LỰC"
            icon={<TrophyOutlined />}
          >
            <Menu.Item key="f3:rubrics">Thiết lập danh mục</Menu.Item>
            <Menu.Item key="f3:create">Tạo chiến dịch</Menu.Item>
            <Menu.Item key="f3:run">Thực hiện đánh giá</Menu.Item>
            <Menu.Item key="f3:results">Kết quả đánh giá</Menu.Item>
            <Menu.Item key="f3:appeals">Phúc khảo</Menu.Item>
          </SubMenu>
          
          <Menu.Item key="alerts" icon={<BellOutlined />}>Thông báo</Menu.Item>
          <Menu.Item key="reports" icon={<BarChartOutlined />}>Báo cáo</Menu.Item>
          <Menu.Item key="config" icon={<SettingOutlined />}>Cấu hình</Menu.Item>
        </Menu>
      );
    }
  };
  
  return (
    <div className="side-menu">
      <div 
        className="side-menu-logo"
        onClick={() => navigate('/dashboard')}
        style={{ cursor: 'pointer' }}
        title="Về trang Dashboard"
      >
        <img 
          src={process.env.PUBLIC_URL + '/logo2-Photoroom.png'} 
          alt="Thadico Logo" 
          className="logo-image" 
        />
      </div>
      
      <div className="user-role-display">
        <div className={`role-badge ${userRole.toLowerCase()}`}>
          {userRole === 'ADMIN' && 'Super Admin'}
          {userRole === 'MANAGER' && 'Quản lý'}
          {userRole === 'HR' && 'HR'}
          {userRole === 'EMPLOYEE' && 'Nhân viên'}
        </div>
      </div>
      
      {renderMenu()}
    </div>
  );
};

export default SideMenu;

// Thêm style cho role selector
const roleSelectStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  borderRadius: '4px',
  border: '1px solid #d9d9d9',
  backgroundColor: '#f5f5f5',
  fontSize: '14px',
  fontWeight: '500',
};
