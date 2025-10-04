# SCR_PLAN_DEPLOY — Triển khai lớp đào tạo

## Mô tả
Trang quản lý và triển khai các lớp học theo kế hoạch đào tạo đã được phê duyệt. Hỗ trợ lên lịch, phân công giảng viên, quản lý học viên, liên kết với hệ thống LMS và theo dõi tiến độ triển khai.

## Đối tượng người dùng
- HR (Quản lý đào tạo)
- Quản lý đơn vị
- Admin

## Chức năng chính
1. **Quản lý lớp học theo trạng thái**
   - Hiển thị các lớp học theo các trạng thái: Dự kiến, Đã lên lịch, Đang diễn ra, Hoàn thành, Đã hủy
   - Kéo thả các lớp học giữa các trạng thái
   - Hiển thị thông tin cơ bản của lớp học trên card

2. **Lên lịch và phân công**
   - Chọn thời gian bắt đầu và kết thúc lớp học
   - Chọn địa điểm tổ chức lớp học (văn phòng, trực tuyến)
   - Phân công giảng viên
   - Quản lý danh sách học viên

3. **Đồng bộ với hệ thống LMS và Calendar**
   - Tạo lớp học trên hệ thống LMS
   - Tạo sự kiện trên lịch công ty
   - Hiển thị trạng thái đồng bộ: đã đồng bộ, đang chờ, lỗi

4. **Theo dõi tiến độ và chi phí**
   - Cập nhật trạng thái lớp học
   - Ghi nhận chi phí thực tế
   - Theo dõi tỷ lệ tham gia của học viên

5. **Thông báo và nhắc nhở**
   - Gửi thông báo cho giảng viên và học viên
   - Gửi nhắc nhở trước khi lớp học diễn ra
   - Gửi thông báo khi có thay đổi lịch học

6. **Xuất báo cáo**
   - Xuất danh sách lớp học và học viên
   - Xuất báo cáo chi phí và tỷ lệ hoàn thành

## Luồng màn hình
1. Người dùng truy cập vào trang Thực hiện kế hoạch
2. Hệ thống hiển thị bảng Kanban với các cột trạng thái
3. Người dùng có thể:
   - Kéo thả các lớp học giữa các trạng thái
   - Nhấp vào một lớp học để xem chi tiết và chỉnh sửa
   - Tạo lớp học mới từ kế hoạch đã duyệt
   - Đồng bộ với LMS và Calendar
   - Xuất báo cáo

## Các thành phần UI
- Tiêu đề trang với nút quay lại
- Bảng Kanban với 5 cột trạng thái:
  - Dự kiến
  - Đã lên lịch
  - Đang diễn ra
  - Hoàn thành
  - Đã hủy
- Card lớp học hiển thị:
  - Tên lớp học
  - Thời gian (nếu đã lên lịch)
  - Số học viên
  - Giảng viên
  - Trạng thái đồng bộ LMS và Calendar
- Modal chi tiết lớp học:
  - Thông tin cơ bản
  - Lịch học
  - Danh sách học viên
  - Thông tin giảng viên
  - Chi phí
  - Trạng thái đồng bộ
- Các nút hành động: Tạo lớp, Lưu, Gửi thông báo, Xuất báo cáo

## Dữ liệu
```json
{
  "id": "c1",
  "planId": "p1",
  "title": "Kỹ năng giao tiếp hiệu quả",
  "status": "scheduled",
  "startDate": "2025-10-15",
  "endDate": "2025-10-16",
  "teacher": "Nguyễn Văn K",
  "location": "Phòng đào tạo 301, Tòa nhà A",
  "participants": 25,
  "lmsStatus": "synced",
  "calendarStatus": "synced",
  "budget": {
    "planned": 30000000,
    "actual": 28500000
  },
  "materials": [
    { "name": "Slide bài giảng.pdf", "url": "#" },
    { "name": "Tài liệu tham khảo.docx", "url": "#" }
  ],
  "sync": {
    "lms": { "id": "lms123", "url": "https://lms.example.com/course/123", "status": "synced" },
    "calendar": { "id": "cal456", "url": "https://calendar.example.com/event/456", "status": "synced" }
  }
}
```
## Quyền truy cập
- HR: Quản lý đầy đủ các lớp học, tạo lớp mới, cập nhật trạng thái
- Quản lý đơn vị: Xem các lớp học của đơn vị mình, cập nhật danh sách học viên
- Admin: Quản lý toàn bộ hệ thống, xem tất cả các lớp học

## Trạng thái lớp học
- **planned**: Lớp học đã được lên kế hoạch nhưng chưa lên lịch cụ thể
- **scheduled**: Lớp học đã được lên lịch, phân công giảng viên và học viên
- **running**: Lớp học đang diễn ra
- **completed**: Lớp học đã hoàn thành
- **cancelled**: Lớp học đã bị hủy

## Trạng thái đồng bộ
- **synced**: Đã đồng bộ thành công
- **pending**: Đang chờ đồng bộ
- **failed**: Đồng bộ thất bại

## Quy tắc và hạn chế
- Chỉ có thể Thực hiện kế hoạch từ kế hoạch đã được phê duyệt
- Việc thay đổi trạng thái lớp học phải tuân theo thứ tự hợp lý
- Các thay đổi về lịch học, giảng viên hoặc hủy lớp cần được phê duyệt
- Chi phí thực tế chỉ được cập nhật khi lớp học đã hoàn thành
