# Màn hình lịch sử phiên bản kế hoạch đào tạo

## Mô tả
Màn hình này hiển thị lịch sử các phiên bản của một kế hoạch đào tạo, cho phép người dùng xem, so sánh và khôi phục các phiên bản trước đó. Mỗi lần chỉnh sửa kế hoạch đào tạo sẽ tạo ra một phiên bản mới, giúp theo dõi các thay đổi và đảm bảo tính minh bạch.

## Đối tượng người dùng
- Quản trị viên
- HR
- Quản lý đào tạo

## Luồng chức năng
1. Người dùng truy cập vào màn hình chi tiết kế hoạch đào tạo
2. Người dùng chọn xem lịch sử phiên bản
3. Hệ thống hiển thị danh sách các phiên bản của kế hoạch
4. Người dùng có thể xem chi tiết hoặc so sánh các phiên bản
5. Người dùng có thể khôi phục về một phiên bản trước đó nếu cần

## Thành phần giao diện

### 1. Phần tiêu đề và thông tin kế hoạch
- Tiêu đề "Lịch sử phiên bản kế hoạch đào tạo"
- Tên kế hoạch đào tạo
- Thông tin cơ bản: Ngày tạo, người tạo, trạng thái hiện tại

### 2. Phần danh sách phiên bản
- Bảng danh sách các phiên bản với các cột:
  - Phiên bản (v1.0, v1.1, v2.0, ...)
  - Ngày chỉnh sửa
  - Người chỉnh sửa
  - Mô tả thay đổi
  - Thao tác (Xem, So sánh, Khôi phục)

### 3. Phần xem chi tiết phiên bản
- Hiển thị đầy đủ thông tin của phiên bản được chọn
- Các thông tin bao gồm:
  - Tên kế hoạch
  - Mô tả
  - Ngân sách
  - Danh sách khóa học
  - Thời gian thực hiện
  - Đối tượng tham gia
  - Các thông tin khác

### 4. Phần so sánh phiên bản
- Hiển thị so sánh song song giữa hai phiên bản
- Các thay đổi được đánh dấu rõ ràng:
  - Thêm mới (màu xanh lá)
  - Xóa bỏ (màu đỏ)
  - Thay đổi (màu vàng)
- Có thể chọn các phiên bản khác nhau để so sánh

### 5. Phần khôi phục phiên bản
- Xác nhận khôi phục về phiên bản được chọn
- Cảnh báo về các tác động khi khôi phục
- Nút xác nhận và hủy bỏ

## Các hành động
- **Xem chi tiết phiên bản**: Hiển thị đầy đủ thông tin của một phiên bản
- **So sánh phiên bản**: So sánh hai phiên bản khác nhau
- **Khôi phục phiên bản**: Khôi phục kế hoạch về một phiên bản trước đó
- **Xuất báo cáo**: Xuất báo cáo lịch sử thay đổi ra Excel
- **Đóng**: Quay lại màn hình chi tiết kế hoạch

## Quy tắc nghiệp vụ
1. Mỗi lần lưu chỉnh sửa kế hoạch đào tạo sẽ tạo một phiên bản mới
2. Các thay đổi nhỏ sẽ tăng số phiên bản phụ (v1.0 -> v1.1)
3. Các thay đổi lớn sẽ tăng số phiên bản chính (v1.9 -> v2.0)
4. Chỉ người có quyền phù hợp mới có thể khôi phục phiên bản
5. Khi khôi phục phiên bản, hệ thống sẽ tạo một phiên bản mới dựa trên phiên bản được khôi phục
6. Lưu trữ tối đa 10 phiên bản gần nhất cho mỗi kế hoạch

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Lịch sử phiên bản kế hoạch đào tạo                          |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Kế hoạch: Đào tạo kỹ năng mềm 2025                          |
|  Ngày tạo: 15/02/2025 | Người tạo: Hoàng Thị E | Trạng thái: Chờ duyệt |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Danh sách phiên bản                                         |
|  +-----------------------------------------------------------+|
|  | Phiên bản | Ngày chỉnh sửa | Người chỉnh sửa | Mô tả      | Thao tác |
|  |-----------|----------------|-----------------|------------|----------|
|  | v2.0      | 25/02/2025     | Trần Thị B      | Cập nhật   | [Xem]    |
|  |           | 15:30          |                 | ngân sách  | [So sánh]|
|  |           |                |                 | và thêm    | [Khôi phục]|
|  |           |                |                 | khóa học   |          |
|  |-----------|----------------|-----------------|------------|----------|
|  | v1.1      | 20/02/2025     | Hoàng Thị E     | Điều chỉnh | [Xem]    |
|  |           | 10:15          |                 | thời gian  | [So sánh]|
|  |           |                |                 | thực hiện  | [Khôi phục]|
|  |-----------|----------------|-----------------|------------|----------|
|  | v1.0      | 15/02/2025     | Hoàng Thị E     | Phiên bản  | [Xem]    |
|  |           | 09:45          |                 | ban đầu    | [So sánh]|
|  |           |                |                 |            | [Khôi phục]|
|  +-----------------------------------------------------------+|
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  So sánh phiên bản                                           |
|  +-------------------------+  +-------------------------+     |
|  | v1.1 (20/02/2025)       |  | v2.0 (25/02/2025)       |     |
|  +-------------------------+  +-------------------------+     |
|  | Tên: Đào tạo kỹ năng    |  | Tên: Đào tạo kỹ năng    |     |
|  | mềm 2025                |  | mềm 2025                |     |
|  |                         |  |                         |     |
|  | Mô tả: Kế hoạch đào     |  | Mô tả: Kế hoạch đào     |     |
|  | tạo kỹ năng mềm cho     |  | tạo kỹ năng mềm cho     |     |
|  | nhân viên marketing     |  | nhân viên marketing     |     |
|  |                         |  |                         |     |
|  | Ngân sách: 220,000,000  |  | Ngân sách: 250,000,000  |     |
|  |                         |  |                         |     |
|  | Thời gian:              |  | Thời gian:              |     |
|  | 01/04/2025 - 30/06/2025 |  | 01/04/2025 - 30/06/2025 |     |
|  |                         |  |                         |     |
|  | Khóa học (7):           |  | Khóa học (8):           |     |
|  | - Kỹ năng thuyết trình  |  | - Kỹ năng thuyết trình  |     |
|  | - Kỹ năng làm việc nhóm |  | - Kỹ năng làm việc nhóm |     |
|  | - Kỹ năng quản lý thời  |  | - Kỹ năng quản lý thời  |     |
|  |   gian                  |  |   gian                  |     |
|  | - Kỹ năng giao tiếp     |  | - Kỹ năng giao tiếp     |     |
|  | - Kỹ năng đàm phán      |  | - Kỹ năng đàm phán      |     |
|  | - Kỹ năng giải quyết    |  | - Kỹ năng giải quyết    |     |
|  |   vấn đề                |  |   vấn đề                |     |
|  | - Kỹ năng tư duy sáng   |  | - Kỹ năng tư duy sáng   |     |
|  |   tạo                   |  |   tạo                   |     |
|  |                         |  | - Kỹ năng lãnh đạo      |     |
|  +-------------------------+  +-------------------------+     |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
| [Xuất báo cáo]                                [Đóng]          |
|                                                               |
+---------------------------------------------------------------+
```
