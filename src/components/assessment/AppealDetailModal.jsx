import React, { useState } from 'react';
import { 
  Modal, Form, Input, Checkbox, InputNumber, 
  Upload, Button, Card, Row, Col, Tag, 
  Typography, Divider, Alert, Space
} from 'antd';
import { 
  UploadOutlined, SaveOutlined, 
  CloseCircleOutlined, FileOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './AppealDetailModal.css';

const { TextArea } = Input;
const { Text, Paragraph, Title } = Typography;

/**
 * Component modal xử lý phúc khảo
 * Theo spec: SCR_APPEAL_DETAIL_MODAL
 */
const AppealDetailModal = ({ 
  visible, 
  appeal, 
  onCancel, 
  onResolve, 
  onReject,
  loading = false
}) => {
  const [form] = Form.useForm();
  const [keepScore, setKeepScore] = useState(true);
  
  // Reset form khi modal mở
  React.useEffect(() => {
    if (visible && appeal) {
      form.setFieldsValue({
        keepScore: true,
        newScore: appeal.oldScore,
        comment: ''
      });
      setKeepScore(true);
    }
  }, [visible, appeal, form]);
  
  // Xử lý khi submit form
  const handleSubmit = () => {
    form.validateFields().then(values => {
      onResolve({
        appealId: appeal.id,
        newScore: values.keepScore ? appeal.oldScore : values.newScore,
        comment: values.comment,
        files: values.attachments?.fileList
      });
    });
  };
  
  // Render nội dung modal
  const renderContent = () => {
    if (!appeal) return null;
    
    const isReadOnly = appeal.status === 'completed' || appeal.status === 'rejected';
    
    return (
      <div className="appeal-detail-content">
        <Card title="Thông tin phúc khảo" className="appeal-info-card">
          <Row gutter={16}>
            <Col span={12}>
              <div className="info-item">
                <strong>Học viên:</strong> {appeal.empName}
              </div>
              <div className="info-item">
                <strong>Điểm cũ:</strong> {appeal.oldScore?.toFixed(1)}
              </div>
              <div className="info-item">
                <strong>Lần phúc khảo:</strong> {appeal.count}/{appeal.limit}
              </div>
            </Col>
            <Col span={12}>
              <div className="info-item">
                <strong>Ngày tạo:</strong> {moment(appeal.createdAt).format('DD/MM/YYYY HH:mm')}
              </div>
              <div className="info-item">
                <strong>Trạng thái:</strong> {' '}
                <Tag color={
                  appeal.status === 'new' ? 'blue' : 
                  appeal.status === 'in_progress' ? 'orange' :
                  appeal.status === 'completed' ? 'green' : 'red'
                }>
                  {appeal.status === 'new' ? 'Mới' : 
                   appeal.status === 'in_progress' ? 'Đang xử lý' :
                   appeal.status === 'completed' ? 'Hoàn tất' : 'Từ chối'}
                </Tag>
              </div>
            </Col>
          </Row>
          
          <div className="info-item">
            <strong>Lý do phúc khảo:</strong>
            <Paragraph>{appeal.reason}</Paragraph>
          </div>
          
          {appeal.attachments?.length > 0 && (
            <div className="info-item">
              <strong>File đính kèm:</strong>
              <br />
              <Space>
                {appeal.attachments.map((file, index) => (
                  <Button key={index} type="link" icon={<FileOutlined />}>
                    {file.name}
                  </Button>
                ))}
              </Space>
            </div>
          )}
        </Card>
        
        <Divider />
        
        {isReadOnly ? (
          <Card 
            title="Kết quả xử lý" 
            className="appeal-result-card"
            type="inner"
          >
            {appeal.status === 'completed' ? (
              <>
                <div className="info-item">
                  <strong>Điểm mới:</strong> {appeal.newScore?.toFixed(1)}
                  {appeal.newScore !== appeal.oldScore && (
                    <Tag color="green" style={{ marginLeft: 8 }}>
                      {appeal.newScore > appeal.oldScore ? '+' : ''}
                      {(appeal.newScore - appeal.oldScore).toFixed(1)}
                    </Tag>
                  )}
                </div>
                <div className="info-item">
                  <strong>Nhận xét:</strong>
                  <Paragraph>{appeal.resolvedComment}</Paragraph>
                </div>
              </>
            ) : (
              <div className="info-item">
                <strong>Lý do từ chối:</strong>
                <Paragraph>{appeal.rejectReason}</Paragraph>
              </div>
            )}
          </Card>
        ) : (
          <Form 
            form={form} 
            layout="vertical"
            initialValues={{
              keepScore: true,
              newScore: appeal.oldScore
            }}
          >
            <Form.Item 
              name="keepScore" 
              valuePropName="checked"
              onChange={(e) => setKeepScore(e.target.checked)}
            >
              <Checkbox>Giữ nguyên điểm</Checkbox>
            </Form.Item>
            
            {!keepScore && (
              <Form.Item 
                name="newScore" 
                label="Điểm mới" 
                rules={[{ required: !keepScore, message: 'Vui lòng nhập điểm mới' }]}
              >
                <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
              </Form.Item>
            )}
            
            <Form.Item name="comment" label="Nhận xét">
              <TextArea rows={4} placeholder="Nhập nhận xét về việc phúc khảo" />
            </Form.Item>
            
            <Form.Item name="attachments" label="Đính kèm (nếu có)">
              <Upload 
                listType="text"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>
                  Tải lên file
                </Button>
              </Upload>
            </Form.Item>
            
            <Alert
              message="Lưu ý"
              description="Việc cập nhật điểm sẽ được ghi lại trong lịch sử phúc khảo và thông báo đến học viên."
              type="info"
              showIcon
            />
          </Form>
        )}
      </div>
    );
  };

  return (
    <Modal
      title={
        <div>
          <div>Xử lý phúc khảo</div>
          {appeal && (
            <Text type="secondary">
              {appeal.empName} - Lần {appeal.count}/{appeal.limit}
            </Text>
          )}
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={
        appeal?.status === 'completed' || appeal?.status === 'rejected' ? (
          <Button type="primary" onClick={onCancel}>
            Đóng
          </Button>
        ) : (
          <div>
            <Button onClick={onCancel}>
              Hủy
            </Button>
            <Button 
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => onReject(appeal?.id)}
              style={{ marginLeft: 8 }}
            >
              Từ chối
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSubmit}
              loading={loading}
              style={{ marginLeft: 8 }}
            >
              Cập nhật
            </Button>
          </div>
        )
      }
      width={700}
    >
      {renderContent()}
    </Modal>
  );
};

export default AppealDetailModal;
