import React, { useState, useEffect } from 'react';
import { 
  Layout, Card, Button, Table, Form, Input, InputNumber, 
  Select, Tabs, Space, Typography, Divider, message, 
  Upload, Modal, List, Tag, Tooltip, Popconfirm, Alert
} from 'antd';
import { 
  PlusOutlined, DeleteOutlined, SaveOutlined, 
  ImportOutlined, SortAscendingOutlined, 
  ExclamationCircleOutlined, DragOutlined,
  FileExcelOutlined, InfoCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams, useNavigate } from 'react-router-dom';
import './RubricBuilder.css';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const RubricBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [rubric, setRubric] = useState({
    id: null,
    name: '',
    description: '',
    criteria: []
  });
  const [selectedCriterion, setSelectedCriterion] = useState(null);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Fetch rubric data if editing
  useEffect(() => {
    if (id && id !== 'new') {
      setLoading(true);
      // Mock API call
      setTimeout(() => {
        const mockRubric = {
          id: parseInt(id),
          name: 'Bộ tiêu chí đánh giá năng lực chuẩn',
          description: 'Bộ tiêu chí đánh giá năng lực chuẩn cho nhân viên',
          criteria: [
            { 
              id: 1, 
              code: 'KN01', 
              name: 'Kỹ năng giao tiếp', 
              description: 'Khả năng giao tiếp hiệu quả trong công việc',
              type: 'scale',
              weight: 20,
              scaleConfig: {
                min: 1,
                max: 5,
                step: 1,
                labels: [
                  { value: 1, label: 'Rất kém' },
                  { value: 2, label: 'Kém' },
                  { value: 3, label: 'Trung bình' },
                  { value: 4, label: 'Tốt' },
                  { value: 5, label: 'Xuất sắc' }
                ]
              }
            },
            { 
              id: 2, 
              code: 'KN02', 
              name: 'Kỹ năng làm việc nhóm', 
              description: 'Khả năng phối hợp và làm việc hiệu quả trong nhóm',
              type: 'scale',
              weight: 20,
              scaleConfig: {
                min: 1,
                max: 5,
                step: 1,
                labels: [
                  { value: 1, label: 'Rất kém' },
                  { value: 2, label: 'Kém' },
                  { value: 3, label: 'Trung bình' },
                  { value: 4, label: 'Tốt' },
                  { value: 5, label: 'Xuất sắc' }
                ]
              }
            },
            { 
              id: 3, 
              code: 'TĐ01', 
              name: 'Trách nhiệm', 
              description: 'Tinh thần trách nhiệm trong công việc',
              type: 'scale',
              weight: 15,
              scaleConfig: {
                min: 1,
                max: 5,
                step: 1,
                labels: [
                  { value: 1, label: 'Rất kém' },
                  { value: 2, label: 'Kém' },
                  { value: 3, label: 'Trung bình' },
                  { value: 4, label: 'Tốt' },
                  { value: 5, label: 'Xuất sắc' }
                ]
              }
            },
            { 
              id: 4, 
              code: 'TĐ02', 
              name: 'Chủ động', 
              description: 'Tính chủ động trong công việc',
              type: 'scale',
              weight: 15,
              scaleConfig: {
                min: 1,
                max: 5,
                step: 1,
                labels: [
                  { value: 1, label: 'Rất kém' },
                  { value: 2, label: 'Kém' },
                  { value: 3, label: 'Trung bình' },
                  { value: 4, label: 'Tốt' },
                  { value: 5, label: 'Xuất sắc' }
                ]
              }
            },
            { 
              id: 5, 
              code: 'KT01', 
              name: 'Kiến thức chuyên môn', 
              description: 'Kiến thức chuyên môn về lĩnh vực',
              type: 'mcq',
              weight: 30,
              mcqConfig: {
                options: [
                  { value: 1, label: 'Chưa đạt yêu cầu', score: 1 },
                  { value: 2, label: 'Đạt yêu cầu cơ bản', score: 3 },
                  { value: 3, label: 'Đạt yêu cầu tốt', score: 4 },
                  { value: 4, label: 'Vượt yêu cầu', score: 5 }
                ]
              }
            }
          ]
        };
        
        setRubric(mockRubric);
        setSelectedCriterion(mockRubric.criteria[0]);
        form.setFieldsValue({
          name: mockRubric.name,
          description: mockRubric.description
        });
        setLoading(false);
      }, 1000);
    } else {
      // New rubric
      setRubric({
        id: null,
        name: '',
        description: '',
        criteria: []
      });
    }
  }, [id, form]);

  // Update form when selected criterion changes
  useEffect(() => {
    if (selectedCriterion) {
      form.setFieldsValue({
        criterionCode: selectedCriterion.code,
        criterionName: selectedCriterion.name,
        criterionDescription: selectedCriterion.description,
        criterionType: selectedCriterion.type,
        criterionWeight: selectedCriterion.weight,
        ...getTypeSpecificFormValues(selectedCriterion)
      });
    } else {
      form.resetFields(['criterionCode', 'criterionName', 'criterionDescription', 'criterionType', 'criterionWeight']);
    }
  }, [selectedCriterion, form]);

  // Get type-specific form values
  const getTypeSpecificFormValues = (criterion) => {
    if (!criterion) return {};
    
    switch (criterion.type) {
      case 'scale':
        return {
          scaleMin: criterion.scaleConfig?.min || 1,
          scaleMax: criterion.scaleConfig?.max || 5,
          scaleStep: criterion.scaleConfig?.step || 1,
          scaleLabels: criterion.scaleConfig?.labels || []
        };
      case 'mcq':
        return {
          mcqOptions: criterion.mcqConfig?.options || []
        };
      case 'essay':
        return {
          essayGuide: criterion.essayConfig?.guide || '',
          essayWordLimit: criterion.essayConfig?.wordLimit || 500
        };
      default:
        return {};
    }
  };

  // Validate rubric
  const validateRubric = () => {
    const errors = [];
    
    // Check for duplicate codes
    const codes = rubric.criteria.map(c => c.code);
    const duplicateCodes = codes.filter((code, index) => codes.indexOf(code) !== index);
    if (duplicateCodes.length > 0) {
      errors.push(`Mã tiêu chí trùng lặp: ${duplicateCodes.join(', ')}`);
    }
    
    // Check total weight
    const totalWeight = rubric.criteria.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight !== 100) {
      errors.push(`Tổng trọng số phải bằng 100%. Hiện tại: ${totalWeight}%`);
    }
    
    // Check for empty fields
    const emptyFields = rubric.criteria.filter(c => !c.code || !c.name);
    if (emptyFields.length > 0) {
      errors.push(`${emptyFields.length} tiêu chí chưa có mã hoặc tên`);
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Handle save
  const handleSave = async () => {
    try {
      await form.validateFields();
      
      if (!validateRubric()) {
        return;
      }
      
      setSaveLoading(true);
      
      // Prepare data
      const values = form.getFieldsValue();
      const payload = {
        name: values.name,
        description: values.description,
        criteria: rubric.criteria
      };
      
      // Mock API call
      setTimeout(() => {
        console.log('Saving rubric:', payload);
        message.success('Đã lưu bộ tiêu chí thành công');
        setSaveLoading(false);
        
        // If new rubric, redirect to edit page
        if (!id || id === 'new') {
          navigate('/assessment/rubrics/1/builder');
        }
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle add criterion
  const handleAddCriterion = () => {
    const newCriterion = {
      id: Date.now(),
      code: `TC${rubric.criteria.length + 1}`,
      name: `Tiêu chí ${rubric.criteria.length + 1}`,
      description: '',
      type: 'scale',
      weight: 0,
      scaleConfig: {
        min: 1,
        max: 5,
        step: 1,
        labels: [
          { value: 1, label: 'Rất kém' },
          { value: 2, label: 'Kém' },
          { value: 3, label: 'Trung bình' },
          { value: 4, label: 'Tốt' },
          { value: 5, label: 'Xuất sắc' }
        ]
      }
    };
    
    setRubric(prev => ({
      ...prev,
      criteria: [...prev.criteria, newCriterion]
    }));
    
    setSelectedCriterion(newCriterion);
  };

  // Handle delete criterion
  const handleDeleteCriterion = (criterionId) => {
    setRubric(prev => ({
      ...prev,
      criteria: prev.criteria.filter(c => c.id !== criterionId)
    }));
    
    if (selectedCriterion && selectedCriterion.id === criterionId) {
      setSelectedCriterion(null);
    }
  };

  // Handle criterion selection
  const handleSelectCriterion = (criterion) => {
    setSelectedCriterion(criterion);
  };

  // Handle criterion form change
  const handleCriterionFormChange = (changedValues, allValues) => {
    if (!selectedCriterion) return;
    
    const updatedCriterion = {
      ...selectedCriterion,
      code: allValues.criterionCode,
      name: allValues.criterionName,
      description: allValues.criterionDescription,
      type: allValues.criterionType,
      weight: allValues.criterionWeight
    };
    
    // Update type-specific config
    switch (allValues.criterionType) {
      case 'scale':
        updatedCriterion.scaleConfig = {
          min: allValues.scaleMin,
          max: allValues.scaleMax,
          step: allValues.scaleStep,
          labels: allValues.scaleLabels || []
        };
        break;
      case 'mcq':
        updatedCriterion.mcqConfig = {
          options: allValues.mcqOptions || []
        };
        break;
      case 'essay':
        updatedCriterion.essayConfig = {
          guide: allValues.essayGuide,
          wordLimit: allValues.essayWordLimit
        };
        break;
      default:
        break;
    }
    
    // Update criterion in rubric
    setRubric(prev => ({
      ...prev,
      criteria: prev.criteria.map(c => 
        c.id === selectedCriterion.id ? updatedCriterion : c
      )
    }));
    
    // Update selected criterion
    setSelectedCriterion(updatedCriterion);
  };

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(rubric.criteria);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setRubric(prev => ({
      ...prev,
      criteria: items
    }));
  };

  // Handle import
  const handleImport = (file) => {
    // Mock import
    message.loading('Đang xử lý file...', 2)
      .then(() => {
        message.success('Đã nhập 5 tiêu chí từ file');
        setImportModalVisible(false);
      });
    
    return false; // Prevent upload
  };

  // Render criterion form based on type
  const renderCriterionForm = () => {
    if (!selectedCriterion) return null;
    
    return (
      <Tabs defaultActiveKey="basic">
        <TabPane tab="Thông tin cơ bản" key="basic">
          <Form.Item
            name="criterionCode"
            label="Mã tiêu chí"
            rules={[{ required: true, message: 'Vui lòng nhập mã tiêu chí' }]}
          >
            <Input placeholder="Nhập mã tiêu chí" />
          </Form.Item>
          
          <Form.Item
            name="criterionName"
            label="Tên tiêu chí"
            rules={[{ required: true, message: 'Vui lòng nhập tên tiêu chí' }]}
          >
            <Input placeholder="Nhập tên tiêu chí" />
          </Form.Item>
          
          <Form.Item
            name="criterionDescription"
            label="Mô tả"
          >
            <TextArea rows={4} placeholder="Nhập mô tả tiêu chí" />
          </Form.Item>
          
          <Form.Item
            name="criterionType"
            label="Loại tiêu chí"
            rules={[{ required: true, message: 'Vui lòng chọn loại tiêu chí' }]}
          >
            <Select>
              <Option value="scale">Thang điểm</Option>
              <Option value="mcq">Trắc nghiệm</Option>
              <Option value="essay">Tự luận</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="criterionWeight"
            label="Trọng số (%)"
            rules={[{ required: true, message: 'Vui lòng nhập trọng số' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </TabPane>
        
        {selectedCriterion.type === 'scale' && (
          <TabPane tab="Cấu hình thang điểm" key="scale">
            <Form.Item
              name="scaleMin"
              label="Giá trị nhỏ nhất"
              rules={[{ required: true, message: 'Vui lòng nhập giá trị nhỏ nhất' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="scaleMax"
              label="Giá trị lớn nhất"
              rules={[{ required: true, message: 'Vui lòng nhập giá trị lớn nhất' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="scaleStep"
              label="Bước nhảy"
              rules={[{ required: true, message: 'Vui lòng nhập bước nhảy' }]}
            >
              <InputNumber min={0.1} step={0.1} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.List name="scaleLabels">
              {(fields, { add, remove }) => (
                <>
                  <Divider orientation="left">Nhãn thang điểm</Divider>
                  
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true, message: 'Nhập giá trị' }]}
                      >
                        <InputNumber placeholder="Giá trị" style={{ width: 100 }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'label']}
                        rules={[{ required: true, message: 'Nhập nhãn' }]}
                      >
                        <Input placeholder="Nhãn" style={{ width: 200 }} />
                      </Form.Item>
                      <DeleteOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm nhãn
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </TabPane>
        )}
        
        {selectedCriterion.type === 'mcq' && (
          <TabPane tab="Tùy chọn trắc nghiệm" key="mcq">
            <Form.List name="mcqOptions">
              {(fields, { add, remove }) => (
                <>
                  <Divider orientation="left">Các lựa chọn</Divider>
                  
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true, message: 'Nhập giá trị' }]}
                      >
                        <InputNumber placeholder="Giá trị" style={{ width: 100 }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'label']}
                        rules={[{ required: true, message: 'Nhập nhãn' }]}
                      >
                        <Input placeholder="Nhãn" style={{ width: 200 }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'score']}
                        rules={[{ required: true, message: 'Nhập điểm' }]}
                      >
                        <InputNumber placeholder="Điểm" style={{ width: 100 }} />
                      </Form.Item>
                      <DeleteOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm lựa chọn
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </TabPane>
        )}
        
        {selectedCriterion.type === 'essay' && (
          <TabPane tab="Hướng dẫn tự luận" key="essay">
            <Form.Item
              name="essayGuide"
              label="Hướng dẫn"
            >
              <TextArea rows={6} placeholder="Nhập hướng dẫn cho câu hỏi tự luận" />
            </Form.Item>
            
            <Form.Item
              name="essayWordLimit"
              label="Giới hạn từ"
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </TabPane>
        )}
      </Tabs>
    );
  };

  return (
    <div className="rubric-builder-container">
      <div className="rubric-builder-header">
        <div className="rubric-builder-title">
          <Title level={2}>{id && id !== 'new' ? 'Chỉnh sửa bộ tiêu chí' : 'Tạo bộ tiêu chí mới'}</Title>
        </div>
        <div className="rubric-builder-actions">
          <Space>
            <Button 
              icon={<HomeOutlined />} 
              onClick={() => navigate('/dashboard')}
            >
              Trở về Dashboard
            </Button>
            <Button 
              icon={<ImportOutlined />} 
              onClick={() => setImportModalVisible(true)}
            >
              Import XLSX
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSave}
              loading={saveLoading}
            >
              Lưu
            </Button>
          </Space>
        </div>
      </div>
      
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleCriterionFormChange}
      >
        <Card className="rubric-info-card">
          <Form.Item
            name="name"
            label="Tên bộ tiêu chí"
            rules={[{ required: true, message: 'Vui lòng nhập tên bộ tiêu chí' }]}
          >
            <Input placeholder="Nhập tên bộ tiêu chí" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả"
          >
            <TextArea rows={2} placeholder="Nhập mô tả bộ tiêu chí" />
          </Form.Item>
        </Card>
        
        {validationErrors.length > 0 && (
          <Alert
            message="Lỗi xác thực"
            description={
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            }
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        <Layout className="rubric-builder-layout">
          <Sider width={300} className="rubric-builder-sider" theme="light">
            <div className="criteria-list-header">
              <Title level={4}>Danh sách tiêu chí</Title>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddCriterion}
              >
                Thêm tiêu chí
              </Button>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="criteria">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="criteria-list"
                  >
                    {rubric.criteria.map((criterion, index) => (
                      <Draggable 
                        key={criterion.id.toString()} 
                        draggableId={criterion.id.toString()} 
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`criterion-item ${selectedCriterion && selectedCriterion.id === criterion.id ? 'selected' : ''}`}
                            onClick={() => handleSelectCriterion(criterion)}
                          >
                            <div className="criterion-item-content">
                              <div className="criterion-item-header">
                                <div className="criterion-item-code">{criterion.code}</div>
                                <div 
                                  className="criterion-item-drag-handle"
                                  {...provided.dragHandleProps}
                                >
                                  <DragOutlined />
                                </div>
                              </div>
                              <div className="criterion-item-name">{criterion.name}</div>
                              <div className="criterion-item-footer">
                                <Tag color="blue">{criterion.type === 'scale' ? 'Thang điểm' : criterion.type === 'mcq' ? 'Trắc nghiệm' : 'Tự luận'}</Tag>
                                <Tag color="green">{criterion.weight}%</Tag>
                              </div>
                            </div>
                            <div className="criterion-item-actions">
                              <Tooltip title="Xóa tiêu chí">
                                <Popconfirm
                                  title="Bạn có chắc chắn muốn xóa tiêu chí này?"
                                  onConfirm={() => handleDeleteCriterion(criterion.id)}
                                  okText="Xóa"
                                  cancelText="Hủy"
                                >
                                  <Button 
                                    type="text" 
                                    danger 
                                    icon={<DeleteOutlined />} 
                                    size="small"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </Popconfirm>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            
            <div className="criteria-summary">
              <div className="criteria-summary-item">
                <Text>Tổng số tiêu chí:</Text>
                <Text strong>{rubric.criteria.length}</Text>
              </div>
              <div className="criteria-summary-item">
                <Text>Tổng trọng số:</Text>
                <Text 
                  strong 
                  type={rubric.criteria.reduce((sum, c) => sum + c.weight, 0) === 100 ? 'success' : 'danger'}
                >
                  {rubric.criteria.reduce((sum, c) => sum + c.weight, 0)}%
                </Text>
              </div>
            </div>
          </Sider>
          
          <Content className="rubric-builder-content">
            {selectedCriterion ? (
              <Card 
                title={`Chỉnh sửa tiêu chí: ${selectedCriterion.code} - ${selectedCriterion.name}`}
                className="criterion-form-card"
              >
                {renderCriterionForm()}
              </Card>
            ) : (
              <div className="no-criterion-selected">
                <InfoCircleOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <Text>Chọn một tiêu chí để chỉnh sửa hoặc thêm tiêu chí mới</Text>
              </div>
            )}
          </Content>
        </Layout>
      </Form>
      
      <Modal
        title="Import từ Excel"
        open={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        footer={null}
      >
        <Upload.Dragger
          name="file"
          accept=".xlsx,.xls"
          beforeUpload={handleImport}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <FileExcelOutlined style={{ color: '#52c41a', fontSize: 48 }} />
          </p>
          <p className="ant-upload-text">Kéo thả file hoặc click để chọn file</p>
          <p className="ant-upload-hint">
            Hỗ trợ file Excel (.xlsx, .xls)
          </p>
        </Upload.Dragger>
        
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">
            Tải xuống <a href="#">template mẫu</a> để đảm bảo định dạng chính xác
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default RubricBuilder;
