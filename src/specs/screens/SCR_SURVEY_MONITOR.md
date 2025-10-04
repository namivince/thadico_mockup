# SCR_SURVEY_MONITOR - Báo cáo khảo sát

## 1. Metadata
- **Screen ID**: SCR_SURVEY_MONITOR
- **Screen Name**: Báo cáo khảo sát
- **Module**: Survey Management
- **Routes**: `/surveys/:id/monitor`, `/surveys/:id`
- **Component**: `SurveyMonitor.jsx`
- **Permission**: ADMIN, HR_MANAGER

## 2. Purpose
Màn hình theo dõi real-time tiến độ khảo sát, phân tích phản hồi, và quản lý các hoạt động liên quan đến khảo sát đang chạy hoặc đã kết thúc.

## 3. Layout & Components

### Header Section
- **Back Button**: Quay về danh sách surveys
- **Survey Title**: Tên khảo sát đang theo dõi
- **Description**: "Theo dõi tiến độ khảo sát real-time"
- **Action Buttons**: Làm mới, Gửi nhắc nhở, Xuất dữ liệu, Đóng khảo sát

### Overview Statistics (4 cards)
- **Tổng lời mời**: Số người được mời tham gia
- **Đã trả lời**: Số người đã hoàn thành khảo sát
- **Tỷ lệ phản hồi**: Phần trăm completion rate
- **Thời gian còn lại**: Số ngày đến deadline

### Main Content Grid (2 columns)
**Left Column (2/3 width):**
- Tiến độ theo phòng ban
- Chi tiết phản hồi (bảng)

**Right Column (1/3 width):**
- Hoạt động gần đây (timeline)

### Question Analytics Section
- Phân tích từng câu hỏi với charts
- Multiple choice: Bar charts với percentages
- Rating questions: Average score + distribution

## 4. Real-time Features

### Auto-refresh Mechanism
- **Interval**: Tự động refresh mỗi 30 giây
- **Manual Refresh**: Button làm mới manual
- **Real-time Updates**: WebSocket (future enhancement)
- **Loading Indicators**: Show khi đang fetch data

### Live Statistics
- **Response Count**: Cập nhật real-time
- **Response Rate**: Tính toán tự động
- **Department Progress**: Update theo responses mới
- **Activity Timeline**: Thêm activities mới

## 5. Department Progress Tracking

### Progress Visualization
- **Department List**: Tất cả departments trong audience
- **Progress Bars**: Visual progress cho mỗi department
- **Statistics**: Responded/Invited (Percentage)
- **Color Coding**: 
  - Xanh lá: ≥70% response rate
  - Vàng: 50-69% response rate  
  - Đỏ: <50% response rate

### Department Data
```json
{
  "department": "string",
  "invited": "number",
  "responded": "number", 
  "rate": "number"
}
```

## 6. Activity Timeline

### Activity Types
- **Response Submitted**: Người dùng hoàn thành khảo sát
- **Reminder Sent**: Gửi email nhắc nhở
- **Survey Published**: Khảo sát được phát hành
- **Survey Closed**: Khảo sát bị đóng

### Timeline Display
- **Chronological Order**: Mới nhất ở trên
- **Activity Icons**: Icon khác nhau cho từng loại
- **Timestamps**: Relative time (2 phút trước, 1 giờ trước)
- **User Information**: Tên người thực hiện action

## 7. Response Management

### Response Table
**Columns:**
- **Người trả lời**: Tên + phòng ban
- **Thời gian trả lời**: Ngày + giờ submit
- **Trạng thái**: Tag "Đã hoàn thành"
- **Thao tác**: Button xem chi tiết

### Response Details Modal
- **User Info**: Tên, phòng ban, vị trí
- **Submission Time**: Thời gian hoàn thành
- **Answers**: Danh sách câu trả lời chi tiết
- **Response Quality**: Completeness score (future)

### Response Analytics
- **Completion Rate**: Tỷ lệ hoàn thành
- **Average Time**: Thời gian trung bình để hoàn thành
- **Drop-off Points**: Câu hỏi nào bị bỏ qua nhiều nhất
- **Response Quality**: Độ chi tiết của câu trả lời

## 8. Question-level Analytics

### Multiple Choice Questions
- **Response Distribution**: Bar chart cho mỗi option
- **Percentages**: Tỷ lệ chọn từng option
- **Total Responses**: Số người trả lời câu này
- **Most Popular**: Highlight option được chọn nhiều nhất

### Rating Questions  
- **Average Score**: Điểm trung bình
- **Score Distribution**: Histogram của các điểm
- **Rating Breakdown**: Số người chọn từng mức điểm
- **Trend Analysis**: Xu hướng theo thời gian (future)

### Text Questions
- **Response Count**: Số câu trả lời text
- **Word Cloud**: Từ khóa phổ biến (future)
- **Sentiment Analysis**: Phân tích cảm xúc (future)
- **Category Tagging**: Phân loại tự động (future)

## 9. Actions & Operations

### Survey Management Actions
- **Gửi nhắc nhở**: Send reminder emails to non-responders
- **Đóng khảo sát**: Manually close survey before deadline
- **Gia hạn**: Extend deadline (future)
- **Tạm dừng**: Pause survey temporarily (future)

### Data Export Actions
- **CSV Export**: Raw response data
- **Excel Export**: Formatted spreadsheet với charts
- **PDF Report**: Executive summary report
- **Custom Export**: Chọn fields cụ thể (future)

