import React, { useState, useEffect } from 'react';
import { 
  Card, Form, Select, DatePicker, Button, Table, 
  Row, Col, Statistic, Spin, Input, InputNumber, 
  Space, Typography, Divider, Tag, Modal, message 
} from 'antd';
import { 
  BarChartOutlined, PieChartOutlined, 
  FileExcelOutlined, SaveOutlined, 
  PlusOutlined, DeleteOutlined, EditOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

// Mock data
const mockSurveys = [
  { id: 1, name: 'Khảo sát nhu cầu đào tạo Q3/2025', status: 'completed', responses: 120 },
  { id: 2, name: 'Khảo sát nhu cầu đào tạo Q2/2025', status: 'completed', responses: 105 },
  { id: 3, name: 'Khảo sát kỹ năng mềm 2025', status: 'completed', responses: 98 },
];

const mockDepartments = [
  { id: 1, name: 'Phòng Nhân sự' },
  { id: 2, name: 'Phòng Kỹ thuật' },
  { id: 3, name: 'Phòng Kinh doanh' },
  { id: 4, name: 'Phòng Tài chính' },
  { id: 5, name: 'Ban Giám đốc' },
];

const mockCourseRegistrations = [
  { id: 1, name: 'Excel nâng cao', count: 45, cost: 45000000, priority: 'Cao' },
  { id: 2, name: 'Quản lý dự án', count: 32, cost: 64000000, priority: 'Cao' },
  { id: 3, name: 'Tiếng Anh giao tiếp', count: 28, cost: 84000000, priority: 'Trung bình' },
  { id: 4, name: 'Kỹ năng thuyết trình', count: 25, cost: 37500000, priority: 'Trung bình' },
  { id: 5, name: 'Kỹ năng lãnh đạo', count: 18, cost: 54000000, priority: 'Cao' },
  { id: 6, name: 'Phân tích dữ liệu', count: 15, cost: 45000000, priority: 'Thấp' },
];

const mockSuggestedPlan = [
  { 
    id: 1, 
    name: 'Excel nâng cao', 
    timeRange: [moment('2025-10-15'), moment('2025-10-30')], 
    cost: 45000000,
    department: 'Tất cả',
    priority: 'Cao'
  },
  { 
    id: 2, 
    name: 'Quản lý dự án', 
    timeRange: [moment('2025-11-01'), moment('2025-11-15')], 
    cost: 64000000,
    department: 'Phòng Kỹ thuật, Phòng Kinh doanh',
    priority: 'Cao'
  },
  { 
    id: 3, 
    name: 'Tiếng Anh giao tiếp', 
    timeRange: [moment('2025-11-15'), moment('2025-12-15')], 
    cost: 84000000,
    department: 'Tất cả',
    priority: 'Trung bình'
  },
  { 
    id: 4, 
    name: 'Kỹ năng thuyết trình', 
    timeRange: [moment('2025-12-01'), moment('2025-12-15')], 
    cost: 37500000,
    department: 'Phòng Kinh doanh, Ban Giám đốc',
    priority: 'Trung bình'
  },
  { 
    id: 5, 
    name: 'Kỹ năng lãnh đạo', 
    timeRange: [moment('2025-12-16'), moment('2025-12-30')], 
    cost: 54000000,
    department: 'Ban Giám đốc, Phòng Nhân sự',
    priority: 'Cao'
  },
];

// Chart data
const topicChartData = {
  labels: ['Kỹ năng mềm', 'Kỹ năng chuyên môn', 'Ngoại ngữ', 'Quản lý', 'Công nghệ'],
  datasets: [
    {
      label: 'Số lượng đăng ký',
      data: [65, 85, 28, 42, 30],
      backgroundColor: [
        'rgba(124, 77, 255, 0.7)', // Indigo
        'rgba(16, 189, 189, 0.7)', // Teal
        'rgba(255, 152, 0, 0.7)',  // Amber
        'rgba(76, 175, 80, 0.7)',  // Green
        'rgba(33, 150, 243, 0.7)'  // Blue
      ],
      borderColor: [
        'rgba(124, 77, 255, 1)',
        'rgba(16, 189, 189, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(33, 150, 243, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const departmentChartData = {
  labels: ['Phòng Nhân sự', 'Phòng Kỹ thuật', 'Phòng Kinh doanh', 'Phòng Tài chính', 'Ban Giám đốc'],
  datasets: [
    {
      label: 'Số lượng đăng ký',
      data: [25, 45, 35, 20, 15],
      backgroundColor: [
        'rgba(124, 77, 255, 0.7)',
        'rgba(16, 189, 189, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(76, 175, 80, 0.7)',
        'rgba(33, 150, 243, 0.7)'
      ],
      borderColor: [
        'rgba(124, 77, 255, 1)',
        'rgba(16, 189, 189, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(33, 150, 243, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const PlanAutoSuggest = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [registrationData, setRegistrationData] = useState([]);
  const [suggestedPlan, setSuggestedPlan] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const [addCourseVisible, setAddCourseVisible] = useState(false);

  useEffect(() => {
    // Calculate total budget
    if (suggestedPlan.length > 0) {
      const total = suggestedPlan.reduce((sum, course) => sum + course.cost, 0);
      setTotalBudget(total);
    }
  }, [suggestedPlan]);

  const handleAnalyze = () => {
    if (!selectedSurvey) {
      message.error('Vui lòng chọn khảo sát để phân tích');
      return;
    }

    setAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setRegistrationData(mockCourseRegistrations);
      setSuggestedPlan(mockSuggestedPlan);
      setShowAnalysis(true);
      setAnalyzing(false);
      message.success('Phân tích hoàn tất. Đã tạo đề xuất kế hoạch đào tạo.');
    }, 2000);
  };

  const handleDeleteCourse = (id) => {
    const updatedPlan = suggestedPlan.filter(course => course.id !== id);
    setSuggestedPlan(updatedPlan);
    message.success('Đã xóa khóa học khỏi đề xuất');
  };

  const handleAddCourse = (values) => {
    const newCourse = {
      id: suggestedPlan.length + 1,
      name: values.name,
      timeRange: values.timeRange,
      cost: values.cost,
      department: values.department,
      priority: values.priority
    };
    
    setSuggestedPlan([...suggestedPlan, newCourse]);
    setAddCourseVisible(false);
    form.resetFields();
    message.success('Đã thêm khóa học vào đề xuất');
  };

  const handleCreatePlan = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Đã tạo kế hoạch đào tạo thành công');
      navigate('/training/plans');
    }, 1500);
  };

  const handleSaveSuggestion = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Đã lưu đề xuất thành công');
    }, 1000);
  };

  const handleExportReport = () => {
    message.success('Đang xuất báo cáo...');
    // In a real app, this would trigger a file download
  };

  const registrationColumns = [
    {
      title: 'Khóa học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Chi phí dự kiến',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => `${(cost / 1000000).toFixed(1)} triệu`,
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: 'Mức độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        let color = 'green';
        if (priority === 'Cao') {
          color = 'red';
        } else if (priority === 'Trung bình') {
          color = 'orange';
        }
        return <Tag color={color}>{priority}</Tag>;
      },
      filters: [
        { text: 'Cao', value: 'Cao' },
        { text: 'Trung bình', value: 'Trung bình' },
        { text: 'Thấp', value: 'Thấp' },
      ],
      onFilter: (value, record) => record.priority === value,
    },
  ];

  const suggestedPlanColumns = [
    {
      title: 'Khóa học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thời gian',
      dataIndex: 'timeRange',
      key: 'timeRange',
      render: (timeRange) => `${timeRange[0].format('DD/MM/YYYY')} - ${timeRange[1].format('DD/MM/YYYY')}`,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Chi phí dự kiến',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => `${(cost / 1000000).toFixed(1)} triệu`,
    },
    {
      title: 'Mức độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        let color = 'green';
        if (priority === 'Cao') {
          color = 'red';
        } else if (priority === 'Trung bình') {
          color = 'orange';
        }
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => message.info('Tính năng đang phát triển')}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteCourse(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="plan-auto-suggest">
      <Card title="Đề xuất kế hoạch đào tạo tự động" className="mb-4">
        <Spin spinning={loading}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Chọn khảo sát nhu cầu đào tạo">
                  <Select
                    placeholder="Chọn khảo sát"
                    onChange={(value) => setSelectedSurvey(value)}
                    style={{ width: '100%' }}
                  >
                    {mockSurveys.map(survey => (
                      <Option key={survey.id} value={survey.id}>
                        {survey.name} ({survey.responses} phản hồi)
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Thời gian">
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Phòng ban">
                  <Select
                    placeholder="Chọn phòng ban"
                    mode="multiple"
                    style={{ width: '100%' }}
                  >
                    {mockDepartments.map(dept => (
                      <Option key={dept.id} value={dept.id}>{dept.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Button 
              type="primary" 
              onClick={handleAnalyze} 
              loading={analyzing}
              icon={<BarChartOutlined />}
            >
              Phân tích và đề xuất
            </Button>
          </Form>
        </Spin>
      </Card>

      {showAnalysis && (
        <>
          <Card title="Phân tích kết quả khảo sát" className="mb-4">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Nhu cầu đào tạo theo chuyên đề">
                  <Bar data={topicChartData} options={{ responsive: true }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Nhu cầu đào tạo theo đơn vị">
                  <Pie data={departmentChartData} options={{ responsive: true }} />
                </Card>
              </Col>
            </Row>

            <Divider />
            
            <Title level={5}>Bảng tổng hợp đăng ký</Title>
            <Table 
              dataSource={registrationData} 
              columns={registrationColumns} 
              rowKey="id"
              pagination={false}
            />
          </Card>

          <Card title="Đề xuất kế hoạch đào tạo" className="mb-4">
            <Table 
              dataSource={suggestedPlan} 
              columns={suggestedPlanColumns} 
              rowKey="id"
              pagination={false}
            />
            <div style={{ marginTop: 16 }}>
              <Button 
                type="dashed" 
                icon={<PlusOutlined />} 
                onClick={() => setAddCourseVisible(true)}
                block
              >
                Thêm khóa học
              </Button>
            </div>
          </Card>

          <Card title="Thông tin kế hoạch đào tạo">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tên kế hoạch">
                  <Input placeholder="Nhập tên kế hoạch" defaultValue="Kế hoạch đào tạo Q4 2025" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngân sách tổng">
                  <InputNumber 
                    style={{ width: '100%' }}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    value={totalBudget}
                    onChange={setTotalBudget}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Mô tả">
              <TextArea rows={4} placeholder="Nhập mô tả kế hoạch" />
            </Form.Item>
            <Row justify="end" gutter={8}>
              <Col>
                <Button 
                  icon={<SaveOutlined />} 
                  onClick={handleSaveSuggestion}
                >
                  Lưu đề xuất
                </Button>
              </Col>
              <Col>
                <Button 
                  icon={<FileExcelOutlined />} 
                  onClick={handleExportReport}
                >
                  Xuất báo cáo
                </Button>
              </Col>
              <Col>
                <Button 
                  type="primary" 
                  onClick={handleCreatePlan}
                >
                  Tạo kế hoạch từ đề xuất
                </Button>
              </Col>
            </Row>
          </Card>
        </>
      )}

      <Modal
        title="Thêm khóa học"
        visible={addCourseVisible}
        onCancel={() => setAddCourseVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCourse}>
          <Form.Item
            name="name"
            label="Tên khóa học"
            rules={[{ required: true, message: 'Vui lòng nhập tên khóa học' }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>
          <Form.Item
            name="timeRange"
            label="Thời gian"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="department"
            label="Đơn vị"
            rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
          >
            <Select placeholder="Chọn đơn vị">
              <Option value="Tất cả">Tất cả</Option>
              {mockDepartments.map(dept => (
                <Option key={dept.id} value={dept.name}>{dept.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="cost"
            label="Chi phí dự kiến"
            rules={[{ required: true, message: 'Vui lòng nhập chi phí' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="Nhập chi phí dự kiến"
            />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Mức độ ưu tiên"
            rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên' }]}
          >
            <Select placeholder="Chọn mức độ ưu tiên">
              <Option value="Cao">Cao</Option>
              <Option value="Trung bình">Trung bình</Option>
              <Option value="Thấp">Thấp</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Row justify="end" gutter={8}>
              <Col>
                <Button onClick={() => setAddCourseVisible(false)}>Hủy</Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">Thêm</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlanAutoSuggest;
