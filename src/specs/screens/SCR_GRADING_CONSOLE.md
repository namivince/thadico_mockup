# SCR_GRADING_CONSOLE — Kết quả đánh giá (Giảng viên)

## 0) Metadata
- Route: `/assessment/grading?campaignId=:id` 
- Roles: **Super Admin**, Admin, Giảng viên

## 1) Purpose
Chấm bài theo danh sách; hiển thị **đếm ngược SLA chấm** per-campaign và per-assignment; cảnh báo quá hạn (BA note 4).

## 2) Layout
- Header: Tên chiến dịch + **Countdown tới gradeDueAt**
- Left: Bộ lọc (Chưa chấm / Đang chấm / Quá hạn / Đã chấm)
- Right: Bảng danh sách
  - Cột: Nhân viên · Phòng ban · Trạng thái · **SLA còn lại** · Điểm · Ghi chú
  - Row badge **Đỏ** nếu `now > gradeDueAt` 
- Drawer chấm:
  - Tab **Bài nộp** (MCQ auto-score + Essay chấm tay)
  - **Quick rubric** (Chưa đạt/Đạt/Vượt mong đợi – BA note 1)
  - **Lưu** / **Hoàn tất**

## 3) APIs
- `GET /api/asm/campaigns/:id/assignments` 
- `POST /api/asm/assignments/:id/grade`  (score, comment, level)

## 4) Rules
- Hệ thống gửi **warning** trước hạn & khi quá hạn (BA note 4)
- MCQ **auto-score**, Essay nhập tay (BA dòng 5 – phân tích/chấm tay file cứng vẫn possible)
- **Super Admin**: có quyền override SLA, điều chỉnh điểm bất kỳ lúc nào và chấm lại bài đã hoàn thành

## 5) Mock data (assignments)
```json
[
  {"id":"as_01","emp":"u_1001","unit":"Xưởng A","status":"pending","slaLeftMin": 720},
  {"id":"as_02","emp":"u_1002","unit":"Xưởng B","status":"overdue","slaLeftMin": -120}
]
```
