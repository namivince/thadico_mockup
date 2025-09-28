# SCR_ASM_CAMPAIGN_FORM — Tạo/Chỉnh đợt đánh giá

## 0) Metadata
Route: /assessment/rounds/new, /assessment/rounds/:id/edit
Roles: Super Admin, HR Admin
Ref: F3 — bước “Create campaign”

## 1) Purpose
Wizard 4 bước: (1) Info (tên, thời gian, scope) (2) Content/Rubric (chọn template hoặc mở builder) (3) Scoring (trọng số, thang) (4) Review & Publish.

## 2) Layout
Header: Save Draft · Publish · Cancel
Step1 Info: tên, thời gian, mode(sync/async), nút “Chọn đối tượng” (open SCR_ASM_ASSIGN_SCOPE_MODAL)
Step2 Content: chọn rubric template, nút “Mở Rubric Builder”
Step3 Scoring: bảng tiêu chí + weight; validate tổng = 100%
Step4 Review: tóm tắt, cảnh báo, checkbox “Xác nhận publish”

## 3) Actions
Save draft → status=draft
Publish → /api/asm/rounds/:id/publish → status=published

## 4) APIs
POST /api/asm/rounds
PUT  /api/asm/rounds/:id
POST /api/asm/rounds/:id/publish
GET  /api/asm/rubrics/templates

## 5) Rules
- Không publish nếu thiếu rubric hoặc weight != 100%
- Sau publish, cho phép version rubric (không ghi đè)
