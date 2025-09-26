import React, { useState } from 'react';
import { Card, Row, Col, Button, Select, DatePicker, Table, Statistic, Progress } from 'antd';
import { 
  DownloadOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * Component hiển thị widget báo cáo nhanh và export
 */
const QuickReports = ({ loading }) => {
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [dateRange, setDateRange] = useState([dayjs().startOf('month'), dayjs().endOf('month')]);

  // Danh sách các loại báo cáo
  const reportTypes = [
    { value: 'attendance', label: 'Báo cáo chấm công', icon: <BarChartOutlined /> },
    { value: 'performance', label: 'Báo cáo hiệu suất', icon: <LineChartOutlined /> },
    { value: 'department', label: 'Báo cáo phòng ban', icon: <PieChartOutlined /> },
    { value: 'salary', label: 'Báo cáo lương', icon: <BarChartOutlined /> }
  ];

  // Dữ liệu mẫu cho bảng preview
  const getPreviewData = () => {
    switch (selectedReport) {
      case 'attendance':
        return [
          { key: '1', name: 'Nguyễn Văn A', department: 'Kỹ thuật', workDays: 22, lateDays: 1, efficiency: '95%' },
          { key: '2', name: 'Trần Thị B', department: 'Kinh doanh', workDays: 21, lateDays: 0, efficiency: '100%' },
          { key: '3', name: 'Lê Văn C', department: 'Marketing', workDays: 20, lateDays: 2, efficiency: '90%' },
          { key: '4', name: 'Phạm Thị D', department: 'Nhân sự', workDays: 22, lateDays: 0, efficiency: '100%' }
        ];
      case 'performance':
        return [
          { key: '1', name: 'Nguyễn Văn A', department: 'Kỹ thuật', score: 85, target: 80, status: 'Đạt' },
          { key: '2', name: 'Trần Thị B', department: 'Kinh doanh', score: 92, target: 85, status: 'Vượt' },
          { key: '3', name: 'Lê Văn C', department: 'Marketing', score: 78, target: 80, status: 'Chưa đạt' },
          { key: '4', name: 'Phạm Thị D', department: 'Nhân sự', score: 88, target: 85, status: 'Đạt' }
        ];
      default:
        return [];
    }
  };

  // Cấu hình cột cho bảng
  const getTableColumns = () => {
    switch (selectedReport) {
      case 'attendance':
        return [
          { title: 'Họ tên', dataIndex: 'name', key: 'name' },
          { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
          { title: 'Ngày làm', dataIndex: 'workDays', key: 'workDays' },
          { title: 'Ngày muộn', dataIndex: 'lateDays', key: 'lateDays' },
          { title: 'Hiệu suất', dataIndex: 'efficiency', key: 'efficiency' }
        ];
      case 'performance':
        return [
          { title: 'Họ tên', dataIndex: 'name', key: 'name' },
          { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
          { title: 'Điểm số', dataIndex: 'score', key: 'score' },
          { title: 'Mục tiêu', dataIndex: 'target', key: 'target' },
          { title: 'Trạng thái', dataIndex: 'status', key: 'status' }
        ];
      default:
        return [];
    }
  };

  // Xử lý export
  const handleExport = (format) => {
    console.log(`Exporting ${selectedReport} report as ${format}`);
    // Thực hiện logic export ở đây
  };

  const previewData = getPreviewData();
  const tableColumns = getTableColumns();

  // Thống kê tóm tắt
  const getSummaryStats = () => {
    switch (selectedReport) {
      case 'attendance':
        return [
          { title: 'Tổng nhân viên', value: 128, color: '#1890ff' },
          { title: 'Đi làm đều', value: 115, color: '#52c41a' },
          { title: 'Có muộn', value: 13, color: '#faad14' },
          { title: 'Hiệu suất TB', value: '96%', color: '#722ed1' }
        ];
      case 'performance':
        return [
          { title: 'Tổng đánh giá', value: 128, color: '#1890ff' },
          { title: 'Đạt mục tiêu', value: 98, color: '#52c41a' },
          { title: 'Vượt mục tiêu', value: 45, color: '#13c2c2' },
          { title: 'Điểm TB', value: '85.2', color: '#722ed1' }
        ];
      default:
        return [];
    }
  };

  const summaryStats = getSummaryStats();

  return (
    <Card 
      title="Báo cáo nhanh & Export"
      className="quick-reports-widget"
      loading={loading}
      extra={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="primary" 
            icon={<FileExcelOutlined />} 
            size="small"
            onClick={() => handleExport('excel')}
          >
            Excel
          </Button>
          <Button 
            icon={<FilePdfOutlined />} 
            size="small"
            onClick={() => handleExport('pdf')}
          >
            PDF
          </Button>
        </div>
      }
    >
      {/* Controls */}
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={12} md={8}>
          <Select
            value={selectedReport}
            onChange={setSelectedReport}
            style={{ width: '100%' }}
            placeholder="Chọn loại báo cáo"
          >
            {reportTypes.map(type => (
              <Option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={10}>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
          />
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            block
            onClick={() => handleExport('excel')}
          >
            Tải xuống
          </Button>
        </Col>
      </Row>

      {/* Summary Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        {summaryStats.map((stat, index) => (
          <Col key={index} xs={12} sm={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.color, fontSize: '16px' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Preview Table */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>
          Preview dữ liệu ({reportTypes.find(t => t.value === selectedReport)?.label})
        </h4>
        <Table
          columns={tableColumns}
          dataSource={previewData}
          size="small"
          pagination={{ pageSize: 5, showSizeChanger: false }}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Progress Indicators */}
      <Row gutter={[16, 8]}>
        <Col xs={24} sm={12}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>Tiến độ tạo báo cáo</span>
          </div>
          <Progress percent={100} size="small" status="success" />
        </Col>
        <Col xs={24} sm={12}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>Dữ liệu đã xử lý</span>
          </div>
          <Progress percent={85} size="small" />
        </Col>
      </Row>

      {/* Quick Actions */}
      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        backgroundColor: '#f6f6f6', 
        borderRadius: '6px' 
      }}>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Thao tác nhanh:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="small" type="link" style={{ padding: '0', height: 'auto' }}>
            Lưu template
          </Button>
          <Button size="small" type="link" style={{ padding: '0', height: 'auto' }}>
            Lên lịch gửi
          </Button>
          <Button size="small" type="link" style={{ padding: '0', height: 'auto' }}>
            Chia sẻ
          </Button>
          <Button size="small" type="link" style={{ padding: '0', height: 'auto' }}>
            In báo cáo
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuickReports;
