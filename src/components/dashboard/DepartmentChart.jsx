import React from 'react';
import { Card, Row, Col, Progress } from 'antd';

/**
 * Component hiển thị biểu đồ phân bố nhân sự theo phòng ban
 */
const DepartmentChart = ({ data, loading }) => {
  // Dữ liệu mẫu cho biểu đồ
  const defaultData = [
    { department: 'Kỹ thuật', count: 45, percentage: 35 },
    { department: 'Kinh doanh', count: 32, percentage: 25 },
    { department: 'Marketing', count: 20, percentage: 15 },
    { department: 'Nhân sự', count: 15, percentage: 12 },
    { department: 'Kế toán', count: 10, percentage: 8 },
    { department: 'Khác', count: 6, percentage: 5 }
  ];

  const chartData = data || defaultData;
  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card 
      title="Phân bố nhân sự theo phòng ban" 
      className="department-chart-widget"
      loading={loading}
      extra={
        <span style={{ fontSize: '12px', color: '#666' }}>
          Cập nhật: {new Date().toLocaleDateString('vi-VN')}
        </span>
      }
    >
      {/* Tổng số nhân viên */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '24px', 
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalCount}</div>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>Tổng số nhân viên</div>
      </div>

      {/* Progress bars cho từng phòng ban */}
      <div style={{ marginBottom: '16px' }}>
        {chartData.map((item, index) => {
          const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2'];
          return (
            <div key={item.department} style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: colors[index % colors.length], 
                    borderRadius: '50%',
                    marginRight: '8px'
                  }}></div>
                  {item.department}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <Progress 
                percent={item.percentage} 
                strokeColor={colors[index % colors.length]}
                showInfo={false}
                strokeWidth={8}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DepartmentChart;
