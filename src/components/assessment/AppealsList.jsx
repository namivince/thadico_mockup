import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Tag, Button, Space, Badge, 
  Typography, Select, Input, Row, Col, Modal, 
  Form, InputNumber, Upload, Divider, Alert, Checkbox
} from 'antd';
import { 
  SearchOutlined, FilterOutlined, 
  CheckCircleOutlined, CloseCircleOutlined,
  UploadOutlined, SaveOutlined, ClockCircleOutlined,
  FileOutlined, HomeOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './AppealsList.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

/**
 * Component danh sách phúc khảo
 * Theo spec: SCR_ASM_APPEAL_LIST
 */
const AppealsList = () => {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [currentAppeal, setCurrentAppeal] = useState(null);
  const [form] = Form.useForm();
  const [rejectForm] = Form.useForm();
  const [saveLoading, setSaveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [campaignInfo, setCampaignInfo] = useState(null);

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchAppeals();
  }, []);

  // Mock API call để lấy dữ liệu
  const fetchAppeals = async () => {
    setLoading(true);
    
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock campaign info
    setCampaignInfo({
      id: 'cmp_01',
      name: 'Đánh giá tay nghề Q4/2025',
      windowLeftDays: 5
    });
    
    // Mock appeals data
    const mockData = [
      {
        id: 'ap_01',
        empId: 'u_1001',
        empName: 'Nguyễn Văn A',
        oldScore: 7.0,
        reason: 'Bổ sung minh chứng về quy trình thao tác máy X',
        count: 1,
        limit: 2,
        status: 'new',
        windowLeftDays: 5,
        createdAt: '2025-10-05T10:30:00Z',
        attachments: [
          { uid: '1', name: 'minh_chung.pdf', status: 'done', url: '#' }
        ]
      },
      {
        id: 'ap_02',
        empId: 'u_1002',
        empName: 'Trần Thị B',
        oldScore: 6.5,
        reason: 'Đã hoàn thành đầy đủ các bước theo quy trình',
        count: 2,
        limit: 2,
        status: 'in_progress',
        windowLeftDays: 5,
        createdAt: '2025-10-04T14:15:00Z',
        attachments: [
          { uid: '1', name: 'quy_trinh.docx', status: 'done', url: '#' }
        ]
      },
      {
        id: 'ap_03',
        empId: 'u_1003',
        empName: 'Lê Văn C',
        oldScore: 8.0,
        reason: 'Đề nghị xem xét lại phần thực hành',
        count: 1,
        limit: 2,
        status: 'completed',
        windowLeftDays: 5,
        createdAt: '2025-10-03T09:45:00Z',
        newScore: 8.5,
        resolvedComment: 'Đã xem xét lại phần thực hành, điều chỉnh điểm',
        attachments: []
      },
      {
        id: 'ap_04',
        empId: 'u_1004',
        empName: 'Phạm Thị D',
        oldScore: 5.5,
        reason: 'Đề nghị xem xét lại câu hỏi số 3',
        count: 1,
        limit: 2,
        status: 'rejected',
        windowLeftDays: 5,
        createdAt: '2025-10-02T11:20:00Z',
        rejectReason: 'Không cung cấp đủ minh chứng',
        attachments: []
      }
    ];
    
    setAppeals(mockData);
    setLoading(false);
  };

  // Xử lý khi click vào nút xử lý
  const handleProcessClick = (appeal) => {
    setCurrentAppeal(appeal);
    
    // Reset form với giá trị hiện tại (nếu có)
    form.setFieldsValue({
      keepScore: appeal.newScore === undefined,
      newScore: appeal.newScore || appeal.oldScore,
      comment: appeal.resolvedComment || ''
    });
    
    setDetailModalVisible(true);
  };

  // Xử lý khi click vào nút từ chối
  const handleRejectClick = (appeal) => {
    setCurrentAppeal(appeal);
    rejectForm.resetFields();
    setRejectModalVisible(true);
  };

  // Xử lý khi cập nhật điểm phúc khảo
  const handleUpdateScore = () => {
    form.validateFields().then(values => {
      setSaveLoading(true);
      
      // Mock API call
      setTimeout(() => {
        // Cập nhật local state
        const updatedAppeals = appeals.map(item => {
          if (item.id === currentAppeal.id) {
            return {
              ...item,
              status: 'completed',
              newScore: values.keepScore ? item.oldScore : values.newScore,
              resolvedComment: values.comment
            };
          }
          return item;
        });
        
        setAppeals(updatedAppeals);
        setSaveLoading(false);
        setDetailModalVisible(false);
      }, 1500);
    });
  };

  // Xử lý khi từ chối phúc khảo
  const handleReject = () => {
    rejectForm.validateFields().then(values => {
      setRejectLoading(true);
      
      // Mock API call
      setTimeout(() => {
        // Cập nhật local state
        const updatedAppeals = appeals.map(item => {
          if (item.id === currentAppeal.id) {
            return {
              ...item,
              status: 'rejected',
              rejectReason: values.reason
            };
          }
          return item;
        });
        
        setAppeals(updatedAppeals);
        setRejectLoading(false);
        setRejectModalVisible(false);
      }, 1500);
    });
  };

  // Filter appeals theo trạng thái
  const filteredAppeals = filterStatus === 'all' 
    ? appeals 
    : appeals.filter(item => item.status === filterStatus);

  // Columns cho bảng appeals
  const columns = [
    {
      title: 'Học viên',
      dataIndex: 'empName',
      key: 'empName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>ID: {record.empId}</Text>
        </div>
      )
    },
    {
      title: 'Điểm cũ',
      dataIndex: 'oldScore',
      key: 'oldScore',
      render: score => score.toFixed(1)
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true
    },
    {
      title: 'Lần phúc khảo',
      key: 'appealCount',
      render: (_, record) => (
        <span>{record.count}/{record.limit}</span>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => moment(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color, text;
        switch(status) {
          case 'new':
            color = 'blue';
            text = 'Mới';
            break;
          case 'in_progress':
            color = 'orange';
            text = 'Đang xử lý';
            break;
          case 'completed':
            color = 'green';
            text = 'Hoàn tất';
            break;
          case 'rejected':
            color = 'red';
            text = 'Từ chối';
            break;
          default:
            color = 'default';
            text = status;
        }
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => {
        if (['completed', 'rejected'].includes(record.status)) {
          return (
            <Button 
              type="default" 
              onClick={() => handleProcessClick(record)}
            >
              Xem
            </Button>
          );
        }
        
        return (
          <Space>
            <Button 
              type="primary" 
              onClick={() => handleProcessClick(record)}
            >
              Xử lý
            </Button>
            <Button 
              danger 
              onClick={() => handleRejectClick(record)}
            >
              Từ chối
            </Button>
          </Space>
        );
      }
    }
  ];

  return (
    <div className="appeals-list-container">
      <div className="appeals-header">
        <div className="appeals-header-left">
          <Title level={3}>Danh sách phúc khảo</Title>
          
          {campaignInfo && (
            <Badge 
              count={
                <span>
                  <ClockCircleOutlined /> Cửa sổ phúc khảo còn {campaignInfo.windowLeftDays} ngày
                </span>
              } 
              style={{ backgroundColor: '#108ee9' }}
            />
          )}
        </div>
        
        <div className="appeals-header-right">
          <Button 
            type="primary" 
            icon={<HomeOutlined />} 
            onClick={() => window.location.href = '/dashboard'}
          >
            Về Dashboard
          </Button>
        </div>
      </div>
      
      <Card className="appeals-filter-card">
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Space>
              <Select 
                defaultValue="all" 
                style={{ width: 150 }} 
                onChange={setFilterStatus}
                placeholder="Trạng thái"
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="new">Mới</Option>
                <Option value="in_progress">Đang xử lý</Option>
                <Option value="completed">Hoàn tất</Option>
                <Option value="rejected">Từ chối</Option>
              </Select>
              
              <Input 
                placeholder="Tìm theo tên học viên" 
                prefix={<SearchOutlined />} 
                style={{ width: 200 }}
              />
            </Space>
          </Col>
          <Col>
            <Button 
              icon={<FilterOutlined />} 
              onClick={fetchAppeals}
              loading={loading}
            >
              Làm mới
            </Button>
          </Col>
        </Row>
      </Card>
      
      <Table 
        columns={columns} 
        dataSource={filteredAppeals} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="appeals-table"
      />
      
      {/* Modal xử lý phúc khảo */}
      <Modal
        title={
          <div>
            <div>Xử lý phúc khảo</div>
            <Text type="secondary">
              {currentAppeal?.empName} - Lần {currentAppeal?.count}/{currentAppeal?.limit}
            </Text>
          </div>
        }
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={
          currentAppeal?.status === 'completed' || currentAppeal?.status === 'rejected' ? (
            <Button type="primary" onClick={() => setDetailModalVisible(false)}>
              Đóng
            </Button>
          ) : (
            <div>
              <Button onClick={() => setDetailModalVisible(false)}>
                Hủy
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={handleUpdateScore}
                loading={saveLoading}
              >
                Cập nhật
              </Button>
            </div>
          )
        }
        width={700}
      >
        <div className="appeal-detail">
          <Card title="Thông tin phúc khảo" className="appeal-info-card">
            <Row gutter={16}>
              <Col span={12}>
                <div className="info-item">
                  <strong>Điểm cũ:</strong> {currentAppeal?.oldScore?.toFixed(1)}
                </div>
              </Col>
              <Col span={12}>
                <div className="info-item">
                  <strong>Ngày tạo:</strong> {currentAppeal && moment(currentAppeal.createdAt).format('DD/MM/YYYY HH:mm')}
                </div>
              </Col>
            </Row>
            
            <div className="info-item">
              <strong>Lý do phúc khảo:</strong>
              <Paragraph>{currentAppeal?.reason}</Paragraph>
            </div>
            
            {currentAppeal?.attachments?.length > 0 && (
              <div className="info-item">
                <strong>File đính kèm:</strong>
                <br />
                {currentAppeal.attachments.map(file => (
                  <Button key={file.uid} type="link" icon={<FileOutlined />}>
                    {file.name}
                  </Button>
                ))}
              </div>
            )}
          </Card>
          
          <Divider />
          
          {(currentAppeal?.status === 'completed' || currentAppeal?.status === 'rejected') ? (
            <Card 
              title="Kết quả xử lý" 
              className="appeal-result-card"
              type="inner"
            >
              {currentAppeal?.status === 'completed' ? (
                <>
                  <div className="info-item">
                    <strong>Điểm mới:</strong> {currentAppeal?.newScore?.toFixed(1)}
                    {currentAppeal?.newScore !== currentAppeal?.oldScore && (
                      <Tag color="green" style={{ marginLeft: 8 }}>
                        {currentAppeal?.newScore > currentAppeal?.oldScore ? '+' : ''}
                        {(currentAppeal?.newScore - currentAppeal?.oldScore).toFixed(1)}
                      </Tag>
                    )}
                  </div>
                  <div className="info-item">
                    <strong>Nhận xét:</strong>
                    <Paragraph>{currentAppeal?.resolvedComment}</Paragraph>
                  </div>
                </>
              ) : (
                <div className="info-item">
                  <strong>Lý do từ chối:</strong>
                  <Paragraph>{currentAppeal?.rejectReason}</Paragraph>
                </div>
              )}
            </Card>
          ) : (
            <Form 
              form={form} 
              layout="vertical"
              disabled={currentAppeal?.status === 'completed' || currentAppeal?.status === 'rejected'}
              initialValues={{
                keepScore: true
              }}
            >
              <Form.Item name="keepScore" valuePropName="checked">
                <Checkbox>Giữ nguyên điểm</Checkbox>
              </Form.Item>
              
              <Form.Item 
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.keepScore !== currentValues.keepScore}
              >
                {({ getFieldValue }) => (
                  !getFieldValue('keepScore') && (
                    <Form.Item 
                      name="newScore" 
                      label="Điểm mới" 
                      rules={[{ required: true, message: 'Vui lòng nhập điểm mới' }]}
                    >
                      <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>
                  )
                )}
              </Form.Item>
              
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
      </Modal>
      
      {/* Modal từ chối phúc khảo */}
      <Modal
        title="Từ chối phúc khảo"
        visible={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        onOk={handleReject}
        okText="Xác nhận từ chối"
        cancelText="Hủy"
        okButtonProps={{ danger: true, loading: rejectLoading }}
      >
        <Form form={rejectForm} layout="vertical">
          <Form.Item 
            name="reason" 
            label="Lý do từ chối" 
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
          >
            <TextArea rows={4} placeholder="Nhập lý do từ chối phúc khảo" />
          </Form.Item>
          
          <Alert
            message="Lưu ý"
            description="Việc từ chối phúc khảo sẽ được ghi lại và thông báo đến học viên."
            type="warning"
            showIcon
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AppealsList;
