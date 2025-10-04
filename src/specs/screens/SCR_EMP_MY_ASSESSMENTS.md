# SCR_EMP_MY_ASSESSMENTS

## Mô tả
Trang hiển thị danh sách đánh giá của nhân viên, cho phép nhân viên xem, làm và theo dõi kết quả đánh giá năng lực.

## Đối tượng người dùng
- Nhân viên

## Chức năng chính
1. **Xem danh sách đánh giá**
   - Hiển thị danh sách đánh giá được phân loại theo tab: Chưa hoàn thành, Đã hoàn thành, Xu hướng
   - Mỗi tab hiển thị số lượng đánh giá tương ứng
   - Hiển thị thông tin: Tên đánh giá, loại, trạng thái, tiến độ

2. **Làm đánh giá**
   - Nhấn nút "Làm đánh giá" để điều hướng đến trang làm đánh giá
   - Chỉ hiển thị nút này cho đánh giá chưa hoàn thành

3. **Xem kết quả đánh giá**
   - Nhấn nút "Xem kết quả" để mở modal kết quả đánh giá
   - Hiển thị điểm trung bình, điểm mạnh, cần cải thiện
   - Hiển thị biểu đồ radar năng lực
   - Chỉ hiển thị nút này cho đánh giá đã hoàn thành

4. **Xem xu hướng đánh giá**
   - Hiển thị biểu đồ xu hướng điểm trung bình qua các kỳ đánh giá
   - Hiển thị biểu đồ radar năng lực theo thời gian

5. **Xuất báo cáo**
   - Xuất kết quả đánh giá ra file Excel

## Luồng màn hình
1. Người dùng truy cập vào trang "Đánh giá của tôi"
2. Hệ thống hiển thị danh sách đánh giá được phân loại theo tab
3. Người dùng có thể:
   - Chuyển tab để xem các đánh giá khác nhau
   - Làm đánh giá chưa hoàn thành
   - Xem kết quả đánh giá đã hoàn thành
   - Xem xu hướng đánh giá qua các kỳ
   - Xuất báo cáo ra file Excel

## Các thành phần UI
- Tiêu đề trang
- Tabs: Chưa hoàn thành, Đã hoàn thành, Xu hướng
- Bảng danh sách đánh giá
- Nút "Làm đánh giá"
- Nút "Xem kết quả"
- Nút "Xuất báo cáo"
- Modal kết quả đánh giá
- Biểu đồ radar năng lực
- Biểu đồ xu hướng điểm trung bình

## Dữ liệu
- Danh sách đánh giá của nhân viên
- Trạng thái đánh giá: chưa hoàn thành, đã hoàn thành
- Thông tin đánh giá: tên, loại, tiến độ, thời gian
- Kết quả đánh giá: điểm trung bình, điểm mạnh, cần cải thiện
- Dữ liệu biểu đồ radar năng lực
- Dữ liệu biểu đồ xu hướng điểm trung bình

## Quyền truy cập
- Nhân viên: Xem danh sách đánh giá của mình, làm đánh giá, xem kết quả đánh giá

## Ghi chú
- Biểu đồ radar hiển thị năng lực của nhân viên so với trung bình
- Biểu đồ xu hướng hiển thị sự tiến bộ qua các kỳ đánh giá
- Kết quả đánh giá bao gồm điểm mạnh và các lĩnh vực cần cải thiện
