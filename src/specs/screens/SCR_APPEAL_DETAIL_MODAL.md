# SCR_APPEAL_DETAIL_MODAL — Xử lý phúc khảo (Modal)

## 0) Metadata
- Open from: SCR_ASM_APPEAL_LIST
- Roles: **Super Admin**, Admin

## 1) Layout
- Header: Tên NV, điểm cũ, số lần đã phúc khảo / tối đa
- Body:
  - Lý do phúc khảo + file đính kèm
  - **Nhập điểm mới** (optional), nhận xét
  - Checkbox: "Giữ nguyên điểm"
- Footer: **Cập nhật** · **Từ chối**

## 2) APIs
- `POST /api/asm/appeals/:id/resolve` 
- `POST /api/asm/appeals/:id/reject` 

## 3) Side effects
- Nếu cập nhật điểm → `POST /api/asm/assignments/:id/update-score`  + ghi **audit**
- Push notify tới NV
- **Super Admin**: có thể override điểm vượt giới hạn thông thường và cập nhật trực tiếp vào hồ sơ năng lực

## 4) Mock request
```json
{"newScore": 7.8, "comment":"Đã xem minh chứng bổ sung"}
```
