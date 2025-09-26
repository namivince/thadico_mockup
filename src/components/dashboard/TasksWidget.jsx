import React from 'react';
import { Card, List, Progress, Tag, Avatar } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

/**
 * Component hiển thị danh sách công việc cần làm
 */
const TasksWidget = ({ loading }) => {
  const tasks = [
    {
      id: 1,
      title: 'Phê duyệt đơn xin nghỉ phép',
      priority: 'high',
      dueDate: '2025-09-26',
      status: 'pending',
      assignee: 'Nguyễn Văn A',
      progress: 0
    },
    {
      id: 2,
      title: 'Review báo cáo tháng 9',
      priority: 'medium',
      dueDate: '2025-09-27',
      status: 'in_progress',
      assignee: 'Trần Thị B',
      progress: 65
    },
    {
      id: 3,
      title: 'Chuẩn bị meeting Q4',
      priority: 'medium',
      dueDate: '2025-09-28',
      status: 'in_progress',
      assignee: 'Lê Văn C',
      progress: 30
    },
    {
      id: 4,
      title: 'Cập nhật quy trình HR',
      priority: 'low',
      dueDate: '2025-09-30',
      status: 'completed',
      assignee: 'Phạm Thị D',
      progress: 100
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in_progress': return <ClockCircleOutlined style={{ color: '#1890ff' }} />;
      case 'pending': return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      default: return <ClockCircleOutlined style={{ color: '#666' }} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f5222d';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#666';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Cao';
      case 'medium': return 'Trung bình';
      case 'low': return 'Thấp';
      default: return 'Bình thường';
    }
  };

  return (
    <Card 
      title="Công việc cần làm"
      className="tasks-widget"
      loading={loading}
      extra={
        <Tag color="blue" size="small">
          {tasks.filter(t => t.status !== 'completed').length} việc
        </Tag>
      }
    >
      <List
        size="small"
        dataSource={tasks}
        renderItem={task => (
          <List.Item
            style={{
              padding: '8px 0',
              opacity: task.status === 'completed' ? 0.6 : 1
            }}
          >
            <List.Item.Meta
              avatar={getStatusIcon(task.status)}
              title={
                <div style={{ 
                  fontSize: '13px',
                  textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                }}>
                  {task.title}
                  <Tag 
                    size="small" 
                    color={getPriorityColor(task.priority)}
                    style={{ marginLeft: '8px', fontSize: '10px' }}
                  >
                    {getPriorityText(task.priority)}
                  </Tag>
                </div>
              }
              description={
                <div>
                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>
                    👤 {task.assignee} • 📅 {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                  </div>
                  {task.status === 'in_progress' && (
                    <Progress 
                      percent={task.progress} 
                      size="small" 
                      showInfo={false}
                      strokeColor={getPriorityColor(task.priority)}
                    />
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
      
      <div style={{ 
        marginTop: '12px', 
        padding: '8px', 
        backgroundColor: '#f6f6f6', 
        borderRadius: '6px',
        fontSize: '11px',
        color: '#666',
        textAlign: 'center'
      }}>
        ✅ {tasks.filter(t => t.status === 'completed').length} hoàn thành • 
        🔄 {tasks.filter(t => t.status === 'in_progress').length} đang làm • 
        ⏳ {tasks.filter(t => t.status === 'pending').length} chờ xử lý
      </div>
    </Card>
  );
};

export default TasksWidget;
