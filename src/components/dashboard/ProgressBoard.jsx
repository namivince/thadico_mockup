import React, { useState } from 'react';
import { Row, Col, Card, Progress, Typography, Tag, List, Badge, Tooltip, Button } from 'antd';
import { 
  FormOutlined, 
  BookOutlined, 
  TrophyOutlined,
  RightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './ProgressBoard.css';

const { Title, Text } = Typography;

/**
 * Component hiển thị Progress Board cho 3 luồng chính
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const ProgressBoard = ({ data, loading }) => {
  const navigate = useNavigate();
  const [expandedF1, setExpandedF1] = useState(false);
  const [expandedF2, setExpandedF2] = useState(false);
  const [expandedF3, setExpandedF3] = useState(false);

  // Xử lý khi click vào progress bar
  const handleProgressClick = (flow) => {
    switch (flow) {
      case 'F1':
        navigate('/surveys');
        break;
      case 'F2':
        navigate('/training/plans');
        break;
      case 'F3':
        navigate('/assessment/rounds');
        break;
      default:
        break;
    }
  };
  
  // Xử lý khi click vào todo item
  const handleTodoClick = (flow, item) => {
    if (item.href) {
      navigate(item.href);
    } else {
      // Mặc định điều hướng theo flow
      handleProgressClick(flow);
    }
  };
  
  // Render badge cho todo item
  const renderTodoBadge = (type) => {
    switch (type) {
      case 'overdue':
        return <Badge count={<ExclamationCircleOutlined style={{ color: '#f5222d' }} />} />;
      case 'urgent':
        return <Badge count={<WarningOutlined style={{ color: '#faad14' }} />} />;
      case 'pending':
        return <Badge count={<ClockCircleOutlined style={{ color: '#1890ff' }} />} />;
      case 'info':
        return <Badge count={<InfoCircleOutlined style={{ color: '#52c41a' }} />} />;
      default:
        return null;
    }
  };

  // Render progress cho F1 - Surveys
  const renderF1Progress = () => {
    const f1Data = data?.F1 || {};
    const todoItems = f1Data.todo || [];
    const displayItems = expandedF1 ? todoItems : todoItems.slice(0, 3);
    const hasMore = todoItems.length > 3;
    
    // Tính toán % hoàn thành dựa trên số lượng hoàn thành / tổng số
    const total = f1Data.total || 0;
    const completed = f1Data.completed || 0;
    const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Tính toán số lượng các loại công việc
    const overdueCount = f1Data.overdue || 0;
    const inProgressCount = f1Data.inProgress || 0;
    
    return (
      <Card 
        title={
          <div className="progress-card-title">
            <FormOutlined style={{ marginRight: 8, color: '#7C4DFF' }} />
            <span>Khảo sát</span>
            {overdueCount > 0 && (
              <Tooltip title={`${overdueCount} khảo sát quá hạn`}>
                <Badge count={overdueCount} style={{ marginLeft: 8, backgroundColor: '#f5222d' }} />
              </Tooltip>
            )}
          </div>
        }
        className="progress-card f1-progress"
        loading={loading}
      >
        <div className="progress-section" onClick={() => handleProgressClick('F1')}>
          <div className="progress-header">
            <div>
              <Text>Tiến độ hoàn thành</Text>
              <div className="progress-stats">
                <Tooltip title="Đã hoàn thành">
                  <Tag icon={<CheckCircleOutlined />} color="success">{completed}/{total}</Tag>
                </Tooltip>
                {inProgressCount > 0 && (
                  <Tooltip title="Đang thực hiện">
                    <Tag icon={<ClockCircleOutlined />} color="processing">{inProgressCount}</Tag>
                  </Tooltip>
                )}
                {overdueCount > 0 && (
                  <Tooltip title="Quá hạn">
                    <Tag icon={<ExclamationCircleOutlined />} color="error">{overdueCount}</Tag>
                  </Tooltip>
                )}
              </div>
            </div>
            <Text strong>{completionPct}%</Text>
          </div>
          <Progress 
            percent={completionPct} 
            strokeColor="#7C4DFF" 
            trailColor="#E9ECEF"
            showInfo={false}
            className="progress-bar"
          />
        </div>
        
        <div className="todo-section">
          <div className="todo-header">
            <Title level={5}>Việc cần làm</Title>
            <Badge count={todoItems.length} style={{ backgroundColor: todoItems.length > 0 ? '#7C4DFF' : '#d9d9d9' }} />
          </div>
          
          {todoItems.length > 0 ? (
            <>
              <List
                size="small"
                dataSource={displayItems}
                renderItem={item => (
                  <List.Item 
                    className="todo-item"
                    onClick={() => handleTodoClick('F1', item)}
                  >
                    <div className="todo-item-content">
                      <Tag color="#7C4DFF" className="todo-tag">F1</Tag>
                      <div className="todo-text">
                        <Text>{item.title || item}</Text>
                        {item.description && (
                          <Text type="secondary" className="todo-description">{item.description}</Text>
                        )}
                      </div>
                    </div>
                    <div className="todo-actions">
                      {item.type && renderTodoBadge(item.type)}
                      <RightOutlined className="todo-arrow" />
                    </div>
                  </List.Item>
                )}
              />
              
              {hasMore && (
                <Button 
                  type="link" 
                  onClick={() => setExpandedF1(!expandedF1)}
                  className="show-more-btn"
                >
                  {expandedF1 ? 'Thu gọn' : `Xem thêm ${todoItems.length - 3} việc`}
                </Button>
              )}
            </>
          ) : (
            <div className="empty-todo">
              <Text type="secondary">Không có việc cần làm</Text>
            </div>
          )}
        </div>
      </Card>
    );
  };

  // Render progress cho F2 - Training Plans
  const renderF2Progress = () => {
    const f2Data = data?.F2 || {};
    const todoItems = f2Data.todo || [];
    const displayItems = expandedF2 ? todoItems : todoItems.slice(0, 3);
    const hasMore = todoItems.length > 3;
    
    // Tính toán % hoàn thành dựa trên số lượng hoàn thành / tổng số
    const total = f2Data.total || 0;
    const completed = f2Data.completed || 0;
    const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Tính toán số lượng các loại công việc
    const onHoldCount = f2Data.onHold || 0;
    const inProgressCount = f2Data.inProgress || 0;
    const pendingApprovalCount = f2Data.waitingApproval || 0;
    
    return (
      <Card 
        title={
          <div className="progress-card-title">
            <BookOutlined style={{ marginRight: 8, color: '#10BDBD' }} />
            <span>Kế hoạch đào tạo</span>
            {pendingApprovalCount > 0 && (
              <Tooltip title={`${pendingApprovalCount} kế hoạch chờ duyệt`}>
                <Badge count={pendingApprovalCount} style={{ marginLeft: 8, backgroundColor: '#faad14' }} />
              </Tooltip>
            )}
          </div>
        }
        className="progress-card f2-progress"
        loading={loading}
      >
        <div className="progress-section" onClick={() => handleProgressClick('F2')}>
          <div className="progress-header">
            <div>
              <Text>Tiến độ hoàn thành</Text>
              <div className="progress-stats">
                <Tooltip title="Đã hoàn thành">
                  <Tag icon={<CheckCircleOutlined />} color="success">{completed}/{total}</Tag>
                </Tooltip>
                {inProgressCount > 0 && (
                  <Tooltip title="Đang thực hiện">
                    <Tag icon={<ClockCircleOutlined />} color="processing">{inProgressCount}</Tag>
                  </Tooltip>
                )}
                {onHoldCount > 0 && (
                  <Tooltip title="Tạm hoãn">
                    <Tag icon={<WarningOutlined />} color="warning">{onHoldCount}</Tag>
                  </Tooltip>
                )}
                {pendingApprovalCount > 0 && (
                  <Tooltip title="Chờ duyệt">
                    <Tag icon={<InfoCircleOutlined />} color="default">{pendingApprovalCount}</Tag>
                  </Tooltip>
                )}
              </div>
            </div>
            <Text strong>{completionPct}%</Text>
          </div>
          <Progress 
            percent={completionPct} 
            strokeColor="#10BDBD" 
            trailColor="#E9ECEF"
            showInfo={false}
            className="progress-bar"
          />
        </div>
        
        <div className="todo-section">
          <div className="todo-header">
            <Title level={5}>Việc cần làm</Title>
            <Badge count={todoItems.length} style={{ backgroundColor: todoItems.length > 0 ? '#10BDBD' : '#d9d9d9' }} />
          </div>
          
          {todoItems.length > 0 ? (
            <>
              <List
                size="small"
                dataSource={displayItems}
                renderItem={item => (
                  <List.Item 
                    className="todo-item"
                    onClick={() => handleTodoClick('F2', item)}
                  >
                    <div className="todo-item-content">
                      <Tag color="#10BDBD" className="todo-tag">F2</Tag>
                      <div className="todo-text">
                        <Text>{item.title || item}</Text>
                        {item.description && (
                          <Text type="secondary" className="todo-description">{item.description}</Text>
                        )}
                      </div>
                    </div>
                    <div className="todo-actions">
                      {item.type && renderTodoBadge(item.type)}
                      <RightOutlined className="todo-arrow" />
                    </div>
                  </List.Item>
                )}
              />
              
              {hasMore && (
                <Button 
                  type="link" 
                  onClick={() => setExpandedF2(!expandedF2)}
                  className="show-more-btn"
                >
                  {expandedF2 ? 'Thu gọn' : `Xem thêm ${todoItems.length - 3} việc`}
                </Button>
              )}
            </>
          ) : (
            <div className="empty-todo">
              <Text type="secondary">Không có việc cần làm</Text>
            </div>
          )}
        </div>
      </Card>
    );
  };

  // Render progress cho F3 - Assessments
  const renderF3Progress = () => {
    const f3Data = data?.F3 || {};
    const todoItems = f3Data.todo || [];
    const displayItems = expandedF3 ? todoItems : todoItems.slice(0, 3);
    const hasMore = todoItems.length > 3;
    
    // Tính toán % hoàn thành dựa trên số lượng hoàn thành / tổng số
    const total = f3Data.total || 0;
    const completed = f3Data.completed || 0;
    const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Tính toán số lượng các loại công việc
    const inProgressCount = f3Data.inProgress || 0;
    const pendingCount = f3Data.pending || 0;
    
    return (
      <Card 
        title={
          <div className="progress-card-title">
            <TrophyOutlined style={{ marginRight: 8, color: '#FF9800' }} />
            <span>Đánh giá năng lực</span>
            {pendingCount > 0 && (
              <Tooltip title={`${pendingCount} đánh giá chờ xử lý`}>
                <Badge count={pendingCount} style={{ marginLeft: 8, backgroundColor: '#faad14' }} />
              </Tooltip>
            )}
          </div>
        }
        className="progress-card f3-progress"
        loading={loading}
      >
        <div className="progress-section" onClick={() => handleProgressClick('F3')}>
          <div className="progress-header">
            <div>
              <Text>Tiến độ hoàn thành</Text>
              <div className="progress-stats">
                <Tooltip title="Đã hoàn thành">
                  <Tag icon={<CheckCircleOutlined />} color="success">{completed}/{total}</Tag>
                </Tooltip>
                {inProgressCount > 0 && (
                  <Tooltip title="Đang thực hiện">
                    <Tag icon={<ClockCircleOutlined />} color="processing">{inProgressCount}</Tag>
                  </Tooltip>
                )}
                {pendingCount > 0 && (
                  <Tooltip title="Chờ xử lý">
                    <Tag icon={<InfoCircleOutlined />} color="default">{pendingCount}</Tag>
                  </Tooltip>
                )}
              </div>
            </div>
            <Text strong>{completionPct}%</Text>
          </div>
          <Progress 
            percent={completionPct} 
            strokeColor="#FF9800" 
            trailColor="#E9ECEF"
            showInfo={false}
            className="progress-bar"
          />
        </div>
        
        <div className="todo-section">
          <div className="todo-header">
            <Title level={5}>Việc cần làm</Title>
            <Badge count={todoItems.length} style={{ backgroundColor: todoItems.length > 0 ? '#FF9800' : '#d9d9d9' }} />
          </div>
          
          {todoItems.length > 0 ? (
            <>
              <List
                size="small"
                dataSource={displayItems}
                renderItem={item => (
                  <List.Item 
                    className="todo-item"
                    onClick={() => handleTodoClick('F3', item)}
                  >
                    <div className="todo-item-content">
                      <Tag color="#FF9800" className="todo-tag">F3</Tag>
                      <div className="todo-text">
                        <Text>{item.title || item}</Text>
                        {item.description && (
                          <Text type="secondary" className="todo-description">{item.description}</Text>
                        )}
                      </div>
                    </div>
                    <div className="todo-actions">
                      {item.type && renderTodoBadge(item.type)}
                      <RightOutlined className="todo-arrow" />
                    </div>
                  </List.Item>
                )}
              />
              
              {hasMore && (
                <Button 
                  type="link" 
                  onClick={() => setExpandedF3(!expandedF3)}
                  className="show-more-btn"
                >
                  {expandedF3 ? 'Thu gọn' : `Xem thêm ${todoItems.length - 3} việc`}
                </Button>
              )}
            </>
          ) : (
            <div className="empty-todo">
              <Text type="secondary">Không có việc cần làm</Text>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        {renderF1Progress()}
      </Col>
      <Col xs={24} md={8}>
        {renderF2Progress()}
      </Col>
      <Col xs={24} md={8}>
        {renderF3Progress()}
      </Col>
    </Row>
  );
};

export default ProgressBoard;
