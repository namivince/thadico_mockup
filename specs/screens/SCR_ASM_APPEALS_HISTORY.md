# Màn hình lịch sử phúc khảo

## Mô tả
Màn hình này hiển thị lịch sử các yêu cầu phúc khảo của một học viên hoặc tất cả các yêu cầu phúc khảo trong một đánh giá. Người dùng có thể xem chi tiết từng yêu cầu, theo dõi trạng thái xử lý, và xem kết quả phúc khảo.

## Đối tượng người dùng
- Quản trị viên
- HR
- Giảng viên
- Học viên (phiên bản giới hạn)

## Luồng chức năng
1. Người dùng truy cập vào màn hình lịch sử phúc khảo
2. Hệ thống hiển thị danh sách các yêu cầu phúc khảo theo quyền truy cập
3. Người dùng có thể lọc, sắp xếp và tìm kiếm yêu cầu phúc khảo
4. Người dùng chọn xem chi tiết một yêu cầu phúc khảo
5. Hệ thống hiển thị thông tin chi tiết và lịch sử xử lý của yêu cầu đó

## Thành phần giao diện

### 1. Phần tiêu đề và bộ lọc
- Tiêu đề "Lịch sử phúc khảo"
- Bộ lọc theo đánh giá
- Bộ lọc theo trạng thái:
  - Tất cả
  - Đang chờ xử lý
  - Đang xem xét
  - Đã hoàn thành
  - Đã từ chối
- Bộ lọc theo thời gian
- Thanh tìm kiếm

### 2. Phần danh sách yêu cầu phúc khảo
- Bảng danh sách các yêu cầu phúc khảo với các cột:
  - Mã yêu cầu
  - Tên đánh giá
  - Ngày gửi
  - Người gửi
  - Trạng thái
  - Kết quả (nếu đã hoàn thành)
  - Thao tác

### 3. Phần chi tiết yêu cầu phúc khảo
- Thông tin về đánh giá
- Thông tin về người gửi yêu cầu
- Lý do phúc khảo
- Danh sách các câu hỏi/tiêu chí cần phúc khảo
- Tài liệu đính kèm
- Trạng thái hiện tại
- Lịch sử xử lý

### 4. Phần kết quả phúc khảo
- Người xử lý
- Ngày xử lý
- Quyết định (chấp nhận/từ chối)
- Lý do quyết định
- Điểm số trước và sau phúc khảo
- Ghi chú của người chấm

## Các hành động
- **Xem chi tiết**: Hiển thị thông tin chi tiết của yêu cầu phúc khảo
- **Xử lý yêu cầu**: Chỉ dành cho giảng viên/quản trị viên
- **Xuất báo cáo**: Xuất báo cáo lịch sử phúc khảo ra Excel
- **Gửi thông báo**: Gửi thông báo cho người liên quan

## Các trạng thái yêu cầu phúc khảo
- **Đang chờ xử lý**: Yêu cầu đã được gửi nhưng chưa được xem xét
- **Đang xem xét**: Yêu cầu đang được xem xét bởi giảng viên
- **Đã hoàn thành**: Yêu cầu đã được xử lý và có kết quả
- **Đã từ chối**: Yêu cầu bị từ chối vì không đáp ứng quy định

