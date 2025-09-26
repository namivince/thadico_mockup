import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Steps, 
  Card, 
  Form, 
  Input, 
  DatePicker, 
  Button, 
  Select, 
  Space, 
  Row, 
  Col,
  Divider,
  Radio,
  InputNumber,
  Checkbox,
  Tag,
  message,
  Modal
} from 'antd';
import { 
  InfoCircleOutlined, 
  QuestionCircleOutlined, 
  TeamOutlined,
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  SendOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  BookOutlined,
  CopyOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { departments } from '../../data/mockData';
import dayjs from '../../utils/dayjs';
import './SurveyForm.css';

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * Form tạo/chỉnh sửa khảo sát - Wizard 3 bước
 */
const SurveyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    description: '',
    dateRange: null,
    
    // Step 2: Questions
    questions: [
      {
        id: Date.now(),
        type: 'multiple_choice',
        text: '',
        options: [''],
        required: true
      }
    ],
    
    // Step 3: Audience
    audience: {
      departments: [],
      positions: [],
      specificUsers: []
    }
  });

  const isEdit = !!id;

  // Question types
  const questionTypes = [
    { value: 'multiple_choice', label: 'Trắc nghiệm', icon: '☑️' },
    { value: 'single_choice', label: 'Chọn một', icon: '⚪' },
    { value: 'rating', label: 'Đánh giá', icon: '⭐' },
    { value: 'text', label: 'Văn bản', icon: '📝' },
    { value: 'number', label: 'Số', icon: '🔢' }
  ];

  // Steps configuration
  const steps = [
    {
      title: 'Thông tin cơ bản',
      icon: <InfoCircleOutlined />,
      description: 'Tên, mô tả và thời gian'
    },
    {
      title: 'Câu hỏi',
      icon: <QuestionCircleOutlined />,
      description: 'Tạo các câu hỏi khảo sát'
    },
    {
      title: 'Đối tượng',
      icon: <TeamOutlined />,
      description: 'Chọn người tham gia'
    }
  ];

  // Handle step navigation
  const nextStep = async () => {
    try {
      await form.validateFields();
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle questions - memoized to prevent unnecessary re-renders
  const addQuestion = useCallback(() => {
    const newQuestion = {
      id: Date.now(),
      type: 'multiple_choice',
      text: '',
      options: [''],
      required: true
    };
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  }, []);

  const removeQuestion = (questionId) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const addOption = (questionId) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, options: [...q.options, ''] } : q
      )
    }));
  };

  const removeOption = (questionId, optionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q
      )
    }));
  };

  const updateOption = (questionId, optionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options.map((opt, i) => i === optionIndex ? value : opt)
            }
          : q
      )
    }));
  };

  // Handle save
  const handleSave = async (isDraft = true) => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const surveyData = {
        ...formData,
        ...values,
        status: isDraft ? 'draft' : 'published'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(isDraft ? 'Khảo sát đã được lưu nháp' : 'Khảo sát đã được phát hành');
      navigate('/surveys');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  // Render Step 1: Basic Info
  const renderBasicInfo = () => (
    <Card title="Thông tin cơ bản" className="step-card">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Form.Item
            name="name"
            label="Tên khảo sát"
            rules={[{ required: true, message: 'Vui lòng nhập tên khảo sát' }]}
          >
            <Input 
              placeholder="VD: Khảo sát nhu cầu đào tạo Q4/2025"
              size="large"
            />
          </Form.Item>
        </Col>
        
        <Col xs={24}>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <TextArea 
              rows={4}
              placeholder="Mô tả mục đích và nội dung của khảo sát..."
            />
          </Form.Item>
        </Col>
        
        <Col xs={24} md={12}>
          <Form.Item
            name="dateRange"
            label="Thời gian thực hiện"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              size="large"
              format="DD/MM/YYYY"
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            />
          </Form.Item>
        </Col>
        
        <Col xs={24} md={12}>
          <Form.Item
            name="category"
            label="Danh mục"
          >
            <Select placeholder="Chọn danh mục" size="large">
              <Option value="training">Nhu cầu đào tạo</Option>
              <Option value="satisfaction">Hài lòng nhân viên</Option>
              <Option value="evaluation">Đánh giá khóa học</Option>
              <Option value="feedback">Phản hồi chung</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  // Handle import questions
  const handleImportQuestions = () => {
    Modal.info({
      title: 'Import câu hỏi',
      width: 800,
      content: (
        <div style={{ marginTop: '16px' }}>
          <h4>Chọn nguồn import:</h4>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card 
              hoverable 
              onClick={() => showQuestionTemplates()}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BookOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#1890ff' }} />
                <div>
                  <div style={{ fontWeight: '600' }}>Template câu hỏi</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Sử dụng bộ câu hỏi có sẵn</div>
                </div>
              </div>
            </Card>
            
            <Card 
              hoverable 
              onClick={() => showExistingSurveys()}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CopyOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#52c41a' }} />
                <div>
                  <div style={{ fontWeight: '600' }}>Khảo sát có sẵn</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Copy câu hỏi từ khảo sát khác</div>
                </div>
              </div>
            </Card>
            
            <Card 
              hoverable 
              onClick={() => showFileImport()}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <UploadOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#faad14' }} />
                <div>
                  <div style={{ fontWeight: '600' }}>Import từ file</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Upload file Excel/CSV</div>
                </div>
              </div>
            </Card>
          </Space>
        </div>
      ),
      onOk() {}
    });
  };

  // Show question templates
  const showQuestionTemplates = () => {
    const templates = [
      {
        id: 'training_needs',
        name: 'Nhu cầu đào tạo',
        description: 'Bộ câu hỏi chuẩn cho khảo sát nhu cầu đào tạo',
        questions: [
          {
            type: 'multiple_choice',
            text: 'Bạn muốn được đào tạo về lĩnh vực nào?',
            options: ['Kỹ năng lãnh đạo', 'Kỹ thuật chuyên môn', 'Ngoại ngữ', 'Tin học văn phòng'],
            required: true
          },
          {
            type: 'rating',
            text: 'Đánh giá mức độ cần thiết của việc đào tạo?',
            scale: 5,
            required: true
          }
        ]
      },
      {
        id: 'satisfaction',
        name: 'Hài lòng nhân viên',
        description: 'Bộ câu hỏi đánh giá mức độ hài lòng',
        questions: [
          {
            type: 'rating',
            text: 'Mức độ hài lòng về môi trường làm việc',
            scale: 5,
            required: true
          },
          {
            type: 'multiple_choice',
            text: 'Yếu tố nào bạn muốn cải thiện nhất?',
            options: ['Lương thưởng', 'Phúc lợi', 'Môi trường', 'Cơ hội thăng tiến'],
            required: true
          }
        ]
      }
    ];

    Modal.confirm({
      title: 'Chọn template câu hỏi',
      width: 700,
      content: (
        <div style={{ marginTop: '16px' }}>
          {templates.map(template => (
            <Card 
              key={template.id}
              style={{ marginBottom: '12px', cursor: 'pointer' }}
              hoverable
              onClick={() => importFromTemplate(template)}
            >
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{template.name}</div>
                <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                  {template.description}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {template.questions.length} câu hỏi
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
      onOk() {}
    });
  };

  // Import from template
  const importFromTemplate = (template) => {
    const importedQuestions = template.questions.map(q => ({
      ...q,
      id: Date.now() + Math.random()
    }));
    
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, ...importedQuestions]
    }));
    
    message.success(`Đã import ${importedQuestions.length} câu hỏi từ template "${template.name}"`);
    Modal.destroyAll();
  };

  // Show existing surveys
  const showExistingSurveys = () => {
    // Mock data - in real app, fetch from API
    const existingSurveys = [
      {
        id: 1,
        name: 'Khảo sát nhu cầu đào tạo Q3/2025',
        questionCount: 5,
        createdBy: 'Nguyễn Văn A'
      },
      {
        id: 2,
        name: 'Khảo sát hài lòng nhân viên 2025',
        questionCount: 8,
        createdBy: 'Trần Thị B'
      }
    ];

    Modal.confirm({
      title: 'Chọn khảo sát để copy câu hỏi',
      width: 700,
      content: (
        <div style={{ marginTop: '16px' }}>
          {existingSurveys.map(survey => (
            <Card 
              key={survey.id}
              style={{ marginBottom: '12px', cursor: 'pointer' }}
              hoverable
              onClick={() => importFromSurvey(survey)}
            >
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{survey.name}</div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  Tạo bởi: {survey.createdBy} • {survey.questionCount} câu hỏi
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
      onOk() {}
    });
  };

  // Import from existing survey
  const importFromSurvey = (survey) => {
    // Mock questions - in real app, fetch from API
    const mockQuestions = [
      {
        type: 'multiple_choice',
        text: 'Câu hỏi mẫu từ khảo sát khác',
        options: ['Option 1', 'Option 2', 'Option 3'],
        required: true
      }
    ];

    const importedQuestions = mockQuestions.map(q => ({
      ...q,
      id: Date.now() + Math.random()
    }));
    
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, ...importedQuestions]
    }));
    
    message.success(`Đã import câu hỏi từ "${survey.name}"`);
    Modal.destroyAll();
  };

  // Show file import
  const showFileImport = () => {
    Modal.info({
      title: 'Import từ file',
      content: (
        <div style={{ marginTop: '16px' }}>
          <p>Tính năng import từ file Excel/CSV sẽ được phát triển trong phiên bản tiếp theo.</p>
          <p>Định dạng file sẽ bao gồm:</p>
          <ul>
            <li>Loại câu hỏi</li>
            <li>Nội dung câu hỏi</li>
            <li>Các lựa chọn (nếu có)</li>
            <li>Bắt buộc hay không</li>
          </ul>
        </div>
      )
    });
  };

  // Render Step 2: Questions
  const renderQuestions = () => (
    <Card 
      title="Câu hỏi khảo sát" 
      className="step-card"
      extra={
        <Space>
          <Button 
            icon={<DownloadOutlined />}
            onClick={handleImportQuestions}
          >
            Import câu hỏi
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={addQuestion}
          >
            Thêm câu hỏi
          </Button>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {formData.questions.map((question, index) => (
          <Card 
            key={question.id}
            size="small"
            title={`Câu hỏi ${index + 1}`}
            extra={
              formData.questions.length > 1 && (
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={() => removeQuestion(question.id)}
                />
              )
            }
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Select
                  value={question.type}
                  onChange={(value) => updateQuestion(question.id, 'type', value)}
                  style={{ width: '100%' }}
                >
                  {questionTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              
              <Col xs={24} md={16}>
                <Input
                  placeholder="Nhập nội dung câu hỏi..."
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                />
              </Col>
              
              <Col xs={24}>
                <Checkbox
                  checked={question.required}
                  onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                >
                  Bắt buộc trả lời
                </Checkbox>
              </Col>
              
              {/* Options for multiple choice questions */}
              {(question.type === 'multiple_choice' || question.type === 'single_choice') && (
                <Col xs={24}>
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ marginBottom: '8px', fontWeight: '500' }}>Các lựa chọn:</div>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} style={{ display: 'flex', marginBottom: '8px' }}>
                        <Input
                          placeholder={`Lựa chọn ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          style={{ marginRight: '8px' }}
                        />
                        {question.options.length > 1 && (
                          <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />}
                            onClick={() => removeOption(question.id, optionIndex)}
                          />
                        )}
                      </div>
                    ))}
                    <Button 
                      type="dashed" 
                      icon={<PlusOutlined />}
                      onClick={() => addOption(question.id)}
                      style={{ width: '100%' }}
                    >
                      Thêm lựa chọn
                    </Button>
                  </div>
                </Col>
              )}
              
              {/* Scale for rating questions */}
              {question.type === 'rating' && (
                <Col xs={24}>
                  <div style={{ marginTop: '12px' }}>
                    <span style={{ marginRight: '12px' }}>Thang điểm:</span>
                    <Radio.Group
                      value={question.scale || 5}
                      onChange={(e) => updateQuestion(question.id, 'scale', e.target.value)}
                    >
                      <Radio value={3}>1-3</Radio>
                      <Radio value={5}>1-5</Radio>
                      <Radio value={10}>1-10</Radio>
                    </Radio.Group>
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        ))}
      </Space>
    </Card>
  );

  // Render Step 3: Audience
  const renderAudience = () => (
    <Card title="Đối tượng tham gia" className="step-card">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Form.Item
            name={['audience', 'departments']}
            label="Phòng ban"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một phòng ban' }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn phòng ban"
              size="large"
              style={{ width: '100%' }}
            >
              {departments.map(dept => (
                <Option key={dept.id} value={dept.name}>
                  {dept.name} ({dept.employeeCount} người)
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        
        <Col xs={24} md={12}>
          <Form.Item
            name={['audience', 'positions']}
            label="Vị trí"
          >
            <Select
              mode="multiple"
              placeholder="Chọn vị trí (tùy chọn)"
              size="large"
              style={{ width: '100%' }}
            >
              <Option value="Nhân viên">Nhân viên</Option>
              <Option value="Trưởng nhóm">Trưởng nhóm</Option>
              <Option value="Trưởng phòng">Trưởng phòng</Option>
              <Option value="Phó phòng">Phó phòng</Option>
              <Option value="Giám đốc">Giám đốc</Option>
            </Select>
          </Form.Item>
        </Col>
        
        <Col xs={24}>
          <Form.Item
            name={['audience', 'specificUsers']}
            label="Người dùng cụ thể"
          >
            <Select
              mode="multiple"
              placeholder="Chọn người dùng cụ thể (tùy chọn)"
              size="large"
              style={{ width: '100%' }}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="user1">Nguyễn Văn A - Phòng Kỹ thuật</Option>
              <Option value="user2">Trần Thị B - Phòng Kinh doanh</Option>
              <Option value="user3">Lê Văn C - Phòng Marketing</Option>
              <Option value="user4">Phạm Thị D - Phòng Nhân sự</Option>
            </Select>
          </Form.Item>
        </Col>
        
        <Col xs={24}>
          <div className="audience-summary">
            <h4>Tóm tắt đối tượng:</h4>
            <div className="summary-tags">
              <Tag color="blue">Ước tính: ~150 người</Tag>
              <Tag color="green">3 phòng ban</Tag>
              <Tag color="orange">Tất cả vị trí</Tag>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div className="survey-form-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/surveys')}
            style={{ marginRight: '12px' }}
          />
          <div>
            <h2>{isEdit ? 'Chỉnh sửa khảo sát' : 'Tạo khảo sát mới'}</h2>
            <p>Tạo khảo sát theo 3 bước đơn giản</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <Card className="steps-card">
        <Steps current={currentStep} type="navigation">
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </Steps>
      </Card>

      {/* Form Content */}
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onValuesChange={(changedValues, allValues) => {
          setFormData(prev => ({ ...prev, ...allValues }));
        }}
      >
        {currentStep === 0 && renderBasicInfo()}
        {currentStep === 1 && renderQuestions()}
        {currentStep === 2 && renderAudience()}
      </Form>

      {/* Actions */}
      <Card className="actions-card">
        <div className="form-actions">
          <div className="left-actions">
            {currentStep > 0 && (
              <Button onClick={prevStep}>
                Quay lại
              </Button>
            )}
          </div>
          
          <div className="right-actions">
            <Space>
              <Button 
                icon={<SaveOutlined />}
                onClick={() => handleSave(true)}
                loading={loading}
              >
                Lưu nháp
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button type="primary" onClick={nextStep}>
                  Tiếp theo
                </Button>
              ) : (
                <Button 
                  type="primary" 
                  icon={<SendOutlined />}
                  onClick={() => handleSave(false)}
                  loading={loading}
                >
                  Phát hành khảo sát
                </Button>
              )}
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SurveyForm;
