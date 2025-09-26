# SCR_JOB_COMPETENCY_STANDARD_MODAL — Modal Tiêu chuẩn năng lực theo vị trí

## 0) Metadata
- Context: từ side panel vị trí công việc → Tab Tiêu chuẩn năng lực
- Route: `/org/jobs/:jobId/competency-standards`
- Design: UI mẫu ảnh Job Competency Standard Modal
- Role access: Admin, HR

## 1) Purpose
Thiết lập tiêu chuẩn năng lực cho từng vị trí, làm chuẩn so sánh trong đánh giá.

## 2) Layout
- **Bảng 3 cột**:
  - Năng lực
  - Tiêu chuẩn (select: Dưới yêu cầu / Đạt / Thường xuyên vượt)
  - Điểm chuẩn (input number, max 5)
- **Checkbox**: Là năng lực cốt lõi
- **Footer**: Lưu thông tin / Đóng

## 3) Actions
- Gán năng lực vào vị trí
- Chọn mức chuẩn
- Đánh dấu năng lực cốt lõi
- Lưu thay đổi

## 4) APIs
- `GET /api/org/jobs/:jobId/competency-standards`
- `PUT /api/org/jobs/:jobId/competency-standards`

## 5) Rules / Validation
- Tổng điểm chuẩn không vượt quá thang 5
- Ít nhất 1 năng lực phải là cốt lõi
- Không được xoá nếu vị trí đang gắn vào đợt đánh giá
