import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Switch, 
  Radio, 
  DatePicker, 
  TimePicker, 
  Checkbox, 
  Select, 
  Button, 
  Table, 
  Space, 
  Divider, 
  Alert, 
  Typography,
  Modal,
  Input,
  Tag,
  message
} from 'antd';
import { 
  EyeOutlined, 
  EyeInvisibleOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  SaveOutlined, 
  CheckOutlined, 
  ClockCircleOutlined,
  TeamOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './SurveyVisibilitySettings.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for groups
const mockGroups = [
  { id: 1, name: 'Ban Giám đốc', count: 5, visible: true },
  { id: 2, name: 'Phòng Nhân sự', count: 12, visible: true },
  { id: 3, name: 'Phòng IT', count: 20, visible: false },
  { id: 4, name: 'Phòng Kế toán', count: 8, visible: true },
  { id: 5, name: 'Phòng Marketing', count: 15, visible: true },
  { id: 6, name: 'Phòng Kinh doanh', count: 25, visible: true }
];

// Mock data for conditions
const mockConditionOptions = [
  { value: 'previous_survey', label: 'Hoàn thành khảo sát trước đó' },
  { value: 'course_completion', label: 'Hoàn thành khóa học' },
  { value: 'user_group', label: 'Thuộc nhóm người dùng' },
  { value: 'position', label: 'Có chức danh/vị trí' }
];

// Mock data for previous surveys
const mockPreviousSurveys = [
  { id: 1, title: 'Khảo sát đánh giá nhu cầu đào tạo Q2/2025' },
  { id: 2, title: 'Khảo sát đánh giá hiệu quả đào tạo 2024' },
  { id: 3, title: 'Khảo sát mức độ hài lòng với chương trình đào tạo' }
];

// Mock data for courses
const mockCourses = [
  { id: 1, title: 'Kỹ năng lãnh đạo' },
  { id: 2, title: 'Excel nâng cao' },
  { id: 3, title: 'Kỹ năng giao tiếp' },
  { id: 4, title: 'Quản lý dự án' }
];

// Mock data for positions
const mockPositions = [
  { id: 1, title: 'Giám đốc' },
  { id: 2, title: 'Trưởng phòng' },
  { id: 3, title: 'Nhân viên' },
  { id: 4, title: 'Thực tập sinh' }
];

const SurveyVisibilitySettings = ({ survey, onSave }) => {
  const [form] = Form.useForm();
  const [displayMode, setDisplayMode] = useState('schedule');
  const [isVisible, setIsVisible] = useState(true);
  const [groups, setGroups] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addGroupModalVisible, setAddGroupModalVisible] = useState(false);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  // Initialize form with survey data
  useEffect(() => {
    if (survey) {
      setIsVisible(survey.isVisible || true);
      setDisplayMode(survey.displayMode || 'schedule');
      setGroups(mockGroups);
      setConditions(survey.conditions || []);
      
      // Calculate available groups (those not already added)
      const allGroups = [
        { id: 7, name: 'Phòng Hành chính', count: 10 },
        { id: 8, name: 'Phòng Kỹ thuật', count: 18 },
        { id: 9, name: 'Phòng Dự án', count: 12 }
      ];
      setAvailableGroups(allGroups);
      
      form.setFieldsValue({
        isVisible: survey.isVisible || true,
        displayMode: survey.displayMode || 'schedule',
        startDate: survey.startDate ? moment(survey.startDate) : moment(),
        startTime: survey.startTime ? moment(survey.startTime, 'HH:mm') : moment('09:00', 'HH:mm'),
        endDate: survey.endDate ? moment(survey.endDate) : moment().add(14, 'days'),
        endTime: survey.endTime ? moment(survey.endTime, 'HH:mm') : moment('18:00', 'HH:mm'),
        showBeforeStart: survey.showBeforeStart || false,
        showAfterEnd: survey.showAfterEnd || false
      });
    }
  }, [survey, form]);

  // Handle display mode change
  const handleDisplayModeChange = (e) => {
    setDisplayMode(e.target.value);
  };

  // Handle visibility toggle
  const handleVisibilityToggle = (checked) => {
    setIsVisible(checked);
  };

  // Handle group visibility toggle
  const handleGroupVisibilityToggle = (groupId, visible) => {
    const updatedGroups = groups.map(group => 
      group.id === groupId ? { ...group, visible: visible } : group
    );
    setGroups(updatedGroups);
    message.success(`Đã ${visible ? 'hiện' : 'ẩn'} khảo sát cho nhóm ${groups.find(g => g.id === groupId).name}`);
  };

  // Handle group removal
  const handleRemoveGroup = (groupId) => {
    Modal.confirm({
      title: 'Xác nhận xóa nhóm',
      content: 'Bạn có chắc chắn muốn xóa nhóm này khỏi danh sách?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        const removedGroup = groups.find(g => g.id === groupId);
        const updatedGroups = groups.filter(group => group.id !== groupId);
        setGroups(updatedGroups);
        setAvailableGroups([...availableGroups, removedGroup]);
        message.success(`Đã xóa nhóm ${removedGroup.name}`);
      }
    });
  };

  // Handle add group
  const handleAddGroup = () => {
    if (selectedGroups.length === 0) {
      message.error('Vui lòng chọn ít nhất một nhóm');
      return;
    }
    
    const newGroups = selectedGroups.map(id => {
      const group = availableGroups.find(g => g.id === id);
      return { ...group, visible: true };
    });
    
    setGroups([...groups, ...newGroups]);
    setAvailableGroups(availableGroups.filter(g => !selectedGroups.includes(g.id)));
    setSelectedGroups([]);
    setAddGroupModalVisible(false);
    message.success('Đã thêm nhóm thành công');
  };

  // Handle add condition
  const handleAddCondition = () => {
    const newCondition = {
      id: Date.now(),
      type: 'previous_survey',
      value: null
    };
    setConditions([...conditions, newCondition]);
  };

  // Handle condition type change
  const handleConditionTypeChange = (value, conditionId) => {
    const updatedConditions = conditions.map(condition => 
      condition.id === conditionId ? { ...condition, type: value, value: null } : condition
    );
    setConditions(updatedConditions);
  };

  // Handle condition value change
  const handleConditionValueChange = (value, conditionId) => {
    const updatedConditions = conditions.map(condition => 
      condition.id === conditionId ? { ...condition, value } : condition
    );
    setConditions(updatedConditions);
  };

  // Handle remove condition
  const handleRemoveCondition = (conditionId) => {
    const updatedConditions = conditions.filter(condition => condition.id !== conditionId);
    setConditions(updatedConditions);
  };

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // Prepare data for submission
      const startDateTime = moment(values.startDate)
        .set('hour', values.startTime.hour())
        .set('minute', values.startTime.minute());
      
      const endDateTime = moment(values.endDate)
        .set('hour', values.endTime.hour())
        .set('minute', values.endTime.minute());
      
      const visibilityData = {
        surveyId: survey.id,
        isVisible: values.isVisible,
        displayMode: values.displayMode,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        showBeforeStart: values.showBeforeStart,
        showAfterEnd: values.showAfterEnd,
        groups: groups,
        conditions: conditions
      };
      
      // Simulate API call
      setTimeout(() => {
        onSave(visibilityData);
        setLoading(false);
        message.success('Đã lưu cài đặt hiển thị thành công');
      }, 1500);
    });
  };

  // Handle apply immediately
  const handleApplyImmediately = () => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        message.success('Đã áp dụng cài đặt hiển thị ngay lập tức');
      }, 1000);
    });
  };

  // Render condition value input based on condition type
  const renderConditionValueInput = (condition) => {
    switch (condition.type) {
      case 'previous_survey':
        return (
          <Select
            placeholder="Chọn khảo sát"
            style={{ width: '100%' }}
            value={condition.value}
            onChange={(value) => handleConditionValueChange(value, condition.id)}
          >
            {mockPreviousSurveys.map(survey => (
              <Option key={survey.id} value={survey.id}>{survey.title}</Option>
            ))}
          </Select>
        );
      case 'course_completion':
        return (
          <Select
            placeholder="Chọn khóa học"
            style={{ width: '100%' }}
            value={condition.value}
            onChange={(value) => handleConditionValueChange(value, condition.id)}
          >
            {mockCourses.map(course => (
              <Option key={course.id} value={course.id}>{course.title}</Option>
            ))}
          </Select>
        );
      case 'user_group':
        return (
          <Select
            placeholder="Chọn nhóm người dùng"
            style={{ width: '100%' }}
            value={condition.value}
            onChange={(value) => handleConditionValueChange(value, condition.id)}
          >
            {mockGroups.map(group => (
              <Option key={group.id} value={group.id}>{group.name}</Option>
            ))}
          </Select>
        );
      case 'position':
        return (
          <Select
            placeholder="Chọn chức danh/vị trí"
            style={{ width: '100%' }}
            value={condition.value}
            onChange={(value) => handleConditionValueChange(value, condition.id)}
          >
            {mockPositions.map(position => (
              <Option key={position.id} value={position.id}>{position.title}</Option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  // Group table columns
  const groupColumns = [
    {
      title: 'Nhóm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'visible',
      key: 'visible',
      render: (visible) => (
        visible ? 
          <Tag color="success">Hiện</Tag> : 
          <Tag color="default">Ẩn</Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          {record.visible ? (
            <Button 
              size="small" 
              icon={<EyeInvisibleOutlined />} 
              onClick={() => handleGroupVisibilityToggle(record.id, false)}
            >
              Ẩn
            </Button>
          ) : (
            <Button 
              size="small" 
              icon={<EyeOutlined />} 
              onClick={() => handleGroupVisibilityToggle(record.id, true)}
            >
              Hiện
            </Button>
          )}
          <Button 
            size="small" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleRemoveGroup(record.id)}
          >
            Xóa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="survey-visibility-settings">
      <Card 
        title={
          <Space>
            <EyeOutlined />
            <span>Cài đặt hiển thị khảo sát</span>
          </Space>
        }
        className="visibility-settings-card"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {/* Survey Information */}
          <div className="survey-info">
            <Title level={5}>Thông tin khảo sát</Title>
            <div className="info-grid">
              <div className="info-item">
                <Text strong>Tên khảo sát:</Text>
                <Text>{survey?.title}</Text>
              </div>
              <div className="info-item">
                <Text strong>Trạng thái:</Text>
                <Tag color={survey?.status === 'active' ? 'success' : 'default'}>
                  {survey?.status === 'active' ? 'Đang hoạt động' : 'Nháp'}
                </Tag>
              </div>
              <div className="info-item">
                <Text strong>Thời gian:</Text>
                <Text>
                  {survey?.startDate && survey?.endDate ? 
                    `${moment(survey.startDate).format('DD/MM/YYYY')} - ${moment(survey.endDate).format('DD/MM/YYYY')}` : 
                    'Chưa thiết lập'}
                </Text>
              </div>
            </div>
          </div>

          <Divider />

          {/* Basic Visibility Settings */}
          <div className="basic-settings">
            <Title level={5}>Cài đặt hiển thị cơ bản</Title>
            
            <Form.Item
              name="isVisible"
              label="Hiển thị khảo sát"
              valuePropName="checked"
            >
              <Switch 
                checkedChildren={<EyeOutlined />} 
                unCheckedChildren={<EyeInvisibleOutlined />} 
                onChange={handleVisibilityToggle}
              />
            </Form.Item>
            
            <Form.Item
              name="displayMode"
              label="Chế độ hiển thị"
            >
              <Radio.Group onChange={handleDisplayModeChange}>
                <Space direction="vertical">
                  <Radio value="schedule">Theo lịch</Radio>
                  <Radio value="manual">Thủ công</Radio>
                  <Radio value="conditional">Theo điều kiện</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            
            <Alert
              message={
                !isVisible ? 
                  "Khảo sát đang bị ẩn đối với tất cả CBNV" :
                  displayMode === 'schedule' ?
                    "Khảo sát sẽ hiển thị theo lịch đã thiết lập" :
                    displayMode === 'manual' ?
                      "Khảo sát sẽ chỉ hiển thị khi được kích hoạt thủ công" :
                      "Khảo sát sẽ chỉ hiển thị khi đáp ứng các điều kiện đã thiết lập"
              }
              type={!isVisible ? "warning" : "info"}
              showIcon
              icon={!isVisible ? <EyeInvisibleOutlined /> : <InfoCircleOutlined />}
            />
          </div>

          <Divider />

          {/* Schedule Settings */}
          {displayMode === 'schedule' && (
            <div className="schedule-settings">
              <Title level={5}>Cài đặt hiển thị theo lịch</Title>
              
              <div className="date-time-row">
                <Form.Item
                  name="startDate"
                  label="Thời gian bắt đầu hiển thị"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                  className="date-picker"
                >
                  <DatePicker 
                    format="DD/MM/YYYY" 
                    placeholder="Chọn ngày"
                  />
                </Form.Item>
                
                <Form.Item
                  name="startTime"
                  rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
                  className="time-picker"
                >
                  <TimePicker format="HH:mm" placeholder="Chọn giờ" />
                </Form.Item>
              </div>
              
              <div className="date-time-row">
                <Form.Item
                  name="endDate"
                  label="Thời gian kết thúc hiển thị"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                  className="date-picker"
                >
                  <DatePicker 
                    format="DD/MM/YYYY" 
                    placeholder="Chọn ngày"
                  />
                </Form.Item>
                
                <Form.Item
                  name="endTime"
                  rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc' }]}
                  className="time-picker"
                >
                  <TimePicker format="HH:mm" placeholder="Chọn giờ" />
                </Form.Item>
              </div>
              
              <Form.Item
                name="showBeforeStart"
                valuePropName="checked"
              >
                <Checkbox>Hiển thị trước thời gian bắt đầu (chỉ xem)</Checkbox>
              </Form.Item>
              
              <Form.Item
                name="showAfterEnd"
                valuePropName="checked"
              >
                <Checkbox>Hiển thị sau thời gian kết thúc (chỉ xem kết quả)</Checkbox>
              </Form.Item>
            </div>
          )}

          {/* Conditional Settings */}
          {displayMode === 'conditional' && (
            <div className="conditional-settings">
              <Title level={5}>Cài đặt hiển thị theo điều kiện</Title>
              
              {conditions.map((condition, index) => (
                <div key={condition.id} className="condition-item">
                  <div className="condition-header">
                    <Text strong>Điều kiện {index + 1}</Text>
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleRemoveCondition(condition.id)}
                    />
                  </div>
                  
                  <div className="condition-content">
                    <div className="condition-type">
                      <Text>Loại điều kiện:</Text>
                      <Select
                        style={{ width: '100%' }}
                        value={condition.type}
                        onChange={(value) => handleConditionTypeChange(value, condition.id)}
                      >
                        {mockConditionOptions.map(option => (
                          <Option key={option.value} value={option.value}>{option.label}</Option>
                        ))}
                      </Select>
                    </div>
                    
                    <div className="condition-value">
                      <Text>Giá trị:</Text>
                      {renderConditionValueInput(condition)}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="dashed" 
                icon={<PlusOutlined />} 
                onClick={handleAddCondition}
                block
              >
                Thêm điều kiện
              </Button>
              
              {conditions.length === 0 && (
                <Alert
                  message="Chưa có điều kiện nào được thiết lập"
                  description="Vui lòng thêm ít nhất một điều kiện để sử dụng chế độ hiển thị theo điều kiện."
                  type="warning"
                  showIcon
                  style={{ marginTop: 16 }}
                />
              )}
            </div>
          )}

          <Divider />

          {/* Group Settings */}
          <div className="group-settings">
            <Title level={5}>Cài đặt hiển thị theo nhóm</Title>
            
            <Table
              columns={groupColumns}
              dataSource={groups}
              rowKey="id"
              pagination={false}
              size="small"
              className="groups-table"
            />
            
            <Button 
              type="dashed" 
              icon={<PlusOutlined />} 
              onClick={() => setAddGroupModalVisible(true)}
              style={{ marginTop: 16 }}
              block
            >
              Thêm nhóm
            </Button>
          </div>

          <Divider />

          {/* Form Actions */}
          <div className="form-actions">
            <Button 
              htmlType="button" 
              onClick={() => window.history.back()}
            >
              Hủy bỏ
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Lưu thay đổi
            </Button>
            <Button 
              type="primary" 
              ghost
              icon={<CheckOutlined />}
              onClick={handleApplyImmediately}
              loading={loading}
            >
              Áp dụng ngay
            </Button>
          </div>
        </Form>
      </Card>

      {/* Add Group Modal */}
      <Modal
        title="Thêm nhóm"
        open={addGroupModalVisible}
        onCancel={() => setAddGroupModalVisible(false)}
        onOk={handleAddGroup}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Chọn nhóm"
          value={selectedGroups}
          onChange={setSelectedGroups}
        >
          {availableGroups.map(group => (
            <Option key={group.id} value={group.id}>
              {group.name} ({group.count} người dùng)
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default SurveyVisibilitySettings;
