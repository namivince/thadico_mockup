# SCR_DEMAND_FORM — Form tạo nhu cầu đào tạo

## 0) Metadata
- Route: `/training/demands/new`
- Design: UI mẫu ảnh Demand Form (wizard 3 bước)
- Role access: Admin, HR

## 1) Purpose
Thu thập thông tin chi tiết để tạo một nhu cầu đào tạo mới.

## 2) Layout (Wizard 3 bước)
- Step 1: **Thông tin chung**
  - Tên nhu cầu
  - Bộ phận
  - Người đề xuất
  - Mục tiêu
- Step 2: **Nội dung chi tiết**
  - Danh sách kỹ năng cần đào tạo
  - Số lượng nhân viên tham gia
  - Thời gian dự kiến
- Step 3: **Xác nhận & Gửi**
  - Review toàn bộ thông tin
  - Nút Gửi (submit)

## 3) Actions
- Lưu nháp nhu cầu
- Gửi nhu cầu → status = pending
- Hủy bỏ

## 4) APIs
- `POST /api/training/demands`
- `PUT /api/training/demands/:id`
- `POST /api/training/demands/:id/submit`

## 5) Rules / Validation
- Tên nhu cầu bắt buộc
- Số lượng NV ≥ 1
- Ngày dự kiến phải lớn hơn ngày hiện tại
