import React, { useState } from 'react';
import { 
  Form, Input, DatePicker, Select, Button, Steps, Card, 
  Upload, Table, Switch, InputNumber, Checkbox, Space, 
  Typography, Divider, message, Tag, Row, Col, Alert, Radio
} from 'antd';
import { 
  InfoCircleOutlined, FileExcelOutlined, 
  UploadOutlined, UserOutlined, ClockCircleOutlined,
  WarningOutlined, SaveOutlined, SendOutlined, DownloadOutlined,
  HomeOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './CampaignForm.css';

const { Step } = Steps;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * Component form thiết lập chiến dịch đánh giá tay nghề
 * Theo spec: SCR_ASM_CAMPAIGN_FORM
 */
const CampaignForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [enableAppeal, setEnableAppeal] = useState(true);
  const [importMode, setImportMode] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewQuestions, setPreviewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data cho danh sách đơn vị
  const units = [
    { id: 'dv_01', name: 'Phòng Kỹ thuật' },
    { id: 'dv_02', name: 'Phòng Kinh doanh' },
    { id: 'dv_03', name: 'Phòng Nhân sự' }
  ];

  // Mock data cho danh sách giảng viên
  const graders = [
    { id: 'gv_001', name: 'Nguyễn Văn A - Giảng viên cao cấp' },
    { id: 'gv_007', name: 'Trần Thị B - Giảng viên chuyên môn' },
    { id: 'gv_013', name: 'Lê Văn C - Chuyên gia đánh giá' }
  ];

  // Mock data cho nhóm năng lực
  const competencyGroups = [
    { id: 'cg_01', name: 'Kỹ năng chuyên môn' },
    { id: 'cg_02', name: 'Kỹ năng mềm' },
    { id: 'cg_03', name: 'Kiến thức nghiệp vụ' }
  ];

  // Columns cho bảng preview câu hỏi
  const questionColumns = [
    { title: 'STT', dataIndex: 'index', key: 'index', width: 60 },
    { title: 'Loại', dataIndex: 'type', key: 'type', width: 100,
      render: type => <Tag color={type === 'mcq' ? 'blue' : 'green'}>{type === 'mcq' ? 'Trắc nghiệm' : 'Tự luận'}</Tag>
    },
    { title: 'Nội dung câu hỏi', dataIndex: 'text', key: 'text', ellipsis: true },
    { title: 'Nhóm năng lực', dataIndex: 'group', key: 'group' },
    { title: 'Thao tác', key: 'action', width: 100,
      render: () => (
        <Space>
          <Button type="link" size="small">Sửa</Button>
          <Button type="link" size="small" danger>Xóa</Button>
        </Space>
      )
    }
  ];

  // Mock data cho preview câu hỏi
  const mockQuestions = [
    { index: 1, type: 'mcq', text: 'Quy trình an toàn lao động gồm những bước nào?', group: 'Kỹ năng chuyên môn' },
    { index: 2, type: 'mcq', text: 'Khi gặp sự cố máy móc, thứ tự xử lý đúng là gì?', group: 'Kiến thức nghiệp vụ' },
    { index: 3, type: 'essay', text: 'Mô tả quy trình thao tác máy X theo tiêu chuẩn ISO 9001', group: 'Kỹ năng chuyên môn' }
  ];

  // Xử lý khi chuyển bước
  const handleStepChange = (current) => {
    setCurrentStep(current);
  };

  // Xử lý khi upload file Excel
  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} đã tải lên thành công`);
      setFileList([info.file]);
      // Mock preview questions sau khi upload
      setPreviewQuestions(mockQuestions);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };

  // Xử lý khi submit form
  const handleSubmit = (isDraft = false) => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // Chuẩn bị dữ liệu để gửi đi
      const formData = {
        ...values,
        isDraft,
        questionSource: importMode ? { type: 'import', fileId: 'up_abc123' } : { type: 'bank', ids: values.questionIds }
      };
      
      console.log('Form data to submit:', formData);
      
      // Mock API call
      setTimeout(() => {
        setLoading(false);
        message.success(isDraft ? 'Đã lưu nháp chiến dịch' : 'Đã phát hành chiến dịch thành công');
        
        // Chuyển hướng về trang demo sau khi submit thành công
        setTimeout(() => {
          window.location.href = '/demo';
        }, 1500);
      }, 1500);
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
      // Hiển thị thông báo lỗi
      message.error('Vui lòng kiểm tra lại các trường bắt buộc');
      
      // Hiển thị các trường lỗi
      const errorFields = errorInfo.errorFields || [];
      if (errorFields.length > 0) {
        const fieldNames = errorFields.map(field => field.name.join(', ')).join('; ');
        message.warning(`Các trường có lỗi: ${fieldNames}`);
      }
    });
  };

  // Render các bước của form
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Thông tin chung
        return (
          <div className="step-content">
            <Card title="Thông tin chiến dịch" className="form-card">
              <Form.Item name="name" label="Tên chiến dịch" rules={[{ required: true, message: 'Vui lòng nhập tên chiến dịch' }]}>
                <Input placeholder="Nhập tên chiến dịch đánh giá" />
              </Form.Item>
              
              <Form.Item name="description" label="Mô tả">
                <TextArea rows={4} placeholder="Mô tả chi tiết về mục đích, đối tượng của chiến dịch" />
              </Form.Item>
              
              <Form.Item name="scopeUnitIds" label="Đơn vị phạm vi" rules={[{ required: true, message: 'Vui lòng chọn ít nhất một đơn vị' }]}>
                <Select mode="multiple" placeholder="Chọn đơn vị áp dụng">
                  {units.map(unit => (
                    <Option key={unit.id} value={unit.id}>{unit.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="openAt" label="Thời gian mở bài" rules={[{ required: true, message: 'Vui lòng chọn thời gian mở bài' }]}>
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="closeAt" label="Thời gian đóng nhận bài" rules={[{ required: true, message: 'Vui lòng chọn thời gian đóng bài' }]}>
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </div>
        );
      
      case 1: // Nội dung & Đề thi
        return (
          <div className="step-content">
            <Card title="Nội dung và đề thi" className="form-card">
              <div className="question-source-selector">
                <Form.Item name="questionSource" label="Nguồn câu hỏi">
                  <Radio.Group onChange={e => setImportMode(e.target.value === 'import')}>
                    <Radio.Button value="bank">Chọn từ ngân hàng câu hỏi</Radio.Button>
                    <Radio.Button value="import">Import từ Excel</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
              
              {importMode ? (
                <div className="import-section">
                  <Alert
                    message="Hướng dẫn import"
                    description="Tải template, điền thông tin câu hỏi và upload lại file để hệ thống xử lý."
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  
                  <Form.Item name="importFile">
                    <Upload.Dragger
                      name="file"
                      accept=".xlsx,.xls"
                      onChange={handleUpload}
                      fileList={fileList}
                      beforeUpload={() => false}
                    >
                      <p className="ant-upload-drag-icon">
                        <FileExcelOutlined />
                      </p>
                      <p className="ant-upload-text">Kéo thả hoặc click để upload file Excel</p>
                      <p className="ant-upload-hint">Hỗ trợ file .xlsx, .xls</p>
                    </Upload.Dragger>
                  </Form.Item>
                  
                  <div className="template-download">
                    <Button type="link" icon={<DownloadOutlined />}>
                      Tải template mẫu
                    </Button>
                  </div>
                </div>
              ) : (
                <Form.Item name="questionIds" label="Chọn câu hỏi từ ngân hàng">
                  <Select mode="multiple" placeholder="Chọn câu hỏi">
                    <Option value="q1">Câu hỏi 1: Quy trình an toàn lao động</Option>
                    <Option value="q2">Câu hỏi 2: Thao tác máy CNC</Option>
                    <Option value="q3">Câu hỏi 3: Kiểm tra chất lượng sản phẩm</Option>
                  </Select>
                </Form.Item>
              )}
              
              {previewQuestions.length > 0 && (
                <div className="question-preview">
                  <Divider orientation="left">Preview câu hỏi</Divider>
                  <Table 
                    columns={questionColumns} 
                    dataSource={previewQuestions} 
                    pagination={false} 
                    size="small"
                    rowKey="index"
                  />
                </div>
              )}
              
              <Form.Item name="competencyGroups" label="Gắn nhóm năng lực">
                <Select mode="multiple" placeholder="Chọn nhóm năng lực">
                  {competencyGroups.map(group => (
                    <Option key={group.id} value={group.id}>{group.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Alert
                message="Lưu ý"
                description="Theo quy định mới, hệ thống không áp dụng trọng số theo nhóm năng lực."
                type="warning"
                showIcon
              />
            </Card>
          </div>
        );
      
      case 2: // Phân công & SLA
        return (
          <div className="step-content">
            <Card title="Phân công và SLA" className="form-card">
              <Form.Item name="graders" label="Chọn giảng viên chấm" rules={[{ required: true, message: 'Vui lòng chọn ít nhất một giảng viên' }]}>
                <Select mode="multiple" placeholder="Chọn giảng viên">
                  {graders.map(grader => (
                    <Option key={grader.id} value={grader.id}>{grader.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item name="gradeDueAt" label="Deadline chấm bài (SLA)" rules={[{ required: true, message: 'Vui lòng chọn deadline chấm bài' }]}>
                <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
              </Form.Item>
              
              <Form.Item name="enableWarning" valuePropName="checked">
                <Checkbox defaultChecked>Bật cảnh báo email khi gần đến deadline</Checkbox>
              </Form.Item>
              
              <Form.Item name="enableCountdown" valuePropName="checked">
                <Checkbox defaultChecked>Bật đếm ngược ngay từ lúc bắt đầu chấm</Checkbox>
              </Form.Item>
              
              <Alert
                message="Thông tin SLA"
                description="Hệ thống sẽ gửi email cảnh báo trước 24h và khi quá hạn SLA. Đồng thời hiển thị countdown trong Grading Console."
                type="info"
                showIcon
              />
            </Card>
          </div>
        );
      
      case 3: // Phúc khảo
        return (
          <div className="step-content">
            <Card title="Thiết lập phúc khảo" className="form-card">
              <Form.Item name="appealEnabled" valuePropName="checked">
                <Switch 
                  checkedChildren="Cho phép phúc khảo" 
                  unCheckedChildren="Không cho phép phúc khảo"
                  defaultChecked={enableAppeal}
                  onChange={setEnableAppeal}
                />
              </Form.Item>
              
              {enableAppeal && (
                <>
                  <Alert
                    message="Cấu hình Phúc khảo"
                    description="Nhân viên có thể gửi phúc khảo trong khoảng thời gian quy định với số lần giới hạn"
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item 
                        name="appealMaxAttempts" 
                        label="Số lần phúc khảo tối đa" 
                        rules={[{ required: enableAppeal, message: 'Vui lòng nhập số lần phúc khảo' }]}
                        tooltip="Số lần tối đa nhân viên có thể gửi phúc khảo cho 1 kỳ đánh giá"
                      >
                        <InputNumber min={1} max={5} defaultValue={3} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item 
                        name="appealWindowDays" 
                        label="Thời gian mở phúc khảo (ngày)" 
                        rules={[{ required: enableAppeal, message: 'Vui lòng nhập thời gian phúc khảo' }]}
                        tooltip="Số ngày kể từ khi công bố kết quả mà nhân viên có thể gửi phúc khảo"
                      >
                        <InputNumber min={1} max={30} defaultValue={7} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </Card>
            
            <Card title="Xác nhận và phát hành" className="form-card" style={{ marginTop: 16 }}>
              <Form.Item name="confirmPublish" valuePropName="checked" rules={[{ 
                validator: (_, value) => value ? Promise.resolve() : Promise.reject('Vui lòng xác nhận trước khi phát hành') 
              }]}>
                <Checkbox defaultChecked={true}>
                  Tôi xác nhận thông tin chiến dịch đã chính xác và sẵn sàng phát hành
                </Checkbox>
              </Form.Item>
              
              <Alert
                message="Lưu ý"
                description="Để phát hành chiến dịch, bạn cần xác nhận bằng cách tick vào ô checkbox trên."
                type="info"
                showIcon
              />
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="campaign-form-container">
      <div className="campaign-form-header">
        <div className="header-left">
          <Title level={2}>Thiết lập chiến dịch đánh giá tay nghề</Title>
          <Text type="secondary">Tạo chiến dịch mới với 4 bước đơn giản</Text>
        </div>
        <div className="header-right">
          <Button 
            type="primary" 
            icon={<HomeOutlined />} 
            onClick={() => window.location.href = '/dashboard'}
          >
            Về Dashboard
          </Button>
        </div>
      </div>
      
      <Steps current={currentStep} onChange={handleStepChange} className="campaign-form-steps">
        <Step title="Thông tin chung" icon={<InfoCircleOutlined />} />
        <Step title="Nội dung & Đề thi" icon={<FileExcelOutlined />} />
        <Step title="Phân công & SLA" icon={<ClockCircleOutlined />} />
        <Step title="Phúc khảo" icon={<WarningOutlined />} />
      </Steps>
      
      <Form
        form={form}
        layout="vertical"
        className="campaign-form"
        initialValues={{
          appealEnabled: true,
          appealLimit: 2,
          appealDays: 7,
          enableWarning: true,
          enableCountdown: true,
          confirmPublish: true,
          name: 'Đánh giá tay nghề Q4/2025',
          description: 'Chiến dịch đánh giá tay nghề quý 4 năm 2025',
          openAt: moment().add(1, 'day'),
          closeAt: moment().add(5, 'days'),
          gradeDueAt: moment().add(10, 'days')
        }}
      >
        {renderStepContent()}
        
        <div className="campaign-form-actions">
          {currentStep > 0 && (
            <Button 
              style={{ marginRight: 8 }} 
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Quay lại
            </Button>
          )}
          
          {currentStep < 3 && (
            <Button 
              type="primary" 
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Tiếp theo
            </Button>
          )}
          
          {currentStep === 3 && (
            <>
              <Button 
                icon={<SaveOutlined />} 
                onClick={() => handleSubmit(true)}
                loading={loading}
              >
                Lưu nháp
              </Button>
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={() => handleSubmit(false)}
                style={{ marginLeft: 8 }}
                loading={loading}
              >
                Phát hành
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default CampaignForm;
