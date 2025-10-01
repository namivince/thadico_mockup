import React, { useState } from 'react';
import { Row, Col, Card, Select, Typography, Space, Tag } from 'antd';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { TrophyOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import './RadarCharts.css';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * Component hiển thị Radar Charts cho F3
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const RadarCharts = ({ data, roles, organizations, loading }) => {
  const [selectedRole, setSelectedRole] = useState('HR-EXEC');
  const [selectedOrg, setSelectedOrg] = useState('HCM');

  // Xử lý khi thay đổi role
  const handleRoleChange = (value) => {
    setSelectedRole(value);
    // Trong thực tế, sẽ gọi API để lấy dữ liệu mới
  };

  // Xử lý khi thay đổi organization
  const handleOrgChange = (value) => {
    setSelectedOrg(value);
    // Trong thực tế, sẽ gọi API để lấy dữ liệu mới
  };

  return (
    <Row gutter={[16, 16]}>
      {/* Competency Radar (Org Overview) */}
      <Col xs={24} md={12}>
        <Card 
          title={
            <div className="radar-card-header">
              <Space>
                <TrophyOutlined style={{ color: '#FF9800' }} />
                <Title level={5}>Competency Radar (Org Overview)</Title>
              </Space>
            </div>
          }
          className="radar-card f3-radar"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" 
              data={data?.F3_radar_competency?.labels.map((label, index) => ({
                subject: label,
                max: data.F3_radar_competency.series.max[index],
                standard: data.F3_radar_competency.series.standard[index],
                avg: data.F3_radar_competency.series.avg[index]
              })) || []}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 4]} />
              <Radar 
                name="Tối đa" 
                dataKey="max" 
                stroke="#6CCF89" 
                fill="#6CCF89" 
                fillOpacity={0.2} 
              />
              <Radar 
                name="Tiêu chuẩn" 
                dataKey="standard" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.25} 
              />
              <Radar 
                name="Trung bình" 
                dataKey="avg" 
                stroke="#F59E0B" 
                fill="#F59E0B" 
                fillOpacity={0.25} 
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
          <div className="radar-footer">
            <Text type="secondary">Vòng đánh giá: {data?.F3_radar_competency?.roundId || 'N/A'}</Text>
          </div>
        </Card>
      </Col>

      {/* Role Radar (Role Focus) */}
      <Col xs={24} md={12}>
        <Card 
          title={
            <div className="radar-card-header">
              <Space>
                <UserOutlined style={{ color: '#FF9800' }} />
                <Title level={5}>Role Radar (Role Focus)</Title>
              </Space>
              <Space>
                <Select 
                  value={selectedRole} 
                  onChange={handleRoleChange} 
                  style={{ width: 150 }}
                  size="small"
                >
                  {roles?.map(role => (
                    <Option key={role.value} value={role.value}>{role.label}</Option>
                  ))}
                </Select>
                <Select 
                  value={selectedOrg} 
                  onChange={handleOrgChange} 
                  style={{ width: 150 }}
                  size="small"
                >
                  {organizations?.map(org => (
                    <Option key={org.value} value={org.value}>{org.label}</Option>
                  ))}
                </Select>
              </Space>
            </div>
          }
          className="radar-card f3-radar"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" 
              data={data?.F3_radar_role?.labels.map((label, index) => ({
                subject: label,
                max: data.F3_radar_role.series.max[index],
                roleStandard: data.F3_radar_role.series.roleStandard[index],
                orgAvg: data.F3_radar_role.series.orgAvg[index]
              })) || []}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 4]} />
              <Radar 
                name="Tối đa" 
                dataKey="max" 
                stroke="#6CCF89" 
                fill="#6CCF89" 
                fillOpacity={0.2} 
              />
              <Radar 
                name="Tiêu chuẩn vai trò" 
                dataKey="roleStandard" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.25} 
              />
              <Radar 
                name="Trung bình đơn vị" 
                dataKey="orgAvg" 
                stroke="#F59E0B" 
                fill="#F59E0B" 
                fillOpacity={0.25} 
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
          <div className="radar-footer">
            <Space>
              <Text type="secondary">Vai trò: {data?.F3_radar_role?.role || 'N/A'}</Text>
              <Text type="secondary">Đơn vị: {data?.F3_radar_role?.org || 'N/A'}</Text>
              <Tag color="#FF9800">Gap: {data?.F3_radar_role?.meta?.gapSum || 0}</Tag>
              <Tag color="#FF9800">Dân số: {data?.F3_radar_role?.meta?.population || 0}</Tag>
            </Space>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default RadarCharts;
