# SCR_ASM_RESULTS_REPORT — Kết quả & Báo cáo

## 0) Metadata
Route: /assessment/rounds/:id/results
Roles: Super Admin, HR Admin, Manager(view scope)

## 1) Purpose
Xem điểm, phân phối, skill gap; export.

## 2) Layout
Filters: đơn vị, vị trí, reviewer, score range
Tabs:
- Overview: KPI (completion, avg score), histogram
- By Unit: bảng tổng hợp theo đơn vị
- By Person: danh sách cá nhân + detail drawer
- Export: chọn định dạng → Export

## 3) APIs
GET /api/asm/rounds/:id/reports
GET /api/asm/rounds/:id/export?format=xlsx|pdf
