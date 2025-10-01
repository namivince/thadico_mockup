# SCR_ASM_CAMPAIGN_FORM — Thiết lập chiến dịch đánh giá tay nghề

## 0) Metadata
- Route: `/assessment/campaigns/new`  & `/assessment/campaigns/:id/edit` 
- Roles: **Super Admin**, Admin
- Design: 4 step wizard

## 1) Purpose
Tạo/thiết lập chiến dịch: danh mục, đề thi (import Excel), phạm vi, mốc thời gian, **SLA chấm bài** và **cửa sổ phúc khảo**.

## 2) Layout (Wizard 4 bước)
1. **Thông tin chung**  
   - Tên chiến dịch, mô tả, đơn vị phạm vi  
   - Thời gian mở bài (openAt) / đóng nhận bài (closeAt)
2. **Nội dung & Đề thi**  
   - Chọn ngân hàng câu hỏi hoặc **Import Excel** (.xlsx)  
   - Upload template → preview danh sách câu hỏi (MCQ / Essay)  
   - Gắn "nhóm năng lực" (không trọng số – theo BA note 1)
3. **Phân công & SLA**  
   - Chọn giảng viên chấm  
   - **SLA chấm bài:** deadline chấm (`gradeDueAt` ) + bật cảnh báo email & **countdown**  
   - Tùy chọn: "Bật đếm ngược ngay từ lúc bắt đầu chấm" (BA note 4)  
4. **Phúc khảo**  
   - Cho phép phúc khảo: số lần (≤ N), thời gian trong X ngày sau công bố  
   - Nhắc: "Không cho phép nếu chưa công bố kết quả" (rule)

Footer: **Lưu nháp** · **Phát hành**

## 3) APIs
- `POST /api/asm/campaigns` 
- `PUT /api/asm/campaigns/:id` 
- `POST /api/asm/campaigns/:id/import-questions`  (xlsx)
- `POST /api/asm/campaigns/:id/publish` 

## 4) Rules
- Không trọng số theo nhóm (BA note 1)
- Import cho phép (BA note 6)
- SLA chấm bật cảnh báo & đếm ngược (BA note 4)
- Giới hạn câu hỏi mở (<= 500) (BA note 3)
- **Super Admin**: có quyền override mọi giới hạn và validation

## 5) Validation
- openAt < closeAt < gradeDueAt
- Nếu bật phúc khảo: `appealDays > 0`  & `appealLimit >= 1` 

## 6) Mock data (request)
```json
{
  "name": "Đánh giá tay nghề Q4",
  "scopeUnitIds": ["dv_01","dv_02"],
  "openAt": "2025-10-10T08:00:00Z",
  "closeAt": "2025-10-15T17:00:00Z",
  "gradeDueAt": "2025-10-20T17:00:00Z",
  "graders": ["gv_001","gv_007"],
  "appeal": {"enabled": true, "limit": 2, "days": 7},
  "questionSource": {"type": "import", "fileId": "up_abc123"}
}
