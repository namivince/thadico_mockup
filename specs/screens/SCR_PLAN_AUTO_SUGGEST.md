# Màn hình đề xuất tự động kế hoạch đào tạo

## Mô tả
Màn hình này cho phép hệ thống tự động đề xuất kế hoạch đào tạo dựa trên kết quả khảo sát nhu cầu đào tạo. Người dùng có thể xem, điều chỉnh và áp dụng các đề xuất này để tạo kế hoạch đào tạo mới.

## Đối tượng người dùng
- Quản trị viên
- HR
- Quản lý đào tạo

## Luồng chức năng
1. Người dùng chọn khảo sát nhu cầu đào tạo làm nguồn dữ liệu
2. Hệ thống phân tích kết quả khảo sát và đề xuất kế hoạch đào tạo
3. Người dùng xem xét và điều chỉnh đề xuất
4. Người dùng áp dụng đề xuất để tạo kế hoạch đào tạo mới

## Thành phần giao diện

### 1. Phần chọn nguồn dữ liệu
- Dropdown chọn khảo sát nhu cầu đào tạo
- Bộ lọc theo thời gian, đơn vị, phòng ban
- Nút "Phân tích và đề xuất"

### 2. Phần phân tích kết quả khảo sát
- Biểu đồ thống kê nhu cầu đào tạo theo chuyên đề
- Biểu đồ thống kê nhu cầu đào tạo theo đơn vị
- Bảng tổng hợp số lượng người đăng ký theo khóa học

### 3. Phần đề xuất kế hoạch đào tạo
- Danh sách các khóa học được đề xuất
  - Tên khóa học
  - Mức độ ưu tiên (cao, trung bình, thấp)
  - Số lượng người đăng ký
  - Chi phí dự kiến
  - Thời gian đề xuất tổ chức
- Công cụ điều chỉnh đề xuất
  - Thêm/xóa khóa học
  - Điều chỉnh thời gian
  - Điều chỉnh ngân sách

### 4. Phần tạo kế hoạch đào tạo
- Form nhập thông tin cơ bản của kế hoạch
  - Tên kế hoạch
  - Mô tả
  - Thời gian thực hiện
  - Ngân sách tổng thể
- Nút "Tạo kế hoạch từ đề xuất"

## Các hành động
- **Phân tích và đề xuất**: Hệ thống phân tích dữ liệu khảo sát và đưa ra đề xuất
- **Điều chỉnh đề xuất**: Người dùng có thể thêm/xóa khóa học, điều chỉnh thời gian, ngân sách
- **Tạo kế hoạch**: Tạo kế hoạch đào tạo mới từ đề xuất đã điều chỉnh
- **Lưu đề xuất**: Lưu đề xuất để xem xét sau
- **Xuất báo cáo**: Xuất báo cáo phân tích và đề xuất ra Excel

## Các trạng thái
- **Đang phân tích**: Hệ thống đang phân tích dữ liệu khảo sát
- **Đã có đề xuất**: Hệ thống đã đưa ra đề xuất, người dùng có thể điều chỉnh
- **Đã điều chỉnh**: Người dùng đã điều chỉnh đề xuất
- **Đã tạo kế hoạch**: Đã tạo kế hoạch đào tạo từ đề xuất

## Quy tắc nghiệp vụ
1. Chỉ phân tích dữ liệu từ các khảo sát đã hoàn thành
2. Ưu tiên các khóa học có nhiều người đăng ký
3. Tự động tính toán chi phí dự kiến dựa trên số lượng người đăng ký
4. Đề xuất thời gian tổ chức dựa trên mức độ ưu tiên và tính khả dụng của nguồn lực
5. Tự động gộp các nhu cầu tương tự để tối ưu hóa nguồn lực

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Đề xuất kế hoạch đào tạo tự động                            |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Chọn nguồn dữ liệu                                          |
|  +-------------------+  +------------+  +---------------+     |
|  | Khảo sát NCĐT Q3  v|  | Thời gian v|  | Phòng ban   v|     |
|  +-------------------+  +------------+  +---------------+     |
|                                                               |
|  [Phân tích và đề xuất]                                       |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Phân tích kết quả khảo sát                                  |
|  +----------------------------+  +-------------------------+  |
|  |                            |  |                         |  |
|  |  [Biểu đồ nhu cầu theo    |  |  [Biểu đồ nhu cầu theo  |  |
|  |   chuyên đề]              |  |   đơn vị]               |  |
|  |                            |  |                         |  |
|  +----------------------------+  +-------------------------+  |
|                                                               |
|  Bảng tổng hợp đăng ký                                       |
|  +-------------------------------------------------------+   |
|  | Khóa học      | Số lượng | Chi phí    | Mức độ ưu tiên|   |
|  |---------------|----------|------------|---------------|   |
|  | Excel nâng cao| 45       | 45,000,000 | Cao           |   |
|  | Quản lý dự án | 32       | 64,000,000 | Cao           |   |
|  | Tiếng Anh     | 28       | 84,000,000 | Trung bình    |   |
|  | ...           | ...      | ...        | ...           |   |
|  +-------------------------------------------------------+   |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Đề xuất kế hoạch đào tạo                                    |
|  +-------------------------------------------------------+   |
|  | Khóa học      | Thời gian      | Chi phí    | Hành động|   |
|  |---------------|----------------|------------|----------|   |
|  | Excel nâng cao| 15/10 - 30/10  | 45,000,000 | [Xóa]    |   |
|  | Quản lý dự án | 01/11 - 15/11  | 64,000,000 | [Xóa]    |   |
|  | Tiếng Anh     | 15/11 - 15/12  | 84,000,000 | [Xóa]    |   |
|  | ...           | ...            | ...        | ...      |   |
|  +-------------------------------------------------------+   |
|                                                               |
|  [+ Thêm khóa học]                                            |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Thông tin kế hoạch đào tạo                                  |
|  +------------------------+  +------------------------+       |
|  | Tên kế hoạch          |  | Mô tả                  |       |
|  | [Kế hoạch Q4 2025]    |  | [                      |       |
|  +------------------------+  |                        |       |
|                              |                        |       |
|  +------------------------+  |                      ] |       |
|  | Ngân sách tổng        |  +------------------------+       |
|  | [193,000,000]         |                                   |
|  +------------------------+                                   |
|                                                               |
|  [Lưu đề xuất]  [Xuất báo cáo]  [Tạo kế hoạch từ đề xuất]    |
|                                                               |
+---------------------------------------------------------------+
```
