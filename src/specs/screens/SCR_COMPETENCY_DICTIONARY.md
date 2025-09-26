# SCR_COMPETENCY_DICTIONARY — Từ điển năng lực (bảng đôi)

## 0) Metadata
- Route: `/assessment/dictionary`
- Design: UI mẫu ảnh Dictionary
- Role access: Admin only

## 1) Purpose
Quản lý master data nhóm năng lực và năng lực thành phần.

## 2) Layout
- **Toolbar**: Search, Toggle Đang sử dụng, Export (PDF/XLS/XLSX), + Thêm mới
- **Left Table (Nhóm)**:
  - Cột: Mã, Tên, Thứ tự, Trọng số
  - Actions: Sửa / Xóa
- **Right Table (Năng lực)**:
  - Cột: Mã, Tên, Mô tả, Thứ tự
  - Actions: Sửa / Xóa
- Pagination cho mỗi bảng

## 3) Actions
- Thêm/Sửa/Xóa nhóm năng lực
- Thêm/Sửa/Xóa năng lực trong nhóm
- Export toàn bộ dictionary

## 4) APIs
- `GET /api/competency/groups`
- `POST /api/competency/groups`
- `PUT /api/competency/groups/:id`
- `DELETE /api/competency/groups/:id`
- `GET /api/competency?group_id=`
- `POST /api/competency`
- `PUT /api/competency/:id`
- `DELETE /api/competency/:id`
- Export endpoints

## 5) Rules / Validation
- Không xóa nhóm/năng lực nếu đang tham chiếu trong assessment round
- Mỗi nhóm có trọng số, tổng trọng số = 100%
