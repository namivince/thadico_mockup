# SCR_SURVEY_LIST - Danh sách khảo sát

## 1. Metadata
- **Screen ID**: SCR_SURVEY_LIST
- **Screen Name**: Danh sách khảo sát
- **Module**: Survey Management
- **Route**: `/surveys`
- **Component**: `SurveyList.jsx`
- **Permission**: ADMIN, HR_MANAGER

## 2. Purpose
Màn hình quản lý danh sách các khảo sát nhu cầu đào tạo, cho phép tạo mới, theo dõi tiến độ, và quản lý vòng đời khảo sát.

## 3. Layout & Components

### Header Section
- **Page Title**: "Danh sách khảo sát"
- **Description**: "Quản lý các khảo sát nhu cầu đào tạo"
- **Primary Action**: Button "Tạo khảo sát mới" (navigate to `/surveys/new`)

### Statistics Cards (4 cards)
- **Tổng số**: Tổng số khảo sát trong hệ thống
- **Bản nháp**: Số khảo sát ở trạng thái draft
- **Đang chạy**: Số khảo sát đang thu thập phản hồi
- **Đã đóng**: Số khảo sát đã kết thúc

### Filter Section
- **Search Input**: Tìm kiếm theo tên khảo sát, mô tả, người tạo
- **Status Filter**: Dropdown lọc theo trạng thái (Tất cả, Bản nháp, Đã phát hành, Đang chạy, Đã đóng, Lưu trữ)
- **Bulk Actions**: Hiển thị khi có items được chọn (Xóa hàng loạt, Phát hành hàng loạt)

### Data Table
**Columns:**
- **Checkbox**: Chọn để thực hiện bulk actions
- **Tên khảo sát**: Tên + mô tả khảo sát
- **Trạng thái**: Tag màu theo status
- **Tiến độ**: Progress bar + số phản hồi/tổng lời mời
- **Người tạo**: Tên người tạo khảo sát
- **Ngày tạo**: Định dạng DD/MM/YYYY
- **Hạn cuối**: Deadline của khảo sát
- **Thao tác**: Action buttons

## 4. Actions

### Row Actions
- **Xem chi tiết** (👁️): Navigate to `/surveys/{id}`
- **Chỉnh sửa** (✏️): Navigate to `/surveys/{id}/edit` (chỉ draft)
- **Phát hành** (▶️): Publish survey (chỉ draft)
- **Theo dõi** (📊): Navigate to `/surveys/{id}/monitor` (running/closed)
- **Xóa** (🗑️): Delete survey (không phải running)

### Bulk Actions
- **Xóa hàng loạt**: Xóa nhiều surveys cùng lúc
- **Phát hành hàng loạt**: Publish nhiều draft surveys

### Page Actions
- **Tạo khảo sát mới**: Navigate to survey creation wizard
- **Refresh**: Reload data
- **Export**: Export danh sách (future feature)

## 5. Business Rules

### Status Flow
```
draft → published → running → closed → archived
```

### Permissions
- **draft**: Có thể edit, delete, publish
- **published**: Chỉ có thể view, monitor
- **running**: Chỉ có thể view, monitor, close
- **closed**: Chỉ có thể view, archive
- **archived**: Chỉ có thể view

### Validation Rules
- Không thể xóa survey đang running
- Không thể edit survey đã published
- Chỉ draft survey mới có thể publish

## 6. Data Model

### Survey Object
```json
{
  "id": "number",
  "name": "string",
  "description": "string", 
  "status": "draft|published|running|closed|archived",
  "startAt": "ISO date",
  "dueAt": "ISO date",
  "createdBy": "string",
  "createdAt": "ISO date",
  "totalInvitations": "number",
  "totalResponses": "number",
  "responseRate": "number",
  "questions": "array",
  "audience": "object"
}
```

## 7. API Integration

### Endpoints Used
- `GET /api/surveys` - Lấy danh sách surveys
- `DELETE /api/surveys/:id` - Xóa survey
- `POST /api/surveys/:id/publish` - Phát hành survey
- `POST /api/surveys/bulk-delete` - Xóa hàng loạt
- `POST /api/surveys/bulk-publish` - Phát hành hàng loạt

### Query Parameters
- `page`: Số trang
- `pageSize`: Số items per page
- `search`: Từ khóa tìm kiếm
- `status`: Lọc theo trạng thái

## 8. UI/UX Features

### Design System
- **Modern gradient backgrounds** với glass morphism
- **Hover effects** và smooth transitions
- **Status-based color coding** cho tags
- **Progress indicators** cho response rates
- **Responsive design** cho mobile

### User Experience
- **Real-time filtering** khi search/filter
- **Confirmation modals** cho destructive actions
- **Toast notifications** cho user feedback
- **Loading states** cho async operations
- **Empty states** khi không có data

## 9. Technical Implementation

### State Management
- `surveyData`: Danh sách surveys từ API
- `filteredData`: Data sau khi filter/search
- `selectedRowKeys`: IDs của rows được chọn
- `loading`: Loading state cho API calls

### Performance Optimization
- **Debounced search** để giảm API calls
- **Pagination** cho large datasets
- **Memoized filtering** để tránh re-render
- **Lazy loading** cho heavy components

## 10. Future Enhancements

### Phase 2 Features
- **Advanced filters**: Theo date range, creator, department
- **Export functionality**: CSV, Excel export
- **Survey templates**: Quick create từ templates
- **Batch operations**: Copy, duplicate surveys

### Integration Points
- **Notification system**: Email alerts cho status changes
- **Training planning**: Link surveys to training plans
- **Analytics dashboard**: Advanced reporting
- **Mobile app**: Native mobile experience

## 11. Testing Scenarios

### Functional Tests
- ✅ Create new survey navigation
- ✅ Search and filter functionality
- ✅ Status-based action availability
- ✅ Bulk operations
- ✅ Pagination and sorting

### Edge Cases
- ✅ Empty search results
- ✅ Network errors
- ✅ Permission-based UI changes
- ✅ Large datasets performance
- ✅ Concurrent user actions

---

**Last Updated**: 2025-09-26  
**Version**: 1.0  
**Status**: ✅ Implemented
