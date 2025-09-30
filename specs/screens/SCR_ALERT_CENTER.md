# Màn hình trung tâm cảnh báo và nhắc nhở

## Mô tả
Màn hình này hiển thị tất cả các cảnh báo và nhắc nhở liên quan đến khảo sát, kế hoạch đào tạo và đánh giá. Người dùng có thể xem, lọc và xử lý các cảnh báo theo từng loại và mức độ ưu tiên.

## Đối tượng người dùng
- Quản trị viên
- HR
- Quản lý đào tạo
- Giảng viên
- CBNV (phiên bản giới hạn)

## Luồng chức năng
1. Người dùng truy cập vào trung tâm cảnh báo từ menu chính hoặc thông báo
2. Hệ thống hiển thị danh sách các cảnh báo và nhắc nhở theo thứ tự ưu tiên
3. Người dùng có thể lọc, sắp xếp và tìm kiếm cảnh báo
4. Người dùng xử lý cảnh báo (đánh dấu đã đọc, thực hiện hành động, bỏ qua)
5. Hệ thống cập nhật trạng thái cảnh báo

## Thành phần giao diện

### 1. Phần tiêu đề và bộ lọc
- Tiêu đề "Trung tâm cảnh báo và nhắc nhở"
- Bộ lọc theo loại cảnh báo:
  - Tất cả
  - Khảo sát (F1 - Indigo)
  - Kế hoạch đào tạo (F2 - Teal)
  - Đánh giá (F3 - Amber)
- Bộ lọc theo mức độ ưu tiên:
  - Tất cả
  - Cao (đỏ)
  - Trung bình (cam)
  - Thấp (xanh lá)
- Bộ lọc theo trạng thái:
  - Tất cả
  - Chưa đọc
  - Đã đọc
  - Đã xử lý
- Thanh tìm kiếm

### 2. Phần danh sách cảnh báo
- Danh sách các cảnh báo hiển thị dưới dạng card hoặc danh sách
- Mỗi cảnh báo hiển thị:
  - Icon loại cảnh báo (theo màu của flow)
  - Tiêu đề cảnh báo
  - Mô tả ngắn
  - Thời gian
  - Mức độ ưu tiên (tag màu)
  - Trạng thái
  - Nút hành động

### 3. Phần chi tiết cảnh báo
- Hiển thị khi người dùng click vào một cảnh báo
- Thông tin chi tiết về cảnh báo
- Các hành động có thể thực hiện
- Lịch sử xử lý cảnh báo

### 4. Phần thống kê
- Tổng số cảnh báo
- Phân loại theo mức độ ưu tiên
- Phân loại theo loại cảnh báo
- Phân loại theo trạng thái

## Các hành động
- **Đánh dấu đã đọc/chưa đọc**: Thay đổi trạng thái đọc của cảnh báo
- **Xử lý cảnh báo**: Thực hiện hành động liên quan đến cảnh báo
- **Bỏ qua cảnh báo**: Đánh dấu cảnh báo là đã bỏ qua
- **Xem chi tiết**: Xem thông tin chi tiết về cảnh báo
- **Điều hướng**: Chuyển đến màn hình liên quan để xử lý
- **Thiết lập thông báo**: Cấu hình cách nhận thông báo

## Các loại cảnh báo

### 1. Cảnh báo khảo sát (F1 - Indigo)
- **Sắp hết hạn khảo sát**: Cảnh báo khi khảo sát sắp đến hạn (n-3 ngày)
- **Quá hạn khảo sát**: Cảnh báo khi khảo sát đã quá hạn (n+1 ngày)
- **CBNV chưa tham gia**: Cảnh báo về các CBNV chưa tham gia khảo sát

### 2. Cảnh báo kế hoạch đào tạo (F2 - Teal)
- **Chờ phê duyệt**: Cảnh báo về kế hoạch đang chờ phê duyệt
- **Sắp triển khai**: Cảnh báo về kế hoạch sắp được triển khai
- **Cập nhật kế hoạch**: Nhắc nhở cập nhật kế hoạch sau khảo sát

