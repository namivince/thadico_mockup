# Màn hình nhân bản khảo sát

## Mô tả
Màn hình này cho phép người dùng tạo một bản sao của khảo sát hiện có với tùy chọn điều chỉnh các thông số. Chức năng này giúp người dùng tiết kiệm thời gian khi cần tạo các khảo sát tương tự nhau, chỉ cần thay đổi một số thông tin như tiêu đề, thời gian, đối tượng tham gia.

## Đối tượng người dùng
- Quản trị viên
- HR
- Quản lý đào tạo

## Luồng chức năng
1. Người dùng chọn khảo sát cần nhân bản từ danh sách khảo sát
2. Người dùng chọn tùy chọn "Nhân bản"
3. Hệ thống hiển thị form nhân bản với thông tin được sao chép từ khảo sát gốc
4. Người dùng điều chỉnh các thông tin cần thiết
5. Người dùng xác nhận nhân bản
6. Hệ thống tạo khảo sát mới dựa trên thông tin đã điều chỉnh

## Thành phần giao diện

### 1. Phần tiêu đề và thông tin khảo sát gốc
- Tiêu đề "Nhân bản khảo sát"
- Thông tin khảo sát gốc:
  - Tên khảo sát
  - Ngày tạo
  - Người tạo
  - Số câu hỏi
  - Số người tham gia

### 2. Phần form nhân bản
- Trường "Tiêu đề khảo sát mới" (bắt buộc)
- Trường "Mô tả" (tùy chọn)
- Trường "Thời gian bắt đầu" (bắt buộc)
- Trường "Thời gian kết thúc" (bắt buộc)
- Trường "Thời gian chấm bài" (tùy chọn)

### 3. Phần tùy chọn nhân bản
- Checkbox "Sao chép câu hỏi" (mặc định được chọn)
- Checkbox "Sao chép cài đặt hiển thị" (mặc định được chọn)
- Checkbox "Sao chép đối tượng tham gia" (mặc định không được chọn)
- Checkbox "Sao chép tệp đính kèm" (mặc định được chọn)
- Checkbox "Sao chép logic phân nhánh" (mặc định được chọn)

### 4. Phần nút tác vụ
- Nút "Hủy bỏ"
- Nút "Nhân bản"

## Các hành động
- **Nhân bản**: Tạo bản sao của khảo sát với các thông tin đã điều chỉnh
- **Hủy bỏ**: Đóng form và quay lại trang danh sách khảo sát

## Quy tắc nghiệp vụ
1. Tiêu đề khảo sát mới không được trùng với các khảo sát hiện có
2. Thời gian bắt đầu phải sau thời điểm hiện tại
3. Thời gian kết thúc phải sau thời gian bắt đầu
4. Thời gian chấm bài phải sau thời gian kết thúc
5. Khi sao chép đối tượng tham gia, hệ thống sẽ kiểm tra tính khả dụng của các đối tượng
6. Khảo sát mới sẽ có trạng thái "Nháp" sau khi được nhân bản

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Nhân bản khảo sát                                           |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Thông tin khảo sát gốc                                      |
|  +-----------------------------------------------------------+|
|  | Tên khảo sát: Khảo sát nhu cầu đào tạo Q3/2025           ||
|  | Ngày tạo: 15/06/2025                                     ||
|  | Người tạo: Nguyễn Văn A                                  ||
|  | Số câu hỏi: 15                                           ||
|  | Số người tham gia: 45                                    ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Thông tin khảo sát mới                                      |
|  +-----------------------------------------------------------+|
|  | Tiêu đề khảo sát mới *                                   ||
|  | [Khảo sát nhu cầu đào tạo Q4/2025                      ] ||
|  |                                                           ||
|  | Mô tả                                                     ||
|  | [                                                        ] ||
|  | [                                                        ] ||
|  | [                                                        ] ||
|  |                                                           ||
|  | Thời gian bắt đầu *           Thời gian kết thúc *       ||
|  | [01/10/2025] [09:00]          [15/10/2025] [18:00]       ||
|  |                                                           ||
|  | Thời gian chấm bài                                        ||
|  | [20/10/2025] [18:00]                                     ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Tùy chọn nhân bản                                           |
|  +-----------------------------------------------------------+|
|  | [x] Sao chép câu hỏi                                     ||
|  | [x] Sao chép cài đặt hiển thị                            ||
|  | [ ] Sao chép đối tượng tham gia                          ||
|  | [x] Sao chép tệp đính kèm                                ||
|  | [x] Sao chép logic phân nhánh                            ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Hủy bỏ]                                     [Nhân bản]      |
|                                                               |
+---------------------------------------------------------------+
```
