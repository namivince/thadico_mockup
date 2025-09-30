# Màn hình báo cáo tổng hợp

## Mô tả
Màn hình báo cáo tổng hợp cung cấp các báo cáo chi tiết và phân tích dữ liệu từ tất cả các hoạt động trong hệ thống, bao gồm khảo sát, đào tạo và đánh giá. Người dùng có thể tạo, xem và xuất các báo cáo tùy chỉnh để đánh giá hiệu quả và đưa ra quyết định dựa trên dữ liệu.

## Đối tượng người dùng
- Quản trị viên
- HR
- Quản lý đào tạo
- Giám đốc

## Luồng chức năng
1. Người dùng truy cập vào màn hình báo cáo tổng hợp
2. Người dùng chọn loại báo cáo muốn xem
3. Người dùng thiết lập các tham số và bộ lọc cho báo cáo
4. Hệ thống tạo và hiển thị báo cáo theo yêu cầu
5. Người dùng có thể xuất báo cáo ra các định dạng khác nhau (PDF, Excel, v.v.)
6. Người dùng có thể lưu cấu hình báo cáo để sử dụng lại sau này

## Thành phần giao diện

### 1. Phần tiêu đề và điều hướng
- Tiêu đề "Báo cáo tổng hợp"
- Tab điều hướng giữa các loại báo cáo:
  - Báo cáo khảo sát
  - Báo cáo đào tạo
  - Báo cáo đánh giá
  - Báo cáo tích hợp

### 2. Phần bộ lọc và tham số
- Bộ lọc theo thời gian (Ngày bắt đầu - Ngày kết thúc)
- Bộ lọc theo phòng ban
- Bộ lọc theo người tham gia
- Bộ lọc theo trạng thái
- Nút "Áp dụng bộ lọc"
- Nút "Đặt lại bộ lọc"

### 3. Phần cấu hình báo cáo
- Dropdown chọn loại biểu đồ (Cột, Đường, Tròn, v.v.)
- Dropdown chọn trục dữ liệu (X, Y)
- Checkbox chọn các trường dữ liệu hiển thị
- Nút "Tạo báo cáo"
- Nút "Lưu cấu hình"
- Dropdown chọn cấu hình đã lưu

### 4. Phần hiển thị báo cáo
- Khu vực hiển thị biểu đồ
- Bảng dữ liệu chi tiết
- Thông tin tổng hợp và chỉ số quan trọng
- Ghi chú và diễn giải

### 5. Phần xuất báo cáo
- Nút xuất ra PDF
- Nút xuất ra Excel
- Nút xuất ra CSV
- Nút in báo cáo
- Nút chia sẻ báo cáo

## Các loại báo cáo

### 1. Báo cáo khảo sát
- Tỷ lệ hoàn thành khảo sát
- Phân tích câu trả lời theo câu hỏi
- Xu hướng tham gia khảo sát theo thời gian
- So sánh kết quả giữa các phòng ban
- Phân tích ý kiến và phản hồi

### 2. Báo cáo đào tạo
- Tỷ lệ tham gia khóa học
- Điểm số trung bình
- Thời gian hoàn thành khóa học
- Chi phí đào tạo theo phòng ban
- Đánh giá hiệu quả đào tạo

### 3. Báo cáo đánh giá
- Điểm số đánh giá theo kỹ năng
- So sánh điểm số trước và sau đào tạo
- Phân tích khoảng cách kỹ năng
- Xu hướng điểm số theo thời gian
- Tỷ lệ đạt/không đạt theo tiêu chí

### 4. Báo cáo tích hợp
- Tương quan giữa đào tạo và kết quả đánh giá
- Phân tích ROI (Return on Investment) của đào tạo
- Tổng hợp nhu cầu đào tạo từ khảo sát và đánh giá
- Dự báo xu hướng và nhu cầu trong tương lai
- Phân tích hiệu quả tổng thể của quy trình đào tạo

