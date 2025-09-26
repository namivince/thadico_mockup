import React, { useState } from 'react';
import { Card, Calendar, Badge, List, Typography, Row, Col } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from '../../utils/dayjs';

const { Text } = Typography;

/**
 * Component hiển thị lịch và sự kiện quan trọng
 */
const CalendarWidget = ({ events, loading }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Dữ liệu sự kiện mẫu
  const defaultEvents = [
    {
      id: 1,
      date: dayjs().format('YYYY-MM-DD'),
      title: 'Họp ban giám đốc',
      time: '09:00',
      type: 'meeting',
      priority: 'high'
    },
    {
      id: 2,
      date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      title: 'Đánh giá hiệu suất Q2',
      time: '14:00',
      type: 'evaluation',
      priority: 'high'
    },
    {
      id: 3,
      date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      title: 'Training nhân viên mới',
      time: '10:00',
      type: 'training',
      priority: 'medium'
    },
    {
      id: 4,
      date: dayjs().add(3, 'day').format('YYYY-MM-DD'),
      title: 'Sinh nhật nhân viên',
      time: 'Cả ngày',
      type: 'birthday',
      priority: 'low'
    },
    {
      id: 5,
      date: dayjs().add(5, 'day').format('YYYY-MM-DD'),
      title: 'Deadline báo cáo tháng',
      time: '17:00',
      type: 'deadline',
      priority: 'high'
    }
  ];

  const eventData = events || defaultEvents;

  // Lấy sự kiện theo ngày
  const getEventsForDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    return eventData.filter(event => event.date === dateStr);
  };

  // Lấy sự kiện sắp tới (7 ngày tới)
  const getUpcomingEvents = () => {
    const today = dayjs();
    const nextWeek = today.add(7, 'day');
    return eventData
      .filter(event => {
        const eventDate = dayjs(event.date);
        return eventDate.isAfter(today.subtract(1, 'day')) && eventDate.isBefore(nextWeek.add(1, 'day'));
      })
      .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
      .slice(0, 5);
  };

  // Render cell của calendar
  const dateCellRender = (value) => {
    const dayEvents = getEventsForDate(value);
    return (
      <div>
        {dayEvents.map(event => (
          <Badge
            key={event.id}
            status={
              event.priority === 'high' ? 'error' :
              event.priority === 'medium' ? 'warning' : 'default'
            }
            text={
              <span style={{ 
                fontSize: '10px', 
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '60px'
              }}>
                {event.title}
              </span>
            }
          />
        ))}
      </div>
    );
  };

  // Xử lý khi chọn ngày
  const onSelect = (date) => {
    setSelectedDate(date);
  };

  const upcomingEvents = getUpcomingEvents();
  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <Row gutter={[16, 16]}>
      {/* Calendar */}
      <Col xs={24} lg={14}>
        <Card 
          title={
            <span>
              <CalendarOutlined /> Lịch làm việc
            </span>
          }
          className="calendar-widget"
          loading={loading}
        >
          <Calendar
            value={selectedDate}
            onSelect={onSelect}
            dateCellRender={dateCellRender}
            style={{ height: '350px' }}
          />
        </Card>
      </Col>

      {/* Events Panel */}
      <Col xs={24} lg={10}>
        <Card 
          title="Sự kiện sắp tới"
          className="events-panel"
          loading={loading}
          extra={
            <Text type="secondary" style={{ fontSize: '12px' }}>
              7 ngày tới
            </Text>
          }
        >
          <List
            size="small"
            dataSource={upcomingEvents}
            renderItem={event => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Badge
                      status={
                        event.priority === 'high' ? 'error' :
                        event.priority === 'medium' ? 'warning' : 'default'
                      }
                    />
                  }
                  title={
                    <div style={{ fontSize: '13px' }}>
                      {event.title}
                    </div>
                  }
                  description={
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      <ClockCircleOutlined /> {dayjs(event.date).format('DD/MM')} - {event.time}
                    </div>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: 'Không có sự kiện nào' }}
          />
        </Card>

        {/* Selected Date Events */}
        {selectedDateEvents.length > 0 && (
          <Card 
            title={`Sự kiện ngày ${selectedDate.format('DD/MM/YYYY')}`}
            size="small"
            style={{ marginTop: '16px' }}
          >
            <List
              size="small"
              dataSource={selectedDateEvents}
              renderItem={event => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge
                        status={
                          event.priority === 'high' ? 'error' :
                          event.priority === 'medium' ? 'warning' : 'default'
                        }
                      />
                    }
                    title={<div style={{ fontSize: '13px' }}>{event.title}</div>}
                    description={
                      <div style={{ fontSize: '11px', color: '#666' }}>
                        <ClockCircleOutlined /> {event.time}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default CalendarWidget;
