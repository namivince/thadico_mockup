# SCR_ASM_APPEAL_LIST — Danh sách phúc khảo

## 0) Metadata
- Route: `/assessment/appeals?campaignId=:id` 
- Roles: **Super Admin**, Admin
- Design: List + Detail modal

## 1) Purpose
Tiếp nhận, xử lý yêu cầu phúc khảo **trong cửa sổ cho phép**; cập nhật điểm & ghi lịch sử (BA note 5).

## 2) Layout
- Filter: Trạng thái (Mới / Đang xử lý / Hoàn tất / Quá hạn)
- Table: Học viên · Điểm cũ · Lý do · **SL lần đã phúc khảo / N tối đa** · CreatedAt · Trạng thái
- Actions: **Xử lý** (open modal), **Từ chối**
- Badge **"Cửa sổ phúc khảo còn … ngày"**

## 3) APIs
- `GET /api/asm/campaigns/:id/appeals` 
- `POST /api/asm/appeals/:id/resolve`  (newScore, comment, files[])
- `POST /api/asm/appeals/:id/reject`  (reason)

## 4) Rules
- Không cho mở appeal nếu hết window
- Update điểm → **ghi lịch sử phúc khảo** (BA note 5 "Cập nhật lịch sử phúc khảo")
- **Super Admin**: có thể mở lại cửa sổ phúc khảo đã đóng và override giới hạn số lần phúc khảo

## 5) Mock data
```json
[
  {"id":"ap_01","emp":"u_1001","oldScore":7.0,"reason":"Bổ sung minh chứng","count":1,"limit":2,"status":"new","windowLeftDays":5}
]
```
