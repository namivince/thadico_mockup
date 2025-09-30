import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Button, 
  Alert, 
  Space, 
  Typography, 
  Card, 
  Table, 
  Progress, 
  Switch, 
  Radio, 
  Checkbox, 
  Divider,
  Popconfirm,
  message,
  notification
} from 'antd';
import { 
  SaveOutlined, 
  DeleteOutlined, 
  PlayCircleOutlined, 
  SettingOutlined, 
  ClockCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './SurveyDraftManager.css';

const { Title, Text, Paragraph } = Typography;

// Mock data for drafts
const mockDrafts = [
  {
    id: 1,
    surveyId: 101,
    surveyTitle: 'Khảo sát nhu cầu đào tạo Q3/2025',
    savedAt: '2025-09-25T15:30:00',
    progress: 70,
    responses: {
      '1': 'Trả lời câu 1',
      '2': ['Lựa chọn 1', 'Lựa chọn 3'],
      '3': 4,
      '4': 'Trả lời câu 4',
      '5': ['Lựa chọn 2'],
      '6': 'Trả lời câu 6',
      '7': ['Kỹ năng lãnh đạo', 'Kỹ năng giao tiếp', 'Excel nâng cao'],
      '8': 'Trực tiếp tại lớp'
    }
  },
  {
    id: 2,
    surveyId: 102,
    surveyTitle: 'Đánh giá khóa học Excel nâng cao',
    savedAt: '2025-09-24T10:15:00',
    progress: 40,
    responses: {
      '1': 4,
      '2': 'Trả lời câu 2',
      '3': ['Lựa chọn 2', 'Lựa chọn 4'],
      '4': 3
    }
  },
  {
    id: 3,
    surveyId: 103,
    surveyTitle: 'Khảo sát mức độ hài lòng',
    savedAt: '2025-09-20T14:20:00',
    progress: 90,
    responses: {
      '1': 5,
      '2': 4,
      '3': 5,
      '4': 'Trả lời câu 4',
      '5': 4,
      '6': ['Lựa chọn 1', 'Lựa chọn 2'],
      '7': 'Trả lời câu 7',
      '8': 5,
      '9': 'Trả lời câu 9'
    }
  }
];

// Component for showing draft restore confirmation
const DraftRestoreConfirmation = ({ draft, onRestore, onStartNew }) => {
  return (
    <Alert
      message={
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space>
            <InfoCircleOutlined />
            <Text strong>Bạn có bản nháp được lưu lúc {moment(draft.savedAt).format('HH:mm, DD/MM/YYYY')}</Text>
          </Space>
          <Text>Tiến độ hoàn thành: {draft.progress}%</Text>
          <div className="draft-actions">
            <Button 
              type="primary" 
              icon={<PlayCircleOutlined />} 
              onClick={onRestore}
            >
              Tiếp tục từ bản nháp
            </Button>
            <Button onClick={onStartNew}>
              Bắt đầu mới
            </Button>
          </div>
        </Space>
      }
      type="info"
      showIcon={false}
      className="draft-confirmation-alert"
    />
  );
};

// Component for draft save notification
const DraftSaveNotification = ({ autoSave = false }) => {
  return (
    <div className="draft-save-notification">
      <CheckCircleOutlined className="success-icon" />
      <div className="notification-content">
        <Text strong>Đã lưu nháp thành công</Text>
        <Text type="secondary">{autoSave ? 'Tự động lưu' : 'Bạn có thể quay lại và tiếp tục sau'}</Text>
      </div>
    </div>
  );
};

// Main component for managing drafts
const SurveyDraftManager = ({ visible, onClose, onContinueDraft, onDeleteDraft }) => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState('5');
  const [showAutoSaveNotification, setShowAutoSaveNotification] = useState(true);

  // Fetch drafts data
  useEffect(() => {
    if (visible) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setDrafts(mockDrafts);
        setLoading(false);
      }, 1000);
    }
  }, [visible]);

  // Handle continue draft
  const handleContinueDraft = (draft) => {
    onContinueDraft(draft);
    message.success('Đang tải bản nháp...');
  };

  // Handle delete draft
  const handleDeleteDraft = (draftId) => {
    setDrafts(drafts.filter(draft => draft.id !== draftId));
    onDeleteDraft(draftId);
    message.success('Đã xóa bản nháp');
  };

  // Handle save settings
  const handleSaveSettings = () => {
    const settings = {
      autoSaveEnabled,
      autoSaveInterval: parseInt(autoSaveInterval),
      showAutoSaveNotification
    };
    
    // Save settings to localStorage or API
    localStorage.setItem('surveyDraftSettings', JSON.stringify(settings));
    message.success('Đã lưu cài đặt');
  };

  // Format date
  const formatDate = (dateString) => {
    return moment(dateString).format('DD/MM/YYYY HH:mm');
  };

  // Table columns
  const columns = [
    {
      title: 'Khảo sát',
      dataIndex: 'surveyTitle',
      key: 'surveyTitle',
      ellipsis: true
    },
    {
      title: 'Thời gian lưu',
      dataIndex: 'savedAt',
      key: 'savedAt',
      render: (date) => formatDate(date)
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => (
        <Progress 
          percent={progress} 
          size="small" 
          status="active"
          strokeColor={{
            '0%': '#7C4DFF',
            '100%': '#B39DDB',
          }}
        />
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<PlayCircleOutlined />} 
            onClick={() => handleContinueDraft(record)}
          >
            Tiếp tục
          </Button>
          <Popconfirm
            title="Xóa bản nháp?"
            description="Bạn có chắc chắn muốn xóa bản nháp này? Hành động này không thể hoàn tác."
            onConfirm={() => handleDeleteDraft(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Modal
      title={
        <Space>
          <SaveOutlined />
          <span>Quản lý bản nháp khảo sát</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      className="survey-draft-manager-modal"
    >
      <div className="draft-manager-content">
        <Card title="Danh sách khảo sát có bản nháp" className="drafts-list-card">
          <Table
            columns={columns}
            dataSource={drafts}
            rowKey="id"
            loading={loading}
            pagination={false}
            locale={{ emptyText: 'Không có bản nháp nào' }}
          />
        </Card>

        <Divider />

        <Card title="Cài đặt lưu nháp tự động" className="draft-settings-card">
          <div className="setting-item">
            <div className="setting-label">
              <Text strong>Bật lưu nháp tự động</Text>
            </div>
            <div className="setting-control">
              <Switch 
                checked={autoSaveEnabled} 
                onChange={setAutoSaveEnabled}
              />
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <Text strong>Thời gian lưu tự động</Text>
            </div>
            <div className="setting-control">
              <Radio.Group 
                value={autoSaveInterval}
                onChange={(e) => setAutoSaveInterval(e.target.value)}
                disabled={!autoSaveEnabled}
              >
                <Radio value="1">1 phút</Radio>
                <Radio value="5">5 phút</Radio>
                <Radio value="10">10 phút</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <Text strong>Hiển thị thông báo khi lưu tự động</Text>
            </div>
            <div className="setting-control">
              <Checkbox 
                checked={showAutoSaveNotification} 
                onChange={(e) => setShowAutoSaveNotification(e.target.checked)}
                disabled={!autoSaveEnabled}
              />
            </div>
          </div>

          <div className="settings-actions">
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSaveSettings}
            >
              Lưu cài đặt
            </Button>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

// Save draft function - can be used in survey components
const saveDraft = (surveyId, responses, progress) => {
  // Prepare draft data
  const draftData = {
    surveyId,
    responses,
    progress,
    savedAt: new Date().toISOString()
  };
  
  // Save to localStorage or API
  try {
    localStorage.setItem(`survey_draft_${surveyId}`, JSON.stringify(draftData));
    
    // Show notification
    notification.open({
      message: 'Đã lưu nháp thành công',
      description: 'Bạn có thể quay lại và tiếp tục sau.',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      placement: 'bottomRight',
      duration: 3
    });
    
    return true;
  } catch (error) {
    console.error('Error saving draft:', error);
    
    notification.error({
      message: 'Lỗi khi lưu nháp',
      description: 'Đã xảy ra lỗi khi lưu nháp. Vui lòng thử lại sau.',
      placement: 'bottomRight'
    });
    
    return false;
  }
};

// Get draft function - can be used in survey components
const getDraft = (surveyId) => {
  try {
    const draftData = localStorage.getItem(`survey_draft_${surveyId}`);
    return draftData ? JSON.parse(draftData) : null;
  } catch (error) {
    console.error('Error getting draft:', error);
    return null;
  }
};

// Delete draft function - can be used in survey components
const deleteDraft = (surveyId) => {
  try {
    localStorage.removeItem(`survey_draft_${surveyId}`);
    return true;
  } catch (error) {
    console.error('Error deleting draft:', error);
    return false;
  }
};

// Auto save setup function - can be used in survey components
const setupAutoSave = (surveyId, getResponses, getProgress) => {
  // Get settings from localStorage
  const settingsStr = localStorage.getItem('surveyDraftSettings');
  const settings = settingsStr ? JSON.parse(settingsStr) : {
    autoSaveEnabled: true,
    autoSaveInterval: 5,
    showAutoSaveNotification: true
  };
  
  if (!settings.autoSaveEnabled) return null;
  
  // Set up interval
  const intervalId = setInterval(() => {
    const responses = getResponses();
    const progress = getProgress();
    
    // Only save if there are responses
    if (responses && Object.keys(responses).length > 0) {
      const draftData = {
        surveyId,
        responses,
        progress,
        savedAt: new Date().toISOString()
      };
      
      // Save to localStorage or API
      try {
        localStorage.setItem(`survey_draft_${surveyId}`, JSON.stringify(draftData));
        
        // Show notification if enabled
        if (settings.showAutoSaveNotification) {
          notification.open({
            message: 'Tự động lưu nháp',
            description: 'Câu trả lời của bạn đã được lưu tự động.',
            icon: <SaveOutlined style={{ color: '#1890ff' }} />,
            placement: 'bottomRight',
            duration: 2
          });
        }
      } catch (error) {
        console.error('Error auto-saving draft:', error);
      }
    }
  }, settings.autoSaveInterval * 60 * 1000); // Convert minutes to milliseconds
  
  return intervalId;
};

export { 
  SurveyDraftManager, 
  DraftRestoreConfirmation, 
  DraftSaveNotification,
  saveDraft,
  getDraft,
  deleteDraft,
  setupAutoSave
};
