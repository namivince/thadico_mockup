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
  Avatar,
  Divider,
  Tabs,
  Empty,
  List,
  Typography,
  Progress,
  Modal,
  Form,
  Rate,
  Spin
} from 'antd';
import { 
  PlusOutlined, 
  FileExcelOutlined, 
  FilterOutlined, 
  EllipsisOutlined,
  BookOutlined,
  FileSearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  StarFilled,
  BarChartOutlined,
  PieChartOutlined,
  AppstoreOutlined,
  BarsOutlined,
  UserOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  ReadOutlined,
  TrophyOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { trainingCourses } from '../../data/mockData';
import './CourseList.css';

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Category constants
const CATEGORIES = {
  SOFT_SKILLS: 'Soft Skills',
  MANAGEMENT: 'Management',
  TECHNICAL: 'Technical',
  LANGUAGE: 'Language',
  SALES: 'Sales',
  MARKETING: 'Marketing'
};

// Category colors
const CATEGORY_COLORS = {
  [CATEGORIES.SOFT_SKILLS]: { color: '#1890ff', bgColor: '#e6f7ff' },
  [CATEGORIES.MANAGEMENT]: { color: '#722ed1', bgColor: '#f9f0ff' },
  [CATEGORIES.TECHNICAL]: { color: '#13c2c2', bgColor: '#e6fffb' },
  [CATEGORIES.LANGUAGE]: { color: '#52c41a', bgColor: '#f6ffed' },
  [CATEGORIES.SALES]: { color: '#fa8c16', bgColor: '#fff7e6' },
  [CATEGORIES.MARKETING]: { color: '#eb2f96', bgColor: '#fff0f6' }
};

const CourseList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    priceRange: [0, 20000000]
  });
  
  const [activeTab, setActiveTab] = useState('list');
  const [viewMode, setViewMode] = useState('table');
  const [courseDetail, setCourseDetail] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [editForm] = Form.useForm();
  
  // Thêm dữ liệu mẫu chi tiết cho khóa học
  const courseDetails = {
    1: {
      id: 1,
      name: 'Kỹ năng lãnh đạo cấp cao',
      category: 'Soft Skills',
      cost: 15000000,
      duration: '3 ngày (24 giờ)',
      instructor: 'TS. Nguyễn Văn X - Chuyên gia đào tạo lãnh đạo',
      rating: 4.8,
      totalRatings: 45,
      description: 'Khóa học cung cấp các kỹ năng lãnh đạo cấp cao cho các nhà quản lý, giúp họ phát triển tư duy chiến lược và kỹ năng ra quyết định hiệu quả.',
      objectives: [
        'Phát triển tư duy chiến lược',
        'Nâng cao kỹ năng ra quyết định',
        'Xây dựng và phát triển đội ngũ',
        'Quản lý xung đột hiệu quả'
      ],
      targetAudience: 'Giám đốc, Trưởng phòng, Quản lý cấp cao',
      schedule: [
        { day: 'Ngày 1', content: 'Tư duy chiến lược và tầm nhìn lãnh đạo' },
        { day: 'Ngày 2', content: 'Kỹ năng ra quyết định và giải quyết vấn đề' },
        { day: 'Ngày 3', content: 'Xây dựng đội ngũ và quản lý xung đột' }
      ],
      materials: 'Sách, tài liệu, bài tập thực hành',
      certification: 'Chứng chỉ hoàn thành khóa học',
      reviews: [
        { user: 'Nguyễn Văn A', rating: 5, comment: 'Khóa học rất bổ ích, giúp tôi cải thiện kỹ năng lãnh đạo' },
        { user: 'Trần Thị B', rating: 4, comment: 'Giảng viên nhiệt tình, nội dung phong phú' }
      ],
      image: 'https://img.freepik.com/free-photo/business-meeting-office_23-2149060073.jpg'
    },
    2: {
      id: 2,
      name: 'Quản lý dự án',
      category: 'Management',
      cost: 12000000,
      duration: '4 ngày (32 giờ)',
      instructor: 'ThS. Lê Văn Y - PMP, Chuyên gia quản lý dự án',
      rating: 4.6,
      totalRatings: 38,
      description: 'Khóa học cung cấp kiến thức và kỹ năng quản lý dự án theo chuẩn quốc tế, giúp học viên nắm vững các phương pháp quản lý dự án hiệu quả.',
      objectives: [
        'Nắm vững quy trình quản lý dự án',
        'Lập kế hoạch và quản lý nguồn lực',
        'Quản lý rủi ro dự án',
        'Giám sát và kiểm soát dự án'
      ],
      targetAudience: 'Quản lý dự án, Team Leader, Trưởng nhóm',
      schedule: [
        { day: 'Ngày 1', content: 'Tổng quan về quản lý dự án' },
        { day: 'Ngày 2', content: 'Lập kế hoạch và quản lý nguồn lực' },
        { day: 'Ngày 3', content: 'Quản lý rủi ro và chất lượng' },
        { day: 'Ngày 4', content: 'Giám sát, kiểm soát và đóng dự án' }
      ],
      materials: 'Sách, tài liệu, bài tập thực hành, phần mềm quản lý dự án',
      certification: 'Chứng chỉ quản lý dự án',
      reviews: [
        { user: 'Phạm Văn C', rating: 5, comment: 'Khóa học giúp tôi quản lý dự án hiệu quả hơn' },
        { user: 'Hoàng Thị D', rating: 4, comment: 'Nội dung thực tế, dễ áp dụng' }
      ],
      image: 'https://img.freepik.com/free-photo/business-people-discussing-charts-graphs-showing-results-successful-teamwork_1150-5154.jpg'
    },
    3: {
      id: 3,
      name: 'Tiếng Anh giao tiếp',
      category: 'Language',
      cost: 8000000,
      duration: '12 tuần (48 giờ)',
      instructor: 'Ms. Sarah Johnson - Giảng viên tiếng Anh',
      rating: 4.7,
      totalRatings: 52,
      description: 'Khóa học tiếng Anh giao tiếp giúp học viên tự tin sử dụng tiếng Anh trong môi trường làm việc quốc tế.',
      objectives: [
        'Phát triển kỹ năng giao tiếp tiếng Anh',
        'Nâng cao vốn từ vựng trong công việc',
        'Cải thiện kỹ năng thuyết trình bằng tiếng Anh',
        'Tự tin trong các cuộc họp quốc tế'
      ],
      targetAudience: 'Nhân viên làm việc trong môi trường quốc tế',
      schedule: 'Học 2 buổi/tuần, mỗi buổi 2 giờ',
      materials: 'Sách, tài liệu, audio, video',
      certification: 'Chứng chỉ hoàn thành khóa học',
      reviews: [
        { user: 'Nguyễn Thị E', rating: 5, comment: 'Giảng viên nhiệt tình, phương pháp giảng dạy hiệu quả' },
        { user: 'Trần Văn F', rating: 5, comment: 'Tôi đã tự tin hơn khi giao tiếp với đối tác nước ngoài' }
      ],
      image: 'https://img.freepik.com/free-photo/english-teacher-doing-lesson-online_23-2149019143.jpg'
    },
    4: {
      id: 4,
      name: 'Excel nâng cao',
      category: 'Technical',
      cost: 5000000,
      duration: '5 ngày (40 giờ)',
      instructor: 'KS. Hoàng Văn Z - Chuyên gia Excel',
      rating: 4.9,
      totalRatings: 65,
      description: 'Khóa học Excel nâng cao giúp học viên thành thạo các kỹ năng phân tích dữ liệu, tạo báo cáo và tự động hóa công việc với Excel.',
      objectives: [
        'Sử dụng thành thạo các hàm nâng cao',
        'Phân tích dữ liệu với PivotTable',
        'Tạo báo cáo chuyên nghiệp',
        'Tự động hóa với Macro và VBA'
      ],
      targetAudience: 'Nhân viên kế toán, tài chính, phân tích dữ liệu',
      schedule: [
        { day: 'Ngày 1', content: 'Các hàm nâng cao trong Excel' },
        { day: 'Ngày 2', content: 'PivotTable và PivotChart' },
        { day: 'Ngày 3', content: 'Power Query và Power Pivot' },
        { day: 'Ngày 4', content: 'Tạo báo cáo và Dashboard' },
        { day: 'Ngày 5', content: 'Macro và VBA cơ bản' }
      ],
      materials: 'Tài liệu, bài tập thực hành, file mẫu',
      certification: 'Chứng chỉ Excel nâng cao',
      reviews: [
        { user: 'Lê Thị G', rating: 5, comment: 'Khóa học giúp tôi tiết kiệm rất nhiều thời gian trong công việc' },
        { user: 'Phạm Văn H', rating: 5, comment: 'Nội dung thực tế, dễ áp dụng vào công việc hàng ngày' }
      ],
      image: 'https://img.freepik.com/free-photo/person-working-html-computer_23-2150038840.jpg'
    }
  };

  // Fetch courses data
  useEffect(() => {
    fetchCourses();
  }, [pagination.current, pagination.pageSize, filters]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Use mock data
      let filteredData = [...trainingCourses];
      
      // Filter by category
      if (filters.category !== 'all') {
        filteredData = filteredData.filter(course => course.category === filters.category);
      }
      
      // Filter by search
      if (filters.search) {
        filteredData = filteredData.filter(course => 
          course.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      setCourses(filteredData);
      setPagination({
        ...pagination,
        total: filteredData.length
      });
    } catch (error) {
      console.error('Error fetching courses:', error);
      message.error('Không thể tải dữ liệu khóa học');
    } finally {
      setLoading(false);
    }
  };

  // Handle table change
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Handle category filter change
  const handleCategoryChange = (value) => {
    setFilters({
      ...filters,
      category: value
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
  
  // Create new course
  const handleCreateCourse = () => {
    navigate('/training/courses/new');
  };

  // View course details
  const handleViewCourse = (id) => {
    // Lấy thông tin chi tiết khóa học từ dữ liệu mẫu
    const detail = courseDetails[id];
    if (detail) {
      setCourseDetail(detail);
      setDetailModalVisible(true);
    } else {
      message.error('Không tìm thấy thông tin chi tiết khóa học!');
    }
  };

  // Edit course
  const handleEditCourse = (id) => {
    // Lấy thông tin chi tiết khóa học từ dữ liệu mẫu
    const course = courseDetails[id] || courses.find(c => c.id === id);
    if (course) {
      setCurrentCourse(course);
      
      // Set form values
      editForm.setFieldsValue({
        name: course.name,
        category: course.category,
        cost: course.cost,
        description: course.description || '',
        instructor: course.instructor || '',
        duration: course.duration || ''
      });
      
      // Show modal
      setEditModalVisible(true);
    } else {
      message.error('Không tìm thấy thông tin khóa học!');
    }
  };
  
  // Handle edit form submit
  const handleEditFormSubmit = () => {
    if (!currentCourse) return;
    
    editForm.validateFields().then(values => {
      // Update course object
      const updatedCourse = {
        ...currentCourse,
        name: values.name,
        category: values.category,
        cost: values.cost,
        description: values.description,
        instructor: values.instructor,
        duration: values.duration
      };
      
      // Update courses list
      setCourses(courses.map(c => c.id === currentCourse.id ? updatedCourse : c));
      
      // Show success message
      message.success('Cập nhật khóa học thành công!');
      
      // Close modal and reset
      setEditModalVisible(false);
      setCurrentCourse(null);
      editForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };
  
  // Handle edit form cancel
  const handleEditFormCancel = () => {
    setEditModalVisible(false);
    setCurrentCourse(null);
    editForm.resetFields();
  };

  // Delete course
  const handleDeleteCourse = (id) => {
    message.success(`Đã xóa khóa học #${id}`);
    setCourses(courses.filter(course => course.id !== id));
  };

  // Render category tag
  const renderCategory = (category) => {
    const categoryConfig = CATEGORY_COLORS[category];
    if (!categoryConfig) return <Tag color="default">{category}</Tag>;
    
    const { color, bgColor } = categoryConfig;
    
    return (
      <Tag 
        color={bgColor}
        style={{ 
          color: color, 
          border: `1px solid ${color}`,
          fontWeight: 500,
          padding: '4px 8px',
          borderRadius: '4px'
        }}
      >
        {category}
      </Tag>
    );
  };
  
  // Handle detail modal close
  const handleDetailModalClose = () => {
    setDetailModalVisible(false);
    setCourseDetail(null);
  };

  // Render action menu
  const renderActionMenu = (record) => {
    const items = [
      {
        key: 'view',
        label: 'Xem chi tiết',
        icon: <FileSearchOutlined />,
        onClick: () => handleViewCourse(record.id)
      },
      {
        key: 'edit',
        label: 'Chỉnh sửa',
        icon: <EditOutlined />,
        onClick: () => handleEditCourse(record.id)
      },
      {
        key: 'delete',
        label: 'Xóa',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDeleteCourse(record.id)
      }
    ];

    return (
      <Menu items={items} />
    );
  };

  // Define columns
  const columns = [
    {
      title: 'Tên khóa học',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => handleViewCourse(record.id)}>{text}</a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category) => renderCategory(category),
      filters: [
        { text: 'Soft Skills', value: 'Soft Skills' },
        { text: 'Management', value: 'Management' },
        { text: 'Technical', value: 'Technical' },
        { text: 'Language', value: 'Language' },
        { text: 'Sales', value: 'Sales' },
        { text: 'Marketing', value: 'Marketing' }
      ],
      onFilter: (value, record) => record.category === value
    },
    {
      title: 'Chi phí',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => (
        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cost)}</span>
      ),
      sorter: (a, b) => a.cost - b.cost
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
    const totalCourses = courses.length;
    
    // Group by category
    const categoryCounts = {};
    courses.forEach(course => {
      categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1;
    });
    
    // Calculate total cost
    const totalCost = courses.reduce((sum, course) => sum + course.cost, 0);
    
    return (
      <Row gutter={16} className="stats-row">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic 
              title="Tổng khóa học" 
              value={totalCourses} 
              valueStyle={{ color: '#1890ff' }}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic 
              title="Danh mục" 
              value={Object.keys(categoryCounts).length} 
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic 
              title="Tổng chi phí" 
              value={totalCost} 
              valueStyle={{ color: '#52c41a' }}
              precision={0}
              formatter={value => `${new Intl.NumberFormat('vi-VN').format(value)} VND`}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  // Render course card for grid view
  const renderCourseCard = (course) => {
    return (
      <Card
        hoverable
        className="course-card"
        cover={
          <div className="course-card-cover">
            <img 
              alt={course.name}
              src={courseDetails[course.id]?.image || 'https://img.freepik.com/free-photo/training-concept_53876-23740.jpg'}
            />
            {renderCategory(course.category)}
          </div>
        }
        actions={[
          <Tooltip title="Xem chi tiết">
            <FileSearchOutlined key="view" onClick={() => handleViewCourse(course.id)} />
          </Tooltip>,
          <Tooltip title="Chỉnh sửa">
            <EditOutlined key="edit" onClick={() => handleEditCourse(course.id)} />
          </Tooltip>,
          <Tooltip title="Xóa">
            <DeleteOutlined key="delete" onClick={() => handleDeleteCourse(course.id)} />
          </Tooltip>
        ]}
      >
        <Card.Meta
          title={course.name}
          description={
            <>
              <div className="course-card-price">
                <DollarOutlined /> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.cost)}
              </div>
              {courseDetails[course.id]?.rating && (
                <div className="course-card-rating">
                  <Rate disabled defaultValue={courseDetails[course.id].rating} allowHalf />
                  <span className="rating-count">({courseDetails[course.id].totalRatings})</span>
                </div>
              )}
              {courseDetails[course.id]?.duration && (
                <div className="course-card-duration">
                  <ClockCircleOutlined /> {courseDetails[course.id].duration}
                </div>
              )}
            </>
          }
        />
      </Card>
    );
  };
  
  // Render course detail modal
  const renderCourseDetailModal = () => {
    if (!courseDetail) return null;
    
    return (
      <Modal
        title={
          <div className="course-detail-title">
            <BookOutlined className="course-detail-icon" />
            <span>{courseDetail.name}</span>
          </div>
        }
        open={detailModalVisible}
        onCancel={handleDetailModalClose}
        width={800}
        footer={[
          <Button key="back" onClick={handleDetailModalClose}>
            Đóng
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => {
              handleDetailModalClose();
              handleEditCourse(courseDetail.id);
            }}
          >
            Chỉnh sửa
          </Button>
        ]}
        className="course-detail-modal"
      >
        <div className="course-detail-content">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <img 
                src={courseDetail.image || 'https://img.freepik.com/free-photo/training-concept_53876-23740.jpg'} 
                alt={courseDetail.name} 
                className="course-detail-image" 
              />
            </Col>
            <Col xs={24} md={12}>
              <div className="course-detail-info">
                <div className="course-detail-category">
                  {renderCategory(courseDetail.category)}
                </div>
                <div className="course-detail-price">
                  <DollarOutlined /> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(courseDetail.cost)}
                </div>
                {courseDetail.rating && (
                  <div className="course-detail-rating">
                    <Rate disabled defaultValue={courseDetail.rating} allowHalf />
                    <span className="rating-count">({courseDetail.totalRatings} đánh giá)</span>
                  </div>
                )}
                <div className="course-detail-duration">
                  <ClockCircleOutlined /> <strong>Thời lượng:</strong> {courseDetail.duration}
                </div>
                <div className="course-detail-instructor">
                  <UserOutlined /> <strong>Giảng viên:</strong> {courseDetail.instructor}
                </div>
              </div>
            </Col>
          </Row>
          
          <Divider orientation="left">Mô tả</Divider>
          <Paragraph>{courseDetail.description}</Paragraph>
          
          <Divider orientation="left">Mục tiêu khóa học</Divider>
          <ul className="course-detail-objectives">
            {courseDetail.objectives?.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
          
          <Divider orientation="left">Đối tượng học viên</Divider>
          <Paragraph>{courseDetail.targetAudience}</Paragraph>
          
          <Divider orientation="left">Lịch học</Divider>
          {Array.isArray(courseDetail.schedule) ? (
            <List
              itemLayout="horizontal"
              dataSource={courseDetail.schedule}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<CalendarOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                    title={item.day}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Paragraph>{courseDetail.schedule}</Paragraph>
          )}
          
          <Divider orientation="left">Tài liệu học tập</Divider>
          <Paragraph>{courseDetail.materials}</Paragraph>
          
          <Divider orientation="left">Chứng chỉ</Divider>
          <Paragraph>{courseDetail.certification}</Paragraph>
          
          {courseDetail.reviews && courseDetail.reviews.length > 0 && (
            <>
              <Divider orientation="left">Đánh giá từ học viên</Divider>
              <List
                itemLayout="horizontal"
                dataSource={courseDetail.reviews}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={
                        <div>
                          {item.user} <Rate disabled defaultValue={item.rating} />
                        </div>
                      }
                      description={item.comment}
                    />
                  </List.Item>
                )}
              />
            </>
          )}
        </div>
      </Modal>
    );
  };
  
  // Render course edit modal
  const renderCourseEditModal = () => {
    return (
      <Modal
        title={
          <div className="course-edit-title">
            <EditOutlined className="course-edit-icon" />
            <span>Chỉnh sửa khóa học</span>
          </div>
        }
        open={editModalVisible}
        onCancel={handleEditFormCancel}
        onOk={handleEditFormSubmit}
        okText="Cập nhật"
        cancelText="Hủy"
        width={700}
      >
        <Form
          form={editForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên khóa học"
            rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select placeholder="Chọn danh mục">
              <Option value={CATEGORIES.SOFT_SKILLS}>Soft Skills</Option>
              <Option value={CATEGORIES.MANAGEMENT}>Management</Option>
              <Option value={CATEGORIES.TECHNICAL}>Technical</Option>
              <Option value={CATEGORIES.LANGUAGE}>Language</Option>
              <Option value={CATEGORIES.SALES}>Sales</Option>
              <Option value={CATEGORIES.MARKETING}>Marketing</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="cost"
            label="Chi phí"
            rules={[{ required: true, message: 'Vui lòng nhập chi phí!' }]}
          >
            <Input type="number" placeholder="Nhập chi phí" addonAfter="VND" />
          </Form.Item>
          
          <Form.Item
            name="duration"
            label="Thời lượng"
          >
            <Input placeholder="Ví dụ: 3 ngày (24 giờ)" />
          </Form.Item>
          
          <Form.Item
            name="instructor"
            label="Giảng viên"
          >
            <Input placeholder="Tên giảng viên" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={4} placeholder="Mô tả khóa học" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  
  return (
    <div className="course-list-container">
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
              <span>Khóa học đào tạo</span>
            </div>
          </div>
        }
        className="course-list-card"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleCreateCourse}
            className="create-button"
          >
            Thêm khóa học mới
          </Button>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="course-tabs">
          <TabPane tab={<><AppstoreOutlined /> Tổng quan</>} key="dashboard">
            {renderStatistics()}
            
            <Divider orientation="left">Khóa học nổi bật</Divider>
            <Row gutter={[16, 16]}>
              {courses.slice(0, 4).map(course => (
                <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                  {renderCourseCard(course)}
                </Col>
              ))}
            </Row>
            
            <Divider orientation="left">Thống kê theo danh mục</Divider>
            <Row gutter={[16, 16]}>
              {Object.keys(CATEGORIES).map(key => {
                const category = CATEGORIES[key];
                const count = courses.filter(c => c.category === category).length;
                const { color } = CATEGORY_COLORS[category];
                
                return (
                  <Col xs={24} sm={12} md={8} key={key}>
                    <Card className="category-stat-card">
                      <div className="category-stat-content">
                        <div className="category-stat-icon" style={{ backgroundColor: color }}>
                          {key === 'SOFT_SKILLS' && <TeamOutlined />}
                          {key === 'MANAGEMENT' && <BarChartOutlined />}
                          {key === 'TECHNICAL' && <AppstoreOutlined />}
                          {key === 'LANGUAGE' && <ReadOutlined />}
                          {key === 'SALES' && <TrophyOutlined />}
                          {key === 'MARKETING' && <BarChartOutlined />}
                        </div>
                        <div className="category-stat-info">
                          <div className="category-stat-title">{category}</div>
                          <div className="category-stat-count">{count} khóa học</div>
                        </div>
                      </div>
                      <Progress 
                        percent={Math.round(count / courses.length * 100)} 
                        showInfo={false} 
                        strokeColor={color}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </TabPane>
          
          <TabPane tab={<><BarsOutlined /> Danh sách</>} key="list">
            <div className="view-controls">
              <Space>
                <Button 
                  type={viewMode === 'table' ? 'primary' : 'default'}
                  icon={<BarsOutlined />}
                  onClick={() => setViewMode('table')}
                >
                  Bảng
                </Button>
                <Button 
                  type={viewMode === 'grid' ? 'primary' : 'default'}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewMode('grid')}
                >
                  Lưới
                </Button>
              </Space>
            </div>
            
            <div className="filter-section">
              <Space wrap>
                <Search
                  placeholder="Tìm kiếm khóa học"
                  allowClear
                  onSearch={handleSearch}
                  style={{ width: 250 }}
                />
                <Select 
                  defaultValue="all" 
                  style={{ width: 180 }} 
                  onChange={handleCategoryChange}
                >
                  <Option value="all">Tất cả danh mục</Option>
                  {Object.values(CATEGORIES).map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
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
            
            {viewMode === 'table' ? (
              <Table
                columns={columns}
                dataSource={courses}
                rowKey="id"
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                className="course-table"
              />
            ) : (
              <div className="course-grid">
                <Row gutter={[16, 16]}>
                  {courses.map(course => (
                    <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                      {renderCourseCard(course)}
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Card>
      
      {/* Course Detail Modal */}
      {renderCourseDetailModal()}
      
      {/* Course Edit Modal */}
      {renderCourseEditModal()}
    </div>
  );
};

export default CourseList;
