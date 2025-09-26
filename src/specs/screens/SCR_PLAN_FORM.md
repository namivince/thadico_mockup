# SCR_PLAN_FORM — Form tạo/sửa kế hoạch đào tạo

## 0) Metadata
- Route: `/training/plans/new`
- Design: UI mẫu ảnh Plan Form (wizard 3 bước)
- Role access: Admin, HR

## 1) Purpose
Cho phép HR/Admin tạo mới hoặc chỉnh sửa kế hoạch đào tạo, với workflow duyệt nhiều cấp.

## 2) Layout (Wizard 3 bước)
- Step 1: **Thông tin cơ bản**
  - Tên kế hoạch
  - Thời gian
  - Người tạo
- Step 2: **Ngân sách & Mục tiêu**
  - Ngân sách dự kiến
  - Mục tiêu đào tạo
- Step 3: **Danh sách khóa học & Review**
  - Danh sách nhu cầu (auto-suggest từ survey)
  - Thông tin lớp học
  - Review & Submit

## 3) Actions
- Lưu nháp
- Gửi duyệt → status = waiting_approval
- Sửa kế hoạch ở trạng thái draft

## 4) APIs
- `POST /api/training/plans`
- `PUT /api/training/plans/:id`
- `POST /api/training/plans/:id/submit`

## 5) Rules / Validation
- Kế hoạch phải có ít nhất 1 nhu cầu được chọn
- Ngân sách > 0
- Không thể submit khi thiếu mục tiêu
