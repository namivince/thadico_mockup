import React from 'react';
import { Row, Col, Card, Button, Typography, Space } from 'antd';
import { 
  FormOutlined, 
  BookOutlined, 
  TrophyOutlined,
  FileAddOutlined,
  ShareAltOutlined,
  DashboardOutlined,
  FileAddTwoTone,
  AuditOutlined,
  DeploymentUnitOutlined,
  CheckSquareOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './QuickShortcuts.css';

const { Title } = Typography;

/**
 * Component hiển thị Quick Shortcuts cho 3 luồng
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const QuickShortcuts = ({ data, loading }) => {
  const navigate = useNavigate();

  // Xử lý khi click vào shortcut
  const handleShortcutClick = (href) => {
    navigate(href);
  };

  // Render icon cho shortcut
  const renderShortcutIcon = (icon) => {
    switch (icon) {
      case 'form':
        return <FileAddOutlined />;
      case 'share':
        return <ShareAltOutlined />;
      case 'dashboard':
        return <DashboardOutlined />;
      case 'file-add':
        return <FileAddTwoTone />;
      case 'audit':
        return <AuditOutlined />;
      case 'deployment-unit':
        return <DeploymentUnitOutlined />;
      case 'trophy':
        return <TrophyOutlined />;
      case 'check-square':
        return <CheckSquareOutlined />;
      case 'file-done':
        return <FileDoneOutlined />;
      default:
        return null;
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {/* F1 Shortcuts */}
      <Col xs={24} md={8}>
        <Card 
          title={
            <Space>
              <FormOutlined style={{ color: '#7C4DFF' }} />
              <span>Khảo sát (F1)</span>
            </Space>
          }
          className="shortcuts-card f1-shortcuts"
          loading={loading}
        >
          <div className="shortcuts-container">
            {data?.F1?.map(shortcut => (
              <Button
                key={shortcut.id}
                type="default"
                icon={renderShortcutIcon(shortcut.icon)}
                onClick={() => handleShortcutClick(shortcut.href)}
                disabled={!shortcut.enabled}
                className="shortcut-button"
              >
                {shortcut.label}
              </Button>
            ))}
          </div>
        </Card>
      </Col>

      {/* F2 Shortcuts */}
      <Col xs={24} md={8}>
        <Card 
          title={
            <Space>
              <BookOutlined style={{ color: '#10BDBD' }} />
              <span>Kế hoạch đào tạo (F2)</span>
            </Space>
          }
          className="shortcuts-card f2-shortcuts"
          loading={loading}
        >
          <div className="shortcuts-container">
            {data?.F2?.map(shortcut => (
              <Button
                key={shortcut.id}
                type="default"
                icon={renderShortcutIcon(shortcut.icon)}
                onClick={() => handleShortcutClick(shortcut.href)}
                disabled={!shortcut.enabled}
                className="shortcut-button"
              >
                {shortcut.label}
              </Button>
            ))}
          </div>
        </Card>
      </Col>

      {/* F3 Shortcuts */}
      <Col xs={24} md={8}>
        <Card 
          title={
            <Space>
              <TrophyOutlined style={{ color: '#FF9800' }} />
              <span>Đánh giá năng lực (F3)</span>
            </Space>
          }
          className="shortcuts-card f3-shortcuts"
          loading={loading}
        >
          <div className="shortcuts-container">
            {data?.F3?.map(shortcut => (
              <Button
                key={shortcut.id}
                type="default"
                icon={renderShortcutIcon(shortcut.icon)}
                onClick={() => handleShortcutClick(shortcut.href)}
                disabled={!shortcut.enabled}
                className="shortcut-button"
              >
                {shortcut.label}
              </Button>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default QuickShortcuts;
