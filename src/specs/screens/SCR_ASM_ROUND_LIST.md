# SCR_ASM_ROUND_LIST — Danh sách các vòng đánh giá

## 0) Metadata
- Route: `/assessment/rounds`
- Design: UI mẫu ảnh round list
- Role access: **Super Admin**, Admin

## 1) Purpose
Quản lý danh sách các vòng đánh giá đã tạo: theo dõi trạng thái, thêm mới, chỉnh sửa, kích hoạt.

## 2) Layout
- **Toolbar**: + Thêm mới, Filter theo trạng thái, Export
- **Table**:
  - Cột: Tên đợt, Thời gian, **SLA chấm**, **Cửa sổ phúc khảo**, Mục tiêu, Trạng thái, Người tạo
  - Actions: Xem chi tiết, Sửa, Kích hoạt, Hoàn thành, Hủy
- Pagination dưới bảng

## 3) Actions
- Tạo vòng đánh giá mới (→ mở form cấu hình)
- Sửa vòng ở trạng thái nháp
- Kích hoạt vòng
- Xem tiến độ & báo cáo
- Hủy vòng nếu chưa bắt đầu

## 4) APIs
- `GET /api/asm/rounds`
- `POST /api/asm/rounds`
- `PUT /api/asm/rounds/:id`
- `DELETE /api/asm/rounds/:id`
- `POST /api/asm/rounds/:id/publish`
- `POST /api/asm/rounds/:id/finalize`

## 5) Rules / Validation
- Vòng ở trạng thái draft mới được sửa
- Không thể hủy vòng đang running
- Chỉ HR/Admin có quyền tạo/kích hoạt
