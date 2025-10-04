import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Space, Typography, Tabs, Badge, Tooltip, Modal, Form, Input } from 'antd';
import { 
  FormOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  SendOutlined,
  EyeOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { surveyResponses } from '../../mock/dashboardData';
import './MySurveys.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

/**
 * Trang khảo sát của tôi cho nhân viên
 */
const MySurveys = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [form] = Form.useForm();
  
  // Load data
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setLoading(true);
      // Trong thực tế, sẽ gọi API để lấy dữ liệu
      // Giả lập delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };
  
  // Xử lý khi thay đổi tab
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  // Xử lý khi click vào nút từ chối
  const handleDeclineClick = (survey) => {
    setSelectedSurvey(survey);
    setDeclineModalVisible(true);
  };
  
  // Xử lý khi submit form từ chối
  const handleDeclineSubmit = (values) => {
    console.log('Decline reason:', values.reason);
    setDeclineModalVisible(false);
    form.resetFields();
    // Trong thực tế, sẽ gọi API để cập nhật trạng thái
  };
  
  // Xử lý khi click vào nút làm khảo sát
  const handleTakeSurvey = (survey) => {
    // Trong thực tế, sẽ điều hướng đến trang làm khảo sát
    console.log('Taking survey:', survey);
  };
  
  // Xử lý khi click vào nút xem kết quả
  const handleViewResults = (survey) => {
    // Trong thực tế, sẽ điều hướng đến trang xem kết quả
    console.log('Viewing results:', survey);
  };
  
  // Lọc dữ liệu theo tab
  const getFilteredData = () => {
    if (!surveyResponses) return [];
    
    return surveyResponses.filter(item => {
      if (activeTab === 'pending') {
        return item.status === 'pending';
      } else if (activeTab === 'responded') {
        return item.status === 'responded';
      } else if (activeTab === 'declined') {
        return item.status === 'declined';
      }
      return true;
    });
  };
  
  // Cột cho bảng
  const columns = [
    {
      title: 'Tên khảo sát',
      dataIndex: 'surveyId',
      key: 'surveyId',
      render: (surveyId) => {
        // Trong thực tế, sẽ lấy tên khảo sát từ API
        const surveyNames = {
          's1': 'Khảo sát nhu cầu đào tạo Q4/2025',
          's2': 'Khảo sát đánh giá khóa học "Kỹ năng lãnh đạo"',
          's3': 'Khảo sát đánh giá giảng viên Q3/2025',
          's4': 'Khảo sát nhu cầu đào tạo kỹ năng mềm',
        };
        return surveyNames[surveyId] || surveyId;
      }
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'responded') {
          return <Tag icon={<CheckCircleOutlined />} color="success">Đã trả lời</Tag>;
        } else if (status === 'pending') {
          return <Tag icon={<ClockCircleOutlined />} color="processing">Chưa trả lời</Tag>;
        } else if (status === 'declined') {
          return <Tag icon={<ExclamationCircleOutlined />} color="error">Đã từ chối</Tag>;
        }
        return <Tag>{status}</Tag>;
      }
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_, record) => {
        if (record.status === 'responded') {
          return <Text type="secondary">Đã trả lời: {record.respondedAt}</Text>;
        } else if (record.status === 'pending') {
          return <Text type="secondary">Nhắc nhở gần nhất: {record.lastRemindedAt || 'Chưa có'}</Text>;
        } else if (record.status === 'declined') {
          return <Text type="secondary">Từ chối: {record.declineReason}</Text>;
        }
        return null;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => {
        if (record.status === 'pending') {
          return (
            <Space>
              <Button 
                type="primary" 
                icon={<FormOutlined />}
                onClick={() => handleTakeSurvey(record)}
              >
                Làm khảo sát
              </Button>
              <Button 
                danger
                onClick={() => handleDeclineClick(record)}
              >
                Từ chối
              </Button>
            </Space>
          );
        } else if (record.status === 'responded') {
          return (
            <Button 
              icon={<EyeOutlined />}
              onClick={() => handleViewResults(record)}
            >
              Xem kết quả
            </Button>
          );
        } else if (record.status === 'declined') {
          return (
            <Button 
              icon={<FormOutlined />}
              onClick={() => handleTakeSurvey(record)}
            >
              Làm lại
            </Button>
          );
        }
        return null;
      }
    }
  ];
  
  return (
    <div className="my-surveys-container">
      <div className="page-header">
        <div>
          <Title level={2}>Khảo sát của tôi</Title>
          <Text type="secondary">Danh sách khảo sát cần phản hồi và đã phản hồi</Text>
        </div>
        <Button 
          type="primary" 
          icon={<FileExcelOutlined />}
        >
          Xuất báo cáo
        </Button>
      </div>
      
      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane 
            tab={
              <Badge count={surveyResponses?.filter(item => item.status === 'pending').length || 0}>
                Chưa trả lời
              </Badge>
            } 
            key="pending" 
          />
          <TabPane 
            tab={
              <Badge count={surveyResponses?.filter(item => item.status === 'responded').length || 0}>
                Đã trả lời
              </Badge>
            } 
            key="responded" 
          />
          <TabPane 
            tab={
              <Badge count={surveyResponses?.filter(item => item.status === 'declined').length || 0}>
                Đã từ chối
              </Badge>
            } 
            key="declined" 
          />
        </Tabs>
        
        <Table 
          columns={columns} 
          dataSource={getFilteredData()} 
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
      
      {/* Modal từ chối khảo sát */}
      <Modal
        title="Từ chối khảo sát"
        open={declineModalVisible}
        onCancel={() => setDeclineModalVisible(false)}
        onOk={() => form.submit()}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleDeclineSubmit}
        >
          <Form.Item
            name="reason"
            label="Lý do từ chối"
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
          >
            <TextArea rows={4} placeholder="Nhập lý do từ chối khảo sát..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MySurveys;