### Reminder Management
- **Manual Reminder**: Gửi ngay lập tức
- **Scheduled Reminders**: Đặt lịch gửi tự động
- **Reminder Templates**: Templates có sẵn
- **Reminder History**: Lịch sử gửi nhắc nhở

## 10. Business Rules

### Access Control
- Chỉ creator và ADMIN mới xem được monitor
- HR_MANAGER có thể xem surveys của department mình
- EMPLOYEE không có quyền truy cập

### Survey Status Rules
- **Running**: Full monitoring capabilities
- **Closed**: Read-only, không thể gửi reminders
- **Draft**: Không có monitor (redirect to edit)
- **Archived**: Historical view only

### Data Privacy
- Chỉ hiển thị aggregated data
- Individual responses cần permission đặc biệt
- Anonymization options cho sensitive surveys
- GDPR compliance cho data export

## 11. Data Model

### Survey Monitor Data
```json
{
  "survey": {
    "id": "number",
    "name": "string",
    "status": "string",
    "startAt": "ISO date",
    "dueAt": "ISO date", 
    "totalInvitations": "number",
    "totalResponses": "number",
    "responseRate": "number"
  },
  "departmentStats": [
    {
      "department": "string",
      "invited": "number",
      "responded": "number",
      "rate": "number"
    }
  ],
  "recentActivities": [
    {
      "type": "string",
      "user": "string", 
      "timestamp": "ISO date",
      "details": "object"
    }
  ],
  "questionAnalytics": [
    {
      "questionId": "number",
      "type": "string",
      "responses": "array",
      "statistics": "object"
    }
  ]
}
```

## 12. API Integration

### Endpoints Used
- `GET /api/surveys/:id` - Survey basic info
- `GET /api/surveys/:id/analytics` - Analytics data
- `GET /api/surveys/:id/responses` - Response list
- `POST /api/surveys/:id/reminders` - Send reminders
- `POST /api/surveys/:id/close` - Close survey
- `GET /api/surveys/:id/export` - Export data

### Real-time Updates
- **Polling Strategy**: Fetch updates every 30s
- **WebSocket Integration**: Real-time push (future)
- **Cache Strategy**: Cache analytics data
- **Error Handling**: Graceful degradation

## 13. UI/UX Features

### Visual Design
- **Real-time Indicators**: Live update animations
- **Progress Visualizations**: Animated progress bars
- **Color-coded Status**: Intuitive color system
- **Responsive Charts**: Mobile-friendly analytics
- **Professional Styling**: Enterprise-grade appearance

### User Experience
- **Auto-refresh**: Seamless data updates
- **Loading States**: Skeleton screens during fetch
- **Error Recovery**: Retry mechanisms
- **Export Feedback**: Progress indicators for exports
- **Contextual Help**: Tooltips và help text

### Performance Optimization
- **Lazy Loading**: Load analytics on demand
- **Data Caching**: Cache frequently accessed data
- **Pagination**: For large response lists
- **Chart Optimization**: Efficient rendering
- **Memory Management**: Cleanup on unmount

## 14. Notification System (Future)

### Alert Types
- **Response Milestones**: 25%, 50%, 75% completion
- **Deadline Warnings**: N-3, N-1 days before due
- **Low Response Alerts**: <30% response rate
- **Completion Notifications**: Survey finished

### Delivery Channels
- **Email Notifications**: Detailed reports
- **In-app Notifications**: Real-time alerts
- **SMS Alerts**: Critical notifications only
- **Dashboard Widgets**: Summary notifications

## 15. Reporting & Analytics

### Standard Reports
- **Executive Summary**: High-level overview
- **Detailed Analytics**: Question-by-question analysis
- **Department Comparison**: Cross-department insights
- **Trend Analysis**: Time-based patterns

### Custom Reports (Future)
- **Report Builder**: Drag-and-drop interface
- **Scheduled Reports**: Auto-generated reports
- **Report Templates**: Pre-built report formats
- **Interactive Dashboards**: Drill-down capabilities

## 16. Integration Points

### Training Planning Integration
- **Needs Analysis**: Link survey results to training plans
- **Automatic Suggestions**: AI-powered training recommendations
- **Budget Planning**: Cost estimation based on needs
- **Resource Allocation**: Optimize training resources

### HR System Integration
- **Employee Profiles**: Link responses to employee records
- **Performance Reviews**: Include survey participation
- **Career Development**: Use insights for development plans
- **Succession Planning**: Identify skill gaps

## 17. Technical Implementation

### State Management
- `survey`: Current survey data
- `analytics`: Analytics and statistics
- `responses`: Response list with pagination
- `loading`: Loading states for different sections
- `refreshInterval`: Auto-refresh timer

### Performance Considerations
- **Efficient Re-rendering**: Memoized components
- **Data Fetching**: Optimized API calls
- **Chart Performance**: Canvas-based rendering
- **Memory Usage**: Proper cleanup and disposal

## 18. Testing Scenarios

### Functional Tests
- ✅ Real-time data updates
- ✅ Department progress tracking
- ✅ Response detail viewing
- ✅ Export functionality
- ✅ Reminder sending

### Performance Tests
- ✅ Large dataset handling
- ✅ Concurrent user access
- ✅ Chart rendering performance
- ✅ Memory leak prevention
- ✅ Network error recovery

### Edge Cases
- ✅ Zero responses scenario
- ✅ Network connectivity issues
- ✅ Concurrent survey modifications
- ✅ Browser refresh handling
- ✅ Permission changes during session

---

**Last Updated**: 2025-09-26  
**Version**: 1.0  
**Status**: ✅ Implemented
