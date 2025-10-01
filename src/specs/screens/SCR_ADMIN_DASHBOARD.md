SCR_ADMIN_DASHBOARD — Super Admin Overview (F1/F2/F3)
0) Metadata

Route: /dashboard

Role access: super_admin

Design tone: sạch, gradient nhẹ, glass cho hero KPIs

Focus: 3 flow chính

F1 Khảo sát (Indigo)

F2 Kế hoạch đào tạo (Teal)

F3 Đánh giá năng lực (Amber)

1) Navigation (mega-menu rút gọn)

Dashboard → /dashboard

Khảo sát (F1) → /surveys

Kế hoạch đào tạo (F2) → /training/plans

Đánh giá (F3) → /assessment/rounds

(Ẩn trong demo: Nhân sự, Công-lương, Tuyển dụng, Hệ thống…)

2) Layout tổng thể
Hàng 1 — Hero KPIs (3 cards ngang)

F1 — Surveys: draft, running, dueSoon, overdue, responseRate%

F2 — Training Plans: draft, waitingApproval, approved, deployed, completed

F3 — Assessments: draft, running, grading, resultsPublished, finalized

Hover KPI → tooltip mô tả query; Click KPI → điều hướng tới list tương ứng với preset filter.

Hàng 2 — Tiến độ & Cảnh báo

Progress Board (3 cột, mỗi cột một flow)

Thanh tiến độ % hoàn thành kỳ hiện tại

Mini pills “việc cần làm”: approval pending, lớp chưa xếp lịch, survey sắp đóng…

Alert Center (1 cột phải)

Danh sách cảnh báo hợp nhất (overdue, dueIn3Days, approvalSLA, budgetOver)

Click item → mở modal chi tiết + nút hành động nhanh (Send reminder / Approve / Close input)

Hàng 3 — Trends & Phân tích (4 ô, 2×2)

F1 Trend (line): Response rate theo tháng (3/6/12M selector)

F2 Budget vs Actual (bar): Kế hoạch vs Thực chi theo tháng/quý (nhãn Over/Within)

F3 Competency Radar (Org Overview): Max vs Chuẩn vs Trung bình theo nhóm năng lực

F3 Role Radar (Role Focus) (tùy chọn bật/tắt): Dropdown Role & Org scope → Max vs Chuẩn Role vs Trung bình scope

Hàng 4 — Quick Actions / Shortcuts

F1: Tạo khảo sát · Phân phối · Mở monitor

F2: Tạo kế hoạch · Gửi phê duyệt · Triển khai lớp

F3: Tạo chiến dịch · Đóng input & chấm · Công bố kết quả

Shortcuts enable/disable theo quyền; click → deep-link vào màn hình list/detail.

3) Interactions

KPI click → mở list với filter preset (vd: status=running&range=thisMonth)

Progress bar click → mở tab tương ứng trong module

Alert click → modal chi tiết + nút xử lý (mock hành vi “thành công”)

Trend range: 3M / 6M / 12M (chỉ thay dữ liệu mock)

Radar axis click: deep-link /assessment/results?round=:id&group=:competency_group

Role Radar controls: Role/Org đổi → thay dataset mock tương ứng

4) Màu sắc & đồ họa

F1 Indigo: #7C4DFF (primary), #B39DDB (secondary)

F2 Teal: #10BDBD (plan), #64D6D6 (actual)

F3 Amber: #FF9800 (avg/hist)

Radar:

max: #6CCF89 (area 20%)

standard: #3B82F6 (area 25%)

avg/orgAvg: #F59E0B (area 25%)

5) Mock Data (hard-coded JSON cho demo)
5.1 Hero KPIs
{
  "F1": { "draft": 5, "running": 3, "dueSoon": 2, "overdue": 1, "responseRate": 78.5 },
  "F2": { "draft": 4, "waitingApproval": 2, "approved": 5, "deployed": 3, "completed": 1 },
  "F3": { "draft": 3, "running": 2, "grading": 1, "resultsPublished": 4, "finalized": 2 }
}

5.2 Progress Board
{
  "progress": {
    "F1": { "completionPct": 65, "todo": ["Gửi nhắc T-1 cho phòng KD", "Đóng survey Q3 – 2 ngày nữa"] },
    "F2": { "completionPct": 45, "todo": ["Chờ duyệt L2 – KH Đào tạo Q4", "Xếp lịch lớp cho 2 khoá"] },
    "F3": { "completionPct": 80, "todo": ["Nhắc chấm điểm vòng Q3", "Chuẩn bị công bố kết quả"] }
  }
}

5.3 Alerts (unified)
{
  "alerts":[
    { "id":"a1","flow":"F1","severity":"high","title":"Survey 'NCĐT Q4' quá hạn 1 ngày","action":{"label":"Gửi nhắc","href":"/surveys/123/monitor"} },
    { "id":"a2","flow":"F2","severity":"medium","title":"Kế hoạch đào tạo Q4 chờ duyệt L2 > 48h","action":{"label":"Mở duyệt","href":"/training/plans/456/approvals"} },
    { "id":"a3","flow":"F3","severity":"low","title":"Vòng đánh giá Q3 còn 12 bài chưa chấm","action":{"label":"Đi tới chấm","href":"/assessment/rounds/789/grading"} }
  ]
}

