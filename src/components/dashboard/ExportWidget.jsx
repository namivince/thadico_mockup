import React, { useState } from 'react';
import { Card, Button, Radio, Space, Dropdown, Menu, message, Typography } from 'antd';
import { 
  FileExcelOutlined, 
  FilePdfOutlined, 
  DownOutlined,
  DownloadOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import './ExportWidget.css';

const { Title, Text } = Typography;

/**
 * Component hiển thị widget xuất báo cáo
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const ExportWidget = ({ loading }) => {
  const [period, setPeriod] = useState('month');
  
  // Xử lý khi thay đổi kỳ báo cáo
  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };
  
  // Xử lý khi xuất báo cáo
  const handleExport = (format) => {
    message.loading(`Đang xuất báo cáo ${getPeriodText(period)} định dạng ${format.toUpperCase()}...`);
    
    // Giả lập xuất báo cáo
    setTimeout(() => {
      message.success(`Đã xuất báo cáo ${getPeriodText(period)} định dạng ${format.toUpperCase()} thành công!`);
    }, 1500);
  };
  
  // Lấy text hiển thị cho kỳ báo cáo
  const getPeriodText = (period) => {
    switch (period) {
      case 'month':
        return 'tháng';
      case 'quarter':
        return 'quý';
      case 'year':
        return 'năm';
      default:
        return '';
    }
  };
  
  // Menu xuất báo cáo
  const exportMenu = (
    <Menu onClick={({ key }) => handleExport(key)}>
      <Menu.Item key="xlsx" icon={<FileExcelOutlined />}>Excel (.xlsx)</Menu.Item>
      <Menu.Item key="pdf" icon={<FilePdfOutlined />}>PDF Report</Menu.Item>
    </Menu>
  );
  
  return (
    <Card 
      title={
        <div className="export-card-title">
          <DownloadOutlined style={{ marginRight: 8 }} />
          <span>Xuất báo cáo</span>
        </div>
      }
      className="export-widget-card"
      loading={loading}
    >
      <div className="export-content">
        <div className="period-selector">
          <Text strong>Kỳ báo cáo:</Text>
          <Radio.Group 
            value={period} 
            onChange={handlePeriodChange}
            buttonStyle="solid"
            style={{ marginTop: 8 }}
          >
            <Radio.Button value="month">
              <CalendarOutlined /> Tháng
            </Radio.Button>
            <Radio.Button value="quarter">
              <CalendarOutlined /> Quý
            </Radio.Button>
            <Radio.Button value="year">
              <CalendarOutlined /> Năm
            </Radio.Button>
          </Radio.Group>
        </div>
        
        <div className="export-buttons">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button 
              type="primary" 
              icon={<FileExcelOutlined />} 
              onClick={() => handleExport('xlsx')}
              block
            >
              Xuất Excel
            </Button>
            
            <Dropdown overlay={exportMenu} trigger={['click']}>
              <Button block>
                Định dạng khác <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ExportWidget;
