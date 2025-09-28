# SCR_ASM_APPEALS_LIST — Phúc khảo

## 0) Metadata
Route: /assessment/rounds/:id/appeals
Roles: Super Admin, Appeals Board

## 1) Purpose
Mở/đóng cửa sổ khiếu nại, duyệt từng yêu cầu, log thay đổi.

## 2) Layout
Header: Open/Close window (limit, days)
Table: Người yêu cầu · Điểm cũ · Đề nghị · Lý do · Trạng thái · Actions(View/Approve/Reject)
Drawer chi tiết: history, files đính kèm, comment

## 3) APIs
POST /api/asm/rounds/:id/appeals/open {limit, days}
GET  /api/asm/rounds/:id/appeals
PUT  /api/asm/appeals/:appealId {status, comment, newScore?}
