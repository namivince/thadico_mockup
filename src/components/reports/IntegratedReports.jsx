import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Tabs, 
  Spin, 
  message, 
  Typography
} from 'antd';
import { 
  FormOutlined, 
  BookOutlined, 
  AuditOutlined, 
  AppstoreOutlined
} from '@ant-design/icons';
import ReportFilters from './ReportFilters';
import ReportConfiguration from './ReportConfiguration';
import ReportDisplay from './ReportDisplay';
import './IntegratedReports.css';

const { Title } = Typography;
const { TabPane } = Tabs;

// Mock data for survey report
const mockSurveyData = [
  { name: 'Phòng Nhân sự', value: 85, min: 75, max: 95, count: 12 },
  { name: 'Phòng IT', value: 82, min: 70, max: 94, count: 20 },
  { name: 'Phòng Marketing', value: 79, min: 68, max: 92, count: 15 },
  { name: 'Phòng Kinh doanh', value: 81, min: 72, max: 93, count: 25 },
  { name: 'Phòng Kế toán', value: 84, min: 74, max: 96, count: 8 }
];

// Mock data for training report
const mockTrainingData = [
  { name: 'Kỹ năng lãnh đạo', value: 85, min: 75, max: 95, count: 18 },
  { name: 'Excel nâng cao', value: 78, min: 65, max: 90, count: 22 },
  { name: 'Kỹ năng giao tiếp', value: 88, min: 80, max: 98, count: 25 },
  { name: 'Quản lý dự án', value: 82, min: 72, max: 92, count: 15 },
  { name: 'Tiếng Anh giao tiếp', value: 75, min: 65, max: 85, count: 20 }
];

// Mock data for assessment report
const mockAssessmentData = [
  { name: 'Đánh giá kỹ năng lập trình', value: 80, min: 70, max: 90, count: 15 },
  { name: 'Đánh giá kỹ năng giao tiếp', value: 85, min: 75, max: 95, count: 20 },
  { name: 'Đánh giá kỹ năng quản lý', value: 78, min: 68, max: 88, count: 12 },
  { name: 'Đánh giá kỹ năng lãnh đạo', value: 82, min: 72, max: 92, count: 8 },
  { name: 'Đánh giá kỹ năng làm việc nhóm', value: 87, min: 77, max: 97, count: 25 }
];

// Mock data for integrated report
const mockIntegratedData = [
  { name: 'Phòng Nhân sự', value: 85, min: 75, max: 95, count: 12 },
  { name: 'Phòng IT', value: 82, min: 70, max: 94, count: 20 },
  { name: 'Phòng Marketing', value: 79, min: 68, max: 92, count: 15 },
  { name: 'Phòng Kinh doanh', value: 81, min: 72, max: 93, count: 25 },
  { name: 'Phòng Kế toán', value: 84, min: 74, max: 96, count: 8 }
];

// Mock summary data
const mockSummary = {
  average: 82.7,
  total: 80,
  highest: { name: 'Phòng Nhân sự', value: 85 },
  lowest: { name: 'Phòng Marketing', value: 79 },
  notes: [
    'Điểm trung bình toàn công ty: 82.7',
    'Phòng ban có điểm cao nhất: Nhân sự (85.5)',
    'Phòng ban có điểm thấp nhất: Marketing (79.8)',
    'Tổng số người tham gia: 80'
  ]
};

const IntegratedReports = () => {
  const [activeTab, setActiveTab] = useState('survey');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reportTitle, setReportTitle] = useState('');
  const [reportSummary, setReportSummary] = useState(null);

  // Handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
    setReportData(null);
    setReportTitle('');
    setReportSummary(null);
  };

  // Handle apply filters
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    message.success('Đã áp dụng bộ lọc');
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters(null);
    message.success('Đã đặt lại bộ lọc');
  };

  // Handle generate report
  const handleGenerateReport = (config) => {
    setLoading(true);
    setReportConfig(config);
    
    // Simulate API call
    setTimeout(() => {
      let data;
      let title;
      
      switch (activeTab) {
        case 'survey':
          data = mockSurveyData;
          title = 'Báo cáo khảo sát: So sánh điểm số theo phòng ban';
          break;
        case 'training':
          data = mockTrainingData;
          title = 'Báo cáo đào tạo: So sánh điểm số theo khóa học';
          break;
        case 'assessment':
          data = mockAssessmentData;
          title = 'Báo cáo đánh giá: So sánh điểm số theo loại đánh giá';
          break;
        case 'integrated':
          data = mockIntegratedData;
          title = 'Báo cáo tích hợp: So sánh điểm số theo phòng ban';
          break;
        default:
          data = [];
          title = 'Báo cáo';
      }
      
      setReportData(data);
      setReportTitle(title);
      setReportSummary(mockSummary);
      setLoading(false);
      message.success('Đã tạo báo cáo thành công');
    }, 1500);
  };

  return (
    <div className="integrated-reports">
      <div className="reports-header">
        <Title level={4}>Báo cáo tổng hợp</Title>
      </div>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={handleTabChange}
        className="reports-tabs"
      >
        <TabPane 
          tab={
            <span>
              <FormOutlined />
              Báo cáo khảo sát
            </span>
          } 
          key="survey"
        >
          <ReportFilters 
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
          
          <ReportConfiguration 
            onGenerateReport={handleGenerateReport}
          />
          
          {reportData && reportConfig && (
            <Spin spinning={loading}>
              <ReportDisplay 
                title={reportTitle}
                reportConfig={reportConfig}
                data={reportData}
                summary={reportSummary}
              />
            </Spin>
          )}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <BookOutlined />
              Báo cáo đào tạo
            </span>
          } 
          key="training"
        >
          <ReportFilters 
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
          
          <ReportConfiguration 
            onGenerateReport={handleGenerateReport}
          />
          
          {reportData && reportConfig && (
            <Spin spinning={loading}>
              <ReportDisplay 
                title={reportTitle}
                reportConfig={reportConfig}
                data={reportData}
                summary={reportSummary}
              />
            </Spin>
          )}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <AuditOutlined />
              Báo cáo đánh giá
            </span>
          } 
          key="assessment"
        >
          <ReportFilters 
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
          
          <ReportConfiguration 
            onGenerateReport={handleGenerateReport}
          />
          
          {reportData && reportConfig && (
            <Spin spinning={loading}>
              <ReportDisplay 
                title={reportTitle}
                reportConfig={reportConfig}
                data={reportData}
                summary={reportSummary}
              />
            </Spin>
          )}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <AppstoreOutlined />
              Báo cáo tích hợp
            </span>
          } 
          key="integrated"
        >
          <ReportFilters 
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
          
          <ReportConfiguration 
            onGenerateReport={handleGenerateReport}
          />
          
          {reportData && reportConfig && (
            <Spin spinning={loading}>
              <ReportDisplay 
                title={reportTitle}
                reportConfig={reportConfig}
                data={reportData}
                summary={reportSummary}
              />
            </Spin>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default IntegratedReports;
