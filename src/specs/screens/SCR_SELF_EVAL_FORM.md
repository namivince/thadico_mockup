# SCR_SELF_EVAL_FORM — Form tự đánh giá nhân viên

## 0) Metadata
- Route: `/self-eval/:token`
- Design: UI mẫu ảnh self eval form
- Role access: Employee (link token riêng)

## 1) Purpose
Cho phép nhân viên tự đánh giá năng lực bản thân trong đợt đánh giá.

## 2) Layout
- **Header**: Tên đợt đánh giá, thời hạn, hướng dẫn
- **Form**:
  - Danh sách năng lực (từ dictionary) với thang điểm
  - Select mức độ: Dưới yêu cầu / Đạt yêu cầu / Vượt yêu cầu
  - Input minh chứng/ghi chú
- **Footer**: Lưu nháp / Gửi đánh giá

## 3) Actions
- Nhân viên điền form theo từng năng lực
- Lưu nháp nhiều lần
- Gửi form trước hạn

## 4) APIs
- `GET /api/asm/self-eval/:token`
- `POST /api/asm/self-eval/:token/save-draft`
- `POST /api/asm/self-eval/:token/submit`

## 5) Rules / Validation
- Token là duy nhất cho mỗi nhân viên/vòng
- Không thể chỉnh sửa sau khi submit
- Validate tất cả năng lực phải có mức độ chọn
