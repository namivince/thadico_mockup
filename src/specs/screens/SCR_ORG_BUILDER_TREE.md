# SCR_ORG_BUILDER_TREE — Xây dựng cây tổ chức

## 0) Metadata
- Route: `/org/tree`
- Design: UI mẫu ảnh Org Builder
- Role access: Admin only

## 1) Purpose
Quản lý cơ cấu tổ chức: thêm, sửa, xóa phòng ban; xem số liệu nhân sự; quản lý định biên.

## 2) Layout
- **Sidebar Tree**: danh sách phòng ban dạng cây
- **Toolbar**: + Thêm phòng ban, Copy sơ đồ, Xem lịch sử, Tạo thư từ
- **Table view**:
  - Cột: Tên phòng ban, Mã, Công ty, Cấp, Quản lý, Số lượng nhân sự, Định biên, Số lượng vị trí
  - Actions: Sửa / Xóa
- Pagination cuối bảng

## 3) Actions
- Thêm/Sửa/Xóa phòng ban
- Copy sơ đồ hiện tại → file export
- Xem lịch sử thay đổi cây tổ chức
- Xem chi tiết nhân sự trong phòng ban

## 4) APIs
- `GET /api/org/tree`
- `POST /api/org/departments`
- `PUT /api/org/departments/:id`
- `DELETE /api/org/departments/:id`
- `GET /api/org/history`

## 5) Rules / Validation
- Không xóa phòng ban nếu còn nhân sự
- Mỗi phòng ban phải thuộc một công ty
- Định biên phải ≥ số lượng nhân sự hiện có
