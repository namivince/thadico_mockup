# SCR_ASM_ROUND_BOARD — Board kanban theo dõi đánh giá

## 0) Metadata
- Route: `/assessment/rounds/:id/board`
- Design: UI mẫu ảnh Round Board
- Role access: Admin, HR

## 1) Purpose
Hiển thị tiến độ đánh giá theo từng trạng thái (self-eval, manager, approval…) để HR/Admin theo dõi real-time.

## 2) Layout
- **Header**: Tên đợt, trạng thái, filter theo phòng ban
- **Kanban Board**:
  - Cột: Chưa bắt đầu, Đang tự đánh giá, Đã hoàn thành tự đánh giá, Đang manager đánh giá, Đã phê duyệt
  - Card: thông tin nhân viên (tên, phòng ban, trạng thái, % hoàn thành)
- **Footer**: Export progress, Hoàn thành đợt

## 3) Actions
- Drag & drop card (Admin override trạng thái nếu cần)
- Filter theo phòng ban
- Export báo cáo tiến độ
- Đóng đợt khi đủ điều kiện

## 4) APIs
- `GET /api/asm/rounds/:id/progress`
- `POST /api/asm/rounds/:id/override-status`
- `POST /api/asm/rounds/:id/finalize`

## 5) Rules / Validation
- Drag & drop chỉ Admin có quyền
- Hoàn thành đợt chỉ khi tất cả nhân viên đã phê duyệt
- Phải lưu log mỗi lần override trạng thái
