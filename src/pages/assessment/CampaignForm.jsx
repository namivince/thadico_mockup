import React, { useState, useEffect } from 'react';
import { 
  Steps, Button, Form, Input, DatePicker, Radio, Card, 
  message, Divider, Table, InputNumber, Checkbox, Alert, 
  Space, Typography, Row, Col 
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  SaveOutlined, CheckOutlined, CloseOutlined, 
  UserOutlined, FileTextOutlined, PercentageOutlined, 
  CheckCircleOutlined, EditOutlined, TeamOutlined,
  HomeOutlined 
} from '@ant-design/icons';
import moment from 'moment';
import './CampaignForm.css';
import AssignScopeModal from './components/AssignScopeModal';

const { Title, Text } = Typography;
const { Step } = Steps;
const { RangePicker } = DatePicker;

const CampaignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: '',
    startDate: null,
    endDate: null,
    mode: 'async',
    objective: '',
    scope: {
      departments: [],
      positions: [],
      users: [],
      totalUsers: 0
    },
    rubric: {
      id: null,
      name: '',
      criteria: []
    },
    status: 'draft'
  });
  const [scopeModalVisible, setScopeModalVisible] = useState(false);
  const [rubricTemplates, setRubricTemplates] = useState([]);
  const [selectedRubricId, setSelectedRubricId] = useState(null);
  const [confirmPublish, setConfirmPublish] = useState(false);

  // Fetch campaign data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Mock API call
      setTimeout(() => {
        // Mock data for editing
        setCampaignData({
          name: 'Đánh giá năng lực Q4/2025',
          startDate: moment('2025-10-01'),
          endDate: moment('2025-10-15'),
          mode: 'async',
          objective: 'Đánh giá năng lực nhân viên quý 4',
          scope: {
            departments: ['Phòng Kỹ thuật', 'Phòng Kinh doanh'],
            positions: ['Nhân viên', 'Trưởng nhóm'],
            users: [],
            totalUsers: 75
          },
          rubric: {
            id: 1,
            name: 'Bộ tiêu chí đánh giá năng lực chuẩn',
            criteria: [
              { id: 1, code: 'KN01', name: 'Kỹ năng giao tiếp', weight: 20, type: 'scale' },
              { id: 2, code: 'KN02', name: 'Kỹ năng làm việc nhóm', weight: 20, type: 'scale' },
              { id: 3, code: 'TĐ01', name: 'Trách nhiệm', weight: 15, type: 'scale' },
              { id: 4, code: 'TĐ02', name: 'Chủ động', weight: 15, type: 'scale' },
              { id: 5, code: 'KT01', name: 'Kiến thức chuyên môn', weight: 30, type: 'scale' }
            ]
          },
          status: 'draft'
        });
        setSelectedRubricId(1);
        form.setFieldsValue({
          name: 'Đánh giá năng lực Q4/2025',
          dateRange: [moment('2025-10-01'), moment('2025-10-15')],
          mode: 'async',
          objective: 'Đánh giá năng lực nhân viên quý 4',
          rubricId: 1
        });
        setLoading(false);
      }, 1000);
    }
  }, [id, form]);

  // Fetch rubric templates
  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setRubricTemplates([
        { id: 1, name: 'Bộ tiêu chí đánh giá năng lực chuẩn', criteriaCount: 5 },
        { id: 2, name: 'Bộ tiêu chí đánh giá KPI', criteriaCount: 8 },
        { id: 3, name: 'Bộ tiêu chí đánh giá cho quản lý', criteriaCount: 6 }
      ]);
    }, 500);
  }, []);

  // Handle rubric selection
  useEffect(() => {
    if (selectedRubricId) {
      // Mock API call to get rubric details
      setTimeout(() => {
        const mockRubric = {
          id: selectedRubricId,
          name: rubricTemplates.find(r => r.id === selectedRubricId)?.name || '',
          criteria: [
            { id: 1, code: 'KN01', name: 'Kỹ năng giao tiếp', weight: 20, type: 'scale' },
            { id: 2, code: 'KN02', name: 'Kỹ năng làm việc nhóm', weight: 20, type: 'scale' },
            { id: 3, code: 'TĐ01', name: 'Trách nhiệm', weight: 15, type: 'scale' },
            { id: 4, code: 'TĐ02', name: 'Chủ động', weight: 15, type: 'scale' },
            { id: 5, code: 'KT01', name: 'Kiến thức chuyên môn', weight: 30, type: 'scale' }
          ]
        };
        setCampaignData(prev => ({
          ...prev,
          rubric: mockRubric
        }));
      }, 300);
    }
  }, [selectedRubricId, rubricTemplates]);

  const handleSaveDraft = async () => {
    try {
      await form.validateFields();
      setSaveLoading(true);
      
      // Prepare data
      const values = form.getFieldsValue();
      const payload = {
        name: values.name,
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        endDate: values.dateRange[1].format('YYYY-MM-DD'),
        mode: values.mode,
        objective: values.objective,
        rubricId: values.rubricId,
        scope: campaignData.scope
      };
      
      // Mock API call
      setTimeout(() => {
        console.log('Saving draft:', payload);
        message.success('Đã lưu nháp thành công');
        setSaveLoading(false);
        
        // If new campaign, redirect to edit page
        if (!id) {
          navigate('/assessment/rounds/123/edit');
        }
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePublish = async () => {
    try {
      await form.validateFields();
      
      // Check if rubric is selected
      if (!selectedRubricId) {
        message.error('Vui lòng chọn bộ tiêu chí đánh giá');
        return;
      }
      
      // Check if total weight is 100%
      const totalWeight = campaignData.rubric.criteria.reduce((sum, item) => sum + item.weight, 0);
      if (totalWeight !== 100) {
        message.error('Tổng trọng số phải bằng 100%');
        return;
      }
      
      // Check if scope is defined
      if (campaignData.scope.totalUsers === 0) {
        message.error('Vui lòng chọn đối tượng đánh giá');
        return;
      }
      
      setPublishLoading(true);
      
      // Mock API call
      setTimeout(() => {
        console.log('Publishing campaign');
        message.success('Đã công bố chiến dịch đánh giá thành công');
        setPublishLoading(false);
        navigate('/assessment/rounds');
      }, 1500);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleScopeChange = (scopeData) => {
    setCampaignData(prev => ({
      ...prev,
      scope: scopeData
    }));
  };

  const handleRubricChange = (value) => {
    setSelectedRubricId(value);
  };

  const handleWeightChange = (value, criteriaId) => {
    setCampaignData(prev => ({
      ...prev,
      rubric: {
        ...prev.rubric,
        criteria: prev.rubric.criteria.map(c => 
          c.id === criteriaId ? { ...c, weight: value } : c
        )
      }
    }));
  };

  const openRubricBuilder = () => {
    if (selectedRubricId) {
      window.open(`/assessment/rubrics/${selectedRubricId}/builder`, '_blank');
    } else {
      window.open('/assessment/rubrics/new/builder', '_blank');
    }
  };

  const steps = [
    {
      title: 'Thông tin',
      icon: <UserOutlined />
    },
    {
      title: 'Nội dung',
      icon: <FileTextOutlined />
    },
    {
      title: 'Chấm điểm',
      icon: <PercentageOutlined />
    },
    {
      title: 'Xem lại',
      icon: <CheckCircleOutlined />
    }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form.Item>
            <Card title="Thông tin cơ bản" className="step-card">
              <Form.Item
                name="name"
                label="Tên chiến dịch đánh giá"
                rules={[{ required: true, message: 'Vui lòng nhập tên chiến dịch' }]}
              >
                <Input placeholder="Nhập tên chiến dịch đánh giá" />
              </Form.Item>
              
              <Form.Item
                name="dateRange"
                label="Thời gian"
                rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
              >
                <RangePicker 
                  style={{ width: '100%' }} 
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                />
              </Form.Item>
              
              <Form.Item
                name="mode"
                label="Chế độ đánh giá"
                rules={[{ required: true, message: 'Vui lòng chọn chế độ đánh giá' }]}
              >
                <Radio.Group>
                  <Radio value="sync">Đồng bộ (tất cả cùng lúc)</Radio>
                  <Radio value="async">Bất đồng bộ (theo từng giai đoạn)</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                name="objective"
                label="Mục tiêu đánh giá"
              >
                <Input.TextArea rows={4} placeholder="Nhập mục tiêu của chiến dịch đánh giá" />
              </Form.Item>
              
              <Divider />
              
              <Form.Item label="Đối tượng đánh giá">
                <div className="scope-summary">
                  <div>
                    <Text>Phòng ban: </Text>
                    <Text strong>{campaignData.scope.departments.length > 0 ? 
                      campaignData.scope.departments.join(', ') : 'Chưa chọn'}</Text>
                  </div>
                  <div>
                    <Text>Vị trí: </Text>
                    <Text strong>{campaignData.scope.positions.length > 0 ? 
                      campaignData.scope.positions.join(', ') : 'Chưa chọn'}</Text>
                  </div>
                  <div>
                    <Text>Tổng số người: </Text>
                    <Text strong>{campaignData.scope.totalUsers}</Text>
                  </div>
                </div>
                <Button 
                  type="primary" 
                  icon={<TeamOutlined />}
                  onClick={() => setScopeModalVisible(true)}
                >
                  Chọn đối tượng đánh giá
                </Button>
              </Form.Item>
            </Card>
          </Form.Item>
        );
      
      case 1:
        return (
          <Form.Item>
            <Card title="Nội dung đánh giá" className="step-card">
              <Form.Item
                name="rubricId"
                label="Bộ tiêu chí đánh giá"
                rules={[{ required: true, message: 'Vui lòng chọn bộ tiêu chí' }]}
              >
                <Radio.Group onChange={(e) => handleRubricChange(e.target.value)}>
                  {rubricTemplates.map(template => (
                    <div key={template.id} className="rubric-option">
                      <Radio value={template.id}>
                        <Space direction="vertical" size={0}>
                          <Text strong>{template.name}</Text>
                          <Text type="secondary">{template.criteriaCount} tiêu chí</Text>
                        </Space>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </Form.Item>
              
              <Divider />
              
              <div className="rubric-actions">
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={openRubricBuilder}
                >
                  Mở Rubric Builder
                </Button>
                <Text type="secondary">
                  Chỉnh sửa hoặc tạo mới bộ tiêu chí đánh giá
                </Text>
              </div>
            </Card>
          </Form.Item>
        );
      
      case 2:
        return (
          <Form.Item>
            <Card title="Cấu hình chấm điểm" className="step-card">
              <Alert
                message="Tổng trọng số phải bằng 100%"
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
              
              <Table
                dataSource={campaignData.rubric.criteria}
                rowKey="id"
                pagination={false}
                columns={[
                  {
                    title: 'Mã',
                    dataIndex: 'code',
                    width: 100
                  },
                  {
                    title: 'Tiêu chí',
                    dataIndex: 'name'
                  },
                  {
                    title: 'Loại',
                    dataIndex: 'type',
                    width: 120,
                    render: (type) => {
                      const typeMap = {
                        'scale': 'Thang điểm',
                        'mcq': 'Trắc nghiệm',
                        'essay': 'Tự luận'
                      };
                      return typeMap[type] || type;
                    }
                  },
                  {
                    title: 'Trọng số (%)',
                    dataIndex: 'weight',
                    width: 150,
                    render: (weight, record) => (
                      <InputNumber
                        min={0}
                        max={100}
                        value={weight}
                        onChange={(value) => handleWeightChange(value, record.id)}
                        addonAfter="%"
                        style={{ width: '100%' }}
                      />
                    )
                  }
                ]}
                summary={() => {
                  const totalWeight = campaignData.rubric.criteria.reduce(
                    (sum, item) => sum + item.weight, 0
                  );
                  
                  return (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3}>
                        <Text strong>Tổng trọng số</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text 
                          strong 
                          type={totalWeight === 100 ? 'success' : 'danger'}
                        >
                          {totalWeight}%
                        </Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
            </Card>
          </Form.Item>
        );
      
      case 3:
        return (
          <Form.Item>
            <Card title="Xem lại và công bố" className="step-card">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card type="inner" title="Thông tin chiến dịch">
                    <p><strong>Tên:</strong> {form.getFieldValue('name')}</p>
                    <p><strong>Thời gian:</strong> {form.getFieldValue('dateRange')?.[0]?.format('DD/MM/YYYY')} - {form.getFieldValue('dateRange')?.[1]?.format('DD/MM/YYYY')}</p>
                    <p><strong>Chế độ:</strong> {form.getFieldValue('mode') === 'sync' ? 'Đồng bộ' : 'Bất đồng bộ'}</p>
                    <p><strong>Mục tiêu:</strong> {form.getFieldValue('objective')}</p>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card type="inner" title="Đối tượng đánh giá">
                    <p><strong>Phòng ban:</strong> {campaignData.scope.departments.join(', ') || 'Chưa chọn'}</p>
                    <p><strong>Vị trí:</strong> {campaignData.scope.positions.join(', ') || 'Chưa chọn'}</p>
                    <p><strong>Tổng số người:</strong> {campaignData.scope.totalUsers}</p>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card type="inner" title="Bộ tiêu chí">
                    <p><strong>Tên bộ tiêu chí:</strong> {campaignData.rubric.name}</p>
                    <p><strong>Số tiêu chí:</strong> {campaignData.rubric.criteria.length}</p>
                    
                    <Table
                      dataSource={campaignData.rubric.criteria}
                      rowKey="id"
                      pagination={false}
                      size="small"
                      columns={[
                        {
                          title: 'Mã',
                          dataIndex: 'code',
                          width: 100
                        },
                        {
                          title: 'Tiêu chí',
                          dataIndex: 'name'
                        },
                        {
                          title: 'Trọng số',
                          dataIndex: 'weight',
                          width: 100,
                          render: (weight) => `${weight}%`
                        }
                      ]}
                    />
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Alert
                    message="Lưu ý"
                    description="Sau khi công bố, chiến dịch đánh giá sẽ được gửi đến tất cả đối tượng đánh giá. Bạn không thể thay đổi bộ tiêu chí sau khi công bố."
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  
                  <Form.Item
                    name="confirmPublish"
                    valuePropName="checked"
                  >
                    <Checkbox onChange={(e) => setConfirmPublish(e.target.checked)}>
                      Tôi xác nhận thông tin chính xác và muốn công bố chiến dịch đánh giá này
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Form.Item>
        );
      
      default:
        return null;
    }
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="campaign-form-container">
      <div className="campaign-form-header">
        <div className="campaign-form-title">
          <Title level={2}>{id ? 'Chỉnh sửa chiến dịch đánh giá' : 'Tạo chiến dịch đánh giá mới'}</Title>
        </div>
        <div className="campaign-form-actions">
          <Space>
            <Button 
              icon={<HomeOutlined />} 
              onClick={() => navigate('/dashboard')}
            >
              Trở về Dashboard
            </Button>
            <Button 
              icon={<SaveOutlined />} 
              onClick={handleSaveDraft}
              loading={saveLoading}
            >
              Lưu nháp
            </Button>
            {currentStep === 3 && (
              <Button 
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={handlePublish}
                disabled={!confirmPublish}
                loading={publishLoading}
              >
                Công bố
              </Button>
            )}
            <Button 
              icon={<CloseOutlined />} 
              onClick={() => navigate('/assessment/rounds')}
            >
              Hủy
            </Button>
          </Space>
        </div>
      </div>
      
      <Steps current={currentStep} className="campaign-form-steps">
        {steps.map(item => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      
      <div className="campaign-form-content">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            mode: 'async'
          }}
        >
          {renderStepContent()}
          
          <div className="steps-action">
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prev}>
                Quay lại
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Tiếp theo
              </Button>
            )}
          </div>
        </Form>
      </div>
      
      <AssignScopeModal
        visible={scopeModalVisible}
        onClose={() => setScopeModalVisible(false)}
        onSave={handleScopeChange}
        initialScope={campaignData.scope}
      />
    </div>
  );
};

export default CampaignForm;
