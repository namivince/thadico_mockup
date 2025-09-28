# SCR_ASM_ASSIGN_SCOPE_MODAL — Chọn đối tượng

## 0) Metadata
Context: từ Step1 của Campaign Form

## 1) Purpose
Pick theo Phòng ban / Vị trí / Cá nhân; preview số lượng.

## 2) Layout
Tree org (checkbox) · Tabs (Org / Position / Users)
Right panel: Preview & đếm số assignment
Footer: Lưu phạm vi

## 3) APIs
GET /api/org/tree
GET /api/users?filters=...
POST /api/asm/rounds/:id/scope
