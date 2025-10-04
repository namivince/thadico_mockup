import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Space, Typography, Calendar, Badge, Row, Col, Tabs, Modal, List, Avatar } from 'antd';
import { 
  CalendarOutlined, 
  BookOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  EnvironmentOutlined,
  TeamOutlined,
  UserOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './MyClasses.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * Trang lớp học của tôi cho nhân viên
 */
const MyClasses = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [classDetailVisible, setClassDetailVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  
  // Mock data cho lớp học
  const myClasses = [
    { 
      id: 'c1', 
      title: 'Kỹ năng giao tiếp hiệu quả', 
      status: 'upcoming', 
      startDate: '2025-10-15', 
      endDate: '2025-10-16', 
      teacher: 'Nguyễn Văn K',
      location: 'Phòng đào tạo 301, Tòa nhà A',
      participants: 25,
      materials: [
        { name: 'Slide bài giảng.pdf', url: '#' },
        { name: 'Tài liệu tham khảo.docx', url: '#' }
      ]
    },
    { 
      id: 'c2', 
      title: 'Kỹ năng quản lý thời gian', 
      status: 'completed', 
      startDate: '2025-09-10', 
      endDate: '2025-09-11', 
      teacher: 'Trần Thị L',
      location: 'Phòng đào tạo 202, Tòa nhà B',
      participants: 20,
      materials: [
        { name: 'Slide bài giảng.pdf', url: '#' },
        { name: 'Bài tập thực hành.xlsx', url: '#' }
      ],
      certificate: { id: 'cert123', issueDate: '2025-09-15', url: '#' }
    },
    { 
      id: 'c3', 
      title: 'Kỹ năng lãnh đạo nhóm', 
      status: 'upcoming', 
      startDate: '2025-10-20', 
      endDate: '2025-10-22', 
      teacher: 'Lê Văn M',
      location: 'Phòng hội thảo, Tầng 5, Tòa nhà C',
      participants: 15,
      materials: [
        { name: 'Slide bài giảng.pdf', url: '#' },
        { name: 'Tài liệu tham khảo.docx', url: '#' }
      ]
    },
    { 
      id: 'c4', 
      title: 'Kỹ năng thuyết trình', 
      status: 'completed', 
      startDate: '2025-08-25', 
      endDate: '2025-08-26', 
      teacher: 'Phạm Thị N',
      location: 'Phòng đào tạo 301, Tòa nhà A',
      participants: 30,
      materials: [
        { name: 'Slide bài giảng.pdf', url: '#' },
        { name: 'Bài tập thực hành.docx', url: '#' }
      ],
      certificate: { id: 'cert456', issueDate: '2025-08-30', url: '#' }
    },
  ];
  
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
  
  // Xử lý khi click vào lớp học
  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setClassDetailVisible(true);
  };
  
  // Lọc dữ liệu theo tab
  const getFilteredData = () => {
    if (!myClasses) return [];
    
    return myClasses.filter(item => {
      if (activeTab === 'upcoming') {
        return item.status === 'upcoming';
      } else if (activeTab === 'completed') {
        return item.status === 'completed';
      }
      return true;
    });
  };
  
  // Tạo dữ liệu cho lịch
  const getCalendarData = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const classesOnDate = myClasses.filter(
      item => dateStr >= item.startDate && dateStr <= item.endDate
    );
    
    return classesOnDate.length ? (
      <ul className="calendar-events">
        {classesOnDate.map(item => (
          <li key={item.id} onClick={() => handleClassClick(item)}>
            {item.title}
          </li>
        ))}
      </ul>
    ) : null;
  };
  
  // Cột cho bảng
  const columns = [
    {
      title: 'Tên khóa học',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_, record) => (
        <Text type="secondary">
          {record.startDate} đến {record.endDate}
        </Text>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'upcoming') {
          return <Tag icon={<ClockCircleOutlined />} color="processing">Sắp diễn ra</Tag>;
        } else if (status === 'completed') {
          return <Tag icon={<CheckCircleOutlined />} color="success">Đã hoàn thành</Tag>;
        }
        return <Tag>{status}</Tag>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => handleClassClick(record)}
        >
          Chi tiết
        </Button>
      )
    }
  ];
  
  // Render cell lịch
  const dateCellRender = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const classesOnDate = myClasses.filter(
      item => dateStr >= item.startDate && dateStr <= item.endDate
    );
    
    return (
      <ul className="calendar-events">
        {classesOnDate.map(item => (
          <li key={item.id} onClick={() => handleClassClick(item)}>
            <Badge color={item.status === 'upcoming' ? 'blue' : 'green'} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="my-classes-container">
      <div className="page-header">
        <div>
          <Title level={2}>Lớp học của tôi</Title>
          <Text type="secondary">Danh sách các lớp học đã và sắp tham gia</Text>
        </div>
        <Button 
          type="primary" 
          icon={<FileExcelOutlined />}
        >
          Xuất báo cáo
        </Button>
      </div>
      
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane 
          tab={
            <Badge count={myClasses?.filter(item => item.status === 'upcoming').length || 0}>
              Sắp diễn ra
            </Badge>
          } 
          key="upcoming" 
        >
          <Card>
            <Table 
              columns={columns} 
              dataSource={getFilteredData()} 
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        <TabPane 
          tab={
            <Badge count={myClasses?.filter(item => item.status === 'completed').length || 0}>
              Đã hoàn thành
            </Badge>
          } 
          key="completed" 
        >
          <Card>
            <Table 
              columns={columns} 
              dataSource={getFilteredData()} 
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="Lịch học" key="calendar">
          <Card>
            <Calendar dateCellRender={dateCellRender} />
          </Card>
        </TabPane>
      </Tabs>
      
      {/* Modal chi tiết lớp học */}
      <Modal
        title={selectedClass?.title}
        open={classDetailVisible}
        onCancel={() => setClassDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setClassDetailVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {selectedClass && (
          <div className="class-detail">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div className="detail-item">
                      <BookOutlined /> <Text strong>Khóa học:</Text> {selectedClass.title}
                    </div>
                    <div className="detail-item">
                      <UserOutlined /> <Text strong>Giảng viên:</Text> {selectedClass.teacher}
                    </div>
                    <div className="detail-item">
                      <CalendarOutlined /> <Text strong>Thời gian:</Text> {selectedClass.startDate} đến {selectedClass.endDate}
                    </div>
                    <div className="detail-item">
                      <EnvironmentOutlined /> <Text strong>Địa điểm:</Text> {selectedClass.location}
                    </div>
                    <div className="detail-item">
                      <TeamOutlined /> <Text strong>Số học viên:</Text> {selectedClass.participants} người
                    </div>
                    
                    <Divider />
                    
                    <Title level={5}>Tài liệu học tập</Title>
                    <List
                      size="small"
                      bordered
                      dataSource={selectedClass.materials}
                      renderItem={item => (
                        <List.Item>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.name}
                          </a>
                        </List.Item>
                      )}
                    />
                    
                    {selectedClass.certificate && (
                      <>
                        <Divider />
                        <Title level={5}>Chứng chỉ</Title>
                        <Card size="small">
                          <Space>
                            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />
                            <div>
                              <Text strong>Chứng chỉ hoàn thành khóa học</Text>
                              <br />
                              <Text type="secondary">Cấp ngày: {selectedClass.certificate.issueDate}</Text>
                            </div>
                            <Button type="primary" size="small">
                              Xem chứng chỉ
                            </Button>
                          </Space>
                        </Card>
                      </>
                    )}
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

const Divider = () => <div style={{ borderTop: '1px solid #f0f0f0', margin: '16px 0' }} />;

export default MyClasses;
