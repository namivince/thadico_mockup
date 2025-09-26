# SCR_PLAN_LIST — Danh sách kế hoạch đào tạo

## 0) Metadata
- Route: `/training/plans`
- Design: UI mẫu ảnh Plan List
- Role access: Admin, HR

## 1) Purpose
Quản lý các kế hoạch đào tạo: tạo mới, duyệt nhiều cấp, theo dõi triển khai.

## 2) Layout
- **Toolbar**: + Thêm mới, Filter theo trạng thái (waiting_approval/approved/deployed/completed), Export
- **Table**:
  - Cột: Tên kế hoạch, Ngân sách, Ngày tạo, Người tạo, Trạng thái
  - Actions: View, Edit, Approve, Deploy, Export
- Pagination

## 3) Actions
- Tạo kế hoạch mới (→ mở `SCR_PLAN_FORM`)
- Duyệt kế hoạch theo workflow
- Deploy thành lớp học
- Xuất báo cáo tổng kết

## 4) APIs
- `GET /api/training/plans`
- `POST /api/training/plans`
- `PUT /api/training/plans/:id`
- `POST /api/training/plans/:id/approve`
- `POST /api/training/plans/:id/deploy`
- `POST /api/training/plans/:id/complete`

## 5) Rules / Validation
- Kế hoạch chỉ deploy khi đã được approve
- Workflow duyệt: Manager → HR Director → CEO
- Kế hoạch đã completed không chỉnh sửa
