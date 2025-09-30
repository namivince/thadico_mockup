import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Select, 
  Checkbox, 
  Button, 
  Space, 
  Divider,
  Row,
  Col,
  Input,
  Modal,
  message
} from 'antd';
import { 
  BarChartOutlined, 
  SaveOutlined,
  PlayCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import './ReportConfiguration.css';

const { Option } = Select;

// Mock data for chart types
const mockChartTypes = [
  { id: 'bar', name: 'Biểu đồ cột' },
  { id: 'line', name: 'Biểu đồ đường' },
  { id: 'pie', name: 'Biểu đồ tròn' },
  { id: 'area', name: 'Biểu đồ diện tích' },
  { id: 'radar', name: 'Biểu đồ radar' }
];

// Mock data for X axis options
const mockXAxisOptions = [
  { id: 'department', name: 'Phòng ban' },
  { id: 'date', name: 'Thời gian' },
  { id: 'status', name: 'Trạng thái' },
  { id: 'participant', name: 'Người tham gia' }
];

// Mock data for Y axis options
const mockYAxisOptions = [
  { id: 'score', name: 'Điểm số' },
  { id: 'count', name: 'Số lượng' },
  { id: 'percentage', name: 'Phần trăm' },
  { id: 'time', name: 'Thời gian' }
];

// Mock data for display options
const mockDisplayOptions = [
  { id: 'average', name: 'Điểm trung bình' },
  { id: 'minmax', name: 'Điểm cao nhất/thấp nhất' },
  { id: 'stddev', name: 'Độ lệch chuẩn' },
  { id: 'participants', name: 'Số lượng người tham gia' }
];

// Mock data for saved configurations
const mockSavedConfigs = [
  { id: 1, name: 'Báo cáo điểm số theo phòng ban' },
  { id: 2, name: 'Báo cáo tham gia theo thời gian' },
  { id: 3, name: 'Báo cáo hiệu quả đào tạo' }
];

const ReportConfiguration = ({ onGenerateReport }) => {
  const [form] = Form.useForm();
  const [chartType, setChartType] = useState('bar');
  const [xAxis, setXAxis] = useState('department');
  const [yAxis, setYAxis] = useState('score');
  const [displayOptions, setDisplayOptions] = useState(['average', 'minmax', 'participants']);
  const [savedConfigs, setSavedConfigs] = useState(mockSavedConfigs);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [configName, setConfigName] = useState('');

  // Handle chart type change
  const handleChartTypeChange = (value) => {
    setChartType(value);
  };

  // Handle X axis change
  const handleXAxisChange = (value) => {
    setXAxis(value);
  };

  // Handle Y axis change
  const handleYAxisChange = (value) => {
    setYAxis(value);
  };

  // Handle display options change
  const handleDisplayOptionsChange = (checkedValues) => {
    setDisplayOptions(checkedValues);
  };

  // Handle saved config selection
  const handleConfigSelect = (value) => {
    setSelectedConfig(value);
    
    // Find the selected config
    const config = savedConfigs.find(c => c.id === value);
    if (config) {
      // In a real application, you would load the configuration details from the server
      message.success(`Đã tải cấu hình: ${config.name}`);
      
      // Simulate loading configuration
      setTimeout(() => {
        setChartType('bar');
        setXAxis('department');
        setYAxis('score');
        setDisplayOptions(['average', 'minmax', 'participants']);
        
        form.setFieldsValue({
          chartType: 'bar',
          xAxis: 'department',
          yAxis: 'score',
          displayOptions: ['average', 'minmax', 'participants']
        });
      }, 500);
    }
  };

  // Handle save configuration
  const handleSaveConfig = () => {
    setSaveModalVisible(true);
  };

  // Handle save configuration confirm
  const handleSaveConfigConfirm = () => {
    if (!configName.trim()) {
      message.error('Vui lòng nhập tên cấu hình');
      return;
    }
    
    // Create new config
    const newConfig = {
      id: Date.now(),
      name: configName,
      chartType,
      xAxis,
      yAxis,
      displayOptions
    };
    
    // Add to saved configs
    setSavedConfigs([...savedConfigs, newConfig]);
    setSelectedConfig(newConfig.id);
    setSaveModalVisible(false);
    setConfigName('');
    
    message.success('Đã lưu cấu hình báo cáo');
  };

  // Handle generate report
  const handleGenerateReport = () => {
    const reportConfig = {
      chartType,
      xAxis,
      yAxis,
      displayOptions
    };
    
    onGenerateReport(reportConfig);
  };

  return (
    <Card 
      title={
        <Space>
          <BarChartOutlined />
          <span>Cấu hình báo cáo</span>
        </Space>
      }
      className="report-config-card"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          chartType,
          xAxis,
          yAxis,
          displayOptions
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="chartType"
              label="Loại biểu đồ"
            >
              <Select 
                style={{ width: '100%' }}
                value={chartType}
                onChange={handleChartTypeChange}
              >
                {mockChartTypes.map(type => (
                  <Option key={type.id} value={type.id}>{type.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="xAxis"
              label="Trục X"
            >
              <Select 
                style={{ width: '100%' }}
                value={xAxis}
                onChange={handleXAxisChange}
              >
                {mockXAxisOptions.map(option => (
                  <Option key={option.id} value={option.id}>{option.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="yAxis"
              label="Trục Y"
            >
              <Select 
                style={{ width: '100%' }}
                value={yAxis}
                onChange={handleYAxisChange}
              >
                {mockYAxisOptions.map(option => (
                  <Option key={option.id} value={option.id}>{option.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          name="displayOptions"
          label="Hiển thị"
        >
          <Checkbox.Group 
            options={mockDisplayOptions.map(option => ({ label: option.name, value: option.id }))}
            value={displayOptions}
            onChange={handleDisplayOptionsChange}
          />
        </Form.Item>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Form.Item
              label="Cấu hình đã lưu"
            >
              <Select 
                style={{ width: '100%' }}
                placeholder="Chọn cấu hình"
                value={selectedConfig}
                onChange={handleConfigSelect}
              >
                {savedConfigs.map(config => (
                  <Option key={config.id} value={config.id}>{config.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Divider style={{ margin: '8px 0 16px' }} />
        
        <div className="config-actions">
          <Button 
            icon={<SaveOutlined />} 
            onClick={handleSaveConfig}
          >
            Lưu cấu hình
          </Button>
          <Button 
            type="primary" 
            icon={<PlayCircleOutlined />} 
            onClick={handleGenerateReport}
          >
            Tạo báo cáo
          </Button>
        </div>
      </Form>
      
      <Modal
        title="Lưu cấu hình báo cáo"
        open={saveModalVisible}
        onOk={handleSaveConfigConfirm}
        onCancel={() => setSaveModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical">
          <Form.Item
            label="Tên cấu hình"
            rules={[{ required: true, message: 'Vui lòng nhập tên cấu hình' }]}
          >
            <Input 
              placeholder="Nhập tên cấu hình" 
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ReportConfiguration;
