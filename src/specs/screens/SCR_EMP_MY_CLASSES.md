# SCR_EMP_MY_CLASSES

## Mô tả
Trang hiển thị danh sách lớp học của nhân viên, cho phép nhân viên xem thông tin chi tiết về các lớp học đã và sắp tham gia.

## Đối tượng người dùng
- Nhân viên

## Chức năng chính
1. **Xem danh sách lớp học**
   - Hiển thị danh sách lớp học được phân loại theo tab: Sắp diễn ra, Đã hoàn thành, Lịch học
   - Mỗi tab hiển thị số lượng lớp học tương ứng
   - Hiển thị thông tin: Tên khóa học, giảng viên, thời gian, trạng thái

2. **Xem chi tiết lớp học**
   - Nhấn nút "Chi tiết" để mở modal thông tin chi tiết lớp học
   - Hiển thị đầy đủ thông tin: Tên khóa học, giảng viên, thời gian, địa điểm, số học viên, tài liệu học tập

3. **Xem lịch học**
   - Hiển thị lịch học theo tháng
   - Đánh dấu các ngày có lớp học
   - Nhấn vào sự kiện trên lịch để xem chi tiết lớp học

4. **Truy cập tài liệu học tập**
   - Xem và tải xuống tài liệu học tập của lớp học
   - Hiển thị danh sách tài liệu trong modal chi tiết lớp học

5. **Xem chứng chỉ**
   - Xem chứng chỉ hoàn thành khóa học (nếu có)
   - Chỉ hiển thị cho các lớp học đã hoàn thành

6. **Xuất báo cáo**
   - Xuất danh sách lớp học ra file Excel

## Luồng màn hình
1. Người dùng truy cập vào trang "Lớp học của tôi"
2. Hệ thống hiển thị danh sách lớp học được phân loại theo tab
3. Người dùng có thể:
   - Chuyển tab để xem các lớp học khác nhau
   - Xem chi tiết lớp học
   - Xem lịch học theo tháng
   - Truy cập tài liệu học tập
   - Xem chứng chỉ hoàn thành khóa học
   - Xuất báo cáo ra file Excel

## Các thành phần UI
- Tiêu đề trang
- Tabs: Sắp diễn ra, Đã hoàn thành, Lịch học
- Bảng danh sách lớp học
- Lịch học theo tháng
- Nút "Chi tiết"
- Nút "Xuất báo cáo"
- Modal chi tiết lớp học
- Danh sách tài liệu học tập
- Hiển thị chứng chỉ

## Dữ liệu
- Danh sách lớp học của nhân viên
- Trạng thái lớp học: sắp diễn ra, đã hoàn thành
- Thông tin lớp học: tên, giảng viên, thời gian, địa điểm, số học viên
- Tài liệu học tập
- Chứng chỉ hoàn thành khóa học

## Quyền truy cập
- Nhân viên: Xem danh sách lớp học của mình, xem chi tiết lớp học, truy cập tài liệu học tập, xem chứng chỉ

## Ghi chú
- Lịch học được hiển thị theo tháng và có thể chuyển đổi giữa các tháng
- Các lớp học đã hoàn thành có thể có chứng chỉ đính kèm
- Tài liệu học tập có thể được tải xuống
