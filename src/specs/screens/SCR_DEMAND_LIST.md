# SCR_DEMAND_LIST — Danh sách nhu cầu đào tạo

## 0) Metadata
- Route: `/training/demands`
- Design: UI mẫu ảnh Demand List
- Role access: Admin, HR

## 1) Purpose
Quản lý danh sách nhu cầu đào tạo: tạo mới, duyệt, theo dõi trạng thái.

## 2) Layout
- **Toolbar**: + Thêm mới, Filter trạng thái (pending/approved/rejected/closed), Export
- **Table**:
  - Cột: Tên nhu cầu, Bộ phận, Người tạo, Ngày tạo, Trạng thái, Người duyệt
  - Actions: Xem chi tiết, Approve/Reject, Close
- Pagination

## 3) Actions
- Tạo nhu cầu mới (→ mở `SCR_DEMAND_FORM`)
- HR/Admin duyệt nhu cầu
- Đóng nhu cầu khi đã được đưa vào kế hoạch

## 4) APIs
- `GET /api/training/demands`
- `POST /api/training/demands`
- `PUT /api/training/demands/:id`
- `POST /api/training/demands/:id/approve`
- `POST /api/training/demands/:id/reject`
- `POST /api/training/demands/:id/close`

## 5) Rules / Validation
- Nhu cầu đã closed không thể reopen
- Chỉ HR/Admin mới có quyền approve
- Approved demands sẽ tự generate items cho kế hoạch
