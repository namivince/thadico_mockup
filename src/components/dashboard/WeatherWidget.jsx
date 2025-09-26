import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { CloudOutlined, SunOutlined, ThunderboltOutlined } from '@ant-design/icons';

/**
 * Component hiển thị thông tin thời tiết
 */
const WeatherWidget = ({ loading }) => {
  const [weather, setWeather] = useState({
    location: 'Hồ Chí Minh',
    temperature: 28,
    condition: 'sunny',
    humidity: 75,
    windSpeed: 12
  });

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <SunOutlined style={{ color: '#faad14', fontSize: '24px' }} />;
      case 'cloudy': return <CloudOutlined style={{ color: '#666', fontSize: '24px' }} />;
      case 'rainy': return <ThunderboltOutlined style={{ color: '#1890ff', fontSize: '24px' }} />;
      default: return <SunOutlined style={{ color: '#faad14', fontSize: '24px' }} />;
    }
  };

  const getConditionText = (condition) => {
    switch (condition) {
      case 'sunny': return 'Nắng';
      case 'cloudy': return 'Nhiều mây';
      case 'rainy': return 'Mưa';
      default: return 'Nắng';
    }
  };

  return (
    <Card 
      title="Thời tiết hôm nay"
      className="weather-widget"
      loading={loading}
      size="small"
    >
      <Row align="middle" gutter={[16, 8]}>
        <Col span={8} style={{ textAlign: 'center' }}>
          {getWeatherIcon(weather.condition)}
        </Col>
        <Col span={16}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
            {weather.temperature}°C
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {getConditionText(weather.condition)}
          </div>
          <div style={{ fontSize: '11px', color: '#999' }}>
            {weather.location}
          </div>
        </Col>
      </Row>
      
      <Row gutter={[8, 4]} style={{ marginTop: '12px', fontSize: '11px', color: '#666' }}>
        <Col span={12}>
          💧 Độ ẩm: {weather.humidity}%
        </Col>
        <Col span={12}>
          🌪️ Gió: {weather.windSpeed} km/h
        </Col>
      </Row>
    </Card>
  );
};

export default WeatherWidget;
