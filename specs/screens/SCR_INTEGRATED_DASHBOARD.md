# Màn hình bảng điều khiển tích hợp

## Mô tả
Màn hình bảng điều khiển tích hợp cung cấp cái nhìn tổng quan về tất cả các hoạt động trong hệ thống, bao gồm khảo sát, đào tạo và đánh giá. Người dùng có thể theo dõi tiến độ, xem thống kê, và truy cập nhanh vào các tính năng quan trọng từ một giao diện duy nhất.

## Đối tượng người dùng
- Quản trị viên
- HR
- Quản lý đào tạo
- Giảng viên

## Luồng chức năng
1. Người dùng đăng nhập vào hệ thống
2. Hệ thống hiển thị bảng điều khiển tích hợp làm trang chủ
3. Người dùng xem thông tin tổng quan và các chỉ số quan trọng
4. Người dùng có thể lọc dữ liệu theo thời gian, phòng ban, hoặc loại hoạt động
5. Người dùng có thể truy cập nhanh vào các tính năng thông qua các liên kết trên bảng điều khiển

## Thành phần giao diện

### 1. Phần tiêu đề và bộ lọc
- Tiêu đề "Bảng điều khiển tích hợp"
- Bộ lọc theo thời gian (Hôm nay, Tuần này, Tháng này, Quý này, Năm nay)
- Bộ lọc theo phòng ban
- Nút làm mới dữ liệu

### 2. Phần thống kê tổng quan
- Thẻ thống kê số lượng khảo sát đang hoạt động
- Thẻ thống kê số lượng kế hoạch đào tạo đang triển khai
- Thẻ thống kê số lượng đánh giá đang diễn ra
- Thẻ thống kê tổng số người tham gia các hoạt động

### 3. Phần biểu đồ và trực quan hóa
- Biểu đồ thể hiện xu hướng hoạt động theo thời gian
- Biểu đồ phân bổ hoạt động theo phòng ban
- Biểu đồ tỷ lệ hoàn thành các hoạt động
- Biểu đồ so sánh kết quả đánh giá trước và sau đào tạo

### 4. Phần hoạt động gần đây
- Danh sách các khảo sát gần đây
- Danh sách các kế hoạch đào tạo gần đây
- Danh sách các đánh giá gần đây
- Danh sách các hoạt động cần chú ý (sắp hết hạn, cần phê duyệt, v.v.)

### 5. Phần truy cập nhanh
- Các liên kết nhanh đến tính năng tạo khảo sát mới
- Các liên kết nhanh đến tính năng tạo kế hoạch đào tạo mới
- Các liên kết nhanh đến tính năng tạo đánh giá mới
- Các liên kết nhanh đến báo cáo và phân tích

### 6. Phần thông báo và nhắc nhở
- Danh sách các thông báo quan trọng
- Danh sách các nhiệm vụ cần hoàn thành
- Danh sách các sự kiện sắp diễn ra

## Các hành động
- **Lọc dữ liệu**: Lọc thông tin hiển thị theo các tiêu chí
- **Làm mới dữ liệu**: Cập nhật dữ liệu mới nhất
- **Truy cập nhanh**: Chuyển đến các tính năng cụ thể
- **Xem chi tiết**: Xem thông tin chi tiết về một mục cụ thể
- **Tùy chỉnh hiển thị**: Điều chỉnh các thành phần hiển thị trên bảng điều khiển

## Quy tắc nghiệp vụ
1. Dữ liệu hiển thị phụ thuộc vào quyền hạn của người dùng
2. Dữ liệu được cập nhật tự động mỗi 5 phút
3. Người dùng có thể tùy chỉnh bố cục bảng điều khiển theo nhu cầu
4. Các thông báo quan trọng được hiển thị nổi bật
5. Dữ liệu được lưu vào bộ nhớ cache để tăng tốc độ tải trang
6. Người dùng có thể đặt các mục tiêu và theo dõi tiến độ trên bảng điều khiển

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Bảng điều khiển tích hợp                                    |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Bộ lọc: [Tháng này v]  [Tất cả phòng ban v]  [Làm mới]      |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Thống kê tổng quan                                          |
|  +----------+  +----------+  +----------+  +----------+      |
|  | Khảo sát |  | Đào tạo  |  | Đánh giá |  | Người    |      |
|  | đang hoạt|  | đang     |  | đang     |  | tham gia |      |
|  | động     |  | triển khai|  | diễn ra  |  |          |      |
|  |          |  |          |  |          |  |          |      |
|  |    12    |  |    8     |  |    5     |  |   245    |      |
|  +----------+  +----------+  +----------+  +----------+      |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Xu hướng hoạt động                     | Phân bổ theo phòng  |
|  +----------------------------+         | +------------------+|
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  +----------------------------+         | +------------------+|
|                                                               |
|  Tỷ lệ hoàn thành                       | So sánh kết quả    |
|  +----------------------------+         | +------------------+|
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  |                            |         | |                  ||
|  +----------------------------+         | +------------------+|
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Hoạt động gần đây                      | Truy cập nhanh     |
|  +----------------------------+         | +------------------+|
|  | Khảo sát nhu cầu đào tạo  |         | | + Tạo khảo sát   ||
|  | Q3/2025                    |         | | + Tạo kế hoạch   ||
|  | 25/09/2025                 |         | |   đào tạo        ||
|  |                            |         | | + Tạo đánh giá   ||
|  | Kế hoạch đào tạo kỹ năng  |         | | + Xem báo cáo    ||
|  | mềm 2025                   |         | |                  ||
|  | 24/09/2025                 |         | | Xem tất cả >     ||
|  |                            |         | |                  ||
|  | Đánh giá kỹ năng lập trình |         | |                  ||
|  | 22/09/2025                 |         | |                  ||
|  |                            |         | |                  ||
|  | Xem tất cả >               |         | |                  ||
|  +----------------------------+         | +------------------+|
|                                                               |
|  Thông báo và nhắc nhở                                       |
|  +-----------------------------------------------------------+|
|  | ! Có 3 khảo sát cần phê duyệt                            ||
|  | ! 2 kế hoạch đào tạo sắp hết hạn                         ||
|  | ! 5 yêu cầu phúc khảo đang chờ xử lý                     ||
|  | ! Cuộc họp đánh giá kết quả đào tạo - 30/09/2025, 14:00  ||
|  +-----------------------------------------------------------+|
|                                                               |
+---------------------------------------------------------------+
```
