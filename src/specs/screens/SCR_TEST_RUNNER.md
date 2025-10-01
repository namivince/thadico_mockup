# SCR_TEST_RUNNER — Học viên làm bài thi

## 0) Metadata
- Route: `/test/:token` 
- Roles: CBNV (được mời), **Super Admin** (xem/giám sát)
- Design: Focus Mode + Banner trạng thái

## 1) Purpose
Cho CBNV làm bài (MCQ + Essay), nộp bài, hiển thị banner xác nhận "Bài thi đã ghi nhận, **chờ kết quả trước ngày dd/mm/yyyy**" (BA note 7).

## 2) Layout
- Header: Tên chiến dịch + đếm ngược **thời gian làm** (nếu có)
- Body:
  - MCQ: radio/checkbox
  - Essay: rich text / file minh chứng
- Footer: **Nộp bài** → modal confirm  
  Sau khi nộp: **disable input**, hiện **banner xanh**:
  > "Bài thi đã ghi nhận, chờ kết quả trước ngày 20/10/2025"

## 3) APIs
- `GET /api/test/session/:token` 
- `POST /api/test/session/:token/submit` 

## 4) Rules
- Cho xem lại nhưng không sửa sau khi submit
- Lưu **auto-save** local mỗi 30s
- Hiện lịch sử bài cũ nếu "kiểm tra tay nghề mới" yêu cầu module (BA note 7 – optional text)
- **Super Admin**: có quyền giám sát bài làm real-time, mở khóa bài đã nộp để sửa, và điều chỉnh thời gian làm bài

## 5) Mock data (session)
```json
{
  "candidate": {"id":"u_1001","name":"Nguyễn Văn A"},
  "campaign": {"id":"cmp_01","name":"Đánh giá tay nghề Q4","gradeDueAt":"2025-10-20T17:00:00Z"},
  "questions":[
    {"id":"q1","type":"mcq","text":"An toàn lao động gồm?","options":["A","B","C"],"multi":false},
    {"id":"q2","type":"essay","text":"Mô tả quy trình thao tác máy X.", "maxLen": 800}
  ],
  "submitted": false
}
```
