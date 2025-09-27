SCR_ADMIN_DASHBOARD — Super Admin Overview (F1/F2/F3)
0) Metadata

Route: /dashboard

Role access: super_admin

Design ref: Dashboard v2 (layout 4 khối chính, 1 thanh mega-menu rút gọn)

Mục tiêu: Cho Super Admin xem bức tranh tổng của 3 flow (F1, F2, F3) + lối tắt thao tác nhanh.

1) Navigation (Mega-menu rút gọn)

Dashboard → /dashboard

Khảo sát (F1) → /surveys

Kế hoạch đào tạo (F2) → /training/plans

Đánh giá (F3) → /assessment/rounds

Cấu hình (ẩn trên demo nếu không cần) → /admin/system

Không hiển thị: Công-lương, Tuyển dụng, Nhân sự… để tránh nhiễu demo.

2) Layout tổng

Hàng 1 (Hero KPIs) — 3 card ngang (equal width)

F1 — Surveys

KPIs: draft, running, dueSoon, overdue, responseRate%

F2 — Training Plans

KPIs: draft, waitingApproval, approved, deployed, completed

F3 — Assessments

KPIs: draft, running, grading, resultsPublished, finalized

Hàng 2 (Tiến độ & cảnh báo)

Progress Board (3 cột): mỗi cột 1 flow

Thanh tiến độ: % hoàn thành kỳ hiện tại

Mini-pill: “Việc cần làm” (approval pending, lớp chưa xếp lịch, survey sắp đóng…)

Alert Center (right side, 1/3 chiều ngang)

Danh sách cảnh báo hợp nhất: overdue, dueIn3Days, approvalSLA, budgetOver

Hàng 3 (Trends & phân tích)

F1 Trend (line): Response rate 6 tháng + completion by org (mini bar)

F2 Budget vs Actual (bar): theo quý; chip báo “Over / Within”

F3 Score Distribution (violin/histogram): điểm trung bình & gap vs standard

Hàng 4 (Quick Actions / Shortcuts)

F1: Tạo khảo sát, Phân phối, Mở monitor

F2: Tạo kế hoạch, Gửi phê duyệt, Triển khai lớp

F3: Tạo chiến dịch, Đóng input & chấm, Công bố kết quả

Phân quyền: chỉ enable khi user có quyền flow tương ứng

Tất cả card có onClick dẫn tới màn hình list/detail tương ứng.

3) Interactions

Click KPI → filter preset trên list của flow đó.

Hover KPI → tooltip hiển thị query mô tả (e.g. “Surveys running this month”).

Alert item → mở modal chi tiết + nút xử lý nhanh (Send reminder / Approve / Close input).

Trend chart có dropdown range: 3M / 6M / 12M.

4) APIs

Tổng hợp (1 call/flow)

GET /api/dashboard/f1/summary?range=month
→ { draft, running, dueSoon, overdue, responseRate }

GET /api/dashboard/f2/summary?range=year
→ { draft, waitingApproval, approved, deployed, completed, budget:{plan,actual} }

GET /api/dashboard/f3/summary?range=period
→ { draft, running, grading, resultsPublished, finalized, avgScore, gap }

Tiến độ & cảnh báo

GET /api/dashboard/alerts
→ [{ id, flow: 'F1'|'F2'|'F3', type, title, dueAt, severity, action:{label, href} }]

GET /api/dashboard/f1/progress?period=:period → { completionPct, pendingReminders }

GET /api/dashboard/f2/progress?year=:year → { completionPct, approvalsPending }

GET /api/dashboard/f3/progress?roundId=:id → { completionPct, gradingSLA }

Trends

GET /api/dashboard/f1/trends?months=6 → [{ month, responseRate, completion }]

GET /api/dashboard/f2/budget-trend?months=6 → [{ month, plan, actual }]

GET /api/dashboard/f3/score-trend?months=6 → [{ month, avg, stdev }]

Shortcuts

GET /api/dashboard/shortcuts?flows=F1,F2,F3
→ [{ code, title, href, enabled }]

5) Rules

Timebox: mặc định hiển thị tháng hiện tại (F1, F3) và năm hiện tại (F2).

SLA nhắc việc:

F1: nhắc T-3/T-1/Overdue

F2: nhắc mỗi cấp phê duyệt sau N giờ

F3: nhắc grading trước deadline

Hiển thị có điều kiện: card/shortcut ẩn hoặc disabled nếu enabled=false.

6) UI/UX Notes

Tone: clean, gradient nhẹ, glass cho hero KPIs.

Iconography:

F1 📋, F2 🎓, F3 🧭 (tuỳ bộ icon đang dùng).

Color coding:

F1 (indigo), F2 (teal), F3 (orange). Alerts dùng đỏ/amber/xanh lá theo severity.

Responsive:

Hàng 1: 3 card → stack 1/row trên mobile.

Hàng 2: Progress Board 2/3 + Alerts 1/3 → mobile: stack.

7) Acceptance Criteria

 Vào /dashboard thấy 3 KPI cards cho F1, F2, F3 với số liệu đúng.

 Click KPI → được điều hướng sang list tương ứng với filter preset.

 Alert Center hiện các cảnh báo cross-flow, click mở được action/modal.

 3 widgets Trends hiển thị dữ liệu đúng phạm vi (3M/6M/12M selector).

 Shortcuts hiển thị theo quyền; disabled khi không đủ quyền.

 Tất cả API lỗi → hiển thị skeleton + message “Thử lại”.

8) Data contracts (ví dụ)
// /api/dashboard/f2/summary
{
  "draft": 4,
  "waitingApproval": 2,
  "approved": 5,
  "deployed": 3,
  "completed": 1,
  "budget": { "plan": 1200000000, "actual": 950000000 }
}

9) Telemetry

Event: dash.kpi.click (flow, kpi)

Event: dash.alert.action (flow, type, action)

Event: dash.shortcut.click (code)

Event: dash.range.change (widget, months)