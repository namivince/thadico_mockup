# Màn hình lưu tạm câu trả lời khảo sát

## Mô tả
Màn hình này cho phép người dùng lưu tạm câu trả lời khảo sát khi chưa hoàn thành, để có thể quay lại tiếp tục sau. Tính năng này giúp người dùng không bị mất dữ liệu đã nhập khi gặp sự cố hoặc cần tạm dừng việc trả lời khảo sát.

## Đối tượng người dùng
- CBNV
- Học viên
- Người tham gia khảo sát

## Luồng chức năng
1. Người dùng đang trả lời khảo sát
2. Người dùng chọn nút "Lưu nháp" hoặc hệ thống tự động lưu theo định kỳ
3. Hệ thống lưu tạm câu trả lời hiện tại
4. Khi người dùng quay lại khảo sát, hệ thống hiển thị thông báo về bản nháp đã lưu
5. Người dùng có thể chọn khôi phục bản nháp hoặc bắt đầu mới
6. Người dùng tiếp tục trả lời khảo sát từ vị trí đã lưu

## Thành phần giao diện

### 1. Phần lưu nháp trong khảo sát
- Nút "Lưu nháp" trong thanh công cụ của khảo sát
- Thông báo xác nhận khi lưu nháp thành công
- Thông báo tự động lưu theo định kỳ

### 2. Phần thông báo bản nháp khi quay lại
- Thông báo hiển thị khi người dùng quay lại khảo sát có bản nháp
- Thông tin về thời gian lưu bản nháp gần nhất
- Tùy chọn "Khôi phục bản nháp" hoặc "Bắt đầu mới"

### 3. Phần quản lý bản nháp
- Danh sách các khảo sát có bản nháp
- Thông tin về thời gian lưu, tiến độ hoàn thành
- Tùy chọn tiếp tục hoặc xóa bản nháp

### 4. Phần cài đặt lưu nháp tự động
- Tùy chọn bật/tắt lưu nháp tự động
- Tùy chọn thời gian lưu tự động (1 phút, 5 phút, 10 phút)
- Tùy chọn thông báo khi lưu tự động

## Các hành động
- **Lưu nháp thủ công**: Người dùng chủ động lưu câu trả lời hiện tại
- **Lưu nháp tự động**: Hệ thống tự động lưu câu trả lời theo định kỳ
- **Khôi phục bản nháp**: Khôi phục câu trả lời đã lưu trước đó
- **Bắt đầu mới**: Bỏ qua bản nháp và bắt đầu trả lời từ đầu
- **Xóa bản nháp**: Xóa bản nháp đã lưu

## Quy tắc nghiệp vụ
1. Bản nháp được lưu trên máy chủ, không chỉ trên trình duyệt của người dùng
2. Bản nháp chỉ được lưu khi có ít nhất một câu trả lời
3. Bản nháp sẽ được giữ lại cho đến khi người dùng hoàn thành khảo sát hoặc khảo sát hết hạn
4. Chỉ lưu bản nháp mới nhất cho mỗi khảo sát
5. Hệ thống tự động lưu nháp mỗi 5 phút nếu có thay đổi
6. Người dùng có thể tắt tính năng lưu nháp tự động trong cài đặt

## Mockup UI

### Màn hình khảo sát với nút lưu nháp
```
+---------------------------------------------------------------+
|                                                               |
|  Khảo sát nhu cầu đào tạo Q3/2025                           |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Tiến độ: [==============================>      ] 70%         |
|                                                               |
|  Câu 7/10: Bạn quan tâm đến những chủ đề đào tạo nào?        |
|  +-----------------------------------------------------------+|
|  | [x] Kỹ năng lãnh đạo                                     ||
|  | [x] Kỹ năng giao tiếp                                    ||
|  | [ ] Kỹ năng quản lý thời gian                            ||
|  | [x] Excel nâng cao                                       ||
|  | [ ] Quản lý dự án                                        ||
|  | [ ] Tiếng Anh giao tiếp                                  ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Câu 8/10: Bạn mong muốn hình thức đào tạo nào?              |
|  +-----------------------------------------------------------+|
|  | (o) Trực tiếp tại lớp                                    ||
|  | ( ) Trực tuyến có tương tác                              ||
|  | ( ) Tự học qua video                                     ||
|  | ( ) Kết hợp nhiều hình thức                              ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Quay lại]    [Lưu nháp]    [Tiếp theo]                     |
|                                                               |
+---------------------------------------------------------------+
```

### Thông báo lưu nháp thành công
```
+---------------------------------------------------------------+
|                                                               |
|  ✓ Đã lưu nháp thành công                                    |
|  Bạn có thể quay lại và tiếp tục sau.                        |
|                                                               |
+---------------------------------------------------------------+
```

### Thông báo khi quay lại khảo sát có bản nháp
```
+---------------------------------------------------------------+
|                                                               |
|  Khảo sát nhu cầu đào tạo Q3/2025                           |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  [i] Bạn có bản nháp được lưu lúc 15:30, 25/09/2025          |
|  Tiến độ hoàn thành: 70%                                     |
|                                                               |
|  Bạn muốn tiếp tục từ bản nháp hay bắt đầu mới?              |
|                                                               |
|  [Tiếp tục từ bản nháp]    [Bắt đầu mới]                     |
|                                                               |
+---------------------------------------------------------------+
```

### Màn hình quản lý bản nháp
```
+---------------------------------------------------------------+
|                                                               |
|  Quản lý bản nháp khảo sát                                   |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Danh sách khảo sát có bản nháp                              |
|  +-----------------------------------------------------------+|
|  | Khảo sát              | Thời gian lưu  | Tiến độ | Thao tác |
|  |------------------------|----------------|---------|----------|
|  | Khảo sát nhu cầu đào  | 25/09/2025     | 70%     | [Tiếp tục]|
|  | tạo Q3/2025           | 15:30          |         | [Xóa]    |
|  |------------------------|----------------|---------|----------|
|  | Đánh giá khóa học     | 24/09/2025     | 40%     | [Tiếp tục]|
|  | Excel nâng cao        | 10:15          |         | [Xóa]    |
|  |------------------------|----------------|---------|----------|
|  | Khảo sát mức độ       | 20/09/2025     | 90%     | [Tiếp tục]|
|  | hài lòng              | 14:20          |         | [Xóa]    |
|  +-----------------------------------------------------------+|
|                                                               |
|  Cài đặt lưu nháp tự động                                    |
|  +-----------------------------------------------------------+|
|  | [x] Bật lưu nháp tự động                                 ||
|  |                                                           ||
|  | Thời gian lưu tự động:                                    ||
|  | ( ) 1 phút  (o) 5 phút  ( ) 10 phút                       ||
|  |                                                           ||
|  | [x] Hiển thị thông báo khi lưu tự động                   ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Lưu cài đặt]                                               |
|                                                               |
+---------------------------------------------------------------+
```
