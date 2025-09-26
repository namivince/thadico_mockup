# SCR_ORG_JOB_POSITION_SIDEPANEL — Thông tin vị trí công việc

## 0) Metadata
- Route: `/org/jobs/:id`
- Design: UI mẫu ảnh Position Side Panel
- Role access: Admin only

## 1) Purpose
Quản lý chi tiết một vị trí công việc: thông tin chung, chi phí, chương trình đào tạo, bộ tiêu chí đánh giá, năng lực yêu cầu.

## 2) Layout
- **Side Panel** mở từ Org Tree
- Tabs:
  - Thông tin chung: tên vị trí, mã, chức danh, quản lý trực tiếp, phép năm, cấp bậc
  - Mô tả công việc, Mô tả tuyển dụng
  - Thông tin chi phí
  - Chương trình đào tạo
  - Bộ tiêu chí đánh giá
  - Tiêu chuẩn năng lực
  - Lộ trình thăng tiến
  - Nhân sự kế cận, Nhân sự tiềm năng
- Footer: Lưu thông tin / Đóng

## 3) Actions
- Sửa thông tin chung
- Gắn chương trình đào tạo
- Gắn tiêu chuẩn năng lực (open modal: `SCR_JOB_COMPETENCY_STANDARD_MODAL`)
- Lưu thay đổi

## 4) APIs
- `GET /api/org/jobs/:id`
- `PUT /api/org/jobs/:id`
- `GET /api/org/jobs/:id/trainings`
- `GET /api/org/jobs/:id/competency-standards`

## 5) Rules / Validation
- Mã vị trí duy nhất
- Mỗi vị trí phải có quản lý trực tiếp
- Không thể xóa nếu có nhân sự đang gắn
