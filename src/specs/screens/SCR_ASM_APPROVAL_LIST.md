# SCR_ASM_APPROVAL_LIST — Danh sách phê duyệt kết quả đánh giá

## 0) Metadata
- Route: `/assessment/approvals`
- Design: UI mẫu ảnh approval list
- Role access: Manager, Senior Manager, HR Admin

## 1) Purpose
Hỗ trợ quản lý và cấp quản lý phê duyệt kết quả đánh giá nhân viên, xử lý rework.

## 2) Layout
- **Toolbar**: Filter theo trạng thái (pending/approved/rejected), Search, Export
- **Table**:
  - Cột: Nhân viên, Vòng đánh giá, Trạng thái, Điểm, Người phê duyệt
  - Actions: View → mở form chi tiết đánh giá → Approve/Reject
- Pagination dưới bảng

## 3) Actions
- Manager mở kết quả → chấm/nhận xét → Submit
- Senior Manager xem kết quả → Approve/Reject
- HR Admin theo dõi tổng quan

## 4) APIs
- `GET /api/asm/approvals`
- `POST /api/asm/approvals/:id/approve`
- `POST /api/asm/approvals/:id/reject`

## 5) Rules / Validation
- Nhân viên phải tự đánh giá trước khi Manager có thể phê duyệt
- Một kết quả chỉ có thể bị reject tối đa N lần
- Phải log lại lịch sử phê duyệt/reject
