import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  DatePicker, 
  Select, 
  Button, 
  Space, 
  Divider,
  Row,
  Col
} from 'antd';
import { 
  FilterOutlined, 
  ReloadOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './ReportFilters.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data for departments
const mockDepartments = [
  { id: 'all', name: 'Tất cả phòng ban' },
  { id: 'hr', name: 'Phòng Nhân sự' },
  { id: 'it', name: 'Phòng IT' },
  { id: 'marketing', name: 'Phòng Marketing' },
  { id: 'sales', name: 'Phòng Kinh doanh' },
  { id: 'accounting', name: 'Phòng Kế toán' }
];

// Mock data for participants
const mockParticipants = [
  { id: 'all', name: 'Tất cả' },
  { id: 'employees', name: 'Nhân viên' },
  { id: 'managers', name: 'Quản lý' },
  { id: 'directors', name: 'Giám đốc' },
  { id: 'new_hires', name: 'Nhân viên mới' }
];

// Mock data for statuses
const mockStatuses = [
  { id: 'all', name: 'Tất cả' },
  { id: 'active', name: 'Đang hoạt động' },
  { id: 'completed', name: 'Đã hoàn thành' },
  { id: 'pending', name: 'Chờ xử lý' },
  { id: 'draft', name: 'Nháp' }
];

const ReportFilters = ({ onApplyFilters, onResetFilters }) => {
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState([moment().subtract(1, 'year'), moment()]);
  const [department, setDepartment] = useState('all');
  const [participant, setParticipant] = useState('all');
  const [status, setStatus] = useState('all');

  // Handle apply filters
  const handleApplyFilters = () => {
    const filters = {
      dateRange,
      department,
      participant,
      status
    };
    
    onApplyFilters(filters);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    form.resetFields();
    setDateRange([moment().subtract(1, 'year'), moment()]);
    setDepartment('all');
    setParticipant('all');
    setStatus('all');
    
    onResetFilters();
  };

  return (
    <Card 
      title={
        <Space>
          <FilterOutlined />
          <span>Bộ lọc</span>
        </Space>
      }
      className="report-filters-card"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          dateRange,
          department: 'all',
          participant: 'all',
          status: 'all'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="dateRange"
              label="Thời gian"
            >
              <RangePicker 
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                value={dateRange}
                onChange={setDateRange}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="department"
              label="Phòng ban"
            >
              <Select 
                style={{ width: '100%' }}
                value={department}
                onChange={setDepartment}
              >
                {mockDepartments.map(dept => (
                  <Option key={dept.id} value={dept.id}>{dept.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="participant"
              label="Người tham gia"
            >
              <Select 
                style={{ width: '100%' }}
                value={participant}
                onChange={setParticipant}
              >
                {mockParticipants.map(part => (
                  <Option key={part.id} value={part.id}>{part.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="status"
              label="Trạng thái"
            >
              <Select 
                style={{ width: '100%' }}
                value={status}
                onChange={setStatus}
              >
                {mockStatuses.map(stat => (
                  <Option key={stat.id} value={stat.id}>{stat.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Divider style={{ margin: '8px 0 16px' }} />
        
        <div className="filter-actions">
          <Button 
            icon={<ReloadOutlined />} 
            onClick={handleResetFilters}
          >
            Đặt lại bộ lọc
          </Button>
          <Button 
            type="primary" 
            icon={<FilterOutlined />} 
            onClick={handleApplyFilters}
          >
            Áp dụng bộ lọc
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ReportFilters;
