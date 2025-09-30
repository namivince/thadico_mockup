# Màn hình tích hợp hệ thống

## Mô tả
Màn hình tích hợp hệ thống cho phép quản trị viên cấu hình và quản lý các kết nối giữa hệ thống đào tạo với các hệ thống khác trong tổ chức, như hệ thống quản lý nhân sự (HRMS), hệ thống quản lý học tập (LMS), và các công cụ báo cáo. Tính năng này giúp tự động hóa việc trao đổi dữ liệu giữa các hệ thống, đảm bảo tính nhất quán và giảm thiểu công việc thủ công.

## Đối tượng người dùng
- Quản trị viên hệ thống
- Quản trị viên IT

## Luồng chức năng
1. Quản trị viên truy cập vào màn hình tích hợp hệ thống
2. Hệ thống hiển thị danh sách các kết nối hiện có và trạng thái của chúng
3. Quản trị viên có thể thêm kết nối mới, chỉnh sửa hoặc xóa kết nối hiện có
4. Quản trị viên cấu hình các tham số cho kết nối
5. Quản trị viên có thể kiểm tra kết nối để đảm bảo hoạt động chính xác
6. Hệ thống lưu lại lịch sử đồng bộ hóa và các lỗi phát sinh

## Thành phần giao diện

### 1. Phần tiêu đề và tổng quan
- Tiêu đề "Tích hợp hệ thống"
- Thống kê tổng quan:
  - Số lượng kết nối đang hoạt động
  - Số lượng kết nối bị lỗi
  - Thời gian đồng bộ hóa gần nhất
  - Số lượng bản ghi đã đồng bộ

### 2. Phần danh sách kết nối
- Bảng danh sách các kết nối với các cột:
  - Tên kết nối
  - Loại hệ thống (HRMS, LMS, v.v.)
  - Trạng thái (Hoạt động, Tạm dừng, Lỗi)
  - Thời gian đồng bộ gần nhất
  - Tần suất đồng bộ
  - Thao tác (Chỉnh sửa, Xóa, Kiểm tra kết nối)
- Nút "Thêm kết nối mới"

### 3. Phần cấu hình kết nối
- Form cấu hình với các trường:
  - Tên kết nối
  - Loại hệ thống
  - URL API
  - Phương thức xác thực (API Key, OAuth, Basic Auth)
  - Thông tin xác thực
  - Tần suất đồng bộ
  - Loại dữ liệu đồng bộ (Người dùng, Khóa học, Kết quả đánh giá, v.v.)
  - Hướng đồng bộ (Một chiều, Hai chiều)
  - Xử lý xung đột dữ liệu

### 4. Phần lịch sử đồng bộ
- Bảng lịch sử đồng bộ với các cột:
  - Thời gian đồng bộ
  - Kết nối
  - Loại dữ liệu
  - Số lượng bản ghi đã đồng bộ
  - Số lượng lỗi
  - Trạng thái
  - Thao tác (Xem chi tiết, Đồng bộ lại)

### 5. Phần nhật ký lỗi
- Bảng nhật ký lỗi với các cột:
  - Thời gian
  - Kết nối
  - Mã lỗi
  - Mô tả lỗi
  - Bản ghi liên quan
  - Thao tác (Xem chi tiết, Đánh dấu đã xử lý)

## Các hành động
- **Thêm kết nối**: Tạo kết nối mới với hệ thống khác
- **Chỉnh sửa kết nối**: Cập nhật cấu hình cho kết nối hiện có
- **Xóa kết nối**: Xóa kết nối không còn sử dụng
- **Kiểm tra kết nối**: Kiểm tra tính khả dụng của kết nối
- **Đồng bộ thủ công**: Kích hoạt quá trình đồng bộ hóa thủ công
- **Xem lịch sử đồng bộ**: Xem chi tiết lịch sử đồng bộ hóa
- **Xem nhật ký lỗi**: Xem chi tiết các lỗi phát sinh trong quá trình đồng bộ

