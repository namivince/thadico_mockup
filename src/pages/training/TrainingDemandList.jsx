import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Tag, 
  Tooltip, 
  Dropdown, 
  Menu,
  Badge,
  Statistic,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  message,
  Modal,
  Divider,
  Upload,
  Tabs,
  Alert
} from 'antd';
import Form from 'antd/lib/form';
import { 
  PlusOutlined, 
  FileExcelOutlined, 
  FilterOutlined, 
  EllipsisOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  FileSearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  BookOutlined,
  UploadOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { trainingDemands } from '../../data/mockData';
import './TrainingDemandList.css';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Dragger } = Upload;

const TrainingDemandList = () => {
  const navigate = useNavigate();
  const [demands, setDemands] = useState(trainingDemands);
  const [loading, setLoading] = useState(false);
  
  // Navigate to dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    search: ''
  });

  // Fetch demands data
  useEffect(() => {
    fetchDemands();
  }, [pagination.current, pagination.pageSize, filters]);

  const fetchDemands = async () => {
    setLoading(true);
    try {
      // Use mock data
      let filteredData = [...trainingDemands];
      
      // Filter by status
      if (filters.status !== 'all') {
        filteredData = filteredData.filter(demand => demand.status === filters.status);
      }
      
      // Filter by department
      if (filters.department !== 'all') {
        filteredData = filteredData.filter(demand => demand.department === filters.department);
      }
      
      // Filter by search
      if (filters.search) {
        filteredData = filteredData.filter(demand => 
          demand.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          demand.creator.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      setDemands(filteredData);
      setPagination({
        ...pagination,
        total: filteredData.length
      });
    } catch (error) {
      console.error('Error fetching demands:', error);
      message.error('Không thể tải dữ liệu nhu cầu đào tạo');
    } finally {
      setLoading(false);
    }
  };

  // Handle table change
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Handle status filter change
  const handleStatusChange = (value) => {
    setFilters({
      ...filters,
      status: value
    });
    setPagination({
      ...pagination,
      current: 1
    });
  };

  // Handle department filter change
  const handleDepartmentChange = (value) => {
    setFilters({
      ...filters,
      department: value
    });
    setPagination({
      ...pagination,
      current: 1
    });
  };

  // Handle search
  const handleSearch = (value) => {
    setFilters({
      ...filters,
      search: value
    });
    setPagination({
      ...pagination,
      current: 1
    });
  };

  // State for create demand modal
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('form');
  const [fileList, setFileList] = useState([]);
  const [importData, setImportData] = useState(null);
  
  // Create new demand
  const handleCreateDemand = () => {
    setCreateModalVisible(true);
  };
  
  // Handle create form submit
  const handleCreateFormSubmit = () => {
    createForm.validateFields().then(values => {
      // Create new demand object
      const newDemand = {
        id: Math.max(...demands.map(d => d.id)) + 1,
        name: values.name,
        department: values.department,
        creator: 'Người dùng hiện tại', // In a real app, this would be the current user
        createdDate: new Date().toISOString().split('T')[0],
        status: 'PENDING',
        approver: null,
        description: values.description,
        skills: values.skills
      };
      
      // Add to demands list
      setDemands([newDemand, ...demands]);
      
      // Show success message
      message.success('Tạo nhu cầu đào tạo mới thành công!');
      
      // Close modal and reset form
      setCreateModalVisible(false);
      createForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };
  
  // Handle create form cancel
  const handleCreateFormCancel = () => {
    setCreateModalVisible(false);
    createForm.resetFields();
    setFileList([]);
    setImportData(null);
    setActiveTab('form');
  };
  
  // Handle import file
  const handleImportFile = (info) => {
    const { status } = info.file;
    
    if (status === 'uploading') {
      setFileList([info.file]);
      return;
    }
    
    if (status === 'done') {
      setFileList([info.file]);
      
      // Mock processing the file
      setTimeout(() => {
        // Mock data from file
        const mockImportData = {
          name: 'Nhu cầu đào tạo từ file',
          department: 'Phòng Nhân sự',
          description: 'Nhu cầu đào tạo được import từ file Excel',
          skills: ['Kỹ năng lãnh đạo', 'Kỹ năng giao tiếp', 'Tiếng Anh']
        };
        
        setImportData(mockImportData);
        message.success(`Đã xử lý file ${info.file.name} thành công`);
      }, 1000);
    } else if (status === 'error') {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };
  
  // Handle import submit
  const handleImportSubmit = () => {
    if (!importData) {
      message.error('Vui lòng tải lên và xử lý file trước khi import!');
      return;
    }
    
    // Create new demand from import data
    const newDemand = {
      id: Math.max(...demands.map(d => d.id)) + 1,
      name: importData.name,
      department: importData.department,
      creator: 'Người dùng hiện tại',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      approver: null,
      description: importData.description,
      skills: importData.skills
    };
    
    // Add to demands list
    setDemands([newDemand, ...demands]);
    
    // Show success message
    message.success('Import nhu cầu đào tạo thành công!');
    
    // Close modal and reset
    handleCreateFormCancel();
  };

  // View demand details
  const handleViewDemand = (id) => {
    // Tạm thời hiển thị thông báo chi tiết nhu cầu
    const demand = demands.find(d => d.id === id);
    if (demand) {
      Modal.info({
        title: `Chi tiết nhu cầu: ${demand.name}`,
        width: 600,
        content: (
          <div>
            <p><strong>ID:</strong> {demand.id}</p>
            <p><strong>Tên nhu cầu:</strong> {demand.name}</p>
            <p><strong>Phòng ban:</strong> {demand.department}</p>
            <p><strong>Người tạo:</strong> {demand.creator}</p>
            <p><strong>Ngày tạo:</strong> {new Date(demand.createdDate).toLocaleDateString('vi-VN')}</p>
            <p><strong>Trạng thái:</strong> {renderStatus(demand.status)}</p>
            <p><strong>Người duyệt:</strong> {demand.approver || '—'}</p>
            <Divider />            
            <p><strong>Mô tả:</strong> {demand.description || 'Không có mô tả'}</p>
            {demand.skills && demand.skills.length > 0 && (
              <>
                <p><strong>Kỹ năng cần đào tạo:</strong></p>
                <ul>
                  {demand.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ),
        onOk() {},
      });
    } else {
      message.error('Không tìm thấy thông tin nhu cầu!');
    }
    
    // Khi có trang chi tiết, sẽ điều hướng đến đó
    // navigate(`/training/demands/${id}`);
  };

  // State for edit demand modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [currentDemand, setCurrentDemand] = useState(null);
  
  // Edit demand
  const handleEditDemand = (id) => {
    const demand = demands.find(d => d.id === id);
    if (demand) {
      setCurrentDemand(demand);
      
      // Set form values
      editForm.setFieldsValue({
        name: demand.name,
        department: demand.department,
        description: demand.description || '',
        skills: demand.skills || []
      });
      
      // Show modal
      setEditModalVisible(true);
    } else {
      message.error('Không tìm thấy thông tin nhu cầu!');
    }
  };
  
  // Handle edit form submit
  const handleEditFormSubmit = () => {
    if (!currentDemand) return;
    
    editForm.validateFields().then(values => {
      // Update demand object
      const updatedDemand = {
        ...currentDemand,
        name: values.name,
        department: values.department,
        description: values.description,
        skills: values.skills
      };
      
      // Update demands list
      setDemands(demands.map(d => d.id === currentDemand.id ? updatedDemand : d));
      
      // Show success message
      message.success('Cập nhật nhu cầu đào tạo thành công!');
      
      // Close modal and reset
      setEditModalVisible(false);
      setCurrentDemand(null);
      editForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };
  
  // Handle edit form cancel
  const handleEditFormCancel = () => {
    setEditModalVisible(false);
    setCurrentDemand(null);
    editForm.resetFields();
  };

  // Delete demand
  const handleDeleteDemand = (id) => {
    message.success(`Đã xóa nhu cầu đào tạo #${id}`);
    setDemands(demands.filter(demand => demand.id !== id));
  };

  // Render status tag
  const renderStatus = (status) => {
    switch (status) {
      case 'APPROVED':
        return (
          <Tag 
            color="#E6F4EA" 
            style={{ color: '#16A34A', border: '1px solid #16A34A', fontWeight: 600 }}
            icon={<CheckCircleOutlined />}
          >
            Đã duyệt
          </Tag>
        );
      case 'PENDING':
        return (
          <Tag 
            color="#FFF8E6" 
            style={{ color: '#FFC107', border: '1px solid #FFC107', fontWeight: 600 }}
            icon={<ClockCircleOutlined />}
          >
            Chờ duyệt
          </Tag>
        );
      case 'REJECTED':
        return (
          <Tag 
            color="#FFEBEE" 
            style={{ color: '#DC3545', border: '1px solid #DC3545', fontWeight: 600 }}
            icon={<CloseCircleOutlined />}
          >
            Từ chối
          </Tag>
        );
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  // Render action menu
  const renderActionMenu = (record) => {
    const items = [
      {
        key: 'view',
        label: 'Xem chi tiết',
        icon: <FileSearchOutlined />,
        onClick: () => handleViewDemand(record.id)
      }
    ];

    // Add edit action if status is PENDING
    if (record.status === 'PENDING') {
      items.push({
        key: 'edit',
        label: 'Chỉnh sửa',
        icon: <EditOutlined />,
        onClick: () => handleEditDemand(record.id)
      });
      items.push({
        key: 'delete',
        label: 'Xóa',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDeleteDemand(record.id)
      });
    }

    return (
      <Menu items={items} />
    );
  };

  // Define columns
  const columns = [
    {
      title: 'Tên nhu cầu',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => handleViewDemand(record.id)}>{text}</a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department)
    },
    {
      title: 'Người tạo',
      dataIndex: 'creator',
      key: 'creator',
      sorter: (a, b) => a.creator.localeCompare(b.creator)
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatus(status),
      filters: [
        { text: 'Đã duyệt', value: 'APPROVED' },
        { text: 'Chờ duyệt', value: 'PENDING' },
        { text: 'Từ chối', value: 'REJECTED' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Người duyệt',
      dataIndex: 'approver',
      key: 'approver',
      render: (approver) => approver || '-'
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Dropdown 
          overlay={renderActionMenu(record)} 
          trigger={['click']}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  // Render statistics cards
  const renderStatistics = () => {
    // Calculate statistics
    const totalDemands = demands.length;
    const approvedDemands = demands.filter(d => d.status === 'APPROVED').length;
    const pendingDemands = demands.filter(d => d.status === 'PENDING').length;
    const rejectedDemands = demands.filter(d => d.status === 'REJECTED').length;
    
    return (
      <Row gutter={16} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-primary">
            <Statistic 
              title="Tổng nhu cầu" 
              value={totalDemands} 
              valueStyle={{ color: '#0D6EFD' }}
              prefix={<BookOutlined style={{ fontSize: '20px' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-success">
            <Statistic 
              title="Đã duyệt" 
              value={approvedDemands} 
              valueStyle={{ color: '#16A34A' }}
              prefix={<CheckCircleOutlined style={{ fontSize: '20px' }} />}
              suffix={totalDemands > 0 ? ` (${Math.round(approvedDemands / totalDemands * 100)}%)` : ''}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-warning">
            <Statistic 
              title="Chờ duyệt" 
              value={pendingDemands} 
              valueStyle={{ color: '#FFC107' }}
              prefix={<ClockCircleOutlined style={{ fontSize: '20px' }} />}
              suffix={totalDemands > 0 ? ` (${Math.round(pendingDemands / totalDemands * 100)}%)` : ''}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-danger">
            <Statistic 
              title="Từ chối" 
              value={rejectedDemands} 
              valueStyle={{ color: '#DC3545' }}
              prefix={<CloseCircleOutlined style={{ fontSize: '20px' }} />}
              suffix={totalDemands > 0 ? ` (${Math.round(rejectedDemands / totalDemands * 100)}%)` : ''}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  // Export to Excel
  const handleExportExcel = () => {
    // In a real app, this would call an API to generate Excel
    // For now, we'll just show a success message
    message.success('File Excel đã được tạo và tải xuống!');
    
    // Mock export functionality
    setTimeout(() => {
      // Create a sample CSV content
      const headers = ['ID', 'Tên nhu cầu', 'Phòng ban', 'Người tạo', 'Ngày tạo', 'Trạng thái', 'Người duyệt'];
      let csvContent = headers.join(',') + '\n';
      
      // Add data rows
      demands.forEach(demand => {
        const row = [
          demand.id,
          `"${demand.name}"`,
          `"${demand.department}"`,
          `"${demand.creator}"`,
          demand.createdDate,
          demand.status,
          demand.approver || ''
        ];
        csvContent += row.join(',') + '\n';
      });
      
      // Create a Blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'nhu_cau_dao_tao.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };
  
  return (
    <div className="demand-list-container">
      <Card 
        title={
          <div className="page-header">
            <div className="page-title">
              <Button 
                type="link" 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBackToDashboard}
                className="back-button"
              >
                Quay lại Dashboard
              </Button>
              <BookOutlined className="page-icon" />
              <span>Nhu cầu đào tạo</span>
            </div>
          </div>
        }
        className="demand-list-card"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => setCreateModalVisible(true)}
            className="create-button"
          >
            Tạo nhu cầu mới
          </Button>
        }
      >
        {renderStatistics()}
        
        <div className="filter-section">
          <Space wrap>
            <Search
              placeholder="Tìm kiếm nhu cầu"
              allowClear
              onSearch={handleSearch}
              style={{ width: 250 }}
            />
            <Select 
              defaultValue="all" 
              style={{ width: 150 }} 
              onChange={handleStatusChange}
              dropdownStyle={{ borderRadius: '6px' }}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="APPROVED">Đã duyệt</Option>
              <Option value="PENDING">Chờ duyệt</Option>
              <Option value="REJECTED">Từ chối</Option>
            </Select>
            <Select 
              defaultValue="all" 
              style={{ width: 180 }} 
              onChange={handleDepartmentChange}
              dropdownStyle={{ borderRadius: '6px' }}
            >
              <Option value="all">Tất cả phòng ban</Option>
              <Option value="Ban Giám đốc">Ban Giám đốc</Option>
              <Option value="Phòng Nhân sự">Phòng Nhân sự</Option>
              <Option value="Phòng Kỹ thuật">Phòng Kỹ thuật</Option>
              <Option value="Phòng Kinh doanh">Phòng Kinh doanh</Option>
            </Select>
            <Button 
              icon={<FileExcelOutlined />}
              style={{ 
                background: '#E6F4EA', 
                color: '#16A34A',
                borderColor: '#16A34A',
                fontWeight: 500 
              }}
              onClick={handleExportExcel}
            >
              Xuất Excel
            </Button>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={demands}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          className="demand-table"
          rowClassName={(record, index) => index % 2 === 0 ? '' : 'even-row'}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>Tổng cộng</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>{demands.length} nhu cầu</Table.Summary.Cell>
                <Table.Summary.Cell index={3} colSpan={4}></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
      
      {/* Create Demand Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PlusOutlined style={{ color: '#0D6EFD', marginRight: 10 }} />
            <span style={{ fontWeight: 700, fontSize: '18px' }}>Tạo nhu cầu đào tạo mới</span>
          </div>
        }
        open={createModalVisible}
        onCancel={handleCreateFormCancel}
        footer={[
          <Button key="back" onClick={handleCreateFormCancel} style={{ borderRadius: '6px', height: '38px' }}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={activeTab === 'form' ? handleCreateFormSubmit : handleImportSubmit}
            style={{ 
              background: '#0D6EFD', 
              borderColor: '#0D6EFD',
              fontWeight: 500,
              height: '38px',
              borderRadius: '6px',
              boxShadow: '0 2px 0 rgba(5, 65, 255, 0.1)'
            }}
          >
            {activeTab === 'form' ? <><PlusOutlined /> Tạo mới</> : <><UploadOutlined /> Import</>}
          </Button>,
        ]}
        width={700}
        bodyStyle={{ padding: '24px' }}
        style={{ top: 20 }}
        maskClosable={false}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="demand-form-tabs">
          <TabPane tab="Nhập thông tin" key="form">
            <Form
              form={createForm}
              layout="vertical"
              initialValues={{
                skills: []
              }}
            >
              <Form.Item
                name="name"
                label={<span style={{ fontWeight: 600 }}>Tên nhu cầu đào tạo <span style={{ color: '#ff4d4f' }}>*</span></span>}
                rules={[{ required: true, message: 'Vui lòng nhập tên nhu cầu đào tạo!' }]}
              >
                <Input 
                  placeholder="Nhập tên nhu cầu đào tạo" 
                  style={{ borderRadius: '6px', height: '40px' }} 
                />
              </Form.Item>
              
              <Form.Item
                name="department"
                label={<span style={{ fontWeight: 600 }}>Phòng ban <span style={{ color: '#ff4d4f' }}>*</span></span>}
                rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
              >
                <Select 
                  placeholder="Chọn phòng ban"
                  style={{ borderRadius: '6px', height: '40px' }}
                  dropdownStyle={{ borderRadius: '6px' }}
                >
                  <Select.Option value="Ban Giám đốc">Ban Giám đốc</Select.Option>
                  <Select.Option value="Phòng Nhân sự">Phòng Nhân sự</Select.Option>
                  <Select.Option value="Phòng Kỹ thuật">Phòng Kỹ thuật</Select.Option>
                  <Select.Option value="Phòng Kinh doanh">Phòng Kinh doanh</Select.Option>
                  <Select.Option value="Phòng Kế toán">Phòng Kế toán</Select.Option>
                  <Select.Option value="Phòng Marketing">Phòng Marketing</Select.Option>
                  <Select.Option value="Phòng CSKH">Phòng CSKH</Select.Option>
                  <Select.Option value="Phòng IT">Phòng IT</Select.Option>
                  <Select.Option value="Phòng Hành chính">Phòng Hành chính</Select.Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="description"
                label={<span style={{ fontWeight: 600 }}>Mô tả <span style={{ color: '#ff4d4f' }}>*</span></span>}
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Mô tả chi tiết về nhu cầu đào tạo" 
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
              
              <Form.Item
                name="skills"
                label={<span style={{ fontWeight: 600 }}>Kỹ năng cần đào tạo <span style={{ color: '#ff4d4f' }}>*</span></span>}
                rules={[{ required: true, message: 'Vui lòng nhập ít nhất một kỹ năng!' }]}
                extra="Bạn có thể nhập thêm kỹ năng mới hoặc chọn từ danh sách có sẵn"
              >
                <Select
                  mode="tags"
                  style={{ width: '100%', borderRadius: '6px' }}
                  placeholder="Nhập các kỹ năng cần đào tạo"
                  tokenSeparators={[',']}
                  dropdownStyle={{ borderRadius: '6px' }}
                  tagRender={(props) => {
                    const { label, closable, onClose } = props;
                    return (
                      <Tag 
                        color="#E6F4EA" 
                        closable={closable} 
                        onClose={onClose} 
                        style={{ marginRight: 3, color: '#16A34A', borderColor: '#16A34A' }}
                      >
                        {label}
                      </Tag>
                    );
                  }}
                >
                  <Select.Option value="Kỹ năng lãnh đạo">Kỹ năng lãnh đạo</Select.Option>
                  <Select.Option value="Kỹ năng giao tiếp">Kỹ năng giao tiếp</Select.Option>
                  <Select.Option value="Kỹ năng thuyết trình">Kỹ năng thuyết trình</Select.Option>
                  <Select.Option value="Kỹ năng làm việc nhóm">Kỹ năng làm việc nhóm</Select.Option>
                  <Select.Option value="Kỹ năng quản lý thời gian">Kỹ năng quản lý thời gian</Select.Option>
                  <Select.Option value="Kỹ năng quản lý dự án">Kỹ năng quản lý dự án</Select.Option>
                  <Select.Option value="Kỹ năng bán hàng">Kỹ năng bán hàng</Select.Option>
                  <Select.Option value="Kỹ năng đàm phán">Kỹ năng đàm phán</Select.Option>
                  <Select.Option value="Tiếng Anh">Tiếng Anh</Select.Option>
                  <Select.Option value="Excel nâng cao">Excel nâng cao</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Import file" key="import">
            <div className="import-container">
              <Dragger
                name="file"
                multiple={false}
                fileList={fileList}
                onChange={handleImportFile}
                beforeUpload={() => false}
                accept=".xlsx,.xls,.csv"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#0D6EFD', fontSize: '48px' }} />
                </p>
                <p className="ant-upload-text" style={{ fontWeight: 600 }}>
                  Nhấp hoặc kéo file vào khu vực này để tải lên
                </p>
                <p className="ant-upload-hint">
                  Hỗ trợ file Excel (.xlsx, .xls) hoặc CSV (.csv). Mỗi lần chỉ tải lên 1 file.
                </p>
              </Dragger>
              
              {importData && (
                <div className="import-preview">
                  <Divider orientation="left">Dữ liệu đã xử lý</Divider>
                  <div className="preview-item">
                    <span className="preview-label">Tên nhu cầu:</span>
                    <span className="preview-value">{importData.name}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Phòng ban:</span>
                    <span className="preview-value">{importData.department}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Mô tả:</span>
                    <span className="preview-value">{importData.description}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Kỹ năng:</span>
                    <span className="preview-value">
                      {importData.skills.map(skill => (
                        <Tag 
                          key={skill}
                          color="#E6F4EA" 
                          style={{ marginRight: 3, color: '#16A34A', borderColor: '#16A34A' }}
                        >
                          {skill}
                        </Tag>
                      ))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </TabPane>
        </Tabs>
      </Modal>
      
      {/* Edit Demand Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EditOutlined style={{ color: '#0D6EFD', marginRight: 10 }} />
            <span style={{ fontWeight: 700, fontSize: '18px' }}>Chỉnh sửa nhu cầu đào tạo</span>
          </div>
        }
        open={editModalVisible}
        onCancel={handleEditFormCancel}
        footer={[
          <Button key="back" onClick={handleEditFormCancel} style={{ borderRadius: '6px', height: '38px' }}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleEditFormSubmit}
            style={{ 
              background: '#0D6EFD', 
              borderColor: '#0D6EFD',
              fontWeight: 500,
              height: '38px',
              borderRadius: '6px',
              boxShadow: '0 2px 0 rgba(5, 65, 255, 0.1)'
            }}
          >
            <CheckCircleOutlined /> Cập nhật
          </Button>,
        ]}
        width={700}
        bodyStyle={{ padding: '24px' }}
        style={{ top: 20 }}
        maskClosable={false}
      >
        <Form
          form={editForm}
          layout="vertical"
          initialValues={{
            skills: []
          }}
        >
          <Form.Item
            name="name"
            label={<span style={{ fontWeight: 600 }}>Tên nhu cầu đào tạo <span style={{ color: '#ff4d4f' }}>*</span></span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên nhu cầu đào tạo!' }]}
          >
            <Input 
              placeholder="Nhập tên nhu cầu đào tạo" 
              style={{ borderRadius: '6px', height: '40px' }} 
            />
          </Form.Item>
          
          <Form.Item
            name="department"
            label={<span style={{ fontWeight: 600 }}>Phòng ban <span style={{ color: '#ff4d4f' }}>*</span></span>}
            rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
          >
            <Select 
              placeholder="Chọn phòng ban"
              style={{ borderRadius: '6px', height: '40px' }}
              dropdownStyle={{ borderRadius: '6px' }}
            >
              <Select.Option value="Ban Giám đốc">Ban Giám đốc</Select.Option>
              <Select.Option value="Phòng Nhân sự">Phòng Nhân sự</Select.Option>
              <Select.Option value="Phòng Kỹ thuật">Phòng Kỹ thuật</Select.Option>
              <Select.Option value="Phòng Kinh doanh">Phòng Kinh doanh</Select.Option>
              <Select.Option value="Phòng Kế toán">Phòng Kế toán</Select.Option>
              <Select.Option value="Phòng Marketing">Phòng Marketing</Select.Option>
              <Select.Option value="Phòng CSKH">Phòng CSKH</Select.Option>
              <Select.Option value="Phòng IT">Phòng IT</Select.Option>
              <Select.Option value="Phòng Hành chính">Phòng Hành chính</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label={<span style={{ fontWeight: 600 }}>Mô tả <span style={{ color: '#ff4d4f' }}>*</span></span>}
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Mô tả chi tiết về nhu cầu đào tạo" 
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>
          
          <Form.Item
            name="skills"
            label={<span style={{ fontWeight: 600 }}>Kỹ năng cần đào tạo <span style={{ color: '#ff4d4f' }}>*</span></span>}
            rules={[{ required: true, message: 'Vui lòng nhập ít nhất một kỹ năng!' }]}
            extra="Bạn có thể nhập thêm kỹ năng mới hoặc chọn từ danh sách có sẵn"
          >
            <Select
              mode="tags"
              style={{ width: '100%', borderRadius: '6px' }}
              placeholder="Nhập các kỹ năng cần đào tạo"
              tokenSeparators={[',']}
              dropdownStyle={{ borderRadius: '6px' }}
              tagRender={(props) => {
                const { label, closable, onClose } = props;
                return (
                  <Tag 
                    color="#E6F4EA" 
                    closable={closable} 
                    onClose={onClose} 
                    style={{ marginRight: 3, color: '#16A34A', borderColor: '#16A34A' }}
                  >
                    {label}
                  </Tag>
                );
              }}
            >
              <Select.Option value="Kỹ năng lãnh đạo">Kỹ năng lãnh đạo</Select.Option>
              <Select.Option value="Kỹ năng giao tiếp">Kỹ năng giao tiếp</Select.Option>
              <Select.Option value="Kỹ năng thuyết trình">Kỹ năng thuyết trình</Select.Option>
              <Select.Option value="Kỹ năng làm việc nhóm">Kỹ năng làm việc nhóm</Select.Option>
              <Select.Option value="Kỹ năng quản lý thời gian">Kỹ năng quản lý thời gian</Select.Option>
              <Select.Option value="Kỹ năng quản lý dự án">Kỹ năng quản lý dự án</Select.Option>
              <Select.Option value="Kỹ năng bán hàng">Kỹ năng bán hàng</Select.Option>
              <Select.Option value="Kỹ năng đàm phán">Kỹ năng đàm phán</Select.Option>
              <Select.Option value="Tiếng Anh">Tiếng Anh</Select.Option>
              <Select.Option value="Excel nâng cao">Excel nâng cao</Select.Option>
            </Select>
          </Form.Item>
          
          {currentDemand && currentDemand.status !== 'PENDING' && (
            <div className="edit-warning">
              <Alert
                message="Lưu ý"
                description={
                  <>
                    <p>Nhu cầu đào tạo này đang ở trạng thái <strong>{currentDemand.status === 'APPROVED' ? 'Đã duyệt' : 'Từ chối'}</strong>.</p>
                    <p>Việc chỉnh sửa sẽ tạo phiên bản mới và cần được phê duyệt lại.</p>
                  </>
                }
                type="warning"
                showIcon
              />
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default TrainingDemandList;
