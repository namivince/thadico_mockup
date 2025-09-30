# Màn hình quản lý hiển thị khảo sát

## Mô tả
Màn hình này cho phép người quản trị kiểm soát việc hiển thị khảo sát đối với CBNV. Người quản trị có thể ẩn hoặc hiện khảo sát, điều chỉnh thời gian hiển thị, và thiết lập các điều kiện hiển thị khác nhau cho từng nhóm đối tượng.

## Đối tượng người dùng
- Quản trị viên
- HR
- Quản lý đào tạo

## Luồng chức năng
1. Người dùng truy cập vào chi tiết khảo sát
2. Người dùng chọn tab "Cài đặt hiển thị" hoặc nút "Quản lý hiển thị"
3. Hệ thống hiển thị form cài đặt hiển thị khảo sát
4. Người dùng điều chỉnh các cài đặt hiển thị
5. Người dùng lưu các thay đổi
6. Hệ thống áp dụng các cài đặt hiển thị mới

## Thành phần giao diện

### 1. Phần tiêu đề và thông tin khảo sát
- Tiêu đề "Cài đặt hiển thị khảo sát"
- Thông tin khảo sát:
  - Tên khảo sát
  - Trạng thái hiện tại
  - Thời gian bắt đầu/kết thúc

### 2. Phần cài đặt hiển thị cơ bản
- Switch "Hiển thị khảo sát" (Bật/Tắt)
- Radio "Chế độ hiển thị":
  - Theo lịch (hiển thị trong khoảng thời gian đã thiết lập)
  - Thủ công (hiển thị khi được kích hoạt thủ công)
  - Theo điều kiện (hiển thị khi đáp ứng điều kiện)
- Thông báo trạng thái hiển thị hiện tại

### 3. Phần cài đặt hiển thị theo lịch
- Trường "Thời gian bắt đầu hiển thị"
- Trường "Thời gian kết thúc hiển thị"
- Checkbox "Hiển thị trước thời gian bắt đầu" (chỉ xem, không tham gia)
- Checkbox "Hiển thị sau thời gian kết thúc" (chỉ xem kết quả, không tham gia)

### 4. Phần cài đặt hiển thị theo điều kiện
- Dropdown "Điều kiện hiển thị":
  - Hoàn thành khảo sát trước đó
  - Hoàn thành khóa học
  - Thuộc nhóm người dùng
  - Có chức danh/vị trí
- Trường chọn giá trị điều kiện (phụ thuộc vào điều kiện được chọn)
- Nút "Thêm điều kiện" (cho phép thêm nhiều điều kiện)

### 5. Phần cài đặt hiển thị theo nhóm
- Bảng danh sách các nhóm người dùng với cột:
  - Tên nhóm
  - Số lượng người dùng
  - Trạng thái hiển thị (Hiện/Ẩn)
  - Thao tác
- Nút "Thêm nhóm" để thêm nhóm người dùng mới

### 6. Phần nút tác vụ
- Nút "Hủy bỏ"
- Nút "Lưu thay đổi"
- Nút "Áp dụng ngay"

## Các hành động
- **Bật/Tắt hiển thị**: Bật hoặc tắt hiển thị khảo sát
- **Lưu cài đặt**: Lưu các cài đặt hiển thị
- **Áp dụng ngay**: Áp dụng các cài đặt hiển thị ngay lập tức
- **Thêm điều kiện**: Thêm điều kiện hiển thị mới
- **Xóa điều kiện**: Xóa điều kiện hiển thị hiện có
- **Thêm nhóm**: Thêm nhóm người dùng mới
- **Ẩn/Hiện cho nhóm**: Ẩn hoặc hiện khảo sát cho một nhóm người dùng cụ thể

## Quy tắc nghiệp vụ
1. Khi tắt hiển thị, khảo sát sẽ không hiển thị cho bất kỳ CBNV nào, bất kể các cài đặt khác
2. Khi chọn chế độ hiển thị theo lịch, khảo sát sẽ tự động hiển thị trong khoảng thời gian đã thiết lập
3. Khi chọn chế độ hiển thị thủ công, khảo sát sẽ chỉ hiển thị khi được kích hoạt thủ công
4. Khi chọn chế độ hiển thị theo điều kiện, khảo sát sẽ chỉ hiển thị khi CBNV đáp ứng các điều kiện đã thiết lập
5. Cài đặt hiển thị theo nhóm sẽ ghi đè lên các cài đặt hiển thị khác
6. Quản trị viên và HR luôn có thể xem tất cả các khảo sát, bất kể cài đặt hiển thị

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Cài đặt hiển thị khảo sát                                   |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Thông tin khảo sát                                          |
|  +-----------------------------------------------------------+|
|  | Tên khảo sát: Khảo sát nhu cầu đào tạo Q3/2025           ||
|  | Trạng thái: Đang hoạt động                                ||
|  | Thời gian: 01/07/2025 - 15/07/2025                        ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Cài đặt hiển thị cơ bản                                     |
|  +-----------------------------------------------------------+|
|  | Hiển thị khảo sát: [ON]                                  ||
|  |                                                           ||
|  | Chế độ hiển thị:                                          ||
|  | (o) Theo lịch                                             ||
|  | ( ) Thủ công                                              ||
|  | ( ) Theo điều kiện                                        ||
|  |                                                           ||
|  | [i] Khảo sát đang được hiển thị cho tất cả CBNV          ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Cài đặt hiển thị theo lịch                                  |
|  +-----------------------------------------------------------+|
|  | Thời gian bắt đầu hiển thị:                              ||
|  | [01/07/2025] [09:00]                                      ||
|  |                                                           ||
|  | Thời gian kết thúc hiển thị:                             ||
|  | [15/07/2025] [18:00]                                      ||
|  |                                                           ||
|  | [x] Hiển thị trước thời gian bắt đầu (chỉ xem)           ||
|  | [ ] Hiển thị sau thời gian kết thúc (chỉ xem kết quả)    ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Cài đặt hiển thị theo nhóm                                  |
|  +-----------------------------------------------------------+|
|  | Nhóm          | Số lượng | Trạng thái | Thao tác         ||
|  |---------------|----------|------------|------------------||
|  | Ban Giám đốc  | 5        | Hiện       | [Ẩn] [Xóa]      ||
|  | Phòng Nhân sự | 12       | Hiện       | [Ẩn] [Xóa]      ||
|  | Phòng IT      | 20       | Ẩn         | [Hiện] [Xóa]    ||
|  | Phòng Kế toán | 8        | Hiện       | [Ẩn] [Xóa]      ||
|  +-----------------------------------------------------------+|
|  | [+ Thêm nhóm]                                             ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Hủy bỏ]    [Lưu thay đổi]    [Áp dụng ngay]               |
|                                                               |
+---------------------------------------------------------------+
```
