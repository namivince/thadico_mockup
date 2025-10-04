# SCR_TEST_RUNNER — Học viên làm bài thi

## Mô tả
Trang cho phép nhân viên làm bài đánh giá năng lực, bao gồm các câu hỏi trắc nghiệm và tự luận, với tính năng tự động lưu và thông báo kết quả.

## Đối tượng người dùng
- Nhân viên (làm bài)
- Admin (giám sát)

## Chức năng chính
1. **Làm bài đánh giá**
   - Hiển thị các câu hỏi theo từng loại: trắc nghiệm (MCQ) và tự luận (Essay)
   - Hỗ trợ câu hỏi trắc nghiệm đơn lựa chọn và nhiều lựa chọn
   - Hỗ trợ câu hỏi tự luận với giới hạn ký tự và đính kèm minh chứng

2. **Đếm ngược thời gian**
   - Hiển thị đồng hồ đếm ngược thời gian làm bài
   - Cảnh báo khi gần hết thời gian
   - Tự động nộp bài khi hết thời gian

3. **Tự động lưu**
   - Tự động lưu bài làm mỗi 30 giây
   - Hiển thị trạng thái lưu: đang lưu, đã lưu, lỗi

4. **Nộp bài**
   - Xác nhận nộp bài qua modal
   - Hiển thị thông báo xác nhận sau khi nộp bài
   - Vô hiệu hóa các trường nhập liệu sau khi nộp

5. **Xem kết quả**
   - Hiển thị thông báo về thời gian dự kiến có kết quả
   - Cho phép xem lại bài làm sau khi nộp nhưng không được sửa

## Luồng màn hình
1. Người dùng truy cập vào trang làm bài qua token
2. Hệ thống hiển thị thông tin bài thi và bắt đầu đếm ngược thời gian
3. Người dùng trả lời các câu hỏi
4. Hệ thống tự động lưu bài làm mỗi 30 giây
5. Người dùng nộp bài khi hoàn thành hoặc hệ thống tự động nộp khi hết thời gian
6. Hệ thống hiển thị thông báo xác nhận và thời gian dự kiến có kết quả

## Các thành phần UI
- Header: Tên chiến dịch, đồng hồ đếm ngược
- Tiến trình hoàn thành
- Các loại câu hỏi:
  - MCQ: Radio button (single choice) hoặc Checkbox (multiple choice)
  - Essay: TextArea với đếm ký tự, nút đính kèm minh chứng
- Nút điều hướng: Câu trước, Câu tiếp theo
- Nút Nộp bài
- Thông báo trạng thái tự động lưu
- Modal xác nhận nộp bài
- Banner thông báo sau khi nộp bài

## Dữ liệu
```json
{
  "candidate": {"id":"u_1001","name":"Nguyễn Văn A"},
  "campaign": {
    "id":"cmp_01",
    "name":"Đánh giá tay nghề Q4",
    "gradeDueAt":"2025-10-20T17:00:00Z",
    "timeLimit": 3600
  },
  "questions":[
    {
      "id":"q1",
      "type":"mcq",
      "text":"An toàn lao động gồm?",
      "options":["A. Quy trình", "B. Thiết bị", "C. Đào tạo"],
      "multi":false
    },
    {
      "id":"q2",
      "type":"essay",
      "text":"Mô tả quy trình thao tác máy X.", 
      "maxLen": 800
    }
  ],
  "answers": {
    "q1": ["B"],
    "q2": "Quy trình thao tác máy X bao gồm các bước..."
  },
  "submitted": false,
  "startedAt": "2025-10-04T14:30:00Z"
}
```

## Quyền truy cập
- Nhân viên: Làm bài, nộp bài, xem lại bài đã nộp
- Admin: Giám sát bài làm real-time, mở khóa bài đã nộp, điều chỉnh thời gian

## Ghi chú
- Token trong URL là duy nhất cho mỗi lần làm bài
- Bài làm được tự động lưu mỗi 30 giây để tránh mất dữ liệu
- Sau khi nộp, người dùng có thể xem lại bài làm nhưng không thể sửa
- Thời gian làm bài được tính từ khi người dùng bắt đầu làm bài
- File đính kèm hỗ trợ các định dạng phổ biến: PDF, Word, Excel, hình ảnh
