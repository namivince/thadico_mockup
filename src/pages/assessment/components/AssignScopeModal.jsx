import React, { useState, useEffect } from 'react';
import { 
  Modal, Tabs, Tree, Table, Button, Input, 
  Badge, Card, Typography, Spin, Empty, 
  Checkbox, Space, Row, Col, Alert
} from 'antd';
import { 
  TeamOutlined, UserOutlined, ApartmentOutlined, 
  SearchOutlined, CheckCircleOutlined 
} from '@ant-design/icons';
import './AssignScopeModal.css';

const { TabPane } = Tabs;
const { Text, Title } = Typography;
const { Search } = Input;

const AssignScopeModal = ({ visible, onClose, onSave, initialScope = {} }) => {
  const [loading, setLoading] = useState(false);
  const [orgTree, setOrgTree] = useState([]);
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('org');
  const [totalSelected, setTotalSelected] = useState(0);
  const [saveLoading, setSaveLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    if (visible) {
      setLoading(true);
      
      // Initialize with initial scope if provided
      if (initialScope) {
        setSelectedDepartments(initialScope.departments || []);
        setSelectedPositions(initialScope.positions || []);
        setSelectedUsers(initialScope.users || []);
        setTotalSelected(initialScope.totalUsers || 0);
      }
      
      // Mock API calls
      Promise.all([
        fetchOrgTree(),
        fetchPositions(),
        fetchUsers()
      ]).then(() => {
        setLoading(false);
      });
    }
  }, [visible, initialScope]);

  // Mock API calls
  const fetchOrgTree = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockOrgTree = [
          {
            title: 'Ban Giám đốc',
            key: 'BGD',
            children: [
              {
                title: 'Văn phòng BGĐ',
                key: 'VP-BGD',
                employeeCount: 5
              }
            ],
            employeeCount: 5
          },
          {
            title: 'Phòng Nhân sự',
            key: 'PNS',
            children: [
              {
                title: 'Bộ phận Tuyển dụng',
                key: 'BP-TD',
                employeeCount: 8
              },
              {
                title: 'Bộ phận Đào tạo',
                key: 'BP-DT',
                employeeCount: 7
              }
            ],
            employeeCount: 15
          },
          {
            title: 'Phòng Kỹ thuật',
            key: 'PKT',
            children: [
              {
                title: 'Bộ phận Phát triển',
                key: 'BP-PT',
                employeeCount: 25
              },
              {
                title: 'Bộ phận QA',
                key: 'BP-QA',
                employeeCount: 10
              },
              {
                title: 'Bộ phận DevOps',
                key: 'BP-DO',
                employeeCount: 10
              }
            ],
            employeeCount: 45
          },
          {
            title: 'Phòng Kinh doanh',
            key: 'PKD',
            children: [
              {
                title: 'Bộ phận Bán hàng',
                key: 'BP-BH',
                employeeCount: 20
              },
              {
                title: 'Bộ phận CSKH',
                key: 'BP-CS',
                employeeCount: 10
              }
            ],
            employeeCount: 30
          }
        ];
        
        setOrgTree(mockOrgTree);
        resolve();
      }, 500);
    });
  };

  const fetchPositions = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockPositions = [
          { id: 1, name: 'Giám đốc', department: 'Ban Giám đốc', employeeCount: 1 },
          { id: 2, name: 'Phó Giám đốc', department: 'Ban Giám đốc', employeeCount: 2 },
          { id: 3, name: 'Trợ lý', department: 'Ban Giám đốc', employeeCount: 2 },
          { id: 4, name: 'Trưởng phòng', department: 'Phòng Nhân sự', employeeCount: 1 },
          { id: 5, name: 'Chuyên viên Tuyển dụng', department: 'Phòng Nhân sự', employeeCount: 5 },
          { id: 6, name: 'Chuyên viên Đào tạo', department: 'Phòng Nhân sự', employeeCount: 4 },
          { id: 7, name: 'Trưởng phòng', department: 'Phòng Kỹ thuật', employeeCount: 1 },
          { id: 8, name: 'Team Leader', department: 'Phòng Kỹ thuật', employeeCount: 5 },
          { id: 9, name: 'Developer', department: 'Phòng Kỹ thuật', employeeCount: 20 },
          { id: 10, name: 'QA Engineer', department: 'Phòng Kỹ thuật', employeeCount: 10 },
          { id: 11, name: 'DevOps Engineer', department: 'Phòng Kỹ thuật', employeeCount: 9 },
          { id: 12, name: 'Trưởng phòng', department: 'Phòng Kinh doanh', employeeCount: 1 },
          { id: 13, name: 'Sales Manager', department: 'Phòng Kinh doanh', employeeCount: 4 },
          { id: 14, name: 'Sales Executive', department: 'Phòng Kinh doanh', employeeCount: 15 },
          { id: 15, name: 'CSKH', department: 'Phòng Kinh doanh', employeeCount: 10 }
        ];
        
        setPositions(mockPositions);
        resolve();
      }, 500);
    });
  };

  const fetchUsers = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockUsers = Array(50).fill(0).map((_, index) => ({
          id: index + 1,
          name: `Nhân viên ${index + 1}`,
          department: index < 5 ? 'Ban Giám đốc' : 
                     index < 20 ? 'Phòng Nhân sự' : 
                     index < 40 ? 'Phòng Kỹ thuật' : 'Phòng Kinh doanh',
          position: index < 3 ? 'Giám đốc/Phó Giám đốc' : 
                   index < 5 ? 'Trợ lý' : 
                   (index % 10 === 0) ? 'Trưởng phòng' : 
                   (index % 5 === 0) ? 'Team Leader' : 'Nhân viên'
        }));
        
        setUsers(mockUsers);
        resolve();
      }, 500);
    });
  };

  // Handle tree selection
  const onTreeSelect = (selectedKeys, info) => {
    const { checked, node } = info;
    
    if (checked) {
      setSelectedDepartments(prev => [...prev, node.title]);
      updateTotalSelected(node.employeeCount, 0, 0);
    } else {
      setSelectedDepartments(prev => prev.filter(dept => dept !== node.title));
      updateTotalSelected(-node.employeeCount, 0, 0);
    }
  };

  // Handle position selection
  const onPositionSelect = (record, selected) => {
    if (selected) {
      setSelectedPositions(prev => [...prev, record.name]);
      updateTotalSelected(0, record.employeeCount, 0);
    } else {
      setSelectedPositions(prev => prev.filter(pos => pos !== record.name));
      updateTotalSelected(0, -record.employeeCount, 0);
    }
  };

  // Handle user selection
  const onUserSelect = (record, selected) => {
    if (selected) {
      setSelectedUsers(prev => [...prev, record.id]);
      updateTotalSelected(0, 0, 1);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== record.id));
      updateTotalSelected(0, 0, -1);
    }
  };

  // Update total selected count
  const updateTotalSelected = (deptCount, posCount, userCount) => {
    setTotalSelected(prev => Math.max(0, prev + deptCount + posCount + userCount));
  };

  // Handle save
  const handleSave = () => {
    setSaveLoading(true);
    
    // Prepare scope data
    const scopeData = {
      departments: selectedDepartments,
      positions: selectedPositions,
      users: selectedUsers,
      totalUsers: totalSelected
    };
    
    // Mock API call
    setTimeout(() => {
      onSave(scopeData);
      setSaveLoading(false);
      onClose();
    }, 1000);
  };

  // Filter users by search text
  const filteredUsers = users.filter(user => {
    if (!searchText) return true;
    return (
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.department.toLowerCase().includes(searchText.toLowerCase()) ||
      user.position.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Filter positions by search text
  const filteredPositions = positions.filter(position => {
    if (!searchText) return true;
    return (
      position.name.toLowerCase().includes(searchText.toLowerCase()) ||
      position.department.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <Modal
      title="Chọn đối tượng đánh giá"
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          disabled={totalSelected === 0}
          loading={saveLoading}
        >
          Lưu phạm vi ({totalSelected} người)
        </Button>
      ]}
      className="assign-scope-modal"
    >
      <Spin spinning={loading}>
        <Row gutter={16}>
          <Col span={16}>
            <Search
              placeholder="Tìm kiếm theo tên, phòng ban, vị trí..."
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={value => setSearchText(value)}
              onChange={e => setSearchText(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              className="scope-tabs"
            >
              <TabPane 
                tab={<span><ApartmentOutlined /> Phòng ban</span>} 
                key="org"
              >
                {orgTree.length > 0 ? (
                  <Tree
                    checkable
                    selectable={false}
                    onCheck={onTreeSelect}
                    treeData={orgTree}
                    height={400}
                    titleRender={(node) => (
                      <span>
                        {node.title} 
                        <Badge 
                          count={node.employeeCount} 
                          style={{ backgroundColor: '#52c41a', marginLeft: 8 }} 
                          overflowCount={999}
                        />
                      </span>
                    )}
                  />
                ) : (
                  <Empty description="Không có dữ liệu phòng ban" />
                )}
              </TabPane>
              
              <TabPane 
                tab={<span><TeamOutlined /> Vị trí</span>} 
                key="position"
              >
                <Table
                  dataSource={filteredPositions}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  columns={[
                    {
                      title: 'Vị trí',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: 'Phòng ban',
                      dataIndex: 'department',
                      key: 'department',
                    },
                    {
                      title: 'Số người',
                      dataIndex: 'employeeCount',
                      key: 'employeeCount',
                      width: 100,
                      render: count => (
                        <Badge 
                          count={count} 
                          style={{ backgroundColor: '#52c41a' }} 
                          overflowCount={999}
                        />
                      )
                    },
                    {
                      title: 'Chọn',
                      key: 'action',
                      width: 80,
                      render: (_, record) => (
                        <Checkbox
                          checked={selectedPositions.includes(record.name)}
                          onChange={(e) => onPositionSelect(record, e.target.checked)}
                        />
                      )
                    }
                  ]}
                />
              </TabPane>
              
              <TabPane 
                tab={<span><UserOutlined /> Cá nhân</span>} 
                key="user"
              >
                <Table
                  dataSource={filteredUsers}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  columns={[
                    {
                      title: 'Họ tên',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: 'Phòng ban',
                      dataIndex: 'department',
                      key: 'department',
                    },
                    {
                      title: 'Vị trí',
                      dataIndex: 'position',
                      key: 'position',
                    },
                    {
                      title: 'Chọn',
                      key: 'action',
                      width: 80,
                      render: (_, record) => (
                        <Checkbox
                          checked={selectedUsers.includes(record.id)}
                          onChange={(e) => onUserSelect(record, e.target.checked)}
                        />
                      )
                    }
                  ]}
                />
              </TabPane>
            </Tabs>
          </Col>
          
          <Col span={8}>
            <Card title="Tổng quan phạm vi" className="scope-summary-card">
              <div className="scope-summary-item">
                <Text>Tổng số người được chọn:</Text>
                <Title level={3}>
                  <Badge 
                    count={totalSelected} 
                    style={{ backgroundColor: '#1890ff' }} 
                    overflowCount={999}
                  />
                </Title>
              </div>
              
              <div className="scope-summary-item">
                <Text>Phòng ban đã chọn ({selectedDepartments.length}):</Text>
                {selectedDepartments.length > 0 ? (
                  <div className="scope-tags">
                    {selectedDepartments.map(dept => (
                      <div key={dept} className="scope-tag">
                        <ApartmentOutlined /> {dept}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="Chưa chọn phòng ban nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
              
              <div className="scope-summary-item">
                <Text>Vị trí đã chọn ({selectedPositions.length}):</Text>
                {selectedPositions.length > 0 ? (
                  <div className="scope-tags">
                    {selectedPositions.map(pos => (
                      <div key={pos} className="scope-tag">
                        <TeamOutlined /> {pos}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="Chưa chọn vị trí nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
              
              <div className="scope-summary-item">
                <Text>Cá nhân đã chọn ({selectedUsers.length}):</Text>
                {selectedUsers.length > 0 ? (
                  <div className="scope-tags">
                    {selectedUsers.length <= 5 ? (
                      users
                        .filter(user => selectedUsers.includes(user.id))
                        .map(user => (
                          <div key={user.id} className="scope-tag">
                            <UserOutlined /> {user.name}
                          </div>
                        ))
                    ) : (
                      <Space direction="vertical">
                        {users
                          .filter(user => selectedUsers.includes(user.id))
                          .slice(0, 5)
                          .map(user => (
                            <div key={user.id} className="scope-tag">
                              <UserOutlined /> {user.name}
                            </div>
                          ))}
                        <Text type="secondary">...và {selectedUsers.length - 5} người khác</Text>
                      </Space>
                    )}
                  </div>
                ) : (
                  <Empty description="Chưa chọn cá nhân nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
              
              {totalSelected === 0 && (
                <Alert
                  message="Vui lòng chọn ít nhất một đối tượng đánh giá"
                  type="warning"
                  showIcon
                  style={{ marginTop: 16 }}
                />
              )}
            </Card>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default AssignScopeModal;
