import React from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Typography, 
  Divider,
  Row,
  Col,
  Descriptions,
  Statistic
} from 'antd';
import { 
  FileExcelOutlined, 
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import './ReportDisplay.css';

const { Title, Text } = Typography;

// Colors for charts
const COLORS = ['#7C4DFF', '#10BDBD', '#FF9800', '#22C55E', '#EF4444'];

const ReportDisplay = ({ 
  title, 
  reportConfig, 
  data, 
  tableData, 
  summary,
  loading = false
}) => {
  // Render chart based on chart type
  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="no-data">
          <Text type="secondary">Không có dữ liệu để hiển thị</Text>
        </div>
      );
    }

    switch (reportConfig.chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="value" name="Giá trị" fill="#7C4DFF" />
              {reportConfig.displayOptions.includes('minmax') && (
                <>
                  <Bar dataKey="min" name="Thấp nhất" fill="#EF4444" />
                  <Bar dataKey="max" name="Cao nhất" fill="#22C55E" />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Giá trị" 
                stroke="#7C4DFF" 
                activeDot={{ r: 8 }} 
              />
              {reportConfig.displayOptions.includes('minmax') && (
                <>
                  <Line type="monotone" dataKey="min" name="Thấp nhất" stroke="#EF4444" />
                  <Line type="monotone" dataKey="max" name="Cao nhất" stroke="#22C55E" />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="value" 
                name="Giá trị" 
                stroke="#7C4DFF"
                fill="#D4BBFF" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar 
                name="Giá trị" 
                dataKey="value" 
                stroke="#7C4DFF" 
                fill="#D4BBFF" 
                fillOpacity={0.6} 
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: 'Thấp nhất',
      dataIndex: 'min',
      key: 'min',
      sorter: (a, b) => a.min - b.min,
      render: (text) => text || '-',
    },
    {
      title: 'Cao nhất',
      dataIndex: 'max',
      key: 'max',
      sorter: (a, b) => a.max - b.max,
      render: (text) => text || '-',
    },
    {
      title: 'Số người',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
      render: (text) => text || '-',
    }
  ];

  // Handle export to Excel
  const handleExportExcel = () => {
    console.log('Export to Excel');
    // In a real application, you would implement the export functionality
  };

  // Handle export to PDF
  const handleExportPDF = () => {
    console.log('Export to PDF');
    // In a real application, you would implement the export functionality
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    console.log('Export to CSV');
    // In a real application, you would implement the export functionality
  };

  // Handle print
  const handlePrint = () => {
    console.log('Print report');
    window.print();
  };

  // Handle share
  const handleShare = () => {
    console.log('Share report');
    // In a real application, you would implement the share functionality
  };

  // Handle schedule
  const handleSchedule = () => {
    console.log('Schedule report');
    // In a real application, you would implement the schedule functionality
  };

  return (
    <div className="report-display">
      <Card 
        title={
          <Title level={5}>{title || 'Báo cáo'}</Title>
        }
        className="report-chart-card"
      >
        {renderChart()}
      </Card>
      
      <Card 
        title="Dữ liệu chi tiết"
        className="report-table-card"
      >
        <Table
          columns={columns}
          dataSource={tableData || data}
          rowKey="name"
          pagination={false}
          size="middle"
          loading={loading}
        />
      </Card>
      
      {summary && (
        <Card 
          title="Tổng hợp"
          className="report-summary-card"
        >
          <Row gutter={[16, 16]}>
            {summary.average && (
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="Giá trị trung bình" 
                  value={summary.average} 
                  precision={2} 
                />
              </Col>
            )}
            {summary.total && (
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="Tổng" 
                  value={summary.total} 
                  precision={2} 
                />
              </Col>
            )}
            {summary.highest && (
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="Cao nhất" 
                  value={summary.highest.value} 
                  precision={2}
                  suffix={summary.highest.name && `(${summary.highest.name})`}
                />
              </Col>
            )}
            {summary.lowest && (
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="Thấp nhất" 
                  value={summary.lowest.value} 
                  precision={2}
                  suffix={summary.lowest.name && `(${summary.lowest.name})`}
                />
              </Col>
            )}
          </Row>
          
          {summary.notes && (
            <>
              <Divider />
              <div className="summary-notes">
                <Text strong>Ghi chú:</Text>
                <ul>
                  {summary.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </Card>
      )}
      
      <div className="report-actions">
        <Space>
          <Button 
            icon={<FilePdfOutlined />} 
            onClick={handleExportPDF}
          >
            PDF
          </Button>
          <Button 
            icon={<FileExcelOutlined />} 
            onClick={handleExportExcel}
          >
            Excel
          </Button>
          <Button 
            icon={<FileTextOutlined />} 
            onClick={handleExportCSV}
          >
            CSV
          </Button>
          <Button 
            icon={<PrinterOutlined />} 
            onClick={handlePrint}
          >
            In
          </Button>
          <Button 
            icon={<ShareAltOutlined />} 
            onClick={handleShare}
          >
            Chia sẻ
          </Button>
        </Space>
        <Button 
          type="primary" 
          icon={<ScheduleOutlined />} 
          onClick={handleSchedule}
        >
          Lên lịch báo cáo
        </Button>
      </div>
    </div>
  );
};

export default ReportDisplay;