### 3. Cảnh báo đánh giá (F3 - Amber)
- **Sắp hết hạn chấm bài**: Cảnh báo khi gần đến hạn chấm bài
- **Quá hạn chấm bài**: Cảnh báo khi đã quá hạn chấm bài
- **Yêu cầu phúc khảo**: Cảnh báo về các yêu cầu phúc khảo mới

## Quy tắc nghiệp vụ
1. Cảnh báo sắp hết hạn được tạo tự động trước n-3 ngày so với hạn chót
2. Cảnh báo quá hạn được tạo tự động sau n+1 ngày so với hạn chót
3. Cảnh báo CBNV chưa tham gia được tạo khi còn 50% thời gian khảo sát
4. Mức độ ưu tiên được xác định dựa trên loại cảnh báo và thời gian còn lại
5. Cảnh báo tự động được đánh dấu là đã xử lý khi vấn đề được giải quyết

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Trung tâm cảnh báo và nhắc nhở                              |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Bộ lọc                                                       |
|  +----------+  +------------+  +------------+  +------------+ |
|  | Tất cả  v|  | Ưu tiên   v|  | Trạng thái v|  |   Tìm kiếm  | |
|  +----------+  +------------+  +------------+  +------------+ |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Thống kê                                                     |
|  +----------+  +----------+  +----------+  +----------+       |
|  | Tổng: 12 |  | Cao: 3   |  | Chưa đọc: 5 |  | F1: 4   |       |
|  +----------+  +----------+  +----------+  +----------+       |
|  +----------+  +----------+  +----------+  +----------+       |
|  | TB: 6    |  | Thấp: 3  |  | Đã xử lý: 7 |  | F2: 5   |       |
|  +----------+  +----------+  +----------+  +----------+       |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Danh sách cảnh báo                                          |
|  +-----------------------------------------------------------+|
|  |                                                           ||
|  | [🟪] Khảo sát "Nhu cầu đào tạo Q3" sắp hết hạn           ||
|  | Còn 2 ngày nữa sẽ kết thúc. 15/45 CBNV chưa hoàn thành.  ||
|  | 🔴 Cao | 2 giờ trước | Chưa đọc                          ||
|  | [Nhắc nhở] [Gia hạn] [Xem chi tiết]                      ||
|  |                                                           ||
|  +-----------------------------------------------------------+|
|  +-----------------------------------------------------------+|
|  |                                                           ||
|  | [🟪] 5 CBNV chưa tham gia khảo sát "Đánh giá khóa học"   ||
|  | Khảo sát đã hoàn thành 50% thời gian.                    ||
|  | 🟠 Trung bình | 1 ngày trước | Đã đọc                    ||
|  | [Nhắc nhở] [Xem chi tiết]                                ||
|  |                                                           ||
|  +-----------------------------------------------------------+|
|  +-----------------------------------------------------------+|
|  |                                                           ||
|  | [🟩] Kế hoạch "Đào tạo kỹ năng mềm" đang chờ phê duyệt   ||
|  | Đã chờ phê duyệt 3 ngày. Cần phê duyệt cấp 2.            ||
|  | 🟠 Trung bình | 3 ngày trước | Đã xử lý                  ||
|  | [Xem chi tiết]                                           ||
|  |                                                           ||
|  +-----------------------------------------------------------+|
|  +-----------------------------------------------------------+|
|  |                                                           ||
|  | [🟧] Quá hạn chấm bài đánh giá "Kỹ năng lập trình"       ||
|  | Đã quá hạn 2 ngày. 5/20 bài thi chưa được chấm.          ||
|  | 🔴 Cao | 1 ngày trước | Chưa đọc                         ||
|  | [Chấm ngay] [Phân công lại] [Xem chi tiết]               ||
|  |                                                           ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Tải thêm]                                                   |
|                                                               |
+---------------------------------------------------------------+
```
