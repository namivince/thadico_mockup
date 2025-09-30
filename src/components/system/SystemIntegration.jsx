import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Space,
  Tabs,
  Modal,
  Button,
  Divider,
  message
} from 'antd';
import { 
  ApiOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  SyncOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import ConnectionList from './ConnectionList';
import ConnectionForm from './ConnectionForm';
import SyncHistory from './SyncHistory';
import ErrorLog from './ErrorLog';
import './SystemIntegration.css';

const { TabPane } = Tabs;

// Mock data for statistics
const mockStatistics = {
  activeConnections: 4,
  errorConnections: 1,
  lastSync: '2025-09-30T15:30:00',
  syncedRecords: 1245
};

const SystemIntegration = () => {
  const [activeTab, setActiveTab] = useState('connections');
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [editingConnection, setEditingConnection] = useState(null);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(null);
  const [testResult, setTestResult] = useState(null);

  // Load statistics
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStatistics(mockStatistics);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Handle add connection
  const handleAddConnection = () => {
    setEditingConnection(null);
    setFormVisible(true);
  };

  // Handle edit connection
  const handleEditConnection = (connection) => {
    setEditingConnection(connection);
    setFormVisible(true);
  };

  // Handle save connection
  const handleSaveConnection = (connectionData) => {
    // In a real application, you would save the connection data to the server
    console.log('Save connection:', connectionData);
    setFormVisible(false);
    
    // Update statistics
    if (!editingConnection) {
      setStatistics({
        ...statistics,
        activeConnections: statistics.activeConnections + 1
      });
    }
  };

  // Handle test connection
  const handleTestConnection = (connection) => {
    setTestingConnection(connection);
    setTestModalVisible(true);
    setTestResult(null);
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
      setTestResult({
        success,
        message: success 
          ? 'Kết nối thành công!' 
          : 'Kết nối thất bại: Unauthorized Access (401)',
        details: success 
          ? { latency: '120ms', version: '2.1.0', endpoints: ['users', 'departments', 'courses'] }
          : { error: 'Unauthorized Access', code: 401, suggestion: 'Kiểm tra thông tin xác thực' }
      });
    }, 2000);
  };

  // Handle manual sync
  const handleManualSync = (record) => {
    // In a real application, you would trigger a manual sync
    console.log('Manual sync:', record);
    message.success(`Đã bắt đầu đồng bộ ${record.connectionName}`);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="system-integration">
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="statistics-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="statistic-card active-card">
            <Statistic
              title="Kết nối hoạt động"
              value={statistics.activeConnections}
              prefix={<CheckCircleOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="statistic-card error-card">
            <Statistic
              title="Kết nối lỗi"
              value={statistics.errorConnections}
              prefix={<CloseCircleOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="statistic-card sync-card">
            <Statistic
              title="Đồng bộ gần nhất"
              value={formatDate(statistics.lastSync)}
              prefix={<SyncOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="statistic-card records-card">
            <Statistic
              title="Bản ghi đã đồng bộ"
              value={statistics.syncedRecords}
              prefix={<DatabaseOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Tabs 
        activeKey={activeTab} 
        onChange={handleTabChange}
        className="integration-tabs"
      >
        <TabPane 
          tab={
            <Space>
              <ApiOutlined />
              Kết nối
            </Space>
          } 
          key="connections"
        >
          <ConnectionList 
            onEdit={handleEditConnection}
            onAdd={handleAddConnection}
            onTest={handleTestConnection}
          />
        </TabPane>
        <TabPane 
          tab={
            <Space>
              <SyncOutlined />
              Lịch sử đồng bộ
            </Space>
          } 
          key="history"
        >
          <SyncHistory onSync={handleManualSync} />
        </TabPane>
        <TabPane 
          tab={
            <Space>
              <CloseCircleOutlined />
              Nhật ký lỗi
            </Space>
          } 
          key="errors"
        >
          <ErrorLog />
        </TabPane>
      </Tabs>

      {/* Connection Form Modal */}
      <Modal
        title={editingConnection ? 'Chỉnh sửa kết nối' : 'Thêm kết nối mới'}
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
        className="connection-form-modal"
      >
        <ConnectionForm 
          connection={editingConnection}
          onSave={handleSaveConnection}
          onCancel={() => setFormVisible(false)}
        />
      </Modal>

      {/* Test Connection Modal */}
      <Modal
        title="Kiểm tra kết nối"
        open={testModalVisible}
        onCancel={() => setTestModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setTestModalVisible(false)}>
            Đóng
          </Button>
        ]}
        className="test-connection-modal"
      >
        {testingConnection && (
          <div className="test-connection-content">
            <div className="connection-info">
              <p><strong>Kết nối:</strong> {testingConnection.name}</p>
              <p><strong>URL:</strong> {testingConnection.url}</p>
              <p><strong>Phương thức xác thực:</strong> {testingConnection.authMethod}</p>
            </div>
            
            <Divider />
            
            {!testResult ? (
              <div className="testing-status">
                <SyncOutlined spin style={{ fontSize: 24 }} />
                <p>Đang kiểm tra kết nối...</p>
              </div>
            ) : (
              <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
                {testResult.success ? (
                  <>
                    <CheckCircleOutlined style={{ fontSize: 24, color: '#22C55E' }} />
                    <h3>{testResult.message}</h3>
                    <div className="result-details">
                      <p><strong>Độ trễ:</strong> {testResult.details.latency}</p>
                      <p><strong>Phiên bản API:</strong> {testResult.details.version}</p>
                      <p><strong>Endpoints khả dụng:</strong> {testResult.details.endpoints.join(', ')}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <CloseCircleOutlined style={{ fontSize: 24, color: '#EF4444' }} />
                    <h3>{testResult.message}</h3>
                    <div className="result-details">
                      <p><strong>Mã lỗi:</strong> {testResult.details.code}</p>
                      <p><strong>Gợi ý:</strong> {testResult.details.suggestion}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SystemIntegration;