## Quy tắc nghiệp vụ
1. Mỗi kết nối phải có tên duy nhất trong hệ thống
2. Thông tin xác thực phải được mã hóa khi lưu trữ
3. Đồng bộ hóa tự động chỉ được thực hiện khi kết nối ở trạng thái "Hoạt động"
4. Khi phát hiện lỗi đồng bộ, hệ thống sẽ gửi thông báo cho quản trị viên
5. Dữ liệu nhạy cảm sẽ không được đồng bộ trừ khi được cấu hình cụ thể
6. Hệ thống lưu trữ lịch sử đồng bộ trong thời gian tối đa 90 ngày

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Tích hợp hệ thống                                           |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Tổng quan                                                    |
|  +----------+  +----------+  +----------+  +----------+       |
|  | Kết nối  |  | Kết nối  |  | Đồng bộ  |  | Bản ghi  |       |
|  | hoạt động|  | lỗi      |  | gần nhất |  | đã đồng  |       |
|  |          |  |          |  |          |  | bộ        |       |
|  |    5     |  |    1     |  | 15:30    |  |  1,245   |       |
|  +----------+  +----------+  +----------+  +----------+       |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Danh sách kết nối                                           |
|  +-----------------------------------------------------------+|
|  | Tên kết nối | Loại     | Trạng thái | Đồng bộ  | Tần suất | Thao tác |
|  |             | hệ thống |            | gần nhất |          |          |
|  |-------------|----------|------------|----------|----------|----------|
|  | HR Connect  | HRMS     | Hoạt động  | 15:30    | 1 giờ    | [Sửa]    |
|  |             |          |            |          |          | [Xóa]    |
|  |             |          |            |          |          | [Kiểm tra]|
|  |-------------|----------|------------|----------|----------|----------|
|  | LMS Link    | LMS      | Hoạt động  | 15:00    | 6 giờ    | [Sửa]    |
|  |             |          |            |          |          | [Xóa]    |
|  |             |          |            |          |          | [Kiểm tra]|
|  |-------------|----------|------------|----------|----------|----------|
|  | BI Portal   | BI Tool  | Lỗi        | 14:00    | 12 giờ   | [Sửa]    |
|  |             |          |            |          |          | [Xóa]    |
|  |             |          |            |          |          | [Kiểm tra]|
|  +-----------------------------------------------------------+|
|  | [+ Thêm kết nối mới]                                      ||
|  +-----------------------------------------------------------+|
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Cấu hình kết nối                                            |
|  +-----------------------------------------------------------+|
|  | Tên kết nối *                                            ||
|  | [HR Connect                                             ] ||
|  |                                                           ||
|  | Loại hệ thống *                                          ||
|  | [HRMS v]                                                 ||
|  |                                                           ||
|  | URL API *                                                ||
|  | [https://api.hrms.example.com/v1                       ] ||
|  |                                                           ||
|  | Phương thức xác thực *                                   ||
|  | [OAuth 2.0 v]                                            ||
|  |                                                           ||
|  | Client ID *                                              ||
|  | [client_12345                                          ] ||
|  |                                                           ||
|  | Client Secret *                                          ||
|  | [••••••••••••••••                                      ] ||
|  |                                                           ||
|  | Tần suất đồng bộ *                                       ||
|  | [1 giờ v]                                                ||
|  |                                                           ||
|  | Loại dữ liệu đồng bộ *                                   ||
|  | [x] Người dùng                                           ||
|  | [x] Phòng ban                                            ||
|  | [ ] Khóa học                                             ||
|  | [ ] Kết quả đánh giá                                     ||
|  |                                                           ||
|  | Hướng đồng bộ *                                          ||
|  | (o) Một chiều (HRMS -> Hệ thống)                         ||
|  | ( ) Hai chiều                                            ||
|  |                                                           ||
|  | Xử lý xung đột *                                         ||
|  | (o) Ưu tiên hệ thống nguồn                               ||
|  | ( ) Ưu tiên hệ thống đích                                ||
|  | ( ) Giữ cả hai phiên bản                                 ||
|  +-----------------------------------------------------------+|
|  | [Hủy]                                    [Lưu cấu hình]   ||
|  +-----------------------------------------------------------+|
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Lịch sử đồng bộ                                             |
|  +-----------------------------------------------------------+|
|  | Thời gian | Kết nối   | Loại dữ liệu | Số bản ghi | Trạng thái | Thao tác |
|  |-----------|-----------|--------------|------------|------------|----------|
|  | 15:30     | HR Connect| Người dùng   | 150/150    | Thành công | [Chi tiết]|
|  |-----------|-----------|--------------|------------|------------|----------|
|  | 15:00     | LMS Link  | Khóa học     | 45/45      | Thành công | [Chi tiết]|
|  |-----------|-----------|--------------|------------|------------|----------|
|  | 14:00     | BI Portal | Kết quả      | 230/350    | Lỗi        | [Chi tiết]|
|  |           |           | đánh giá     |            |            | [Đồng bộ lại]|
|  +-----------------------------------------------------------+|
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Nhật ký lỗi                                                  |
|  +-----------------------------------------------------------+|
|  | Thời gian | Kết nối   | Mã lỗi | Mô tả lỗi      | Thao tác   |
|  |-----------|-----------|--------|----------------|------------|
|  | 14:00     | BI Portal | 401    | Unauthorized   | [Chi tiết] |
|  |           |           |        | Access         | [Đã xử lý] |
|  +-----------------------------------------------------------+|
|                                                               |
+---------------------------------------------------------------+
```
