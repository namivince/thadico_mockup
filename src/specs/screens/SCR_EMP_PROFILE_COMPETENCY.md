# SCR_EMP_PROFILE_COMPETENCY — Hồ sơ năng lực cá nhân

## 0) Metadata
- Route: `/employees/:id/profile/competency`
- Design: UI mẫu ảnh Employee Profile Competency
- Role access: Admin, HR, Manager (xem NV của mình)

## 1) Purpose
Xem và phân tích hồ sơ năng lực của nhân viên với biểu đồ radar và lịch sử đánh giá.

## 2) Layout
- **Header**: Thông tin nhân viên (ảnh, tên, vị trí, phòng ban)
- **Radar Chart**: hiển thị điểm các nhóm năng lực (theo dictionary)
- **Table lịch sử**:
  - Cột: Đợt đánh giá, Điểm trung bình, Gap so với chuẩn, Ngày cập nhật
- **Footer**: Export hồ sơ năng lực (PDF/XLSX)

## 3) Actions
- Xem biểu đồ radar
- So sánh gap với tiêu chuẩn vị trí
- Export hồ sơ

## 4) APIs
- `GET /api/employees/:id/competency-profile`
- `GET /api/employees/:id/competency-history`
- `GET /api/employees/:id/competency-chart`

## 5) Rules / Validation
- Chỉ Manager trực tiếp và Admin được xem profile nhân viên
- Hồ sơ cập nhật khi đợt đánh giá finalize
- Export phải bảo mật, có watermark tên người xuất