## Quy tắc nghiệp vụ
1. Học viên chỉ có thể xem yêu cầu phúc khảo của chính mình
2. Giảng viên có thể xem và xử lý các yêu cầu phúc khảo cho đánh giá do mình chấm
3. Quản trị viên và HR có thể xem tất cả các yêu cầu phúc khảo
4. Kết quả phúc khảo phải được ghi nhận đầy đủ lý do
5. Mọi thay đổi điểm số phải được ghi lại trong lịch sử
6. Hệ thống tự động gửi thông báo khi có cập nhật trạng thái yêu cầu

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Lịch sử phúc khảo                                           |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Bộ lọc                                                       |
|  +----------+  +------------+  +------------+  +------------+ |
|  | Đánh giá v|  | Trạng thái v|  | Thời gian  v|  |   Tìm kiếm  | |
|  +----------+  +------------+  +------------+  +------------+ |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Danh sách yêu cầu phúc khảo                                 |
|  +-----------------------------------------------------------+|
|  | Mã    | Đánh giá     | Ngày gửi  | Người gửi | Trạng thái | Thao tác |
|  |-------|--------------|-----------|-----------|------------|----------|
|  | AP001 | Đánh giá kỹ  | 22/09/2025| Nguyễn    | Đã hoàn    | [Xem]    |
|  |       | năng lập     |           | Văn A     | thành      |          |
|  |       | trình        |           |           | (+5 điểm)  |          |
|  |-------|--------------|-----------|-----------|------------|----------|
|  | AP002 | Đánh giá kỹ  | 23/09/2025| Trần      | Đang xem   | [Xem]    |
|  |       | năng giao    |           | Thị B     | xét        | [Xử lý]  |
|  |       | tiếp         |           |           |            |          |
|  |-------|--------------|-----------|-----------|------------|----------|
|  | AP003 | Đánh giá kỹ  | 25/09/2025| Lê        | Đang chờ   | [Xem]    |
|  |       | năng quản    |           | Văn C     | xử lý      | [Xử lý]  |
|  |       | lý           |           |           |            |          |
|  +-----------------------------------------------------------+|
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Chi tiết yêu cầu phúc khảo                                  |
|  +-----------------------------------------------------------+|
|  | Mã yêu cầu: AP001                                        ||
|  | Đánh giá: Đánh giá kỹ năng lập trình                     ||
|  | Người gửi: Nguyễn Văn A                                  ||
|  | Ngày gửi: 22/09/2025                                     ||
|  | Trạng thái: Đã hoàn thành                                ||
|  |                                                           ||
|  | Lý do phúc khảo:                                         ||
|  | Tôi cho rằng câu trả lời của tôi về thiết kế cơ sở dữ    ||
|  | liệu đã đáp ứng đầy đủ yêu cầu của đề bài và xứng đáng   ||
|  | được điểm cao hơn.                                        ||
|  |                                                           ||
|  | Câu hỏi cần phúc khảo:                                   ||
|  | 1. Câu 3: Thiết kế cơ sở dữ liệu (15 điểm)               ||
|  |    Điểm trước phúc khảo: 8/15                            ||
|  |    Giải thích: Thiết kế của tôi đã bao gồm đầy đủ các    ||
|  |    bảng và mối quan hệ theo yêu cầu.                     ||
|  |                                                           ||
|  | Tài liệu đính kèm:                                       ||
|  | - thiet_ke_csdl.pdf                                      ||
|  |                                                           ||
|  | Lịch sử xử lý:                                           ||
|  | - 22/09/2025 10:30: Yêu cầu được gửi                     ||
|  | - 23/09/2025 14:15: Yêu cầu được tiếp nhận               ||
|  | - 24/09/2025 09:45: Yêu cầu đang được xem xét            ||
|  | - 25/09/2025 11:20: Yêu cầu đã được xử lý                ||
|  |                                                           ||
|  | Kết quả phúc khảo:                                       ||
|  | - Người xử lý: Nguyễn Văn A                              ||
|  | - Ngày xử lý: 25/09/2025                                 ||
|  | - Quyết định: Chấp nhận                                  ||
|  | - Lý do: Sau khi xem xét lại bài làm và tài liệu đính    ||
|  |   kèm, tôi nhận thấy thiết kế đã đáp ứng đầy đủ yêu cầu  ||
|  |   và có một số điểm sáng tạo.                            ||
|  | - Điểm trước phúc khảo: 8/15                             ||
|  | - Điểm sau phúc khảo: 13/15 (+5 điểm)                    ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Xuất báo cáo]                                [Đóng]         |
|                                                               |
+---------------------------------------------------------------+
```
