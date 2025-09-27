import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Tag, 
  Tooltip, 
  Dropdown, 
  Menu,
  Badge,
  Statistic,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  message,
  Progress,
  Avatar,
  Divider,
  Tabs,
  Empty,
  List,
  Typography,
  Spin
} from 'antd';
import { 
  PlusOutlined, 
  FileExcelOutlined, 
  FilterOutlined, 
  EllipsisOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  FileSearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ExportOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  BookOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  FileProtectOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  UserOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  FundOutlined,
  BarsOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './PlanList.css';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Status constants
const STATUS = {
  DRAFT: 'draft',
  WAITING_APPROVAL: 'waiting_approval',
  APPROVED: 'approved',
  DEPLOYED: 'deployed',
  COMPLETED: 'completed',
  ARCHIVED: 'archived'
};

// Status colors
const STATUS_COLORS = {
  [STATUS.DRAFT]: { color: '#8c8c8c', bgColor: '#f5f5f5', icon: <FileAddOutlined /> },
  [STATUS.WAITING_APPROVAL]: { color: '#faad14', bgColor: '#fff7e6', icon: <ClockCircleOutlined /> },
  [STATUS.APPROVED]: { color: '#52c41a', bgColor: '#f6ffed', icon: <CheckCircleOutlined /> },
  [STATUS.DEPLOYED]: { color: '#1890ff', bgColor: '#e6f7ff', icon: <RocketOutlined /> },
  [STATUS.COMPLETED]: { color: '#13c2c2', bgColor: '#e6fffb', icon: <FileDoneOutlined /> },
  [STATUS.ARCHIVED]: { color: '#8c8c8c', bgColor: '#f5f5f5', icon: <FileProtectOutlined /> }
};

const PlanList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    year: new Date().getFullYear(),
    search: '',
    department: 'all'
  });
  
  const [activeTab, setActiveTab] = useState('list');
  const [summaryData, setSummaryData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [topDepartments, setTopDepartments] = useState([]);

  // Fetch plans data
  useEffect(() => {
    fetchPlans();
  }, [pagination.current, pagination.pageSize, filters]);
  
  // Generate summary data
  useEffect(() => {
    if (plans.length > 0) {
      // Calculate total budget
      const totalBudget = plans.reduce((sum, plan) => sum + plan.budget, 0);
      
      // Calculate total items
      const totalItems = plans.reduce((sum, plan) => sum + plan.items, 0);
      
      // Calculate average completion rate
      const completedPlans = plans.filter(p => p.completionRate > 0);
      const avgCompletionRate = completedPlans.length > 0 
        ? completedPlans.reduce((sum, plan) => sum + plan.completionRate, 0) / completedPlans.length 
        : 0;
      
      // Calculate department statistics
      const departments = {};
      plans.forEach(plan => {
        if (!departments[plan.department]) {
          departments[plan.department] = {
            name: plan.department,
            count: 0,
            budget: 0
          };
        }
        departments[plan.department].count += 1;
        departments[plan.department].budget += plan.budget;
      });
      
      // Convert to array and sort by count
      const departmentArray = Object.values(departments).sort((a, b) => b.count - a.count);
      
      // Set summary data
      setSummaryData({
        totalBudget,
        totalItems,
        avgCompletionRate,
        departmentCount: Object.keys(departments).length
      });
      
      // Set top departments
      setTopDepartments(departmentArray.slice(0, 5));
      
      // Generate recent activity
      const recentActivityData = [
        {
          id: 1,
          type: 'approval',
          title: 'Kế hoạch đào tạo kỹ năng mềm đã được phê duyệt cấp 2',
          user: 'Trần Thị B',
          time: '2 giờ trước',
          planId: 6
        },
        {
          id: 2,
          type: 'create',
          title: 'Kế hoạch đào tạo kỹ năng sử dụng công nghệ đã được tạo',
          user: 'Võ Văn F',
          time: '1 ngày trước',
          planId: 7
        },
        {
          id: 3,
          type: 'deploy',
          title: 'Lớp tiếng Anh giao tiếp đã được triển khai',
          user: 'Nguyễn Thị G',
          time: '3 ngày trước',
          planId: 8
        },
        {
          id: 4,
          type: 'complete',
          title: 'Kế hoạch đào tạo an toàn lao động đã hoàn thành',
          user: 'Lê Thị I',
          time: '1 tuần trước',
          planId: 10
        },
        {
          id: 5,
          type: 'edit',
          title: 'Kế hoạch đào tạo 2025 đã được chỉnh sửa',
          user: 'Nguyễn Văn A',
          time: '1 tuần trước',
          planId: 1
        }
      ];
      
      setRecentActivity(recentActivityData);
    }
  }, [plans]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API call
      const mockData = [
        {
          id: 1,
          name: 'Kế hoạch đào tạo 2025',
          budget: 500000000,
          createdAt: '2025-01-15',
          createdBy: 'Nguyễn Văn A',
          department: 'Phòng Nhân sự',
          status: 'draft',
          items: 12,
          approvalLevel: 0,
          completionRate: 0,
          description: 'Kế hoạch đào tạo toàn công ty năm 2025',
          objectives: ['Nâng cao kỹ năng lãnh đạo', 'Phát triển kỹ năng chuyên môn', 'Cải thiện ngoại ngữ'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          id: 2,
          name: 'Kế hoạch đào tạo Q2/2025',
          budget: 250000000,
          createdAt: '2025-03-10',
          createdBy: 'Trần Thị B',
          department: 'Phòng Kế toán',
          status: 'waiting_approval',
          items: 8,
          approvalLevel: 1,
          completionRate: 0,
          description: 'Kế hoạch đào tạo quý 2 năm 2025 cho phòng kế toán',
          objectives: ['Nâng cao kỹ năng sử dụng phần mềm kế toán', 'Cập nhật kiến thức thuế'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          id: 3,
          name: 'Kế hoạch đào tạo kỹ năng lãnh đạo',
          budget: 350000000,
          createdAt: '2025-02-20',
          createdBy: 'Lê Văn C',
          department: 'Ban Giám đốc',
          status: 'approved',
          items: 5,
          approvalLevel: 3,
          completionRate: 0,
          description: 'Kế hoạch đào tạo kỹ năng lãnh đạo cho cấp quản lý',
          objectives: ['Phát triển tư duy chiến lược', 'Kỹ năng quản lý đội ngũ', 'Ra quyết định hiệu quả'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          id: 4,
          name: 'Kế hoạch đào tạo nhân viên mới',
          budget: 120000000,
          createdAt: '2025-01-05',
          createdBy: 'Phạm Thị D',
          department: 'Phòng Nhân sự',
          status: 'deployed',
          items: 6,
          approvalLevel: 3,
          completionRate: 45,
          description: 'Kế hoạch đào tạo nhân viên mới về văn hóa công ty và quy trình làm việc',
          objectives: ['Hiểu rõ văn hóa công ty', 'Nắm vững quy trình làm việc', 'Kỹ năng giao tiếp nội bộ'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          classes: [
            { id: 101, name: 'Lớp định hướng nhân viên mới tháng 1', status: 'completed', participants: 15 },
            { id: 102, name: 'Lớp định hướng nhân viên mới tháng 2', status: 'completed', participants: 12 },
            { id: 103, name: 'Lớp định hướng nhân viên mới tháng 3', status: 'in_progress', participants: 18 }
          ]
        },
        {
          id: 5,
          name: 'Kế hoạch đào tạo Q1/2025',
          budget: 180000000,
          createdAt: '2025-01-02',
          createdBy: 'Nguyễn Văn A',
          department: 'Phòng Kinh doanh',
          status: 'completed',
          items: 10,
          approvalLevel: 3,
          completionRate: 100,
          description: 'Kế hoạch đào tạo quý 1 năm 2025 cho phòng kinh doanh',
          objectives: ['Nâng cao kỹ năng bán hàng', 'Kỹ năng chăm sóc khách hàng', 'Kỹ năng đàm phán'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          classes: [
            { id: 201, name: 'Lớp kỹ năng bán hàng chuyên nghiệp', status: 'completed', participants: 25 },
            { id: 202, name: 'Lớp kỹ năng chăm sóc khách hàng', status: 'completed', participants: 25 },
            { id: 203, name: 'Lớp kỹ năng đàm phán', status: 'completed', participants: 20 }
          ],
          results: {
            satisfaction: 4.8,
            attendance: 95,
            passRate: 98,
            costEfficiency: 92
          }
        },
        {
          id: 6,
          name: 'Kế hoạch đào tạo kỹ năng mềm',
          budget: 220000000,
          createdAt: '2025-02-15',
          createdBy: 'Hoàng Thị E',
          department: 'Phòng Marketing',
          status: 'waiting_approval',
          items: 7,
          approvalLevel: 2,
          completionRate: 0,
          description: 'Kế hoạch đào tạo kỹ năng mềm cho nhân viên marketing',
          objectives: ['Kỹ năng thuyết trình', 'Kỹ năng làm việc nhóm', 'Kỹ năng quản lý thời gian'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          id: 7,
          name: 'Kế hoạch đào tạo kỹ năng sử dụng công nghệ',
          budget: 280000000,
          createdAt: '2025-03-05',
          createdBy: 'Võ Văn F',
          department: 'Phòng IT',
          status: 'approved',
          items: 8,
          approvalLevel: 3,
          completionRate: 0,
          description: 'Kế hoạch đào tạo kỹ năng sử dụng công nghệ mới cho nhân viên IT',
          objectives: ['Cập nhật công nghệ mới', 'Nâng cao kỹ năng lập trình', 'Quản lý dự án phần mềm'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          id: 8,
          name: 'Kế hoạch đào tạo tiếng Anh',
          budget: 320000000,
          createdAt: '2025-01-20',
          createdBy: 'Nguyễn Thị G',
          department: 'Toàn công ty',
          status: 'deployed',
          items: 4,
          approvalLevel: 3,
          completionRate: 60,
          description: 'Kế hoạch đào tạo tiếng Anh cho toàn công ty',
          objectives: ['Nâng cao kỹ năng giao tiếp tiếng Anh', 'Kỹ năng viết email bằng tiếng Anh', 'Tiếng Anh chuyên ngành'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          classes: [
            { id: 301, name: 'Lớp tiếng Anh cơ bản', status: 'completed', participants: 30 },
            { id: 302, name: 'Lớp tiếng Anh giao tiếp', status: 'in_progress', participants: 25 }
          ]
        },
        {
          id: 9,
          name: 'Kế hoạch đào tạo quản lý dự án',
          budget: 190000000,
          createdAt: '2025-02-10',
          createdBy: 'Trần Văn H',
          department: 'Phòng Dự án',
          status: 'draft',
          items: 6,
          approvalLevel: 0,
          completionRate: 0,
          description: 'Kế hoạch đào tạo quản lý dự án cho nhân viên phòng dự án',
          objectives: ['Kỹ năng quản lý dự án', 'Sử dụng công cụ quản lý dự án', 'Phân tích rủi ro dự án'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          id: 10,
          name: 'Kế hoạch đào tạo an toàn lao động',
          budget: 150000000,
          createdAt: '2025-01-10',
          createdBy: 'Lê Thị I',
          department: 'Phòng Hành chính',
          status: 'completed',
          items: 3,
          approvalLevel: 3,
          completionRate: 100,
          description: 'Kế hoạch đào tạo an toàn lao động cho toàn công ty',
          objectives: ['Nâng cao ý thức an toàn', 'Kỹ năng sơ cứu', 'Phòng chống cháy nổ'],
          year: 2025,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          results: {
            satisfaction: 4.5,
            attendance: 98,
            passRate: 100,
            costEfficiency: 95
          }
        }
      ];
      
      // Filter by status
      let filteredData = mockData;
      if (filters.status !== 'all') {
        filteredData = mockData.filter(plan => plan.status === filters.status);
      }
      
      // Filter by search
      if (filters.search) {
        filteredData = filteredData.filter(plan => 
          plan.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          plan.createdBy.toLowerCase().includes(filters.search.toLowerCase()) ||
          plan.description?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      // Filter by department
      if (filters.department !== 'all') {
        filteredData = filteredData.filter(plan => plan.department === filters.department);
      }
      
      setPlans(filteredData);
      setPagination({
        ...pagination,
        total: filteredData.length
      });
    } catch (error) {
      console.error('Error fetching plans:', error);
      message.error('Không thể tải dữ liệu kế hoạch đào tạo');
    } finally {
      setLoading(false);
    }
  };

  // Handle table change
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Handle status filter change
  const handleStatusChange = (value) => {
    setFilters({
      ...filters,
      status: value
    });
    setPagination({
      ...pagination,
      current: 1
    });
  };

  // Handle search
  const handleSearch = (value) => {
    setFilters({
      ...filters,
      search: value
    });
    setPagination({
      ...pagination,
      current: 1
    });
  };

  // Navigate to dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Create new plan
  const handleCreatePlan = () => {
    navigate('/training/plans/new');
  };

  // View plan details
  const handleViewPlan = (id) => {
    navigate(`/training/plans/${id}`);
  };

  // Edit plan
  const handleEditPlan = (id) => {
    navigate(`/training/plans/${id}/edit`);
  };

  // Delete plan
  const handleDeletePlan = (id) => {
    message.success(`Đã xóa kế hoạch #${id}`);
    setPlans(plans.filter(plan => plan.id !== id));
  };

  // View approvals
  const handleViewApprovals = (id) => {
    navigate(`/training/plans/${id}/approvals`);
  };

  // Deploy plan
  const handleDeployPlan = (id) => {
    navigate(`/training/plans/${id}/deploy`);
  };

  // Export plan
  const handleExportPlan = (id) => {
    message.success(`Đang xuất kế hoạch #${id}`);
  };
  
  // Render status tag
  const renderStatus = (status, approvalLevel) => {
    const statusConfig = STATUS_COLORS[status];
    if (!statusConfig) return <Tag color="default">{status}</Tag>;
    
    const { color, bgColor, icon } = statusConfig;
    
    let label = '';
    switch (status) {
      case STATUS.DRAFT:
        label = 'Nháp';
        break;
      case STATUS.WAITING_APPROVAL:
        label = `Chờ duyệt (L${approvalLevel}/3)`;
        break;
      case STATUS.APPROVED:
        label = 'Đã duyệt';
        break;
      case STATUS.DEPLOYED:
        label = 'Đang triển khai';
        break;
      case STATUS.COMPLETED:
        label = 'Hoàn thành';
        break;
      case STATUS.ARCHIVED:
        label = 'Lưu trữ';
        break;
      default:
        label = status;
    }
    
    return (
      <Tooltip title={status === STATUS.WAITING_APPROVAL ? `Đang chờ duyệt cấp ${approvalLevel}/3` : label}>
        <Tag 
          color={bgColor} 
          style={{ 
            color: color, 
            border: `1px solid ${color}`,
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: '4px'
          }}
          icon={icon}
        >
          {label}
        </Tag>
      </Tooltip>
    );
  };

  // Render action menu
  const renderActionMenu = (record) => {
    const items = [
      {
        key: 'view',
        label: 'Xem chi tiết',
        icon: <FileSearchOutlined />,
        onClick: () => handleViewPlan(record.id)
      }
    ];

    // Add edit action if status is draft
    if (record.status === 'draft') {
      items.push({
        key: 'edit',
        label: 'Chỉnh sửa',
        icon: <EditOutlined />,
        onClick: () => handleEditPlan(record.id)
      });
      items.push({
        key: 'delete',
        label: 'Xóa',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDeletePlan(record.id)
      });
    }

    // Add approval action if status is waiting_approval
    if (record.status === 'waiting_approval') {
      items.push({
        key: 'approvals',
        label: 'Xem phê duyệt',
        icon: <CheckCircleOutlined />,
        onClick: () => handleViewApprovals(record.id)
      });
    }

    // Add deploy action if status is approved
    if (record.status === 'approved') {
      items.push({
        key: 'deploy',
        label: 'Triển khai',
        icon: <RocketOutlined />,
        onClick: () => handleDeployPlan(record.id)
      });
    }

    // Add export action for all
    items.push({
      key: 'export',
      label: 'Xuất báo cáo',
      icon: <ExportOutlined />,
      onClick: () => handleExportPlan(record.id)
    });

    return (
      <Menu items={items} />
    );
  };

  // Define columns
  const columns = [
    {
      title: 'Tên kế hoạch',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => handleViewPlan(record.id)}>{text}</a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Ngân sách',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => (
        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(budget)}</span>
      ),
      sorter: (a, b) => a.budget - b.budget
    },
    {
      title: 'Số khóa học',
      dataIndex: 'items',
      key: 'items',
      align: 'center',
      sorter: (a, b) => a.items - b.items
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => renderStatus(status, record.approvalLevel),
      filters: [
        { text: 'Nháp', value: 'draft' },
        { text: 'Chờ duyệt', value: 'waiting_approval' },
        { text: 'Đã duyệt', value: 'approved' },
        { text: 'Đang triển khai', value: 'deployed' },
        { text: 'Hoàn thành', value: 'completed' },
        { text: 'Lưu trữ', value: 'archived' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Tiến độ',
      dataIndex: 'completionRate',
      key: 'completionRate',
      render: (rate) => {
        let color = 'default';
        if (rate > 0) color = 'blue';
        if (rate >= 50) color = 'cyan';
        if (rate === 100) color = 'green';
        
        return <Progress percent={rate} size="small" strokeColor={color} />;
      },
      sorter: (a, b) => a.completionRate - b.completionRate
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Dropdown 
          overlay={renderActionMenu(record)} 
          trigger={['click']}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  // Render statistics cards
  const renderStatistics = () => {
    // Calculate statistics
    const totalPlans = plans.length;
    const draftPlans = plans.filter(p => p.status === 'draft').length;
    const waitingApprovalPlans = plans.filter(p => p.status === 'waiting_approval').length;
    const approvedPlans = plans.filter(p => p.status === 'approved').length;
    const deployedPlans = plans.filter(p => p.status === 'deployed').length;
    const completedPlans = plans.filter(p => p.status === 'completed').length;
    
    return (
      <Row gutter={16} className="stats-row">
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic 
              title="Tổng kế hoạch" 
              value={totalPlans} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic 
              title="Nháp" 
              value={draftPlans} 
              valueStyle={{ color: '#8c8c8c' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic 
              title="Chờ duyệt" 
              value={waitingApprovalPlans} 
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic 
              title="Đã duyệt" 
              value={approvedPlans} 
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic 
              title="Đang triển khai" 
              value={deployedPlans} 
              valueStyle={{ color: '#1890ff' }}
              prefix={<RocketOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic 
              title="Hoàn thành" 
              value={completedPlans} 
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  // Render dashboard overview
  const renderDashboard = () => {
    if (!summaryData) return <div className="dashboard-loading"><Spin size="large" /></div>;
    
    return (
      <div className="dashboard-container">
        {/* Summary Cards */}
        <Row gutter={[16, 16]} className="summary-cards">
          <Col xs={24} sm={12} md={6}>
            <Card className="summary-card">
              <Statistic 
                title="Tổng kế hoạch" 
                value={plans.length} 
                prefix={<FileProtectOutlined />}
                valueStyle={{ color: '#0D6EFD' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="summary-card">
              <Statistic 
                title="Tổng ngân sách" 
                value={summaryData.totalBudget} 
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#52c41a' }}
                formatter={(value) => `${new Intl.NumberFormat('vi-VN').format(value)} đ`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="summary-card">
              <Statistic 
                title="Tổng khóa học" 
                value={summaryData.totalItems} 
                prefix={<BookOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="summary-card">
              <Statistic 
                title="Tiến độ trung bình" 
                value={summaryData.avgCompletionRate} 
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#13c2c2' }}
                suffix="%"
                precision={1}
              />
            </Card>
          </Col>
        </Row>
        
        {/* Charts and Lists */}
        <Row gutter={[16, 16]} className="dashboard-content">
          <Col xs={24} lg={16}>
            <Card 
              title={<><BarChartOutlined /> Thống kê theo trạng thái</>}
              className="chart-card"
            >
              <div className="status-chart">
                {Object.keys(STATUS).map(statusKey => {
                  const status = STATUS[statusKey];
                  const count = plans.filter(p => p.status === status).length;
                  const percentage = plans.length > 0 ? Math.round(count / plans.length * 100) : 0;
                  const { color, icon } = STATUS_COLORS[status];
                  
                  return (
                    <div key={status} className="status-item">
                      <div className="status-icon" style={{ backgroundColor: color }}>
                        {React.cloneElement(icon, { style: { color: '#fff' } })}
                      </div>
                      <div className="status-info">
                        <div className="status-label">
                          {renderStatus(status, 0)}
                          <span className="status-count">{count}</span>
                        </div>
                        <Progress 
                          percent={percentage} 
                          showInfo={false} 
                          strokeColor={color}
                          trailColor="#f0f0f0"
                          size="small"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            
            <Card 
              title={<><TeamOutlined /> Phân bố theo phòng ban</>}
              className="chart-card departments-card"
              style={{ marginTop: 16 }}
            >
              {topDepartments.length > 0 ? (
                <List
                  dataSource={topDepartments}
                  renderItem={item => (
                    <List.Item>
                      <div className="department-item">
                        <div className="department-name">{item.name}</div>
                        <div className="department-stats">
                          <div className="department-count">
                            <FileProtectOutlined /> {item.count} kế hoạch
                          </div>
                          <div className="department-budget">
                            <DollarOutlined /> {new Intl.NumberFormat('vi-VN').format(item.budget)} đ
                          </div>
                        </div>
                        <Progress 
                          percent={Math.round(item.count / plans.length * 100)} 
                          size="small" 
                          strokeColor="#0D6EFD"
                        />
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có dữ liệu" />
              )}
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card 
              title={<><BarsOutlined /> Hoạt động gần đây</>}
              className="activity-card"
            >
              {recentActivity.length > 0 ? (
                <List
                  dataSource={recentActivity}
                  renderItem={item => {
                    let icon;
                    let color;
                    
                    switch(item.type) {
                      case 'approval':
                        icon = <CheckCircleOutlined />;
                        color = '#52c41a';
                        break;
                      case 'create':
                        icon = <FileAddOutlined />;
                        color = '#1890ff';
                        break;
                      case 'deploy':
                        icon = <RocketOutlined />;
                        color = '#722ed1';
                        break;
                      case 'complete':
                        icon = <FileDoneOutlined />;
                        color = '#13c2c2';
                        break;
                      case 'edit':
                        icon = <EditOutlined />;
                        color = '#faad14';
                        break;
                      default:
                        icon = <InfoCircleOutlined />;
                        color = '#8c8c8c';
                    }
                    
                    return (
                      <List.Item>
                        <div className="activity-item">
                          <div className="activity-icon" style={{ backgroundColor: color }}>
                            {React.cloneElement(icon, { style: { color: '#fff' } })}
                          </div>
                          <div className="activity-content">
                            <div className="activity-title">{item.title}</div>
                            <div className="activity-meta">
                              <span className="activity-user">{item.user}</span>
                              <span className="activity-time">{item.time}</span>
                            </div>
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                />
              ) : (
                <Empty description="Không có hoạt động gần đây" />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  return (
    <div className="plan-list-container">
      <Card 
        title={
          <div className="page-header">
            <div className="page-title">
              <Button 
                type="link" 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBackToDashboard}
                className="back-button"
              >
                Quay lại Dashboard
              </Button>
              <BookOutlined className="page-icon" />
              <span>Kế hoạch đào tạo</span>
            </div>
          </div>
        }
        className="plan-list-card"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleCreatePlan}
            className="create-button"
          >
            Tạo kế hoạch mới
          </Button>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="plan-tabs">
          <TabPane tab={<><AppstoreOutlined /> Tổng quan</>} key="dashboard">
            {renderDashboard()}
          </TabPane>
          
          <TabPane tab={<><BarsOutlined /> Danh sách</>} key="list">
            {renderStatistics()}
            
            <div className="filter-section">
              <Space wrap>
                <Search
                  placeholder="Tìm kiếm kế hoạch"
                  allowClear
                  onSearch={handleSearch}
                  style={{ width: 250 }}
                />
                <Select 
                  defaultValue="all" 
                  style={{ width: 180 }} 
                  onChange={handleStatusChange}
                >
                  <Option value="all">Tất cả trạng thái</Option>
                  <Option value={STATUS.DRAFT}>Nháp</Option>
                  <Option value={STATUS.WAITING_APPROVAL}>Chờ duyệt</Option>
                  <Option value={STATUS.APPROVED}>Đã duyệt</Option>
                  <Option value={STATUS.DEPLOYED}>Đang triển khai</Option>
                  <Option value={STATUS.COMPLETED}>Hoàn thành</Option>
                  <Option value={STATUS.ARCHIVED}>Lưu trữ</Option>
                </Select>
                <Select 
                  defaultValue="all" 
                  style={{ width: 180 }} 
                  onChange={(value) => setFilters({...filters, department: value})}
                >
                  <Option value="all">Tất cả phòng ban</Option>
                  <Option value="Phòng Nhân sự">Phòng Nhân sự</Option>
                  <Option value="Phòng Kế toán">Phòng Kế toán</Option>
                  <Option value="Ban Giám đốc">Ban Giám đốc</Option>
                  <Option value="Phòng Kinh doanh">Phòng Kinh doanh</Option>
                  <Option value="Phòng Marketing">Phòng Marketing</Option>
                  <Option value="Phòng IT">Phòng IT</Option>
                  <Option value="Phòng Dự án">Phòng Dự án</Option>
                  <Option value="Phòng Hành chính">Phòng Hành chính</Option>
                  <Option value="Toàn công ty">Toàn công ty</Option>
                </Select>
                <Select 
                  defaultValue={new Date().getFullYear()} 
                  style={{ width: 120 }}
                >
                  <Option value={2025}>2025</Option>
                  <Option value={2024}>2024</Option>
                  <Option value={2023}>2023</Option>
                </Select>
                <Button 
                  icon={<FileExcelOutlined />}
                  style={{ 
                    background: '#E6F4EA', 
                    color: '#16A34A',
                    borderColor: '#16A34A',
                    fontWeight: 500 
                  }}
                >
                  Xuất Excel
                </Button>
              </Space>
            </div>
            
            <Table
              columns={columns}
              dataSource={plans}
              rowKey="id"
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
              className="plan-table"
              rowClassName={(record) => record.status === 'completed' ? 'completed-row' : ''}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PlanList;
