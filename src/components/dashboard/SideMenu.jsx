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
    
    if (path.includes('/surveys')) {
      if (path.includes('/new')) {
        setSelectedKeys(['survey:create']);
      } else if (path.includes('/monitor')) {
        setSelectedKeys(['survey:monitor']);
      } else {
        setSelectedKeys(['admin:surveys']);
      }
      setOpenKeys(['admin']);
    } else if (path.includes('/training')) {
      if (path.includes('/demands')) {
        setSelectedKeys(['training:demands']);
      } else if (path.includes('/plans')) {
        if (path.includes('/approvals')) {
          setSelectedKeys(['training:approvals']);
        } else if (path.includes('/deploy')) {
          setSelectedKeys(['training:deploy']);
        } else {
          setSelectedKeys(['training:plans']);
        }
      } else if (path.includes('/courses')) {
        setSelectedKeys(['training:courses']);
      }
      setOpenKeys(['training']);
    } else if (path.includes('/assessment')) {
      if (path.includes('/rounds')) {
        setSelectedKeys(['assessment:rounds']);
      } else if (path.includes('/campaigns')) {
        setSelectedKeys(['assessment:create']);
      } else if (path.includes('/rubrics')) {
        setSelectedKeys(['assessment:criteria']);
      } else if (path.includes('/grading')) {
        setSelectedKeys(['assessment:grading']);
      } else if (path.includes('/appeals')) {
        setSelectedKeys(['assessment:appeals']);
      }
      setOpenKeys(['assessment']);
    } else if (path.includes('/dashboard')) {
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
      case 'training:approvals':
        navigate('/training/plans/approvals');
        break;
      case 'training:deploy':
        navigate('/training/plans/deploy');
        break;
      
      // Khảo sát
      case 'admin:surveys':
        navigate('/surveys');
        break;
      case 'survey:create':
        navigate('/surveys/new');
        break;
      case 'survey:monitor':
        navigate('/surveys/monitor');
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
            key="admin"
            title="KHẢO SÁT"
            icon={<FormOutlined />}
          >
            <Menu.Item key="admin:surveys">Danh sách khảo sát</Menu.Item>
            {hasPermission('survey.create') && (
              <Menu.Item key="survey:create">Tạo khảo sát mới</Menu.Item>
            )}
            <Menu.Item key="survey:monitor">Báo cáo khảo sát</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="training"
            title="ĐÀO TẠO"
            icon={<BookOutlined />}
          >
            <Menu.Item key="training:plans">Kế hoạch đào tạo</Menu.Item>
            {hasPermission('plan.approve') && (
              <Menu.Item key="training:approvals">Phê duyệt kế hoạch</Menu.Item>
            )}
            <Menu.Item key="training:deploy">Thực hiện kế hoạch</Menu.Item>
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
            key="admin"
            title="KHẢO SÁT"
            icon={<FormOutlined />}
          >
            <Menu.Item key="admin:surveys">Danh sách khảo sát</Menu.Item>
            <Menu.Item key="survey:create">Tạo khảo sát mới</Menu.Item>
            <Menu.Item key="survey:monitor">Báo cáo khảo sát</Menu.Item>
          </SubMenu>
          
          <SubMenu
            key="training"
            title="ĐÀO TẠO"
            icon={<BookOutlined />}
          >
            <Menu.Item key="training:demands">Nhu cầu đào tạo</Menu.Item>
            <Menu.Item key="training:plans">Kế hoạch đào tạo</Menu.Item>
            <Menu.Item key="training:approvals">Phê duyệt kế hoạch</Menu.Item>
            <Menu.Item key="training:deploy">Thực hiện kế hoạch</Menu.Item>
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
            <Menu.Item key="assessment:grading">Kết quả đánh giá</Menu.Item>
            <Menu.Item key="assessment:appeals">Phúc khảo</Menu.Item>
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
