import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Space, Tag, Card, Typography, 
  Tooltip, Modal, message, Input, Badge, Dropdown,
  Menu, Popconfirm, Progress, Row, Col, Statistic
} from 'antd';
import { 
  PlusOutlined, EditOutlined, EyeOutlined, 
  CheckCircleOutlined, CloseCircleOutlined, 
  BarChartOutlined, DashboardOutlined, 
  SearchOutlined, FilterOutlined, 
  MoreOutlined, ExportOutlined,
  FileProtectOutlined, LockOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './RoundList.css';

const { Title, Text } = Typography;
const { Search } = Input;

const RoundList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    running: 0,
    grading: 0,
    published: 0,
    closed: 0
  });

  // Fetch rounds data
  useEffect(() => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      const mockRounds = [
        {
          id: 1,
          name: 'Đánh giá năng lực Q3/2025',
          startDate: '2025-07-01',
          endDate: '2025-07-15',
          objective: 'Đánh giá năng lực nhân viên quý 3',
          status: 'completed',
          creator: 'Nguyễn Phúc Vinh',
          createdAt: '2025-06-15',
          completionRate: 100,
          participantCount: 120,
          submissionCount: 120,
          gradingCount: 120,
          resultsPublished: true
        },
        {
          id: 2,
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
        },
        {
          id: 3,
          name: 'Đánh giá năng lực Q4/2025',
          startDate: '2025-10-01',
          endDate: '2025-10-15',
          objective: 'Đánh giá năng lực nhân viên quý 4',
          status: 'draft',
          creator: 'Nguyễn Phúc Vinh',
          createdAt: '2025-09-15',
          completionRate: 0,
          participantCount: 0,
          submissionCount: 0,
          gradingCount: 0,
          resultsPublished: false
        },
        {
          id: 4,
          name: 'Đánh giá KPI Q4/2025',
          startDate: '2025-10-20',
          endDate: '2025-10-31',
          objective: 'Đánh giá KPI nhân viên quý 4',
          status: 'draft',
          creator: 'Nguyễn Phúc Vinh',
          createdAt: '2025-09-20',
          completionRate: 0,
          participantCount: 0,
          submissionCount: 0,
          gradingCount: 0,
          resultsPublished: false
        },
        {
          id: 5,
          name: 'Đánh giá năng lực Q2/2025',
          startDate: '2025-04-01',
          endDate: '2025-04-15',
          objective: 'Đánh giá năng lực nhân viên quý 2',
          status: 'grading',
          creator: 'Nguyễn Phúc Vinh',
          createdAt: '2025-03-15',
          completionRate: 85,
          participantCount: 130,
          submissionCount: 130,
          gradingCount: 110,
          resultsPublished: false
        }
      ];
      
      setRounds(mockRounds);
      
      // Calculate stats
      const stats = {
        total: mockRounds.length,
        draft: mockRounds.filter(r => r.status === 'draft').length,
        running: mockRounds.filter(r => r.status === 'running').length,
        grading: mockRounds.filter(r => r.status === 'grading').length,
        published: mockRounds.filter(r => r.status === 'completed' && r.resultsPublished).length,
        closed: mockRounds.filter(r => r.status === 'completed').length
      };
      
      setStats(stats);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle publish round
  const handlePublish = (roundId) => {
    // Mock API call
    message.loading('Đang công bố vòng đánh giá...', 1)
      .then(() => {
        setRounds(prev => 
          prev.map(round => 
            round.id === roundId ? { ...round, status: 'running' } : round
          )
        );
        message.success('Đã công bố vòng đánh giá thành công');
      });
  };

  // Handle close round
  const handleClose = (roundId) => {
    // Mock API call
    message.loading('Đang đóng vòng đánh giá...', 1)
      .then(() => {
        setRounds(prev => 
          prev.map(round => 
            round.id === roundId ? { ...round, status: 'completed' } : round
          )
        );
        message.success('Đã đóng vòng đánh giá thành công');
      });
  };

  // Handle publish results
  const handlePublishResults = (roundId) => {
    // Mock API call
    message.loading('Đang công bố kết quả...', 1)
      .then(() => {
        setRounds(prev => 
          prev.map(round => 
            round.id === roundId ? { ...round, resultsPublished: true } : round
          )
        );
        message.success('Đã công bố kết quả thành công');
      });
  };

  // Filter rounds by search text and status
  const filteredRounds = rounds.filter(round => {
    const matchSearch = round.name.toLowerCase().includes(searchText.toLowerCase()) ||
                       round.objective.toLowerCase().includes(searchText.toLowerCase()) ||
                       round.creator.toLowerCase().includes(searchText.toLowerCase());
    
    const matchStatus = filterStatus === 'all' || round.status === filterStatus;
    
    return matchSearch && matchStatus;
  });

  // Get status tag
  const getStatusTag = (status) => {
    switch (status) {
      case 'draft':
        return <Tag color="default">Nháp</Tag>;
      case 'running':
        return <Tag color="processing">Đang chạy</Tag>;
      case 'grading':
        return <Tag color="warning">Đang chấm</Tag>;
      case 'completed':
        return <Tag color="success">Hoàn thành</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Get action menu for a round
  const getActionMenu = (record) => {
    const items = [
      {
        key: 'view',
        label: 'Xem chi tiết',
        icon: <EyeOutlined />,
        onClick: () => navigate(`/assessment/rounds/${record.id}`)
      },
      {
        key: 'monitor',
        label: 'Theo dõi tiến độ',
        icon: <DashboardOutlined />,
        onClick: () => navigate(`/assessment/rounds/${record.id}/board`)
      }
    ];
    
    if (record.status === 'draft') {
      items.push(
        {
          key: 'edit',
          label: 'Chỉnh sửa',
          icon: <EditOutlined />,
          onClick: () => navigate(`/assessment/rounds/${record.id}/edit`)
        },
        {
          key: 'publish',
          label: 'Công bố',
          icon: <CheckCircleOutlined />,
          onClick: () => handlePublish(record.id)
        }
      );
    }
    
    if (record.status === 'running') {
      items.push(
        {
          key: 'close',
          label: 'Đóng input & chấm',
          icon: <LockOutlined />,
          onClick: () => handleClose(record.id)
        }
      );
    }
    
    if (record.status === 'completed' && !record.resultsPublished) {
      items.push(
        {
          key: 'publish-results',
          label: 'Công bố kết quả',
          icon: <FileProtectOutlined />,
          onClick: () => handlePublishResults(record.id)
        }
      );
    }
    
    if (record.resultsPublished) {
      items.push(
        {
          key: 'results',
          label: 'Xem kết quả',
          icon: <BarChartOutlined />,
          onClick: () => navigate(`/assessment/rounds/${record.id}/results`)
        },
        {
          key: 'appeals',
          label: 'Phúc khảo',
          icon: <ExportOutlined />,
          onClick: () => navigate(`/assessment/rounds/${record.id}/appeals`)
        }
      );
    }
    
    return (
      <Menu items={items} />
    );
  };

  // Table columns
  const columns = [
    {
      title: 'Tên vòng đánh giá',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <Link to={`/assessment/rounds/${record.id}`}>{text}</Link>
          {record.resultsPublished && (
            <Badge 
              count="Đã công bố" 
              style={{ backgroundColor: '#52c41a', marginLeft: 8 }} 
            />
          )}
        </div>
      )
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_, record) => (
        <div>
          <div>{moment(record.startDate).format('DD/MM/YYYY')} - {moment(record.endDate).format('DD/MM/YYYY')}</div>
          <Text type="secondary">Tạo: {moment(record.createdAt).format('DD/MM/YYYY')}</Text>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Tiến độ',
      key: 'progress',
      render: (_, record) => (
        <div>
          <Progress percent={record.completionRate} size="small" />
          <div className="progress-stats">
            <Text type="secondary">{record.submissionCount}/{record.participantCount} người</Text>
            {record.status === 'grading' && (
              <Text type="secondary">{record.gradingCount}/{record.submissionCount} đã chấm</Text>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Người tạo',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Dropdown 
          overlay={getActionMenu(record)} 
          trigger={['click']}
          placement="bottomRight"
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  return (
    <div className="round-list-container">
      <div className="round-list-header">
        <div className="round-list-title">
          <Title level={2}>Vòng đánh giá</Title>
        </div>
        <div className="round-list-actions">
          <Space>
            <Button 
              icon={<HomeOutlined />} 
              onClick={() => navigate('/dashboard')}
            >
              Trở về Dashboard
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => navigate('/assessment/rounds/new')}
            >
              Tạo vòng đánh giá
            </Button>
          </Space>
        </div>
      </div>
      
      <Row gutter={16} className="round-stats">
        <Col span={4}>
          <Card>
            <Statistic 
              title="Tổng số" 
              value={stats.total} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Nháp" 
              value={stats.draft} 
              valueStyle={{ color: '#8c8c8c' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đang chạy" 
              value={stats.running} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đang chấm" 
              value={stats.grading} 
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đã công bố" 
              value={stats.published} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đã đóng" 
              value={stats.closed} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>
      
      <Card className="round-list-card">
        <div className="round-list-filters">
          <Search
            placeholder="Tìm kiếm theo tên, mục tiêu, người tạo..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={value => setSearchText(value)}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          
          <Space>
            <Text>Trạng thái:</Text>
            <Button.Group>
              <Button 
                type={filterStatus === 'all' ? 'primary' : 'default'}
                onClick={() => setFilterStatus('all')}
              >
                Tất cả
              </Button>
              <Button 
                type={filterStatus === 'draft' ? 'primary' : 'default'}
                onClick={() => setFilterStatus('draft')}
              >
                Nháp
              </Button>
              <Button 
                type={filterStatus === 'running' ? 'primary' : 'default'}
                onClick={() => setFilterStatus('running')}
              >
                Đang chạy
              </Button>
              <Button 
                type={filterStatus === 'grading' ? 'primary' : 'default'}
                onClick={() => setFilterStatus('grading')}
              >
                Đang chấm
              </Button>
              <Button 
                type={filterStatus === 'completed' ? 'primary' : 'default'}
                onClick={() => setFilterStatus('completed')}
              >
                Hoàn thành
              </Button>
            </Button.Group>
          </Space>
        </div>
        
        <Table
          dataSource={filteredRounds}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default RoundList;
