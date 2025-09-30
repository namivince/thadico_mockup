import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Upload, 
  message, 
  Card, 
  Descriptions, 
  Space, 
  Divider, 
  Alert,
  Typography,
  Row,
  Col
} from 'antd';
import { 
  InboxOutlined, 
  QuestionCircleOutlined, 
  SaveOutlined, 
  SendOutlined, 
  CloseOutlined,
  FileTextOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import './AppealForm.css';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

// Mock assessment data
const mockAssessmentData = {
  id: 8,
  name: 'Đánh giá kỹ năng lập trình',
  date: '2025-09-15',
  score: 75,
  totalScore: 100,
  grader: 'Nguyễn Văn A',
  gradedAt: '2025-09-20',
  questions: [
    {
      id: 1,
      number: 1,
      content: 'Kiến thức cơ bản',
      maxScore: 20,
      score: 18
    },
    {
      id: 2,
      number: 2,
      content: 'Thuật toán',
      maxScore: 25,
      score: 20
    },
    {
      id: 3,
      number: 3,
      content: 'Thiết kế cơ sở dữ liệu',
      maxScore: 15,
      score: 8
    },
    {
      id: 4,
      number: 4,
      content: 'Kiểm thử',
      maxScore: 15,
      score: 12
    },
    {
      id: 5,
      number: 5,
      content: 'Xử lý ngoại lệ',
      maxScore: 10,
      score: 5
    },
    {
      id: 6,
      number: 6,
      content: 'Tối ưu hóa',
      maxScore: 15,
      score: 12
    }
  ],
  appealCount: 0,
  maxAppeals: 3,
  appealDeadline: '2025-09-27'
};

const AppealForm = ({ visible, onClose, assessmentId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [remainingAppeals, setRemainingAppeals] = useState(3);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  // Fetch assessment data
  useEffect(() => {
    if (visible) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setAssessment(mockAssessmentData);
        setLoading(false);
        
        // Calculate remaining appeals
        setRemainingAppeals(mockAssessmentData.maxAppeals - mockAssessmentData.appealCount);
        
        // Calculate days left for appeal
        const deadline = new Date(mockAssessmentData.appealDeadline);
        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays);
        setIsDeadlinePassed(diffDays < 0);
      }, 1000);
    } else {
      // Reset form when modal is closed
      form.resetFields();
      setSelectedQuestions([]);
      setFileList([]);
    }
  }, [visible, assessmentId, form]);

  // Handle question selection
  const handleQuestionChange = (checkedValues) => {
    setSelectedQuestions(checkedValues);
  };

  // Handle file upload
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (selectedQuestions.length === 0) {
        message.error('Vui lòng chọn ít nhất một câu hỏi cần phúc khảo');
        return;
      }

      setLoading(true);
      
      // Prepare data for submission
      const appealData = {
        assessmentId: assessment.id,
        reason: values.reason,
        questions: selectedQuestions.map(qId => {
          const question = assessment.questions.find(q => q.id === qId);
          return {
            questionId: qId,
            explanation: values[`explanation_${qId}`] || ''
          };
        }),
        files: fileList.map(file => file.originFileObj)
      };
      
      // Simulate API call
      setTimeout(() => {
        console.log('Appeal data:', appealData);
        message.success('Yêu cầu phúc khảo đã được gửi thành công');
        setLoading(false);
        onClose();
      }, 1500);
    });
  };

  // Handle save draft
  const handleSaveDraft = () => {
    const formValues = form.getFieldsValue();
    
    // Simulate saving draft
    localStorage.setItem(`appeal_draft_${assessmentId}`, JSON.stringify({
      reason: formValues.reason,
      selectedQuestions,
      explanations: selectedQuestions.reduce((acc, qId) => {
        acc[`explanation_${qId}`] = formValues[`explanation_${qId}`] || '';
        return acc;
      }, {})
    }));
    
    message.success('Đã lưu nháp yêu cầu phúc khảo');
  };

  // Upload props
  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList: fileList,
    onChange: handleFileChange,
    beforeUpload: (file) => {
      const isValidFormat = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'].includes(file.type);
      const isLessThan10M = file.size / 1024 / 1024 < 10;
      
      if (!isValidFormat) {
        message.error('Chỉ chấp nhận file PDF, DOCX, JPG, PNG!');
        return Upload.LIST_IGNORE;
      }
      
      if (!isLessThan10M) {
        message.error('File phải nhỏ hơn 10MB!');
        return Upload.LIST_IGNORE;
      }
      
      return false; // Prevent auto upload
    }
  };

  // Render appeal deadline warning
  const renderDeadlineWarning = () => {
    if (isDeadlinePassed) {
      return (
        <Alert
          message="Đã quá hạn gửi phúc khảo"
          description="Thời hạn gửi yêu cầu phúc khảo đã kết thúc. Vui lòng liên hệ quản trị viên nếu bạn có thắc mắc."
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      );
    }
    
    if (daysLeft <= 2) {
      return (
        <Alert
          message="Sắp hết hạn gửi phúc khảo"
          description={`Chỉ còn ${daysLeft} ngày để gửi yêu cầu phúc khảo. Hạn cuối: ${new Date(assessment?.appealDeadline).toLocaleDateString('vi-VN')}`}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      );
    }
    
    return null;
  };

  // Render remaining appeals warning
  const renderRemainingAppealsWarning = () => {
    if (remainingAppeals === 0) {
      return (
        <Alert
          message="Đã hết lượt phúc khảo"
          description="Bạn đã sử dụng hết số lần phúc khảo cho đánh giá này. Vui lòng liên hệ quản trị viên nếu bạn có thắc mắc."
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      );
    }
    
    if (remainingAppeals === 1) {
      return (
        <Alert
          message="Còn 1 lượt phúc khảo"
          description="Đây là lượt phúc khảo cuối cùng của bạn cho đánh giá này. Vui lòng cân nhắc kỹ trước khi gửi."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      );
    }
    
    return null;
  };

  return (
    <Modal
      title={
        <Space>
          <FileTextOutlined />
          <span>Gửi yêu cầu phúc khảo</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      className="appeal-form-modal"
    >
      {loading ? (
        <div className="loading-container">Đang tải...</div>
      ) : assessment ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {/* Assessment Information */}
          <Card title="Thông tin đánh giá" className="assessment-info-card">
            <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered size="small">
              <Descriptions.Item label="Tên đánh giá">{assessment.name}</Descriptions.Item>
              <Descriptions.Item label="Ngày đánh giá">{new Date(assessment.date).toLocaleDateString('vi-VN')}</Descriptions.Item>
              <Descriptions.Item label="Điểm số hiện tại">{assessment.score}/{assessment.totalScore}</Descriptions.Item>
              <Descriptions.Item label="Người chấm điểm">{assessment.grader}</Descriptions.Item>
              <Descriptions.Item label="Thời gian chấm">{new Date(assessment.gradedAt).toLocaleDateString('vi-VN')}</Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Warnings */}
          {renderDeadlineWarning()}
          {renderRemainingAppealsWarning()}

          {/* Appeal Form */}
          <Card title="Thông tin yêu cầu phúc khảo" className="appeal-form-card">
            <Form.Item
              name="reason"
              label="Lý do phúc khảo"
              rules={[{ required: true, message: 'Vui lòng nhập lý do phúc khảo' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="Nhập lý do bạn muốn phúc khảo kết quả đánh giá này"
                disabled={isDeadlinePassed || remainingAppeals === 0}
              />
            </Form.Item>

            <Divider orientation="left">Chọn câu hỏi/tiêu chí cần phúc khảo</Divider>
            
            <Form.Item
              name="questions"
              rules={[{ required: true, message: 'Vui lòng chọn ít nhất một câu hỏi' }]}
            >
              <Checkbox.Group 
                onChange={handleQuestionChange}
                disabled={isDeadlinePassed || remainingAppeals === 0}
              >
                <Row>
                  {assessment.questions.map(question => (
                    <Col span={24} key={question.id} style={{ marginBottom: 16 }}>
                      <Checkbox value={question.id}>
                        <Space direction="vertical" style={{ marginLeft: 8 }}>
                          <Text strong>
                            Câu {question.number}: {question.content} ({question.maxScore} điểm)
                          </Text>
                          <Text type="secondary">Điểm hiện tại: {question.score}/{question.maxScore}</Text>
                          
                          {selectedQuestions.includes(question.id) && (
                            <Form.Item
                              name={`explanation_${question.id}`}
                              rules={[{ required: true, message: 'Vui lòng nhập giải thích' }]}
                              style={{ marginBottom: 0, marginTop: 8 }}
                            >
                              <TextArea 
                                rows={3} 
                                placeholder="Giải thích lý do phúc khảo câu này"
                                disabled={isDeadlinePassed || remainingAppeals === 0}
                              />
                            </Form.Item>
                          )}
                        </Space>
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Divider orientation="left">Tài liệu đính kèm</Divider>
            
            <Form.Item name="attachments">
              <Dragger {...uploadProps} disabled={isDeadlinePassed || remainingAppeals === 0}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấp hoặc kéo file vào khu vực này để tải lên</p>
                <p className="ant-upload-hint">
                  Định dạng hỗ trợ: PDF, DOCX, JPG, PNG (tối đa 10MB)
                </p>
              </Dragger>
            </Form.Item>
          </Card>

          {/* Regulations */}
          <Card title="Quy định phúc khảo" className="regulations-card">
            <ul>
              <li>Yêu cầu phúc khảo phải được gửi trong vòng 7 ngày sau khi có kết quả đánh giá</li>
              <li>Mỗi học viên chỉ được gửi tối đa 3 yêu cầu phúc khảo cho một đánh giá</li>
              <li>Kết quả phúc khảo sẽ được thông báo trong vòng 3-5 ngày làm việc</li>
              <li>Kết quả sau phúc khảo có thể tăng, giữ nguyên hoặc giảm điểm</li>
            </ul>
          </Card>

          {/* Form Actions */}
          <div className="form-actions">
            <Space>
              <Button 
                icon={<SaveOutlined />} 
                onClick={handleSaveDraft}
                disabled={isDeadlinePassed || remainingAppeals === 0}
              >
                Lưu nháp
              </Button>
              <Button 
                icon={<CloseOutlined />} 
                onClick={onClose}
              >
                Hủy bỏ
              </Button>
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                htmlType="submit"
                loading={loading}
                disabled={isDeadlinePassed || remainingAppeals === 0}
              >
                Gửi yêu cầu
              </Button>
            </Space>
          </div>
        </Form>
      ) : (
        <div className="error-container">
          <Alert
            message="Không thể tải thông tin đánh giá"
            description="Đã xảy ra lỗi khi tải thông tin đánh giá. Vui lòng thử lại sau."
            type="error"
            showIcon
          />
        </div>
      )}
    </Modal>
  );
};

export default AppealForm;
