import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Input, 
  Tag, 
  Space, 
  Typography,
  Avatar,
  Badge,
  Dropdown,
  Menu,
  Modal,
  message,
  Empty,
  Tooltip
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EyeOutlined, 
  EditOutlined, 
  CopyOutlined,
  DeleteOutlined,
  MoreOutlined,
  TrophyOutlined,
  StarOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './RubricList.css';

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;

/**
 * Trang danh sách bộ tiêu chí đánh giá
 */
const RubricList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - Bộ tiêu chí mẫu
  const rubrics = [
    {
      id: 1,
      name: 'Đánh giá năng lực nhân viên văn phòng',
      description: 'Bộ tiêu chí đánh giá toàn diện cho nhân viên văn phòng, bao gồm kỹ năng mềm và chuyên môn',
      category: 'Nhân viên',
      criteriaCount: 12,
      usageCount: 45,
      lastUsed: '2025-09-15',
      status: 'active',
      color: '#1890ff',
      icon: '💼'
    },
    {
      id: 2,
      name: 'Đánh giá năng lực quản lý cấp trung',
      description: 'Tiêu chí đánh giá kỹ năng lãnh đạo, quản lý team và ra quyết định cho cấp quản lý',
      category: 'Quản lý',
      criteriaCount: 15,
      usageCount: 28,
      lastUsed: '2025-09-20',
      status: 'active',
      color: '#722ed1',
      icon: '👔'
    },
    {
      id: 3,
      name: 'Đánh giá kỹ năng bán hàng',
      description: 'Bộ tiêu chí chuyên biệt cho đội ngũ kinh doanh và bán hàng',
      category: 'Kinh doanh',
      criteriaCount: 10,
      usageCount: 32,
      lastUsed: '2025-09-18',
      status: 'active',
      color: '#fa8c16',
      icon: '📊'
    },
    {
      id: 4,
      name: 'Đánh giá kỹ năng kỹ thuật IT',
      description: 'Tiêu chí đánh giá năng lực kỹ thuật cho đội ngũ IT và phát triển phần mềm',
      category: 'Kỹ thuật',
      criteriaCount: 18,
      usageCount: 15,
      lastUsed: '2025-09-10',
      status: 'active',
      color: '#13c2c2',
      icon: '💻'
    },
    {
      id: 5,
      name: 'Đánh giá năng lực Marketing',
      description: 'Bộ tiêu chí đánh giá kỹ năng marketing, sáng tạo nội dung và phân tích dữ liệu',
      category: 'Marketing',
      criteriaCount: 14,
      usageCount: 22,
      lastUsed: '2025-09-12',
      status: 'active',
      color: '#eb2f96',
      icon: '🎨'
    },
    {
      id: 6,
      name: 'Đánh giá kỹ năng chăm sóc khách hàng',
      description: 'Tiêu chí đánh giá kỹ năng giao tiếp và xử lý tình huống cho CSKH',
      category: 'Dịch vụ',
      criteriaCount: 11,
      usageCount: 38,
      lastUsed: '2025-09-22',
      status: 'active',
      color: '#52c41a',
      icon: '🤝'
    },
    {
      id: 7,
      name: 'Đánh giá năng lực tài chính - kế toán',
      description: 'Bộ tiêu chí chuyên môn cho bộ phận tài chính và kế toán',
      category: 'Tài chính',
      criteriaCount: 13,
      usageCount: 12,
      lastUsed: '2025-08-30',
      status: 'active',
      color: '#faad14',
      icon: '💰'
    },
    {
      id: 8,
      name: 'Đánh giá năng lực nhân sự',
      description: 'Tiêu chí đánh giá cho chuyên viên nhân sự và tuyển dụng',
      category: 'Nhân sự',
      criteriaCount: 12,
      usageCount: 18,
      lastUsed: '2025-09-05',
      status: 'active',
      color: '#2f54eb',
      icon: '👥'
    }
  ];

  // Filter rubrics
  const filteredRubrics = rubrics.filter(rubric => {
    const matchSearch = rubric.name.toLowerCase().includes(searchText.toLowerCase()) ||
                       rubric.description.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = selectedCategory === 'all' || rubric.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  // Categories
  const categories = ['all', ...new Set(rubrics.map(r => r.category))];

  // Handle actions
  const handleView = (rubric) => {
    navigate(`/assessment/rubrics/${rubric.id}`);
  };

  const handleEdit = (rubric) => {
    navigate(`/assessment/rubrics/${rubric.id}/edit`);
  };

  const handleCopy = (rubric) => {
    message.success(`Đã sao chép bộ tiêu chí "${rubric.name}"`);
  };

  const handleDelete = (rubric) => {
    Modal.confirm({
      title: 'Xóa bộ tiêu chí',
      content: `Bạn có chắc chắn muốn xóa bộ tiêu chí "${rubric.name}"?`,
      okType: 'danger',
      onOk: () => {
        message.success('Đã xóa bộ tiêu chí');
      }
    });
  };

  const handleUse = (rubric) => {
    navigate('/assessment/rounds/new', { state: { rubricId: rubric.id } });
  };

  // Render action menu
  const renderActionMenu = (rubric) => {
    const items = [
      {
        key: 'view',
        label: 'Xem chi tiết',
        icon: <EyeOutlined />,
        onClick: () => handleView(rubric)
      },
      {
        key: 'edit',
        label: 'Chỉnh sửa',
        icon: <EditOutlined />,
        onClick: () => handleEdit(rubric)
      },
      {
        key: 'copy',
        label: 'Sao chép',
        icon: <CopyOutlined />,
        onClick: () => handleCopy(rubric)
      },
      {
        key: 'use',
        label: 'Sử dụng cho đánh giá',
        icon: <CheckCircleOutlined />,
        onClick: () => handleUse(rubric)
      },
      { type: 'divider' },
      {
        key: 'delete',
        label: 'Xóa',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDelete(rubric)
      }
    ];

    return <Menu items={items} />;
  };

  // Render rubric card
  const renderRubricCard = (rubric) => (
    <Card
      hoverable
      className="rubric-card"
      style={{
        borderRadius: '12px',
        border: `2px solid ${rubric.color}20`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        height: '100%'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Avatar 
          size={56}
          style={{ 
            backgroundColor: rubric.color,
            fontSize: '28px'
          }}
        >
          {rubric.icon}
        </Avatar>
        <Dropdown 
          overlay={renderActionMenu(rubric)}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button 
            type="text" 
            icon={<MoreOutlined />}
            style={{ color: '#8c8c8c' }}
          />
        </Dropdown>
      </div>

      <Title level={4} style={{ marginBottom: '8px', marginTop: 0 }}>
        {rubric.name}
      </Title>

      <Paragraph 
        ellipsis={{ rows: 2 }}
        style={{ color: '#8c8c8c', fontSize: '13px', minHeight: '40px' }}
      >
        {rubric.description}
      </Paragraph>

      <Space direction="vertical" size="small" style={{ width: '100%', marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space size="small">
            <FileTextOutlined style={{ color: rubric.color }} />
            <Text type="secondary" style={{ fontSize: '13px' }}>
              {rubric.criteriaCount} tiêu chí
            </Text>
          </Space>
          <Tag color={rubric.color} style={{ borderRadius: '6px' }}>
            {rubric.category}
          </Tag>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space size="small">
            <TeamOutlined style={{ color: '#52c41a' }} />
            <Text type="secondary" style={{ fontSize: '13px' }}>
              Đã dùng {rubric.usageCount} lần
            </Text>
          </Space>
          <Badge 
            status={rubric.status === 'active' ? 'success' : 'default'}
            text={rubric.status === 'active' ? 'Đang dùng' : 'Lưu trữ'}
          />
        </div>
      </Space>

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Button 
          type="primary"
          icon={<CheckCircleOutlined />}
          onClick={() => handleUse(rubric)}
          style={{ 
            flex: 1,
            borderRadius: '6px',
            backgroundColor: rubric.color,
            borderColor: rubric.color
          }}
        >
          Sử dụng
        </Button>
        <Tooltip title="Xem chi tiết">
          <Button 
            icon={<EyeOutlined />}
            onClick={() => handleView(rubric)}
            style={{ borderRadius: '6px' }}
          />
        </Tooltip>
      </div>
    </Card>
  );

  return (
    <div className="rubric-list-page" style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>
            🏆 Thiết lập Danh mục
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Quản lý bộ tiêu chí đánh giá năng lực nhân viên
          </Text>
        </div>
        <Button 
          type="primary" 
          size="large"
          icon={<PlusOutlined />}
          onClick={() => navigate('/assessment/rubrics/new/builder')}
          style={{
            borderRadius: '8px',
            height: '44px',
            paddingLeft: '24px',
            paddingRight: '24px',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(24, 144, 255, 0.2)'
          }}
        >
          Tạo bộ tiêu chí mới
        </Button>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              <TrophyOutlined style={{ color: '#1890ff' }} />
            </div>
            <Title level={3} style={{ margin: 0, marginBottom: '4px' }}>
              {rubrics.length}
            </Title>
            <Text type="secondary">Tổng bộ tiêu chí</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
            </div>
            <Title level={3} style={{ margin: 0, marginBottom: '4px' }}>
              {rubrics.filter(r => r.status === 'active').length}
            </Title>
            <Text type="secondary">Đang sử dụng</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              <FileTextOutlined style={{ color: '#722ed1' }} />
            </div>
            <Title level={3} style={{ margin: 0, marginBottom: '4px' }}>
              {rubrics.reduce((sum, r) => sum + r.criteriaCount, 0)}
            </Title>
            <Text type="secondary">Tổng tiêu chí</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              <BarChartOutlined style={{ color: '#fa8c16' }} />
            </div>
            <Title level={3} style={{ margin: 0, marginBottom: '4px' }}>
              {rubrics.reduce((sum, r) => sum + r.usageCount, 0)}
            </Title>
            <Text type="secondary">Lượt sử dụng</Text>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card 
        bordered={false}
        style={{ 
          marginBottom: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <Search
              placeholder="Tìm kiếm bộ tiêu chí..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size="large"
              style={{ width: '100%' }}
              allowClear
            />
          </Col>
          <Col xs={24} md={12}>
            <Space wrap>
              {categories.map(cat => (
                <Button
                  key={cat}
                  type={selectedCategory === cat ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ borderRadius: '6px' }}
                >
                  {cat === 'all' ? 'Tất cả' : cat}
                </Button>
              ))}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Rubric Cards Grid */}
      {filteredRubrics.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredRubrics.map(rubric => (
            <Col xs={24} sm={12} lg={8} xl={6} key={rubric.id}>
              {renderRubricCard(rubric)}
            </Col>
          ))}
        </Row>
      ) : (
        <Card 
          bordered={false}
          style={{ 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center',
            padding: '48px 24px'
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không tìm thấy bộ tiêu chí nào"
          >
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/assessment/rubrics/new/builder')}
            >
              Tạo bộ tiêu chí đầu tiên
            </Button>
          </Empty>
        </Card>
      )}
    </div>
  );
};

export default RubricList;
