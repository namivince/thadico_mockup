import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { ImportOutlined, AuditOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Map các icon theo tên
const iconMap = {
  'import': <ImportOutlined />,
  'audit': <AuditOutlined />,
  'user-add': <UserAddOutlined />
};

/**
 * Component hiển thị các shortcut trên dashboard
 */
const ShortcutWidget = ({ shortcuts, loading }) => {
  const navigate = useNavigate();

  // Xử lý khi click vào shortcut
  const handleShortcutClick = (path) => {
    navigate(path);
  };

  // Danh sách các shortcut mặc định (sử dụng khi không có dữ liệu từ API)
  const defaultShortcuts = [
    {
      id: 'import_attendance',
      title: 'Import tổng hợp công',
      icon: 'import',
      path: '/attendance/import',
      disabled: false
    },
    {
      id: 'assessment_criteria',
      title: 'Quản lý bộ tiêu chí đánh giá',
      icon: 'audit',
      path: '/assessment/criteria',
      disabled: false
    },
    {
      id: 'add_employee',
      title: 'Thêm mới nhân sự',
      icon: 'user-add',
      path: '/employees/new',
      disabled: false
    }
  ];

  // Sử dụng shortcuts từ API hoặc mặc định nếu không có
  const displayShortcuts = shortcuts || defaultShortcuts;

  return (
    <Card title="Lối tắt" className="shortcut-widget" loading={loading}>
      <Row gutter={[16, 16]}>
        {displayShortcuts.map((shortcut) => (
          <Col key={shortcut.id} xs={24} sm={12} md={8}>
            <Button
              type="primary"
              icon={iconMap[shortcut.icon] || null}
              size="large"
              block
              onClick={() => handleShortcutClick(shortcut.path)}
              disabled={shortcut.disabled}
              className="shortcut-button"
            >
              {shortcut.title}
            </Button>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ShortcutWidget;
