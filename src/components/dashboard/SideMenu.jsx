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
  ClockCircleOutlined,
  LineChartOutlined,
  ProjectOutlined
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
    
    // F1 - Đánh giá năng lực
    if (path.includes('/assessment')) {
      if (path.includes('/rubrics')) {
        setSelectedKeys(['f1:rubrics']);
      } else if (path.includes('/rounds')) {
        if (path.includes('/new')) {
          setSelectedKeys(['f1:create']);
        } else {
          setSelectedKeys(['f1:run']);
        }
      } else if (path.includes('/results')) {
        setSelectedKeys(['f1:results']);
      } else if (path.includes('/appeals')) {
        setSelectedKeys(['f1:appeals']);
      }
      setOpenKeys(['f1']);
    }
    // F2 - Khảo sát & Phân tích
    else if (path.includes('/courses')) {
      setSelectedKeys(['f2:setup']);
      setOpenKeys(['f2']);
    } else if (path.includes('/surveys')) {
      if (path.includes('/new')) {
        setSelectedKeys(['f2:create']);
      } else if (path.includes('/reports')) {
        setSelectedKeys(['f2:report']);
      } else {
        setSelectedKeys(['f2:distribute']);
      }
      setOpenKeys(['f2']);
    }
    // F3 - Lập kế hoạch đào tạo
    else if (path.includes('/training')) {
      if (path.includes('/demands')) {
        setSelectedKeys(['f3:demands']);
      } else if (path.includes('/plans')) {
        if (path.includes('/split')) {
          setSelectedKeys(['f3:split']);
        } else {
          setSelectedKeys(['f3:plans']);
        }
      } else if (path.includes('/deploy')) {
        setSelectedKeys(['f3:execute']);
      }
      setOpenKeys(['f3']);
    }
    // Các route khác
    else if (path.includes('/dashboard')) {
      if (path === '/dashboard') {
        setSelectedKeys(['dashboard:admin']);
      } else if (path.includes('/sales-conversion')) {
        setSelectedKeys(['dashboard:sales']);
      } else if (path.includes('/project-command-room')) {
        setSelectedKeys(['dashboard:project']);
      } else {
        setSelectedKeys(['dashboard:admin']);
      }
      setOpenKeys(['dashboard']);
    } else if (path.includes('/dashboards')) {
      setSelectedKeys(['dashboards']);
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
      case 'dashboards':
        navigate('/dashboards');
        break;
      case 'dashboard:admin':
        navigate('/dashboard');
        break;
      case 'dashboard:sales':
        navigate('/dashboard/sales-conversion');
        break;
      case 'dashboard:project':
        navigate('/dashboard/project-command-room');
        break;
        
      // F1 - Đánh giá năng lực
      case 'f1:rubrics':
        navigate('/assessment/rubrics');
        break;
      case 'f1:create':
        navigate('/assessment/rounds/new');
        break;
      case 'f1:run':
        navigate('/assessment/rounds');
        break;
      case 'f1:results':
        navigate('/assessment/results');
        break;
      case 'f1:appeals':
        navigate('/assessment/appeals');
        break;
      
      // F2 - Khảo sát & Phân tích
      case 'f2:setup':
        navigate('/courses');
        break;
      case 'f2:create':
        navigate('/surveys/new');
        break;
      case 'f2:distribute':
        navigate('/surveys');
        break;
      case 'f2:report':
        navigate('/surveys/reports');
        break;
      
      // F3 - Lập kế hoạch đào tạo
      case 'f3:demands':
        navigate('/training/demands');
        break;
      case 'f3:plans':
        navigate('/training/plans');
        break;
      case 'f3:split':
        navigate('/training/plans/split');
        break;
      case 'f3:execute':
        navigate('/training/deploy');
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
          <Menu.Item key="dashboards" icon={<DashboardOutlined />}>Tất cả Dashboard</Menu.Item>
          
          <SubMenu
            key="dashboard"
            title="DASHBOARD"
            icon={<BarChartOutlined />}
          >
            <Menu.Item key="dashboard:admin" icon={<DashboardOutlined />}>Admin Dashboard</Menu.Item>
            <Menu.Item key="dashboard:sales" icon={<LineChartOutlined />}>Sales Conversion</Menu.Item>
            <Menu.Item key="dashboard:project" icon={<ProjectOutlined />}>Project Command Room</Menu.Item>
          </SubMenu>
          
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
          <Menu.Item key="dashboards" icon={<DashboardOutlined />}>Tất cả Dashboard</Menu.Item>
          
          <SubMenu
            key="dashboard"
            title="DASHBOARD"
            icon={<BarChartOutlined />}
          >
            <Menu.Item key="dashboard:admin" icon={<DashboardOutlined />}>Admin Dashboard</Menu.Item>
            <Menu.Item key="dashboard:sales" icon={<LineChartOutlined />}>Sales Conversion</Menu.Item>
            <Menu.Item key="dashboard:project" icon={<ProjectOutlined />}>Project Command Room</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f1"
            title="ĐÁNH GIÁ NĂNG LỰC"
            icon={<TrophyOutlined />}
          >
            <Menu.Item key="f1:run">Thực hiện đánh giá</Menu.Item>
            <Menu.Item key="f1:results">Kết quả đánh giá</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f2"
            title="KHẢO SÁT & PHÂN TÍCH"
            icon={<FormOutlined />}
          >
            <Menu.Item key="f2:distribute">Phân phối khảo sát</Menu.Item>
            <Menu.Item key="f2:report">Báo cáo khảo sát</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f3"
            title="LẬP KẾ HOẠCH ĐÀO TẠO"
            icon={<BookOutlined />}
          >
            <Menu.Item key="f3:plans">Lập kế hoạch đào tạo</Menu.Item>
            {hasPermission('plan.approve') && (
              <Menu.Item key="f3:split">Phân rã kế hoạch</Menu.Item>
            )}
            <Menu.Item key="f3:execute">Thực hiện kế hoạch</Menu.Item>
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
          <Menu.Item key="dashboards" icon={<DashboardOutlined />}>Tất cả Dashboard</Menu.Item>
          
          <SubMenu
            key="dashboard"
            title="DASHBOARD"
            icon={<BarChartOutlined />}
          >
            <Menu.Item key="dashboard:admin" icon={<DashboardOutlined />}>Admin Dashboard</Menu.Item>
            <Menu.Item key="dashboard:sales" icon={<LineChartOutlined />}>Sales Conversion</Menu.Item>
            <Menu.Item key="dashboard:project" icon={<ProjectOutlined />}>Project Command Room</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f1"
            title="ĐÁNH GIÁ NĂNG LỰC"
            icon={<TrophyOutlined />}
          >
            <Menu.Item key="f1:rubrics">Thiết lập danh mục</Menu.Item>
            <Menu.Item key="f1:create">Tạo chiến dịch</Menu.Item>
            <Menu.Item key="f1:run">Thực hiện đánh giá</Menu.Item>
            <Menu.Item key="f1:results">Kết quả đánh giá</Menu.Item>
            <Menu.Item key="f1:appeals">Phúc khảo</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f2"
            title="KHẢO SÁT & PHÂN TÍCH"
            icon={<FormOutlined />}
          >
            <Menu.Item key="f2:setup">Thiết lập dữ liệu</Menu.Item>
            <Menu.Item key="f2:create">Tạo khảo sát</Menu.Item>
            <Menu.Item key="f2:distribute">Phân phối khảo sát</Menu.Item>
            <Menu.Item key="f2:report">Báo cáo khảo sát</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="f3"
            title="LẬP KẾ HOẠCH ĐÀO TẠO"
            icon={<BookOutlined />}
          >
            <Menu.Item key="f3:demands">Nhu cầu đào tạo</Menu.Item>
            <Menu.Item key="f3:plans">Lập kế hoạch đào tạo</Menu.Item>
            <Menu.Item key="f3:split">Phân rã kế hoạch</Menu.Item>
            <Menu.Item key="f3:execute">Thực hiện kế hoạch</Menu.Item>
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
        onClick={() => navigate('/dashboards')}
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
