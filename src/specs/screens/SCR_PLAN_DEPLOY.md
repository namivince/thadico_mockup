# SCR_PLAN_DEPLOY — Triển khai lớp đào tạo

## 0) Metadata
- Route: `/training/plans/:id/deploy`
- Module: Đào tạo
- Roles: Admin, HR Admin, Unit Training Admin (owner)
- Design ref: Kanban by status + schedule modal + LMS link
- Features: [FC-141, FC-145, FC-130–FC-135 (theo dõi/ báo cáo triển khai)]
- Depends: Plan `approved`

## 1) Purpose
Triển khai các items đã duyệt thành **lớp học cụ thể**: lên lịch, phân công giảng viên/học viên, liên kết LMS, theo dõi tiến độ & chi phí.

## 2) Layout
- **Header**
  - Plan meta + filter theo quý/tháng, đơn vị con
- **Board**
  - Cột: **Planned** → **Scheduled** → **Running** → **Completed** → **Cancelled**
  - Card hiển thị: Tên khóa · Dự kiến thời lượng · Số HV · Chi phí dự trù · Nhãn “in/out Plan”
  - Drag&drop giữa cột (nếu có quyền)
- **Right Panel (Details)**
  - Lịch dự kiến (date/time picker) · Địa điểm/link
  - **Instructor** (search & assign)
  - **Learners** (select by org/position/users; sync từ survey register)
  - Liên kết LMS: nút “Open in LMS” (SSO)
  - Chi phí thực tế (editable khi Completed)
- **Footer**
  - Save · Publish schedule (thông báo email/app) · Export lớp

## 3) Actions & Flows
- **Schedule class**: mở modal, nhập lịch, instructor, learners → Save → card sang **Scheduled**
- **Notify**: gửi thông báo cho instructor + learners (kèm iCal)
- **Running**: khi đến ngày → tự chuyển trạng thái
- **Complete**: nhập kết quả lớp (điểm danh, pass/fail, chi phí thực tế) → card sang **Completed**
- **Cancel/Postpone** (Change Request):
  - Tạo yêu cầu hủy/hoãn/thay thế → chờ duyệt → cập nhật board + versioning
- **Export**: danh sách lớp & learners theo filter

## 4) APIs
- `GET  /api/training/plans/:id/classes`
- `POST /api/training/plans/:id/classes` (create/schedule)
- `PUT  /api/classes/:classId` (update status/details)
- `POST /api/classes/:classId/notify`
- `POST /api/training/plans/:id/change-requests`  (type: cancel/replace/postpone)
- `GET  /api/training/plans/:id/classes/export?format=xlsx|csv`
- `POST /api/lms/link` (generate SSO deep-link)

## 5) Rules
- Chỉ deploy khi **plan.status = approved**
- Learners có thể sync từ Survey (giới hạn 6 tháng) hoặc chọn tay
- Chi phí thực tế chỉ nhập khi status ≥ Completed
- Mọi thay đổi lớp → audit + cập nhật bảng tổng hợp chi phí/hoàn thành

## 6) States
- Class status: planned | scheduled | running | completed | cancelled