5.4 Trends
{
  "F1_trend_6m": [
    { "month":"Apr","responseRate":72, "completion":68 },
    { "month":"May","responseRate":74, "completion":70 },
    { "month":"Jun","responseRate":76, "completion":73 },
    { "month":"Jul","responseRate":77, "completion":74 },
    { "month":"Aug","responseRate":79, "completion":76 },
    { "month":"Sep","responseRate":81, "completion":78 }
  ],
  "F2_budget_6m": [
    { "month":"Apr","plan":180, "actual":150 },
    { "month":"May","plan":200, "actual":195 },
    { "month":"Jun","plan":220, "actual":210 },
    { "month":"Jul","plan":240, "actual":260 },
    { "month":"Aug","plan":260, "actual":255 },
    { "month":"Sep","plan":280, "actual":275 }
  ],
  "F3_score_6m": [
    { "month":"Apr","avg":7.2, "stdev":0.8 },
    { "month":"May","avg":7.4, "stdev":0.7 },
    { "month":"Jun","avg":7.5, "stdev":0.7 },
    { "month":"Jul","avg":7.6, "stdev":0.6 },
    { "month":"Aug","avg":7.7, "stdev":0.6 },
    { "month":"Sep","avg":7.8, "stdev":0.5 }
  ]
}

5.5 Radar — Competency (Org Overview)
{
  "F3_radar_competency": {
    "roundId":"2025Q3",
    "labels":["Giao tiếp","Sáng tạo","Ra quyết định","Pháp luật","Triển khai"],
    "series": {
      "max":[4,4,4,4,4],
      "standard":[3,3,3,3,3],
      "avg":[2.8,3.2,2.9,2.7,2.8]
    }
  }
}

5.6 Radar — Role Focus (dropdown Role/Org → đổi dataset)
{
  "F3_radar_role": {
    "role":"HR-EXEC",
    "org":"HCM",
    "roundId":"2025Q3",
    "labels":["Pháp luật","Giao tiếp","Triển khai","Đào tạo & PTNS"],
    "series": {
      "max":[4,4,4,4],
      "roleStandard":[3,2.5,3,3],
      "orgAvg":[2.6,2.2,2.8,2.7]
    },
    "meta": { "gapSum": 1.2, "population": 63 }
  }
}


Gợi ý scale: đơn vị ngân sách ở tỷ (VND) cho bar chart (F2); radar thang tối đa 4/5 tuỳ hệ thống (mock 4).

6) UI/UX Notes

Color coding rõ ràng: F1 indigo, F2 teal, F3 amber; Alerts dùng đỏ/amber/xanh lá theo severity

Glass cards cho hero KPI; hover nâng 4–8px (shadow)

Icons gợi ý: F1 📋, F2 🎓, F3 🧭

Responsive:

Hàng 1: 3 card → stack 1 cột trên mobile

Hàng 2: Progress (2/3) + Alerts (1/3) → stack

Hàng 3: 4 ô → 1 cột trên mobile

Empty state: “No data” + gợi ý filter

7) Acceptance Criteria

Vào /dashboard thấy 3 card KPI (F1/F2/F3) với dữ liệu mock đúng.

Click KPI → điều hướng sang list tương ứng với preset filter (link tĩnh cũng được).

Progress Board hiển thị % & “Việc cần làm” theo mock; click mở module.

Alert Center hiển thị 3 cảnh báo; click → modal chi tiết (mock) + nút hành động.

Trends (line, bar) hiển thị dữ liệu 6M; có selector 3M/6M/12M (đổi dataset mock).

Radar Competency & Role hiển thị đúng; đổi Role/Org (dropdown) thay dataset mock.

Shortcuts hiển thị theo quyền (demo: enable tất cả); click deep-link OK.

Mọi ô có skeleton khi “loading giả” (300–800ms) & thông báo retry mock.

8) Telemetry (mock)

dash.kpi.click (flow, kpi)

dash.alert.action (flow, type, action)

dash.shortcut.click (code)

dash.range.change (widget, months)

dash.radar.click (widget: competency|role, axis)

9) Gợi ý cấu trúc component (tùy stack)

Dashboard/index.jsx

Dashboard/HeroKPIs.jsx

Dashboard/ProgressBoard.jsx · Dashboard/AlertCenter.jsx

Dashboard/Trends/F1Line.jsx · Dashboard/Trends/F2BudgetBar.jsx

Dashboard/Radar/CompetencyRadar.jsx · Dashboard/Radar/RoleRadar.jsx

Dashboard/Shortcuts.jsx

mock/dashboardData.ts (chứa toàn bộ JSON mock phía trên)