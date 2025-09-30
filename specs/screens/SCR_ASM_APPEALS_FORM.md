# Màn hình gửi yêu cầu phúc khảo

## Mô tả
Màn hình này cho phép học viên gửi yêu cầu phúc khảo đối với kết quả đánh giá mà họ không đồng ý. Học viên có thể nêu lý do phúc khảo, chọn các câu hỏi cụ thể cần phúc khảo và đính kèm tài liệu bổ sung nếu cần.

## Đối tượng người dùng
- Học viên
- CBNV

## Luồng chức năng
1. Học viên truy cập vào kết quả đánh giá của mình
2. Học viên chọn nút "Yêu cầu phúc khảo"
3. Hệ thống hiển thị form gửi yêu cầu phúc khảo
4. Học viên điền thông tin yêu cầu phúc khảo
5. Học viên gửi yêu cầu phúc khảo
6. Hệ thống xác nhận và thông báo yêu cầu đã được gửi

## Thành phần giao diện

### 1. Phần tiêu đề và thông tin đánh giá
- Tiêu đề "Gửi yêu cầu phúc khảo"
- Thông tin về đánh giá:
  - Tên đánh giá
  - Ngày đánh giá
  - Điểm số hiện tại
  - Người chấm điểm
  - Thời gian chấm

### 2. Phần form yêu cầu phúc khảo
- Trường "Lý do phúc khảo" (bắt buộc)
- Danh sách các câu hỏi/tiêu chí đánh giá để chọn
- Trường "Giải thích chi tiết" cho từng câu hỏi được chọn
- Tùy chọn đính kèm tài liệu bổ sung

### 3. Phần thông tin quy định
- Thời hạn gửi phúc khảo (trong vòng 7 ngày sau khi có kết quả)
- Số lần phúc khảo tối đa (không quá 3 lần)
- Quy trình xử lý phúc khảo
- Thời gian dự kiến có kết quả phúc khảo

### 4. Phần nút tác vụ
- Nút "Gửi yêu cầu"
- Nút "Hủy bỏ"
- Nút "Lưu nháp"

## Các hành động
- **Gửi yêu cầu**: Gửi yêu cầu phúc khảo đến người chấm điểm
- **Lưu nháp**: Lưu thông tin đã nhập để hoàn thành sau
- **Hủy bỏ**: Hủy bỏ yêu cầu và quay lại trang kết quả đánh giá
- **Đính kèm tài liệu**: Tải lên tài liệu bổ sung cho yêu cầu phúc khảo

## Các trạng thái
- **Đang soạn**: Đang nhập thông tin yêu cầu phúc khảo
- **Đã lưu nháp**: Đã lưu thông tin nhưng chưa gửi
- **Đã gửi**: Yêu cầu đã được gửi, đang chờ xử lý

## Quy tắc nghiệp vụ
1. Yêu cầu phúc khảo chỉ được gửi trong vòng 7 ngày sau khi có kết quả đánh giá
2. Mỗi học viên chỉ được gửi tối đa 3 yêu cầu phúc khảo cho một đánh giá
3. Lý do phúc khảo phải được điền đầy đủ và rõ ràng
4. Học viên phải chọn ít nhất một câu hỏi/tiêu chí cần phúc khảo
5. Kích thước tài liệu đính kèm không vượt quá 10MB
6. Các định dạng tài liệu được chấp nhận: PDF, DOCX, JPG, PNG

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Gửi yêu cầu phúc khảo                                       |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Thông tin đánh giá                                          |
|  +-----------------------------------------------------------+|
|  | Tên đánh giá: Đánh giá kỹ năng lập trình                 ||
|  | Ngày đánh giá: 15/09/2025                                ||
|  | Điểm số hiện tại: 75/100                                 ||
|  | Người chấm điểm: Nguyễn Văn A                            ||
|  | Thời gian chấm: 20/09/2025                               ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Thông tin yêu cầu phúc khảo                                 |
|  +-----------------------------------------------------------+|
|  | Lý do phúc khảo *                                        ||
|  | [                                                        ]||
|  | [                                                        ]||
|  | [                                                        ]||
|  |                                                           ||
|  | Chọn câu hỏi/tiêu chí cần phúc khảo *                    ||
|  | [x] Câu 3: Thiết kế cơ sở dữ liệu (15 điểm)              ||
|  |     Điểm hiện tại: 8/15                                  ||
|  |     Giải thích:                                          ||
|  |     [                                                    ]||
|  |     [                                                    ]||
|  |                                                           ||
|  | [x] Câu 5: Xử lý ngoại lệ (10 điểm)                      ||
|  |     Điểm hiện tại: 5/10                                  ||
|  |     Giải thích:                                          ||
|  |     [                                                    ]||
|  |     [                                                    ]||
|  |                                                           ||
|  | [ ] Câu 1: Kiến thức cơ bản (20 điểm)                    ||
|  |     Điểm hiện tại: 18/20                                 ||
|  |                                                           ||
|  | [ ] Câu 2: Thuật toán (25 điểm)                          ||
|  |     Điểm hiện tại: 20/25                                 ||
|  |                                                           ||
|  | [ ] Câu 4: Kiểm thử (15 điểm)                            ||
|  |     Điểm hiện tại: 12/15                                 ||
|  |                                                           ||
|  | [ ] Câu 6: Tối ưu hóa (15 điểm)                          ||
|  |     Điểm hiện tại: 12/15                                 ||
|  |                                                           ||
|  | Tài liệu đính kèm                                        ||
|  | [Chọn tệp] Không có tệp nào được chọn                    ||
|  | Định dạng hỗ trợ: PDF, DOCX, JPG, PNG (tối đa 10MB)      ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Quy định phúc khảo                                          |
|  +-----------------------------------------------------------+|
|  | - Yêu cầu phúc khảo phải được gửi trong vòng 7 ngày sau  ||
|  |   khi có kết quả đánh giá                                ||
|  | - Mỗi học viên chỉ được gửi tối đa 3 yêu cầu phúc khảo   ||
|  |   cho một đánh giá                                       ||
|  | - Kết quả phúc khảo sẽ được thông báo trong vòng 3-5     ||
|  |   ngày làm việc                                          ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Lưu nháp]    [Hủy bỏ]    [Gửi yêu cầu]                    |
|                                                               |
+---------------------------------------------------------------+
```
