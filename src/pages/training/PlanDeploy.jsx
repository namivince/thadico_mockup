import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Space, 
  Tabs, 
  Tag, 
  Row, 
  Col,
  Typography,
  Tooltip,
  Badge,
  Modal,
  message,
  Calendar,
  Select,
  Input,
  Form,
  Drawer,
  Table,
  Avatar,
  Popconfirm,
  DatePicker,
  TimePicker,
  Divider,
  InputNumber,
  Spin,
  Empty,
  Progress
} from 'antd';
import { 
  PlusOutlined, 
  CalendarOutlined, 
  UserOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  BellOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
  DragOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './PlanDeploy.css';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Mock data for statuses
const STATUSES = {
  PLANNED: 'planned',
  SCHEDULED: 'scheduled',
  RUNNING: 'running',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Mock data for columns
const columnsData = [
  {
    id: STATUSES.PLANNED,
    title: 'Dự kiến',
    color: '#d9d9d9'
  },
  {
    id: STATUSES.SCHEDULED,
    title: 'Đã lên lịch',
    color: '#1890ff'
  },
  {
    id: STATUSES.RUNNING,
    title: 'Đang diễn ra',
    color: '#52c41a'
  },
  {
    id: STATUSES.COMPLETED,
    title: 'Hoàn thành',
    color: '#13c2c2'
  },
  {
    id: STATUSES.CANCELLED,
    title: 'Đã hủy',
    color: '#f5222d'
  }
];

const PlanDeploy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classForm] = Form.useForm();
  const [filter, setFilter] = useState({
    quarter: 'all',
    department: 'all'
  });
  
  // Fetch plan data
  useEffect(() => {
    fetchPlanData();
    fetchClasses();
  }, [id]);
  
  const fetchPlanData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API call
      const mockPlan = {
        id: 3,
        name: 'Kế hoạch đào tạo kỹ năng lãnh đạo',
        year: 2025,
        description: 'Kế hoạch đào tạo kỹ năng lãnh đạo cho các cấp quản lý',
        budget: 350000000,
        status: 'approved',
        createdBy: 'Lê Văn C',
        createdAt: '2025-02-20',
        department: 'Phòng Nhân sự',
        objectives: ['Nâng cao kỹ năng lãnh đạo', 'Phát triển kỹ năng quản lý'],
        items: [
          {
            id: 1,
            courseName: 'Kỹ năng lãnh đạo cấp cao',
            targetDepartment: 'Ban Giám đốc',
            participants: 5,
            cost: 100000000,
            schedule: 'Q2/2025'
          },
          {
            id: 2,
            courseName: 'Kỹ năng quản lý dự án',
            targetDepartment: 'Phòng Kỹ thuật',
            participants: 10,
            cost: 120000000,
            schedule: 'Q2/2025'
          },
          {
            id: 3,
            courseName: 'Kỹ năng quản lý nhóm',
            targetDepartment: 'Phòng Kinh doanh',
            participants: 15,
            cost: 130000000,
            schedule: 'Q3/2025'
          }
        ]
      };
      
      setPlanData(mockPlan);
    } catch (error) {
      console.error('Error fetching plan data:', error);
      message.error('Không thể tải dữ liệu kế hoạch');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchClasses = async () => {
    try {
      // Mock data - replace with API call
      const mockClasses = [
        {
          id: 1,
          planItemId: 1,
          courseName: 'Kỹ năng lãnh đạo cấp cao',
          targetDepartment: 'Ban Giám đốc',
          status: STATUSES.SCHEDULED,
          startDate: '2025-05-15',
          endDate: '2025-05-16',
          startTime: '08:30',
          endTime: '16:30',
          location: 'Phòng họp A',
          instructor: 'Nguyễn Văn X',
          participants: [
            { id: 1, name: 'Nguyễn Văn A', position: 'Giám đốc' },
            { id: 2, name: 'Trần Thị B', position: 'Phó Giám đốc' }
          ],
          estimatedCost: 100000000,
          actualCost: null,
          lmsLink: 'https://lms.thadico.com/course/123',
          quarter: 'Q2/2025'
        },
        {
          id: 2,
          planItemId: 2,
          courseName: 'Kỹ năng quản lý dự án',
          targetDepartment: 'Phòng Kỹ thuật',
          status: STATUSES.PLANNED,
          startDate: null,
          endDate: null,
          startTime: null,
          endTime: null,
          location: null,
          instructor: null,
          participants: [],
          estimatedCost: 120000000,
          actualCost: null,
          lmsLink: null,
          quarter: 'Q2/2025'
        },
        {
          id: 3,
          planItemId: 3,
          courseName: 'Kỹ năng quản lý nhóm',
          targetDepartment: 'Phòng Kinh doanh',
          status: STATUSES.PLANNED,
          startDate: null,
          endDate: null,
          startTime: null,
          endTime: null,
          location: null,
          instructor: null,
          participants: [],
          estimatedCost: 130000000,
          actualCost: null,
          lmsLink: null,
          quarter: 'Q3/2025'
        }
      ];
      
      setClasses(mockClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  
  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Find the class
    const classItem = classes.find(c => c.id.toString() === draggableId);
    
    // Update status
    const updatedClasses = classes.map(c => {
      if (c.id.toString() === draggableId) {
        return {
          ...c,
          status: destination.droppableId
        };
      }
      return c;
    });
    
    setClasses(updatedClasses);
    
    // Show success message
    message.success(`Đã chuyển "${classItem.courseName}" sang trạng thái "${columnsData.find(col => col.id === destination.droppableId).title}"`);
  };
  
  // Filter classes
  const getFilteredClasses = () => {
    return classes.filter(c => {
      // Filter by quarter
      if (filter.quarter !== 'all' && c.quarter !== filter.quarter) {
        return false;
      }
      
      // Filter by department
      if (filter.department !== 'all' && c.targetDepartment !== filter.department) {
        return false;
      }
      
      return true;
    });
  };
  
  // Group classes by status
  const getClassesByStatus = () => {
    const filteredClasses = getFilteredClasses();
    const result = {};
    
    columnsData.forEach(column => {
      result[column.id] = filteredClasses.filter(c => c.status === column.id);
    });
    
    return result;
  };
  
  // Open class drawer
  const openClassDrawer = (classItem = null) => {
    setSelectedClass(classItem);
    
    if (classItem) {
      classForm.setFieldsValue({
        courseName: classItem.courseName,
        targetDepartment: classItem.targetDepartment,
        dateRange: classItem.startDate && classItem.endDate ? [
          moment(classItem.startDate),
          moment(classItem.endDate)
        ] : undefined,
        timeRange: classItem.startTime && classItem.endTime ? [
          moment(classItem.startTime, 'HH:mm'),
          moment(classItem.endTime, 'HH:mm')
        ] : undefined,
        location: classItem.location,
        instructor: classItem.instructor,
        participants: classItem.participants.map(p => p.id),
        estimatedCost: classItem.estimatedCost,
        actualCost: classItem.actualCost,
        lmsLink: classItem.lmsLink
      });
    } else {
      classForm.resetFields();
    }
    
    setDrawerVisible(true);
  };
  
  // Close class drawer
  const closeClassDrawer = () => {
    setDrawerVisible(false);
    setSelectedClass(null);
    classForm.resetFields();
  };
  
  // Save class
  const saveClass = async (values) => {
    try {
      // Extract values
      const {
        dateRange,
        timeRange,
        ...restValues
      } = values;
      
      // Format dates and times
      const startDate = dateRange ? dateRange[0].format('YYYY-MM-DD') : null;
      const endDate = dateRange ? dateRange[1].format('YYYY-MM-DD') : null;
      const startTime = timeRange ? timeRange[0].format('HH:mm') : null;
      const endTime = timeRange ? timeRange[1].format('HH:mm') : null;
      
      // Prepare data
      const classData = {
        ...restValues,
        startDate,
        endDate,
        startTime,
        endTime,
        status: selectedClass ? selectedClass.status : STATUSES.PLANNED
      };
      
      // If scheduling a class, update status
      if (startDate && !selectedClass?.startDate) {
        classData.status = STATUSES.SCHEDULED;
      }
      
      // Update or create class
      if (selectedClass) {
        // Update existing class
        const updatedClasses = classes.map(c => {
          if (c.id === selectedClass.id) {
            return {
              ...c,
              ...classData
            };
          }
          return c;
        });
        
        setClasses(updatedClasses);
        message.success('Đã cập nhật lớp học');
      } else {
        // Create new class
        const newClass = {
          id: Date.now(),
          planItemId: null,
          ...classData,
          participants: [],
          quarter: 'Q2/2025' // Default quarter
        };
        
        setClasses([...classes, newClass]);
        message.success('Đã tạo lớp học mới');
      }
      
      closeClassDrawer();
    } catch (error) {
      console.error('Error saving class:', error);
      message.error('Không thể lưu lớp học');
    }
  };
  
  // Delete class
  const deleteClass = (classId) => {
    const updatedClasses = classes.filter(c => c.id !== classId);
    setClasses(updatedClasses);
    message.success('Đã xóa lớp học');
  };
  
  // Send notifications
  const sendNotifications = (classId) => {
    message.success('Đã gửi thông báo cho học viên và giảng viên');
  };
  
  // Export class data
  const exportClassData = () => {
    message.success('Đang xuất dữ liệu lớp học');
  };
  
  // Render class card
  const renderClassCard = (classItem) => {
    const hasSchedule = classItem.startDate && classItem.endDate;
    
    return (
      <div className="class-card">
        <div className="class-card-header">
          <div className="class-card-title">{classItem.courseName}</div>
          <Tag color={getStatusColor(classItem.status)}>{getStatusText(classItem.status)}</Tag>
        </div>
        
        <div className="class-card-content">
          <div className="class-card-info">
            <div><TeamOutlined /> {classItem.targetDepartment}</div>
            {hasSchedule && (
              <>
                <div><CalendarOutlined /> {formatDateRange(classItem.startDate, classItem.endDate)}</div>
                <div><ClockCircleOutlined /> {formatTimeRange(classItem.startTime, classItem.endTime)}</div>
              </>
            )}
            {classItem.location && (
              <div><EnvironmentOutlined /> {classItem.location}</div>
            )}
            {classItem.instructor && (
              <div><UserOutlined /> {classItem.instructor}</div>
            )}
          </div>
          
          <div className="class-card-stats">
            <div className="class-card-stat">
              <div className="stat-label">Học viên</div>
              <div className="stat-value">{classItem.participants.length}</div>
            </div>
            <div className="class-card-stat">
              <div className="stat-label">Chi phí</div>
              <div className="stat-value">{formatCurrency(classItem.estimatedCost)}</div>
            </div>
          </div>
        </div>
        
        <div className="class-card-actions">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={(e) => {
              e.stopPropagation();
              openClassDrawer(classItem);
            }}
          />
          {hasSchedule && (
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              onClick={(e) => {
                e.stopPropagation();
                sendNotifications(classItem.id);
              }}
            />
          )}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa lớp học này?"
            onConfirm={(e) => {
              e.stopPropagation();
              deleteClass(classItem.id);
            }}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </div>
      </div>
    );
  };
  
  // Get status color
  const getStatusColor = (status) => {
    const column = columnsData.find(col => col.id === status);
    return column ? column.color : '#d9d9d9';
  };
  
  // Get status text
  const getStatusText = (status) => {
    const column = columnsData.find(col => col.id === status);
    return column ? column.title : 'Không xác định';
  };
  
  // Format date range
  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('vi-VN');
    }
    
    return `${start.toLocaleDateString('vi-VN')} - ${end.toLocaleDateString('vi-VN')}`;
  };
  
  // Format time range
  const formatTimeRange = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    return `${startTime} - ${endTime}`;
  };
  
  // Format currency
  const formatCurrency = (value) => {
    if (!value) return '0 VND';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };
  
  // Render kanban board
  const renderKanbanBoard = () => {
    const classesByStatus = getClassesByStatus();
    
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {columnsData.map(column => (
            <div key={column.id} className="kanban-column">
              <div 
                className="kanban-column-header" 
                style={{ backgroundColor: column.color }}
              >
                <div className="column-title">{column.title}</div>
                <Badge 
                  count={classesByStatus[column.id].length} 
                  style={{ backgroundColor: '#fff', color: column.color }}
                />
              </div>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className={`kanban-column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {classesByStatus[column.id].map((classItem, index) => (
                      <Draggable
                        key={classItem.id}
                        draggableId={classItem.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`draggable-item ${snapshot.isDragging ? 'dragging' : ''}`}
                          >
                            {renderClassCard(classItem)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {classesByStatus[column.id].length === 0 && (
                      <div className="empty-column">
                        <Text type="secondary">Không có lớp học</Text>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
              
              {column.id === STATUSES.PLANNED && (
                <div className="column-footer">
                  <Button 
                    type="dashed" 
                    icon={<PlusOutlined />} 
                    onClick={() => openClassDrawer()}
                    block
                  >
                    Thêm lớp học
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </DragDropContext>
    );
  };
  
  // Render class drawer
  const renderClassDrawer = () => {
    return (
      <Drawer
        title={selectedClass ? 'Chỉnh sửa lớp học' : 'Thêm lớp học mới'}
        width={720}
        onClose={closeClassDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={closeClassDrawer} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button type="primary" onClick={() => classForm.submit()}>
              Lưu
            </Button>
          </div>
        }
      >
        <Form
          form={classForm}
          layout="vertical"
          onFinish={saveClass}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="courseName"
                label="Tên khóa học"
                rules={[{ required: true, message: 'Vui lòng nhập tên khóa học' }]}
              >
                <Input placeholder="Nhập tên khóa học" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="targetDepartment"
                label="Đơn vị"
                rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
              >
                <Select placeholder="Chọn đơn vị">
                  <Option value="Ban Giám đốc">Ban Giám đốc</Option>
                  <Option value="Phòng Nhân sự">Phòng Nhân sự</Option>
                  <Option value="Phòng Kỹ thuật">Phòng Kỹ thuật</Option>
                  <Option value="Phòng Kinh doanh">Phòng Kinh doanh</Option>
                  <Option value="Phòng Marketing">Phòng Marketing</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateRange"
                label="Thời gian"
              >
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timeRange"
                label="Giờ học"
              >
                <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Địa điểm"
              >
                <Input placeholder="Nhập địa điểm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Giảng viên"
              >
                <Select placeholder="Chọn giảng viên">
                  <Option value="Nguyễn Văn X">Nguyễn Văn X</Option>
                  <Option value="Trần Thị Y">Trần Thị Y</Option>
                  <Option value="Lê Văn Z">Lê Văn Z</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="participants"
            label="Học viên"
          >
            <Select
              mode="multiple"
              placeholder="Chọn học viên"
              style={{ width: '100%' }}
            >
              <Option value={1}>Nguyễn Văn A - Giám đốc</Option>
              <Option value={2}>Trần Thị B - Phó Giám đốc</Option>
              <Option value={3}>Lê Văn C - Trưởng phòng Kỹ thuật</Option>
              <Option value={4}>Phạm Thị D - Trưởng phòng Kinh doanh</Option>
            </Select>
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="estimatedCost"
                label="Chi phí dự kiến"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập chi phí dự kiến"
                  prefix="VND"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="actualCost"
                label="Chi phí thực tế"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập chi phí thực tế"
                  prefix="VND"
                  disabled={selectedClass?.status !== STATUSES.COMPLETED}
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="lmsLink"
            label="Liên kết LMS"
          >
            <Input placeholder="Nhập liên kết đến hệ thống LMS" />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };
  
  // Render filter section
  const renderFilterSection = () => {
    // Get unique quarters
    const quarters = [...new Set(classes.map(c => c.quarter))];
    
    // Get unique departments
    const departments = [...new Set(classes.map(c => c.targetDepartment))];
    
    return (
      <div className="filter-section">
        <Space>
          <Select
            value={filter.quarter}
            onChange={(value) => setFilter({ ...filter, quarter: value })}
            style={{ width: 120 }}
          >
            <Option value="all">Tất cả quý</Option>
            {quarters.map(quarter => (
              <Option key={quarter} value={quarter}>{quarter}</Option>
            ))}
          </Select>
          
          <Select
            value={filter.department}
            onChange={(value) => setFilter({ ...filter, department: value })}
            style={{ width: 180 }}
          >
            <Option value="all">Tất cả đơn vị</Option>
            {departments.map(department => (
              <Option key={department} value={department}>{department}</Option>
            ))}
          </Select>
          
          <Button icon={<ExportOutlined />} onClick={exportClassData}>
            Xuất dữ liệu
          </Button>
        </Space>
      </div>
    );
  };
  
  if (loading) {
    return <Spin size="large" />;
  }
  
  if (!planData) {
    return <Empty description="Không tìm thấy kế hoạch" />;
  }
  
  return (
    <div className="plan-deploy-container">
      <div className="deploy-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/training/plans')}
        >
          Quay lại
        </Button>
        <div className="deploy-title">
          <Title level={4}>{planData.name}</Title>
          <Tag color="success">Đã duyệt</Tag>
        </div>
      </div>
      
      <Card className="plan-info-card">
        <Row gutter={16}>
          <Col span={6}>
            <Text type="secondary">Người tạo:</Text>
            <div>{planData.createdBy}</div>
          </Col>
          <Col span={6}>
            <Text type="secondary">Ngày tạo:</Text>
            <div>{new Date(planData.createdAt).toLocaleDateString('vi-VN')}</div>
          </Col>
          <Col span={6}>
            <Text type="secondary">Đơn vị:</Text>
            <div>{planData.department}</div>
          </Col>
          <Col span={6}>
            <Text type="secondary">Ngân sách:</Text>
            <div>{formatCurrency(planData.budget)}</div>
          </Col>
        </Row>
      </Card>
      
      {renderFilterSection()}
      
      {renderKanbanBoard()}
      
      {renderClassDrawer()}
    </div>
  );
};

export default PlanDeploy;
