import React, { useState, useEffect } from 'react';
import { 
  Card, Typography, Form, Input, Button, Spin, 
  Rate, Radio, Progress, Divider, Alert, 
  message, Space, Tooltip, Modal, Result, Tag
} from 'antd';
import { 
  SaveOutlined, SendOutlined, InfoCircleOutlined, 
  QuestionCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import './SelfEvalForm.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const SelfEvalForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Fetch evaluation data
  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      const mockEvaluation = {
        id: 1,
        roundId: 2,
        roundName: 'Đánh giá KPI Q3/2025',
        employeeId: 123,
        employeeName: 'Lê Thị Nhân Viên',
        department: 'Phòng Kỹ thuật',
        position: 'Nhân viên',
        startDate: '2025-07-20',
        endDate: '2025-07-31',
        status: 'in_progress',
        progress: 0,
        criteria: [
          { 
            id: 1, 
            code: 'KN01', 
            name: 'Kỹ năng giao tiếp', 
            description: 'Khả năng giao tiếp hiệu quả trong công việc',
            type: 'scale',
            weight: 20,
            selfScore: null,
            selfNote: '',
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
            selfScore: null,
            selfNote: '',
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
            selfScore: null,
            selfNote: '',
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
            selfScore: null,
            selfNote: '',
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
            selfScore: null,
            selfNote: '',
            mcqConfig: {
              options: [
                { value: 1, label: 'Chưa đạt yêu cầu', score: 1 },
                { value: 2, label: 'Đạt yêu cầu cơ bản', score: 3 },
                { value: 3, label: 'Đạt yêu cầu tốt', score: 4 },
                { value: 4, label: 'Vượt yêu cầu', score: 5 }
              ]
            }
          }
        ],
        overallNote: ''
      };
      
      setEvaluation(mockEvaluation);
      setLoading(false);
    }, 1000);
  }, [token]);

  // Calculate progress
  const calculateProgress = () => {
    if (!evaluation) return 0;
    
    const totalCriteria = evaluation.criteria.length;
    const completedCriteria = evaluation.criteria.filter(c => c.selfScore !== null).length;
    
    return Math.round((completedCriteria / totalCriteria) * 100);
  };

  // Handle form value changes
  const handleValuesChange = (changedValues, allValues) => {
    // Update evaluation object with form values
    const updatedEvaluation = { ...evaluation };
    
    // Update criteria scores and notes
    evaluation.criteria.forEach(criterion => {
      const scoreKey = `score_${criterion.id}`;
      const noteKey = `note_${criterion.id}`;
      
      if (changedValues.hasOwnProperty(scoreKey)) {
        criterion.selfScore = changedValues[scoreKey];
      }
      
      if (changedValues.hasOwnProperty(noteKey)) {
        criterion.selfNote = changedValues[noteKey];
      }
    });
    
    // Update overall note
    if (changedValues.hasOwnProperty('overallNote')) {
      updatedEvaluation.overallNote = changedValues.overallNote;
    }
    
    // Update progress
    updatedEvaluation.progress = calculateProgress();
    
    setEvaluation(updatedEvaluation);
  };

  // Handle save draft
  const handleSaveDraft = async () => {
    try {
      await form.validateFields();
      
      setSaveLoading(true);
      
      // Mock API call
      setTimeout(() => {
        message.success('Đã lưu nháp thành công');
        setSaveLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      
      // Check if all criteria have scores
      const allScored = evaluation.criteria.every(c => c.selfScore !== null);
      
      if (!allScored) {
        message.error('Vui lòng đánh giá tất cả các tiêu chí');
        return;
      }
      
      // Confirm submission
      Modal.confirm({
        title: 'Xác nhận nộp đánh giá',
        icon: <ExclamationCircleOutlined />,
        content: 'Sau khi nộp, bạn sẽ không thể chỉnh sửa đánh giá này nữa. Bạn có chắc chắn muốn nộp?',
        okText: 'Nộp',
        cancelText: 'Hủy',
        onOk: () => {
          setSubmitLoading(true);
          
          // Mock API call
          setTimeout(() => {
            setSubmitted(true);
            setSubmitLoading(false);
          }, 1500);
        }
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Render criterion form item based on type
  const renderCriterionFormItem = (criterion) => {
    const scoreKey = `score_${criterion.id}`;
    const noteKey = `note_${criterion.id}`;
    
    let formItem;
    
    switch (criterion.type) {
      case 'scale':
        formItem = (
          <Form.Item
            name={scoreKey}
            rules={[{ required: true, message: 'Vui lòng đánh giá tiêu chí này' }]}
          >
            <Rate 
              count={criterion.scaleConfig.max} 
              tooltips={criterion.scaleConfig.labels.map(l => l.label)}
            />
          </Form.Item>
        );
        break;
      case 'mcq':
        formItem = (
          <Form.Item
            name={scoreKey}
            rules={[{ required: true, message: 'Vui lòng đánh giá tiêu chí này' }]}
          >
            <Radio.Group>
              {criterion.mcqConfig.options.map(option => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
        break;
      default:
        formItem = <div>Loại tiêu chí không được hỗ trợ</div>;
    }
    
    return (
      <div className="criterion-container">
        <div className="criterion-header">
          <div className="criterion-title">
            <Text strong>{criterion.code} - {criterion.name}</Text>
            <Tag color="blue">{criterion.weight}%</Tag>
          </div>
          <Tooltip title={criterion.description}>
            <InfoCircleOutlined />
          </Tooltip>
        </div>
        
        <div className="criterion-content">
          {formItem}
          
          <Form.Item
            name={noteKey}
            label="Ghi chú"
          >
            <TextArea 
              rows={3} 
              placeholder="Nhập ghi chú cho tiêu chí này (không bắt buộc)"
            />
          </Form.Item>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="self-eval-loading">
        <Spin size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="self-eval-container">
        <Result
          status="success"
          title="Đã nộp đánh giá thành công!"
          subTitle="Cảm ơn bạn đã hoàn thành đánh giá. Quản lý của bạn sẽ xem xét và đánh giá trong thời gian tới."
          extra={[
            <Button type="primary" key="close" onClick={() => window.close()}>
              Đóng
            </Button>
          ]}
        />
      </div>
    );
  }

  return (
    <div className="self-eval-container">
      <div className="self-eval-header">
        <div className="self-eval-title">
          <Title level={2}>Tự đánh giá</Title>
          <Text>{evaluation.roundName}</Text>
        </div>
        <div className="self-eval-actions">
          <Space>
            <Button 
              icon={<SaveOutlined />} 
              onClick={handleSaveDraft}
              loading={saveLoading}
            >
              Lưu nháp
            </Button>
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={handleSubmit}
              loading={submitLoading}
            >
              Nộp đánh giá
            </Button>
          </Space>
        </div>
      </div>
      
      <Card className="self-eval-info">
        <div className="info-row">
          <div className="info-item">
            <Text type="secondary">Nhân viên:</Text>
            <Text strong>{evaluation.employeeName}</Text>
          </div>
          <div className="info-item">
            <Text type="secondary">Phòng ban:</Text>
            <Text>{evaluation.department}</Text>
          </div>
          <div className="info-item">
            <Text type="secondary">Vị trí:</Text>
            <Text>{evaluation.position}</Text>
          </div>
        </div>
        
        <div className="info-row">
          <div className="info-item">
            <Text type="secondary">Thời gian:</Text>
            <Text>{evaluation.startDate} - {evaluation.endDate}</Text>
          </div>
          <div className="info-item">
            <Text type="secondary">Tiến độ:</Text>
            <Progress percent={evaluation.progress} size="small" />
          </div>
        </div>
      </Card>
      
      <Alert
        message="Hướng dẫn"
        description="Vui lòng đánh giá tất cả các tiêu chí dưới đây. Bạn có thể lưu nháp để hoàn thành sau hoặc nộp khi đã hoàn thành tất cả."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        className="self-eval-form"
      >
        <Card title="Đánh giá theo tiêu chí" className="criteria-card">
          {evaluation.criteria.map(criterion => (
            <React.Fragment key={criterion.id}>
              {renderCriterionFormItem(criterion)}
              <Divider />
            </React.Fragment>
          ))}
        </Card>
        
        <Card title="Nhận xét tổng thể" className="overall-card">
          <Form.Item
            name="overallNote"
            rules={[{ required: true, message: 'Vui lòng nhập nhận xét tổng thể' }]}
          >
            <TextArea 
              rows={6} 
              placeholder="Nhập nhận xét tổng thể về bản thân trong kỳ đánh giá này"
            />
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default SelfEvalForm;
