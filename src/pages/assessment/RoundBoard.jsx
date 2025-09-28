import React, { useState, useEffect } from 'react';
import { 
  Card, Typography, Row, Col, Statistic, Progress, 
  Badge, Avatar, List, Tag, Button, Drawer, 
  Timeline, Space, Divider, Spin, Empty, Tooltip,
  Select, Input, Alert
} from 'antd';
import { 
  UserOutlined, CheckCircleOutlined, ClockCircleOutlined, 
  ExclamationCircleOutlined, SyncOutlined, 
  ArrowRightOutlined, FilterOutlined, SearchOutlined,
  InfoCircleOutlined, TeamOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import './RoundBoard.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const RoundBoard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [round, setRound] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({
    notStarted: 0,
    selfEvaluating: 0,
    managerGrading: 0,
    completed: 0
  });

  // Fetch round data
  useEffect(() => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      const mockRound = {
        id: parseInt(id),
        name: 'Đánh giá KPI Q3/2025',
        startDate: '2025-07-20',
        endDate: '2025-07-31',
        objective: 'Đánh giá KPI nhân viên quý 3',
        status: 'running',
        creator: 'Nguyễn Phúc Vinh',
        createdAt: '2025-07-10',
        completionRate: 65,
        participantCount: 150,
        submissionCount: 98,
        gradingCount: 45,
        resultsPublished: false
      };
      
      setRound(mockRound);
      
      // Generate mock participants
      const mockDepartments = ['Phòng Nhân sự', 'Phòng Kỹ thuật', 'Phòng Kinh doanh', 'Phòng Tài chính', 'Ban Giám đốc'];
      setDepartments(mockDepartments);
      
      const statuses = ['not_started', 'self_evaluating', 'manager_grading', 'completed'];
      const mockParticipants = Array(150).fill(0).map((_, index) => {
        const department = mockDepartments[Math.floor(Math.random() * mockDepartments.length)];
        const status = index < 30 ? 'not_started' : 
                      index < 80 ? 'self_evaluating' : 
                      index < 120 ? 'manager_grading' : 'completed';
        
        return {
          id: index + 1,
          name: `Nhân viên ${index + 1}`,
          department,
          position: index % 10 === 0 ? 'Trưởng phòng' : 
                   index % 5 === 0 ? 'Team Leader' : 'Nhân viên',
          status,
          progress: status === 'not_started' ? 0 : 
                   status === 'self_evaluating' ? 40 : 
                   status === 'manager_grading' ? 70 : 100,
          timeline: [
            { 
              time: moment().subtract(Math.floor(Math.random() * 5), 'days').format('YYYY-MM-DD HH:mm:ss'), 
              status: 'assigned', 
              note: 'Được thêm vào vòng đánh giá' 
            }
          ]
        };
      });
      
      // Add more timeline events based on status
      mockParticipants.forEach(p => {
        if (p.status !== 'not_started') {
          p.timeline.push({
            time: moment().subtract(Math.floor(Math.random() * 4), 'days').format('YYYY-MM-DD HH:mm:ss'),
            status: 'self_started',
            note: 'Bắt đầu tự đánh giá'
          });
        }
        
        if (p.status === 'self_evaluating' && Math.random() > 0.5) {
          p.timeline.push({
            time: moment().subtract(Math.floor(Math.random() * 3), 'days').format('YYYY-MM-DD HH:mm:ss'),
            status: 'self_saved',
            note: 'Lưu nháp tự đánh giá'
          });
        }
        
        if (p.status === 'manager_grading' || p.status === 'completed') {
          p.timeline.push({
            time: moment().subtract(Math.floor(Math.random() * 3), 'days').format('YYYY-MM-DD HH:mm:ss'),
            status: 'self_submitted',
            note: 'Hoàn thành tự đánh giá'
          });
          
          p.timeline.push({
            time: moment().subtract(Math.floor(Math.random() * 2), 'days').format('YYYY-MM-DD HH:mm:ss'),
            status: 'manager_started',
            note: 'Quản lý bắt đầu chấm điểm'
          });
        }
        
        if (p.status === 'completed') {
          p.timeline.push({
            time: moment().subtract(Math.floor(Math.random() * 1), 'days').format('YYYY-MM-DD HH:mm:ss'),
            status: 'manager_submitted',
            note: 'Quản lý hoàn thành chấm điểm'
          });
        }
        
        // Sort timeline by time
        p.timeline.sort((a, b) => moment(a.time).isBefore(moment(b.time)) ? -1 : 1);
      });
      
      setParticipants(mockParticipants);
      setFilteredParticipants(mockParticipants);
      
      // Calculate stats
      const stats = {
        notStarted: mockParticipants.filter(p => p.status === 'not_started').length,
        selfEvaluating: mockParticipants.filter(p => p.status === 'self_evaluating').length,
        managerGrading: mockParticipants.filter(p => p.status === 'manager_grading').length,
        completed: mockParticipants.filter(p => p.status === 'completed').length
      };
      
      setStats(stats);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Apply filters
  useEffect(() => {
    if (!participants.length) return;
    
    let filtered = [...participants];
    
    // Apply department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(p => p.department === filterDepartment);
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }
    
    // Apply search
    if (searchText) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.position.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredParticipants(filtered);
  }, [participants, filterDepartment, filterStatus, searchText]);

  // Setup polling for updates
  useEffect(() => {
    if (!round) return;
    
    const interval = setInterval(() => {
      // Mock update - randomly update some participants
      setParticipants(prev => {
        const updated = [...prev];
        
        // Randomly select 1-3 participants to update
        const count = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < count; i++) {
          const index = Math.floor(Math.random() * updated.length);
          const participant = updated[index];
          
          // Only update if not completed
          if (participant.status !== 'completed') {
            // Move to next status
            if (participant.status === 'not_started') {
              participant.status = 'self_evaluating';
              participant.progress = 40;
              participant.timeline.push({
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: 'self_started',
                note: 'Bắt đầu tự đánh giá'
              });
            } else if (participant.status === 'self_evaluating') {
              participant.status = 'manager_grading';
              participant.progress = 70;
              participant.timeline.push({
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: 'self_submitted',
                note: 'Hoàn thành tự đánh giá'
              });
              participant.timeline.push({
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: 'manager_started',
                note: 'Quản lý bắt đầu chấm điểm'
              });
            } else if (participant.status === 'manager_grading') {
              participant.status = 'completed';
              participant.progress = 100;
              participant.timeline.push({
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: 'manager_submitted',
                note: 'Quản lý hoàn thành chấm điểm'
              });
            }
          }
        }
        
        // Recalculate stats
        const stats = {
          notStarted: updated.filter(p => p.status === 'not_started').length,
          selfEvaluating: updated.filter(p => p.status === 'self_evaluating').length,
          managerGrading: updated.filter(p => p.status === 'manager_grading').length,
          completed: updated.filter(p => p.status === 'completed').length
        };
        
        setStats(stats);
        
        return updated;
      });
    }, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, [round]);

  // Show participant details
  const showParticipantDetails = (participant) => {
    setSelectedParticipant(participant);
    setDrawerVisible(true);
  };

  // Get status tag
  const getStatusTag = (status) => {
    switch (status) {
      case 'not_started':
        return <Tag icon={<ClockCircleOutlined />} color="default">Chưa bắt đầu</Tag>;
      case 'self_evaluating':
        return <Tag icon={<SyncOutlined spin />} color="processing">Đang tự đánh giá</Tag>;
      case 'manager_grading':
        return <Tag icon={<ExclamationCircleOutlined />} color="warning">Đang chấm điểm</Tag>;
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">Hoàn thành</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Get timeline item color
  const getTimelineItemColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'blue';
      case 'self_started':
      case 'self_saved':
        return 'processing';
      case 'self_submitted':
        return 'green';
      case 'manager_started':
        return 'orange';
      case 'manager_submitted':
        return 'green';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return (
      <div className="round-board-loading">
        <Spin size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </div>
    );
  }

  if (!round) {
    return (
      <div className="round-board-empty">
        <Empty description="Không tìm thấy vòng đánh giá" />
        <Button type="primary">
          <Link to="/assessment/rounds">Quay lại danh sách</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="round-board-container">
      <div className="round-board-header">
        <div className="round-board-title">
          <Title level={2}>{round.name}</Title>
          <Text>{moment(round.startDate).format('DD/MM/YYYY')} - {moment(round.endDate).format('DD/MM/YYYY')}</Text>
        </div>
        <div className="round-board-actions">
          <Space>
            <Button>
              <Link to={`/assessment/rounds/${round.id}`}>Chi tiết</Link>
            </Button>
            <Button type="primary">
              <Link to="/assessment/rounds">Quay lại danh sách</Link>
            </Button>
          </Space>
        </div>
      </div>
      
      <Row gutter={16} className="round-board-stats">
        <Col span={6}>
          <Card>
            <Statistic 
              title="Tổng số người tham gia" 
              value={round.participantCount} 
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress 
              percent={Math.round((round.submissionCount / round.participantCount) * 100)} 
              size="small" 
              style={{ marginTop: 8 }}
            />
            <div className="stat-detail">
              <Text type="secondary">{round.submissionCount} người đã hoàn thành</Text>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Chưa bắt đầu" 
              value={stats.notStarted} 
              valueStyle={{ color: '#8c8c8c' }}
              suffix={<Text type="secondary">người</Text>}
            />
            <Progress 
              percent={Math.round((stats.notStarted / round.participantCount) * 100)} 
              size="small" 
              status="normal"
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Đang tự đánh giá" 
              value={stats.selfEvaluating} 
              valueStyle={{ color: '#1890ff' }}
              suffix={<Text type="secondary">người</Text>}
            />
            <Progress 
              percent={Math.round((stats.selfEvaluating / round.participantCount) * 100)} 
              size="small" 
              status="active"
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Đang chấm điểm" 
              value={stats.managerGrading} 
              valueStyle={{ color: '#faad14' }}
              suffix={<Text type="secondary">người</Text>}
            />
            <Progress 
              percent={Math.round((stats.managerGrading / round.participantCount) * 100)} 
              size="small" 
              status="active"
              strokeColor="#faad14"
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
      </Row>
      
      <Alert
        message="Cập nhật tự động"
        description="Bảng theo dõi đang được cập nhật tự động mỗi 5 giây"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <Row gutter={16} className="round-board-content">
        <Col span={6}>
          <Card 
            title={
              <div className="board-column-header">
                <span>Chưa bắt đầu</span>
                <Badge count={stats.notStarted} style={{ backgroundColor: '#8c8c8c' }} />
              </div>
            } 
            className="board-column"
          >
            <div className="board-column-content">
              {filteredParticipants.filter(p => p.status === 'not_started').length > 0 ? (
                <List
                  dataSource={filteredParticipants.filter(p => p.status === 'not_started')}
                  renderItem={item => (
                    <List.Item 
                      className="board-item"
                      onClick={() => showParticipantDetails(item)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                        description={
                          <div>
                            <div>{item.position}</div>
                            <div>{item.department}</div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Card>
        </Col>
        
        <Col span={6}>
          <Card 
            title={
              <div className="board-column-header">
                <span>Đang tự đánh giá</span>
                <Badge count={stats.selfEvaluating} style={{ backgroundColor: '#1890ff' }} />
              </div>
            } 
            className="board-column"
          >
            <div className="board-column-content">
              {filteredParticipants.filter(p => p.status === 'self_evaluating').length > 0 ? (
                <List
                  dataSource={filteredParticipants.filter(p => p.status === 'self_evaluating')}
                  renderItem={item => (
                    <List.Item 
                      className="board-item"
                      onClick={() => showParticipantDetails(item)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                        description={
                          <div>
                            <div>{item.position}</div>
                            <div>{item.department}</div>
                            <Progress percent={40} size="small" status="active" />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Card>
        </Col>
        
        <Col span={6}>
          <Card 
            title={
              <div className="board-column-header">
                <span>Đang chấm điểm</span>
                <Badge count={stats.managerGrading} style={{ backgroundColor: '#faad14' }} />
              </div>
            } 
            className="board-column"
          >
            <div className="board-column-content">
              {filteredParticipants.filter(p => p.status === 'manager_grading').length > 0 ? (
                <List
                  dataSource={filteredParticipants.filter(p => p.status === 'manager_grading')}
                  renderItem={item => (
                    <List.Item 
                      className="board-item"
                      onClick={() => showParticipantDetails(item)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                        description={
                          <div>
                            <div>{item.position}</div>
                            <div>{item.department}</div>
                            <Progress percent={70} size="small" status="active" strokeColor="#faad14" />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Card>
        </Col>
        
        <Col span={6}>
          <Card 
            title={
              <div className="board-column-header">
                <span>Hoàn thành</span>
                <Badge count={stats.completed} style={{ backgroundColor: '#52c41a' }} />
              </div>
            } 
            className="board-column"
          >
            <div className="board-column-content">
              {filteredParticipants.filter(p => p.status === 'completed').length > 0 ? (
                <List
                  dataSource={filteredParticipants.filter(p => p.status === 'completed')}
                  renderItem={item => (
                    <List.Item 
                      className="board-item"
                      onClick={() => showParticipantDetails(item)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                        description={
                          <div>
                            <div>{item.position}</div>
                            <div>{item.department}</div>
                            <Progress percent={100} size="small" status="success" />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Card>
        </Col>
      </Row>
      
      <Card className="round-board-filters">
        <div className="filter-container">
          <Space>
            <div className="filter-item">
              <Text>Phòng ban:</Text>
              <Select 
                value={filterDepartment} 
                onChange={setFilterDepartment}
                style={{ width: 200 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả phòng ban</Option>
                {departments.map(dept => (
                  <Option key={dept} value={dept}>{dept}</Option>
                ))}
              </Select>
            </div>
            
            <div className="filter-item">
              <Text>Trạng thái:</Text>
              <Select 
                value={filterStatus} 
                onChange={setFilterStatus}
                style={{ width: 200 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="not_started">Chưa bắt đầu</Option>
                <Option value="self_evaluating">Đang tự đánh giá</Option>
                <Option value="manager_grading">Đang chấm điểm</Option>
                <Option value="completed">Hoàn thành</Option>
              </Select>
            </div>
            
            <div className="filter-item">
              <Search
                placeholder="Tìm kiếm theo tên, vị trí..."
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
            </div>
          </Space>
        </div>
      </Card>
      
      <Drawer
        title="Chi tiết tiến độ"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
      >
        {selectedParticipant && (
          <div className="participant-details">
            <div className="participant-header">
              <Avatar size={64} icon={<UserOutlined />} />
              <div className="participant-info">
                <Title level={4}>{selectedParticipant.name}</Title>
                <div>{selectedParticipant.position}</div>
                <div>
                  <ApartmentOutlined /> {selectedParticipant.department}
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div className="participant-status">
              <div className="status-item">
                <Text>Trạng thái:</Text>
                {getStatusTag(selectedParticipant.status)}
              </div>
              
              <div className="status-item">
                <Text>Tiến độ:</Text>
                <Progress percent={selectedParticipant.progress} />
              </div>
            </div>
            
            <Divider orientation="left">Nhật ký hoạt động</Divider>
            
            <Timeline>
              {selectedParticipant.timeline.map((item, index) => (
                <Timeline.Item 
                  key={index} 
                  color={getTimelineItemColor(item.status)}
                >
                  <div className="timeline-item">
                    <div className="timeline-content">{item.note}</div>
                    <div className="timeline-time">{moment(item.time).format('DD/MM/YYYY HH:mm:ss')}</div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default RoundBoard;
