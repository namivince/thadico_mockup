# SCR_TRAINING_DEMAND_LIST - Danh sách nhu cầu đào tạo

## 1. Metadata
- **Screen ID**: SCR_TRAINING_DEMAND_LIST
- **Screen Name**: Danh sách nhu cầu đào tạo
- **Module**: Đào tạo
- **Routes**: `/training/demands`
- **Component**: `TrainingDemandList.jsx`
- **Permission**: ADMIN, HR_MANAGER

## 2. Purpose
Màn hình hiển thị danh sách các nhu cầu đào tạo từ các phòng ban, cho phép lọc, tìm kiếm và quản lý các nhu cầu đào tạo.

## 3. Layout & Components

### Header Section
- **Title**: "Nhu cầu đào tạo"
- **Action Button**: "Tạo nhu cầu mới"

### Statistics Cards (4 cards)
- **Tổng nhu cầu**: Hiển thị tổng số nhu cầu đào tạo
- **Đã duyệt**: Số nhu cầu đã được phê duyệt (kèm %)
- **Chờ duyệt**: Số nhu cầu đang chờ phê duyệt (kèm %)
- **Từ chối**: Số nhu cầu bị từ chối (kèm %)

### Filter Section
- **Search Box**: Tìm kiếm theo tên nhu cầu hoặc người tạo
- **Status Filter**: Lọc theo trạng thái (Tất cả, Đã duyệt, Chờ duyệt, Từ chối)
- **Department Filter**: Lọc theo phòng ban
- **Export Button**: Xuất dữ liệu ra Excel

### Data Table
- **Columns**:
  - Tên nhu cầu (có link đến chi tiết)
  - Phòng ban
  - Người tạo
  - Ngày tạo
  - Trạng thái (tag màu theo trạng thái)
  - Người duyệt
  - Thao tác (dropdown menu)
- **Summary Row**: Hiển thị tổng số nhu cầu
- **Pagination**: Phân trang với các tùy chọn số items/trang

## 4. UI/UX Specifications

### Typography
- **Card Title**: Inter, 20px, Bold, #212529
- **Statistics Title**: Roboto, 14px, Medium, #6C757D
- **Statistics Value**: Roboto, 24px, Bold, màu theo trạng thái
- **Table Headers**: Roboto, 14px, SemiBold, #212529
- **Table Content**: Roboto, 14px, Regular, #212529

### Color Scheme
- **Background**: #F8F9FA
- **Card Background**: #FFFFFF
- **Primary Button**: #0D6EFD
- **Success**: #16A34A (Đã duyệt)
- **Warning**: #FFC107 (Chờ duyệt)
- **Danger**: #DC3545 (Từ chối)
- **Table Zebra**: #FFFFFF / #F8F9FA
- **Summary Row**: #E6F4EA

### Status Tags
- **Đã duyệt**: Nền #E6F4EA, Text #16A34A, Border #16A34A
- **Chờ duyệt**: Nền #FFF8E6, Text #FFC107, Border #FFC107
- **Từ chối**: Nền #FFEBEE, Text #DC3545, Border #DC3545

### Responsive Behavior
- **Desktop**: Hiển thị đầy đủ 4 cards thống kê trên một hàng
- **Tablet**: 2 cards/hàng
- **Mobile**: 1 card/hàng, filter stack vertically

## 5. Actions & Operations

### Main Actions
- **Create**: Tạo nhu cầu đào tạo mới
- **View**: Xem chi tiết nhu cầu
- **Edit**: Chỉnh sửa nhu cầu (chỉ cho trạng thái PENDING)
- **Delete**: Xóa nhu cầu (chỉ cho trạng thái PENDING)
- **Export**: Xuất dữ liệu ra Excel

### Filtering & Searching
- **Text Search**: Tìm theo tên nhu cầu hoặc người tạo
- **Status Filter**: Lọc theo trạng thái
- **Department Filter**: Lọc theo phòng ban

### Table Operations
- **Sorting**: Sắp xếp theo các cột
- **Pagination**: Phân trang dữ liệu

## 6. APIs

### Endpoints Used
- `GET /api/training/demands` - Lấy danh sách nhu cầu đào tạo
- `DELETE /api/training/demands/:id` - Xóa nhu cầu đào tạo
- `GET /api/training/demands/export` - Xuất dữ liệu ra Excel

### Query Parameters
- `page`: Số trang
- `pageSize`: Số items per page
- `search`: Từ khóa tìm kiếm
- `status`: Lọc theo trạng thái
- `department`: Lọc theo phòng ban

## 7. Data Model

### Training Demand
```json
{
  "id": "number",
  "name": "string",
  "department": "string",
  "creator": "string",
  "createdDate": "ISO date",
  "status": "APPROVED|PENDING|REJECTED",
  "approver": "string|null"
}
```

## 8. Business Rules

### Access Control
- **ADMIN**: Xem tất cả nhu cầu đào tạo
- **HR_MANAGER**: Xem tất cả nhu cầu đào tạo
- **DEPARTMENT_MANAGER**: Chỉ xem nhu cầu của phòng ban mình
- **EMPLOYEE**: Chỉ xem nhu cầu do mình tạo

### Status Rules
- Chỉ có thể chỉnh sửa/xóa nhu cầu ở trạng thái PENDING
- Nhu cầu đã duyệt/từ chối không thể chỉnh sửa
- Chỉ ADMIN và HR_MANAGER có quyền duyệt/từ chối

## 9. Error Handling

### Validation Errors
- Hiển thị thông báo lỗi khi không thể tải dữ liệu
- Xác nhận trước khi xóa nhu cầu

### Network Errors
- Retry mechanism cho failed requests
- Thông báo lỗi khi không thể kết nối server

## 10. Performance Considerations

- Lazy loading cho danh sách dài
- Pagination để giảm tải dữ liệu
- Caching dữ liệu đã tải

## 11. Accessibility

- Đảm bảo contrast ratio cho text và background
- Keyboard navigation cho table
- Screen reader support cho các elements

## 12. Testing Scenarios

- ✅ Hiển thị danh sách nhu cầu đào tạo
- ✅ Lọc theo trạng thái và phòng ban
- ✅ Tìm kiếm nhu cầu
- ✅ Phân trang và sắp xếp
- ✅ Xóa nhu cầu
- ✅ Xuất Excel
- ✅ Responsive trên các kích thước màn hình

---

**Last Updated**: 2025-09-27  
**Version**: 1.0  
**Status**: ✅ Implemented
