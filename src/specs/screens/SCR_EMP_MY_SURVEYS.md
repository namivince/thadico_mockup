# SCR_EMP_MY_SURVEYS

## Mô tả
Trang hiển thị danh sách khảo sát của nhân viên, cho phép nhân viên xem, làm và từ chối khảo sát được giao.

## Đối tượng người dùng
- Nhân viên

## Chức năng chính
1. **Xem danh sách khảo sát**
   - Hiển thị danh sách khảo sát được phân loại theo tab: Chưa trả lời, Đã trả lời, Đã từ chối
   - Mỗi tab hiển thị số lượng khảo sát tương ứng
   - Hiển thị thông tin: Tên khảo sát, phòng ban, trạng thái, thời gian

2. **Làm khảo sát**
   - Nhấn nút "Làm khảo sát" để điều hướng đến trang làm khảo sát
   - Chỉ hiển thị nút này cho khảo sát chưa trả lời

3. **Từ chối khảo sát**
   - Nhấn nút "Từ chối" để mở modal từ chối
   - Nhập lý do từ chối (bắt buộc)
   - Xác nhận từ chối

4. **Xem kết quả**
   - Nhấn nút "Xem kết quả" để xem kết quả khảo sát đã hoàn thành
   - Chỉ hiển thị nút này cho khảo sát đã trả lời

5. **Xuất báo cáo**
   - Xuất danh sách khảo sát ra file Excel

## Luồng màn hình
1. Người dùng truy cập vào trang "Khảo sát của tôi"
2. Hệ thống hiển thị danh sách khảo sát được phân loại theo tab
3. Người dùng có thể:
   - Chuyển tab để xem các khảo sát khác nhau
   - Làm khảo sát chưa trả lời
   - Từ chối khảo sát với lý do
   - Xem kết quả khảo sát đã hoàn thành
   - Xuất báo cáo ra file Excel

## Các thành phần UI
- Tiêu đề trang
- Tabs: Chưa trả lời, Đã trả lời, Đã từ chối
- Bảng danh sách khảo sát
- Nút "Làm khảo sát"
- Nút "Từ chối"
- Nút "Xem kết quả"
- Nút "Xuất báo cáo"
- Modal từ chối khảo sát

## Dữ liệu
- Danh sách khảo sát của nhân viên
- Trạng thái khảo sát: chưa trả lời, đã trả lời, đã từ chối
- Thông tin khảo sát: tên, phòng ban, thời gian
- Lý do từ chối (nếu có)

## Quyền truy cập
- Nhân viên: Xem danh sách khảo sát của mình, làm khảo sát, từ chối khảo sát, xem kết quả

## Ghi chú
- Khảo sát đã từ chối vẫn có thể làm lại nếu cần
- Hệ thống lưu lại thời gian trả lời và thời gian nhắc nhở gần nhất
