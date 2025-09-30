import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  DatePicker, 
  TimePicker, 
  Checkbox, 
  Descriptions, 
  Space, 
  Divider, 
  Alert,
  message
} from 'antd';
import { 
  CopyOutlined, 
  QuestionCircleOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';
import moment from 'moment';
import './SurveyDuplicateModal.css';

const { TextArea } = Input;

const SurveyDuplicateModal = ({ visible, onClose, survey, onDuplicate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Reset form when modal is opened/closed
  useEffect(() => {
    if (visible && survey) {
      form.setFieldsValue({
        title: `${survey.title} - Bản sao`,
        description: survey.description,
        startDate: moment().add(1, 'day'),
        startTime: moment('09:00', 'HH:mm'),
        endDate: moment().add(15, 'days'),
        endTime: moment('18:00', 'HH:mm'),
        gradingDate: moment().add(20, 'days'),
        gradingTime: moment('18:00', 'HH:mm'),
        copyQuestions: true,
        copyDisplaySettings: true,
        copyParticipants: false,
        copyAttachments: true,
        copyLogic: true
      });
    } else {
      form.resetFields();
    }
  }, [visible, survey, form]);

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // Prepare data for duplication
      const startDateTime = moment(values.startDate)
        .set('hour', values.startTime.hour())
        .set('minute', values.startTime.minute());
      
      const endDateTime = moment(values.endDate)
        .set('hour', values.endTime.hour())
        .set('minute', values.endTime.minute());
      
      const gradingDateTime = values.gradingDate && values.gradingTime
        ? moment(values.gradingDate)
            .set('hour', values.gradingTime.hour())
            .set('minute', values.gradingTime.minute())
        : null;
      
      const duplicateData = {
        originalSurveyId: survey.id,
        title: values.title,
        description: values.description,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        gradingTime: gradingDateTime ? gradingDateTime.toISOString() : null,
        options: {
          copyQuestions: values.copyQuestions,
          copyDisplaySettings: values.copyDisplaySettings,
          copyParticipants: values.copyParticipants,
          copyAttachments: values.copyAttachments,
          copyLogic: values.copyLogic
        }
      };
      
      // Simulate API call
      setTimeout(() => {
        onDuplicate(duplicateData);
        setLoading(false);
        onClose();
        message.success('Khảo sát đã được nhân bản thành công');
      }, 1500);
    });
  };

  // Validate end time is after start time
  const validateEndTime = (_, value) => {
    const startDate = form.getFieldValue('startDate');
    const startTime = form.getFieldValue('startTime');
    const endDate = form.getFieldValue('endDate');
    
    if (startDate && startTime && endDate && value) {
      const startDateTime = moment(startDate)
        .set('hour', startTime.hour())
        .set('minute', startTime.minute());
      
      const endDateTime = moment(endDate)
        .set('hour', value.hour())
        .set('minute', value.minute());
      
      if (endDateTime.isSameOrBefore(startDateTime)) {
        return Promise.reject('Thời gian kết thúc phải sau thời gian bắt đầu');
      }
    }
    
    return Promise.resolve();
  };

  // Validate grading time is after end time
  const validateGradingTime = (_, value) => {
    const endDate = form.getFieldValue('endDate');
    const endTime = form.getFieldValue('endTime');
    const gradingDate = form.getFieldValue('gradingDate');
    
    if (endDate && endTime && gradingDate && value) {
      const endDateTime = moment(endDate)
        .set('hour', endTime.hour())
        .set('minute', endTime.minute());
      
      const gradingDateTime = moment(gradingDate)
        .set('hour', value.hour())
        .set('minute', value.minute());
      
      if (gradingDateTime.isSameOrBefore(endDateTime)) {
        return Promise.reject('Thời gian chấm bài phải sau thời gian kết thúc');
      }
    }
    
    return Promise.resolve();
  };

  return (
    <Modal
      title={
        <Space>
          <CopyOutlined />
          <span>Nhân bản khảo sát</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={700}
      footer={null}
      className="survey-duplicate-modal"
    >
      {survey ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {/* Original Survey Information */}
          <Descriptions 
            title="Thông tin khảo sát gốc" 
            bordered 
            size="small"
            column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Tên khảo sát">{survey.title}</Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{moment(survey.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
            <Descriptions.Item label="Người tạo">{survey.createdBy}</Descriptions.Item>
            <Descriptions.Item label="Số câu hỏi">{survey.questionCount || 0}</Descriptions.Item>
            <Descriptions.Item label="Số người tham gia">{survey.participantCount || 0}</Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* New Survey Information */}
          <div className="new-survey-section">
            <h3>Thông tin khảo sát mới</h3>
            
            <Form.Item
              name="title"
              label="Tiêu đề khảo sát mới"
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề khảo sát' }]}
            >
              <Input placeholder="Nhập tiêu đề khảo sát mới" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Mô tả"
            >
              <TextArea 
                rows={3} 
                placeholder="Nhập mô tả cho khảo sát mới (tùy chọn)"
              />
            </Form.Item>
            
            <div className="date-time-section">
              <div className="date-time-row">
                <Form.Item
                  name="startDate"
                  label="Thời gian bắt đầu"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                  className="date-picker"
                >
                  <DatePicker 
                    format="DD/MM/YYYY" 
                    placeholder="Chọn ngày"
                    disabledDate={current => current && current < moment().startOf('day')}
                  />
                </Form.Item>
                
                <Form.Item
                  name="startTime"
                  rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
                  className="time-picker"
                >
                  <TimePicker format="HH:mm" placeholder="Chọn giờ" />
                </Form.Item>
              </div>
              
              <div className="date-time-row">
                <Form.Item
                  name="endDate"
                  label="Thời gian kết thúc"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                  className="date-picker"
                >
                  <DatePicker 
                    format="DD/MM/YYYY" 
                    placeholder="Chọn ngày"
                    disabledDate={current => {
                      const startDate = form.getFieldValue('startDate');
                      return current && (current < moment().startOf('day') || 
                             (startDate && current < startDate));
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="endTime"
                  rules={[
                    { required: true, message: 'Vui lòng chọn giờ kết thúc' },
                    { validator: validateEndTime }
                  ]}
                  className="time-picker"
                >
                  <TimePicker format="HH:mm" placeholder="Chọn giờ" />
                </Form.Item>
              </div>
              
              <div className="date-time-row">
                <Form.Item
                  name="gradingDate"
                  label="Thời gian chấm bài"
                  className="date-picker"
                >
                  <DatePicker 
                    format="DD/MM/YYYY" 
                    placeholder="Chọn ngày (tùy chọn)"
                    disabledDate={current => {
                      const endDate = form.getFieldValue('endDate');
                      return current && (current < moment().startOf('day') || 
                             (endDate && current < endDate));
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="gradingTime"
                  rules={[
                    { validator: validateGradingTime }
                  ]}
                  className="time-picker"
                >
                  <TimePicker format="HH:mm" placeholder="Chọn giờ (tùy chọn)" />
                </Form.Item>
              </div>
            </div>
          </div>

          <Divider />

          {/* Duplication Options */}
          <div className="duplication-options">
            <h3>Tùy chọn nhân bản</h3>
            
            <Form.Item name="copyQuestions" valuePropName="checked">
              <Checkbox>Sao chép câu hỏi</Checkbox>
            </Form.Item>
            
            <Form.Item name="copyDisplaySettings" valuePropName="checked">
              <Checkbox>Sao chép cài đặt hiển thị</Checkbox>
            </Form.Item>
            
            <Form.Item name="copyParticipants" valuePropName="checked">
              <Checkbox>Sao chép đối tượng tham gia</Checkbox>
            </Form.Item>
            
            <Form.Item name="copyAttachments" valuePropName="checked">
              <Checkbox>Sao chép tệp đính kèm</Checkbox>
            </Form.Item>
            
            <Form.Item name="copyLogic" valuePropName="checked">
              <Checkbox>Sao chép logic phân nhánh</Checkbox>
            </Form.Item>
          </div>

          <Alert
            message="Lưu ý"
            description="Khảo sát mới sẽ được tạo ở trạng thái 'Nháp'. Bạn cần xem lại và xuất bản khảo sát trước khi nó được hiển thị cho người tham gia."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />

          {/* Form Actions */}
          <div className="form-actions">
            <Button onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              icon={<CopyOutlined />}
            >
              Nhân bản
            </Button>
          </div>
        </Form>
      ) : (
        <div className="loading-container">Đang tải...</div>
      )}
    </Modal>
  );
};

export default SurveyDuplicateModal;
