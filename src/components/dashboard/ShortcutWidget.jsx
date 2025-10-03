import React from 'react';
import { Card, Row, Col, Button, Tabs } from 'antd';
import { 
  FormOutlined, 
  ShareAltOutlined, 
  DashboardOutlined,
  FileAddOutlined, 
  AuditOutlined, 
  RocketOutlined,
  TrophyOutlined,
  LockOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

// Map các icon theo tên
const iconMap = {
  'form': <FormOutlined />,
  'share-alt': <ShareAltOutlined />,
  'dashboard': <DashboardOutlined />,
  'file-add': <FileAddOutlined />,
  'audit': <AuditOutlined />,
  'rocket': <RocketOutlined />,
  'trophy': <TrophyOutlined />,
  'lock': <LockOutlined />,
  'notification': <NotificationOutlined />
};

/**
 * Component hiển thị các phím tắt trên dashboard cho 3 luồng
 */
const ShortcutWidget = ({ shortcuts, loading }) => {
  const navigate = useNavigate();

  // Xử lý khi click vào phím tắt
  const handleShortcutClick = (path) => {
    navigate(path);
  };

  // Kiểm tra dữ liệu có sẵn
  if (!shortcuts) {
    return <Card title="Thao tác nhanh" className="shortcut-widget" loading={true} />;
  }

  return (
    <Card 
      title="Thao tác nhanh" 
      className="shortcut-widget" 
      loading={loading}
    >
      <Tabs defaultActiveKey="f1" type="card" className="shortcut-tabs">
        <TabPane 
          tab={<span><FormOutlined /> Khảo sát</span>} 
          key="f1"
        >
          <Row gutter={[16, 16]}>
            {shortcuts?.f1?.map((shortcut) => (
              <Col xs={24} sm={12} md={8} key={shortcut.id}>
                <Button 
                  type="default"
                  icon={iconMap[shortcut.icon] || null}
                  onClick={() => handleShortcutClick(shortcut.path)}
                  disabled={shortcut.disabled}
                  className="shortcut-button f1-button"
                  block
                >
                  {shortcut.title}
                </Button>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane 
          tab={<span><RocketOutlined /> Kế hoạch đào tạo</span>} 
          key="f2"
        >
          <Row gutter={[16, 16]}>
            {shortcuts?.f2?.map((shortcut) => (
              <Col xs={24} sm={12} md={8} key={shortcut.id}>
                <Button 
                  type="default"
                  icon={iconMap[shortcut.icon] || null}
                  onClick={() => handleShortcutClick(shortcut.path)}
                  disabled={shortcut.disabled}
                  className="shortcut-button f2-button"
                  block
                >
                  {shortcut.title}
                </Button>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane 
          tab={<span><TrophyOutlined /> Đánh giá</span>} 
          key="f3"
        >
          <Row gutter={[16, 16]}>
            {shortcuts?.f3?.map((shortcut) => (
              <Col xs={24} sm={12} md={8} key={shortcut.id}>
                <Button 
                  type="default"
                  icon={iconMap[shortcut.icon] || null}
                  onClick={() => handleShortcutClick(shortcut.path)}
                  disabled={shortcut.disabled}
                  className="shortcut-button f3-button"
                  block
                >
                  {shortcut.title}
                </Button>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ShortcutWidget;
