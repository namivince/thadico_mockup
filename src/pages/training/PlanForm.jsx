import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Steps, 
  Select, 
  InputNumber, 
  DatePicker, 
  Space, 
  Table, 
  Tag, 
  Divider, 
  Row, 
  Col,
  Typography,
  message,
  Modal,
  Tooltip,
  Statistic,
  Empty
} from 'antd';
import { 
  SaveOutlined, 
  SendOutlined, 
  ArrowLeftOutlined, 
  ArrowRightOutlined,
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './PlanForm.css';

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const PlanForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [planData, setPlanData] = useState({
    name: '',
    year: new Date().getFullYear(),
    description: '',
    budget: 0,
    objectives: [],
    items: []
  });
  
  // Mock data for dropdowns
  const departments = [
    { id: 1, name: 'Ban Giám đốc' },
    { id: 2, name: 'Phòng Nhân sự' },
    { id: 3, name: 'Phòng Kỹ thuật' },
    { id: 4, name: 'Phòng Kinh doanh' },
    { id: 5, name: 'Phòng Marketing' }
  ];
  
  const courses = [
    { id: 1, name: 'Kỹ năng lãnh đạo', category: 'Soft Skills', cost: 15000000 },
    { id: 2, name: 'Quản lý dự án', category: 'Management', cost: 12000000 },
    { id: 3, name: 'Tiếng Anh giao tiếp', category: 'Language', cost: 8000000 },
    { id: 4, name: 'Excel nâng cao', category: 'Technical', cost: 5000000 },
    { id: 5, name: 'Kỹ năng bán hàng', category: 'Sales', cost: 7000000 },
    { id: 6, name: 'Kỹ năng thuyết trình', category: 'Soft Skills', cost: 6000000 },
    { id: 7, name: 'Quản lý thời gian', category: 'Soft Skills', cost: 4000000 },
    { id: 8, name: 'Digital Marketing', category: 'Marketing', cost: 10000000 }
  ];
  
  // Fetch plan data if editing
  useEffect(() => {
    if (isEditing) {
      fetchPlanData();
    }
  }, [id]);
  
  const fetchPlanData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API call
      const mockPlan = {
        id: 1,
        name: 'Kế hoạch đào tạo 2025',
        year: 2025,
        description: 'Kế hoạch đào tạo toàn công ty năm 2025',
        budget: 500000000,
        objectives: ['Nâng cao kỹ năng lãnh đạo', 'Phát triển kỹ năng chuyên môn', 'Cải thiện ngoại ngữ'],
        items: [
          {
            id: 1,
            courseId: 1,
            courseName: 'Kỹ năng lãnh đạo',
            targetDepartmentId: 1,
            targetDepartment: 'Ban Giám đốc',
            participants: 5,
            cost: 15000000,
            schedule: 'Q1/2025'
          },
          {
            id: 2,
            courseId: 3,
            courseName: 'Tiếng Anh giao tiếp',
            targetDepartmentId: 4,
            targetDepartment: 'Phòng Kinh doanh',
            participants: 10,
            cost: 8000000,
            schedule: 'Q2/2025'
          }
        ]
      };
      
      setPlanData(mockPlan);
      form.setFieldsValue({
        name: mockPlan.name,
        year: mockPlan.year,
        description: mockPlan.description,
        budget: mockPlan.budget,
        objectives: mockPlan.objectives
      });
    } catch (error) {
      console.error('Error fetching plan data:', error);
      message.error('Không thể tải dữ liệu kế hoạch');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle next step
  const nextStep = async () => {
    try {
      if (currentStep === 0) {
        // Validate basic info
        await form.validateFields(['name', 'year', 'description']);
      } else if (currentStep === 1) {
        // Validate budget & objectives
        await form.validateFields(['budget', 'objectives']);
      }
      
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };
  
  // Handle previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = async (status = 'draft') => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      
      // Combine form values with items
      const submitData = {
        ...values,
        items: planData.items,
        status
      };
      
      // API call would go here
      console.log('Submitting plan:', submitData);
      
      setTimeout(() => {
        message.success(`Kế hoạch đã được ${status === 'draft' ? 'lưu nháp' : 'gửi phê duyệt'}`);
        navigate('/training/plans');
      }, 1000);
    } catch (error) {
      console.error('Submit failed:', error);
      message.error('Vui lòng kiểm tra lại thông tin');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle adding a new course item
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      courseId: null,
      courseName: '',
      targetDepartmentId: null,
      targetDepartment: '',
      participants: 1,
      cost: 0,
      schedule: ''
    };
    
    setPlanData({
      ...planData,
      items: [...planData.items, newItem]
    });
  };
  
  // Handle removing a course item
  const handleRemoveItem = (itemId) => {
    setPlanData({
      ...planData,
      items: planData.items.filter(item => item.id !== itemId)
    });
  };
  
  // Handle course selection
  const handleCourseChange = (courseId, itemId) => {
    const course = courses.find(c => c.id === courseId);
    
    setPlanData({
      ...planData,
      items: planData.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            courseId,
            courseName: course.name,
            cost: course.cost
          };
        }
        return item;
      })
    });
  };
  
  // Handle department selection
  const handleDepartmentChange = (departmentId, itemId) => {
    const department = departments.find(d => d.id === departmentId);
    
    setPlanData({
      ...planData,
      items: planData.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            targetDepartmentId: departmentId,
            targetDepartment: department.name
          };
        }
        return item;
      })
    });
  };
  
  // Handle participants change
  const handleParticipantsChange = (value, itemId) => {
    setPlanData({
      ...planData,
      items: planData.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            participants: value
          };
        }
        return item;
      })
    });
  };
  
  // Handle schedule change
  const handleScheduleChange = (value, itemId) => {
    setPlanData({
      ...planData,
      items: planData.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            schedule: value
          };
        }
        return item;
      })
    });
  };
  
  // Calculate total budget
  const calculateTotalCost = () => {
    return planData.items.reduce((total, item) => total + (item.cost * item.participants), 0);
  };
  
  // Check if over budget
  const isOverBudget = () => {
    const totalCost = calculateTotalCost();
    return totalCost > planData.budget;
  };
  
  // Render step 1: Basic Information
  const renderBasicInfo = () => (
    <Card title="Thông tin cơ bản" className="step-card">
      <Form.Item
        name="name"
        label="Tên kế hoạch"
        rules={[{ required: true, message: 'Vui lòng nhập tên kế hoạch' }]}
      >
        <Input placeholder="Nhập tên kế hoạch đào tạo" />
      </Form.Item>
      
      <Form.Item
        name="year"
        label="Năm thực hiện"
        rules={[{ required: true, message: 'Vui lòng chọn năm' }]}
      >
        <Select>
          <Option value={2023}>2023</Option>
          <Option value={2024}>2024</Option>
          <Option value={2025}>2025</Option>
          <Option value={2026}>2026</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
      >
        <TextArea rows={4} placeholder="Mô tả chi tiết về kế hoạch đào tạo" />
      </Form.Item>
    </Card>
  );
  
  // Render step 2: Budget & Objectives
  const renderBudgetObjectives = () => (
    <Card title="Ngân sách & Mục tiêu" className="step-card">
      <Form.Item
        name="budget"
        label="Ngân sách dự kiến"
        rules={[{ required: true, message: 'Vui lòng nhập ngân sách' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          placeholder="Nhập ngân sách dự kiến"
          prefix="VND"
          min={0}
          onChange={(value) => setPlanData({ ...planData, budget: value })}
        />
      </Form.Item>
      
      <Form.Item
        name="objectives"
        label="Mục tiêu đào tạo"
        rules={[{ required: true, message: 'Vui lòng nhập ít nhất một mục tiêu' }]}
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Nhập mục tiêu đào tạo"
          tokenSeparators={[',']}
        />
      </Form.Item>
      
      <Divider />
      
      <div className="budget-summary">
        <Row gutter={16}>
          <Col span={8}>
            <Card className="summary-card">
              <Statistic
                title="Ngân sách dự kiến"
                value={planData.budget || 0}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined />}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                suffix="VND"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="summary-card">
              <Statistic
                title="Chi phí dự tính"
                value={calculateTotalCost()}
                precision={0}
                valueStyle={{ color: isOverBudget() ? '#cf1322' : '#3f8600' }}
                prefix={<DollarOutlined />}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                suffix="VND"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="summary-card">
              <Statistic
                title="Còn lại"
                value={planData.budget - calculateTotalCost()}
                precision={0}
                valueStyle={{ color: isOverBudget() ? '#cf1322' : '#3f8600' }}
                prefix={<DollarOutlined />}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                suffix="VND"
              />
              {isOverBudget() && (
                <Text type="danger">Vượt ngân sách!</Text>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  );
  
  // Render step 3: Course Items & Review
  const renderCourseItems = () => (
    <Card 
      title="Danh sách khóa học" 
      className="step-card"
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddItem}
        >
          Thêm khóa học
        </Button>
      }
    >
      {planData.items.length === 0 ? (
        <Empty 
          description="Chưa có khóa học nào" 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
        />
      ) : (
        <div className="course-items">
          {planData.items.map((item, index) => (
            <Card 
              key={item.id} 
              className="course-item-card"
              title={`Khóa học ${index + 1}`}
              extra={
                <Button 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => handleRemoveItem(item.id)}
                  type="text"
                />
              }
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Khóa học"
                    required
                  >
                    <Select
                      value={item.courseId}
                      onChange={(value) => handleCourseChange(value, item.id)}
                      placeholder="Chọn khóa học"
                      style={{ width: '100%' }}
                    >
                      {courses.map(course => (
                        <Option key={course.id} value={course.id}>
                          {course.name} - {new Intl.NumberFormat('vi-VN').format(course.cost)} VND
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Đơn vị"
                    required
                  >
                    <Select
                      value={item.targetDepartmentId}
                      onChange={(value) => handleDepartmentChange(value, item.id)}
                      placeholder="Chọn đơn vị"
                      style={{ width: '100%' }}
                    >
                      {departments.map(dept => (
                        <Option key={dept.id} value={dept.id}>{dept.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Số người tham gia"
                    required
                  >
                    <InputNumber
                      min={1}
                      value={item.participants}
                      onChange={(value) => handleParticipantsChange(value, item.id)}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Thời gian dự kiến"
                    required
                  >
                    <Select
                      value={item.schedule}
                      onChange={(value) => handleScheduleChange(value, item.id)}
                      placeholder="Chọn thời gian"
                      style={{ width: '100%' }}
                    >
                      <Option value="Q1/2025">Q1/2025</Option>
                      <Option value="Q2/2025">Q2/2025</Option>
                      <Option value="Q3/2025">Q3/2025</Option>
                      <Option value="Q4/2025">Q4/2025</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Chi phí dự kiến">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={item.cost * item.participants}
                      disabled
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      prefix="VND"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}
      
      <Divider />
      
      <div className="plan-summary">
        <Title level={4}>Tổng kết kế hoạch</Title>
        
        <Row gutter={16}>
          <Col span={8}>
            <Card className="summary-card">
              <Statistic
                title="Tổng khóa học"
                value={planData.items.length}
                valueStyle={{ color: '#1890ff' }}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="summary-card">
              <Statistic
                title="Tổng người tham gia"
                value={planData.items.reduce((total, item) => total + item.participants, 0)}
                valueStyle={{ color: '#1890ff' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="summary-card">
              <Statistic
                title="Tổng chi phí"
                value={calculateTotalCost()}
                precision={0}
                valueStyle={{ color: isOverBudget() ? '#cf1322' : '#3f8600' }}
                prefix={<DollarOutlined />}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                suffix="VND"
              />
              {isOverBudget() && (
                <Text type="danger">Vượt ngân sách!</Text>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  );
  
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderBudgetObjectives();
      case 2:
        return renderCourseItems();
      default:
        return null;
    }
  };
  
  // Render footer actions
  const renderFooterActions = () => {
    return (
      <div className="form-actions">
        <Space>
          {currentStep > 0 && (
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={prevStep}
            >
              Quay lại
            </Button>
          )}
          
          {currentStep < 2 && (
            <Button 
              type="primary" 
              icon={<ArrowRightOutlined />} 
              onClick={nextStep}
            >
              Tiếp theo
            </Button>
          )}
          
          {currentStep === 2 && (
            <>
              <Button 
                icon={<SaveOutlined />} 
                onClick={() => handleSubmit('draft')}
                loading={submitting}
              >
                Lưu nháp
              </Button>
              
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={() => handleSubmit('waiting_approval')}
                loading={submitting}
                disabled={planData.items.length === 0 || isOverBudget()}
              >
                Gửi phê duyệt
              </Button>
            </>
          )}
        </Space>
      </div>
    );
  };
  
  return (
    <div className="plan-form-container">
      <Card className="plan-form-card">
        <div className="form-header">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/training/plans')}
          >
            Quay lại
          </Button>
          <Title level={4}>{isEditing ? 'Chỉnh sửa kế hoạch' : 'Tạo kế hoạch mới'}</Title>
        </div>
        
        <Steps current={currentStep} className="form-steps">
          <Step title="Thông tin cơ bản" icon={<InfoCircleOutlined />} />
          <Step title="Ngân sách & Mục tiêu" icon={<DollarOutlined />} />
          <Step title="Khóa học & Review" icon={<FileTextOutlined />} />
        </Steps>
        
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            year: new Date().getFullYear(),
            budget: 0,
            objectives: []
          }}
        >
          {renderStepContent()}
        </Form>
        
        {renderFooterActions()}
      </Card>
    </div>
  );
};

export default PlanForm;
