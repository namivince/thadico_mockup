# SCR_COURSE_LIST - Danh sách khóa học đào tạo

## 1. Metadata
- **Screen ID**: SCR_COURSE_LIST
- **Screen Name**: Danh sách khóa học đào tạo
- **Module**: Đào tạo
- **Routes**: `/training/courses`
- **Component**: `CourseList.jsx`
- **Permission**: ADMIN, HR_MANAGER

## 2. Purpose
Màn hình hiển thị danh sách các khóa học đào tạo có sẵn trong hệ thống, cho phép quản lý, tìm kiếm và lọc các khóa học theo danh mục.

## 3. Layout & Components

### Header Section
- **Title**: "Khóa học đào tạo"
- **Action Button**: "Thêm khóa học mới"

### Statistics Cards (3 cards)
- **Tổng khóa học**: Hiển thị tổng số khóa học
- **Danh mục**: Số danh mục khóa học
- **Tổng chi phí**: Tổng chi phí của tất cả khóa học

### Filter Section
- **Search Box**: Tìm kiếm theo tên khóa học
- **Category Filter**: Lọc theo danh mục (Soft Skills, Management, Technical, Language, Sales, Marketing)
- **Export Button**: Xuất dữ liệu ra Excel

### Data Table
- **Columns**:
  - Tên khóa học (có link đến chi tiết)
  - Danh mục (tag màu theo danh mục)
  - Chi phí
  - Thao tác (dropdown menu)
- **Pagination**: Phân trang với các tùy chọn số items/trang

## 4. UI/UX Specifications

### Typography
- **Card Title**: Inter, 20px, Bold, #212529
- **Statistics Title**: Roboto, 14px, Medium, #6C757D
- **Statistics Value**: Roboto, 24px, Bold, màu theo loại
- **Table Headers**: Roboto, 14px, SemiBold, #212529
- **Table Content**: Roboto, 14px, Regular, #212529

### Color Scheme
- **Background**: #F8F9FA
- **Card Background**: #FFFFFF
- **Primary Button**: #0D6EFD
- **Table Zebra**: #FFFFFF / #F8F9FA

### Category Tags
- **Soft Skills**: #1890FF (Xanh dương)
- **Management**: #722ED1 (Tím)
- **Technical**: #13C2C2 (Xanh lam)
- **Language**: #52C41A (Xanh lá)
- **Sales**: #FA8C16 (Cam)
- **Marketing**: #EB2F96 (Hồng)

### Responsive Behavior
- **Desktop**: Hiển thị đầy đủ 3 cards thống kê trên một hàng
- **Tablet**: 2 cards/hàng, 1 card/hàng
- **Mobile**: 1 card/hàng, filter stack vertically

## 5. Actions & Operations

### Main Actions
- **Create**: Thêm khóa học mới
- **View**: Xem chi tiết khóa học
- **Edit**: Chỉnh sửa khóa học
- **Delete**: Xóa khóa học
- **Export**: Xuất dữ liệu ra Excel

### Filtering & Searching
- **Text Search**: Tìm theo tên khóa học
- **Category Filter**: Lọc theo danh mục

### Table Operations
- **Sorting**: Sắp xếp theo tên và chi phí
- **Pagination**: Phân trang dữ liệu

## 6. APIs

### Endpoints Used
- `GET /api/training/courses` - Lấy danh sách khóa học
- `DELETE /api/training/courses/:id` - Xóa khóa học
- `GET /api/training/courses/export` - Xuất dữ liệu ra Excel

### Query Parameters
- `page`: Số trang
- `pageSize`: Số items per page
- `search`: Từ khóa tìm kiếm
- `category`: Lọc theo danh mục

## 7. Data Model

### Course
```json
{
  "id": "number",
  "name": "string",
  "category": "string",
  "cost": "number"
}
```

## 8. Business Rules

### Access Control
- **ADMIN**: Đầy đủ quyền CRUD
- **HR_MANAGER**: Đầy đủ quyền CRUD
- **DEPARTMENT_MANAGER**: Chỉ xem
- **EMPLOYEE**: Chỉ xem

### Course Rules
- Khóa học đang được sử dụng trong kế hoạch đào tạo không thể xóa
- Chi phí khóa học phải > 0
- Tên khóa học không được trùng lặp

## 9. Error Handling

### Validation Errors
- Hiển thị thông báo lỗi khi không thể tải dữ liệu
- Xác nhận trước khi xóa khóa học

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

- ✅ Hiển thị danh sách khóa học
- ✅ Lọc theo danh mục
- ✅ Tìm kiếm khóa học
- ✅ Phân trang và sắp xếp
- ✅ Xóa khóa học
- ✅ Xuất Excel
- ✅ Responsive trên các kích thước màn hình

---

**Last Updated**: 2025-09-27  
**Version**: 1.0  
**Status**: ✅ Implemented
