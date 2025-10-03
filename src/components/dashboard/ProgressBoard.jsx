import React from 'react';
import { Row, Col, Card, Progress, Typography, Tag, List } from 'antd';
import { 
  FormOutlined, 
  BookOutlined, 
  TrophyOutlined,
  RightOutlined
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

  // Render progress cho F1 - Surveys
  const renderF1Progress = () => {
    const f1Data = data?.progress?.F1 || {};
    
    return (
      <Card 
        title={
          <div className="progress-card-title">
            <FormOutlined style={{ marginRight: 8, color: '#7C4DFF' }} />
            <span>Khảo sát</span>
          </div>
        }
        className="progress-card f1-progress"
        loading={loading}
      >
        <div className="progress-section" onClick={() => handleProgressClick('F1')}>
          <div className="progress-header">
            <Text>Tiến độ hoàn thành</Text>
            <Text strong>{f1Data.completionPct || 0}%</Text>
          </div>
          <Progress 
            percent={f1Data.completionPct || 0} 
            strokeColor="#7C4DFF" 
            trailColor="#E9ECEF"
            showInfo={false}
            className="progress-bar"
          />
        </div>
        
        <div className="todo-section">
          <Title level={5}>Việc cần làm</Title>
          <List
            size="small"
            dataSource={f1Data.todo || []}
            renderItem={item => (
              <List.Item className="todo-item">
                <Tag color="#7C4DFF" className="todo-tag">F1</Tag>
                <Text>{item}</Text>
                <RightOutlined className="todo-arrow" />
              </List.Item>
            )}
          />
        </div>
      </Card>
    );
  };

  // Render progress cho F2 - Training Plans
  const renderF2Progress = () => {
    const f2Data = data?.progress?.F2 || {};
    
    return (
      <Card 
        title={
          <div className="progress-card-title">
            <BookOutlined style={{ marginRight: 8, color: '#10BDBD' }} />
            <span>Kế hoạch đào tạo</span>
          </div>
        }
        className="progress-card f2-progress"
        loading={loading}
      >
        <div className="progress-section" onClick={() => handleProgressClick('F2')}>
          <div className="progress-header">
            <Text>Tiến độ hoàn thành</Text>
            <Text strong>{f2Data.completionPct || 0}%</Text>
          </div>
          <Progress 
            percent={f2Data.completionPct || 0} 
            strokeColor="#10BDBD" 
            trailColor="#E9ECEF"
            showInfo={false}
            className="progress-bar"
          />
        </div>
        
        <div className="todo-section">
          <Title level={5}>Việc cần làm</Title>
          <List
            size="small"
            dataSource={f2Data.todo || []}
            renderItem={item => (
              <List.Item className="todo-item">
                <Tag color="#10BDBD" className="todo-tag">F2</Tag>
                <Text>{item}</Text>
                <RightOutlined className="todo-arrow" />
              </List.Item>
            )}
          />
        </div>
      </Card>
    );
  };

  // Render progress cho F3 - Assessments
  const renderF3Progress = () => {
    const f3Data = data?.progress?.F3 || {};
    
    return (
      <Card 
        title={
          <div className="progress-card-title">
            <TrophyOutlined style={{ marginRight: 8, color: '#FF9800' }} />
            <span>Đánh giá năng lực</span>
          </div>
        }
        className="progress-card f3-progress"
        loading={loading}
      >
        <div className="progress-section" onClick={() => handleProgressClick('F3')}>
          <div className="progress-header">
            <Text>Tiến độ hoàn thành</Text>
            <Text strong>{f3Data.completionPct || 0}%</Text>
          </div>
          <Progress 
            percent={f3Data.completionPct || 0} 
            strokeColor="#FF9800" 
            trailColor="#E9ECEF"
            showInfo={false}
            className="progress-bar"
          />
        </div>
        
        <div className="todo-section">
          <Title level={5}>Việc cần làm</Title>
          <List
            size="small"
            dataSource={f3Data.todo || []}
            renderItem={item => (
              <List.Item className="todo-item">
                <Tag color="#FF9800" className="todo-tag">F3</Tag>
                <Text>{item}</Text>
                <RightOutlined className="todo-arrow" />
              </List.Item>
            )}
          />
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