## Các hành động
- **Tạo báo cáo**: Tạo báo cáo mới dựa trên các tham số đã chọn
- **Lưu cấu hình**: Lưu cấu hình báo cáo hiện tại để sử dụng sau
- **Tải cấu hình**: Tải cấu hình báo cáo đã lưu trước đó
- **Xuất báo cáo**: Xuất báo cáo ra các định dạng khác nhau
- **Chia sẻ báo cáo**: Chia sẻ báo cáo với người dùng khác
- **Lên lịch báo cáo**: Thiết lập lịch tự động tạo và gửi báo cáo

## Quy tắc nghiệp vụ
1. Người dùng chỉ có thể xem báo cáo phù hợp với quyền hạn của mình
2. Dữ liệu báo cáo được cập nhật theo thời gian thực hoặc theo lịch định kỳ
3. Báo cáo có thể được lưu trữ trong hệ thống trong thời gian tối đa 1 năm
4. Người dùng có thể lưu tối đa 10 cấu hình báo cáo cá nhân
5. Báo cáo xuất ra phải bao gồm thông tin về người tạo, thời gian tạo và các bộ lọc đã áp dụng
6. Dữ liệu nhạy cảm sẽ được ẩn hoặc tổng hợp trong báo cáo công khai

## Mockup UI
```
+---------------------------------------------------------------+
|                                                               |
|  Báo cáo tổng hợp                                            |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  [Báo cáo khảo sát] [Báo cáo đào tạo] [Báo cáo đánh giá] [Báo cáo tích hợp] |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|  Bộ lọc                                                       |
|  +-----------------------------------------------------------+|
|  | Thời gian: [01/01/2025] - [30/09/2025]                    ||
|  | Phòng ban: [Tất cả phòng ban v]                           ||
|  | Người tham gia: [Tất cả v]                                ||
|  | Trạng thái: [Tất cả v]                                    ||
|  |                                                           ||
|  | [Đặt lại bộ lọc]                      [Áp dụng bộ lọc]   ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Cấu hình báo cáo                                            |
|  +-----------------------------------------------------------+|
|  | Loại biểu đồ: [Cột v]                                    ||
|  | Trục X: [Phòng ban v]                                     ||
|  | Trục Y: [Điểm số v]                                       ||
|  |                                                           ||
|  | Hiển thị:                                                 ||
|  | [x] Điểm trung bình                                       ||
|  | [x] Điểm cao nhất/thấp nhất                               ||
|  | [ ] Độ lệch chuẩn                                         ||
|  | [x] Số lượng người tham gia                               ||
|  |                                                           ||
|  | Cấu hình đã lưu: [Chọn cấu hình v]                        ||
|  |                                                           ||
|  | [Lưu cấu hình]                         [Tạo báo cáo]      ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Báo cáo: So sánh điểm số đánh giá theo phòng ban            |
|  +-----------------------------------------------------------+|
|  |                                                           ||
|  |                                                           ||
|  |                   [Biểu đồ báo cáo]                       ||
|  |                                                           ||
|  |                                                           ||
|  |                                                           ||
|  +-----------------------------------------------------------+|
|                                                               |
|  Dữ liệu chi tiết                                            |
|  +-----------------------------------------------------------+|
|  | Phòng ban | Điểm TB | Điểm cao nhất | Điểm thấp nhất | Số người |
|  |-----------|---------|---------------|---------------|----------|
|  | Nhân sự   | 85.5    | 95            | 75            | 12       |
|  | IT        | 82.3    | 94            | 70            | 20       |
|  | Marketing | 79.8    | 92            | 68            | 15       |
|  | Kinh doanh| 81.2    | 93            | 72            | 25       |
|  | Kế toán   | 84.7    | 96            | 74            | 8        |
|  +-----------------------------------------------------------+|
|                                                               |
|  Tổng hợp                                                     |
|  +-----------------------------------------------------------+|
|  | - Điểm trung bình toàn công ty: 82.7                      ||
|  | - Phòng ban có điểm cao nhất: Nhân sự (85.5)              ||
|  | - Phòng ban có điểm thấp nhất: Marketing (79.8)           ||
|  | - Tổng số người tham gia: 80                              ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [PDF] [Excel] [CSV] [In] [Chia sẻ]     [Lên lịch báo cáo]   |
|                                                               |
+---------------------------------------------------------------+
```
