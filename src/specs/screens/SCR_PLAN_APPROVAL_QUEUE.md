# SCR_PLAN_APPROVAL_QUEUE — Phê duyệt kế hoạch đào tạo

## Mô tả
Trang quản lý và phê duyệt các kế hoạch đào tạo theo quy trình nhiều cấp (L1 → L2 → L3), cho phép người duyệt xem chi tiết, so sánh phiên bản, bình luận và phê duyệt/từ chối.

## Đối tượng người dùng
- Quản lý (Approver L1/L2/L3)
- HR (Người tạo kế hoạch)
- Admin (Xem tất cả)

## Chức năng chính
1. **Xem danh sách kế hoạch chờ phê duyệt**
   - Hiển thị danh sách kế hoạch chờ phê duyệt với trạng thái và thông tin cơ bản
   - Lọc theo loại yêu cầu: thêm mới, điều chỉnh lịch, thay thế giảng viên, hủy khóa học

2. **Xem chi tiết kế hoạch**
   - Hiển thị thông tin chi tiết về kế hoạch: tên, đơn vị, người yêu cầu, lý do, tác động
   - Hiển thị timeline phê duyệt với các cấp và trạng thái

3. **So sánh phiên bản**
   - So sánh sự khác biệt giữa các phiên bản của kế hoạch
   - Hiển thị các thay đổi về ngân sách, thời gian và nội dung

4. **Bình luận và trao đổi**
   - Cho phép người duyệt và người tạo kế hoạch trao đổi thông qua bình luận
   - Hỗ trợ tag người dùng và đính kèm tài liệu

5. **Phê duyệt/Từ chối kế hoạch**
   - Phê duyệt kế hoạch để chuyển sang cấp tiếp theo hoặc hoàn tất quy trình
   - Từ chối kế hoạch với lý do cụ thể
   - Yêu cầu điều chỉnh với hướng dẫn cụ thể

6. **Gửi nhắc nhở**
   - Gửi nhắc nhở đến người phê duyệt để đẩy nhanh quy trình
   - Hiển thị thời gian còn lại trước khi vi phạm SLA

## Luồng màn hình
1. Người dùng truy cập vào trang phê duyệt kế hoạch
2. Hệ thống hiển thị danh sách kế hoạch chờ phê duyệt
3. Người dùng chọn một kế hoạch để xem chi tiết
4. Hệ thống hiển thị thông tin chi tiết và timeline phê duyệt
5. Người dùng có thể:
   - Xem các tab: Tổng quan, So sánh phiên bản, Bình luận
   - Phê duyệt, từ chối hoặc yêu cầu điều chỉnh kế hoạch
   - Gửi nhắc nhở đến người phê duyệt tiếp theo

## Các thành phần UI
- Tiêu đề trang với nút quay lại
- Thông tin kế hoạch: tên, loại, người yêu cầu, ngày yêu cầu, hạn chót
- Timeline phê duyệt với các bước: L1, L2, L3
- Tabs:
  - Tổng quan: thông tin chi tiết về kế hoạch và tác động
  - So sánh phiên bản: hiển thị sự khác biệt giữa các phiên bản
  - Bình luận: danh sách bình luận và form thêm bình luận mới
- Các nút hành động: Phê duyệt, Từ chối, Yêu cầu điều chỉnh, Gửi nhắc nhở
- Modal xác nhận phê duyệt/từ chối với trường nhập lý do

## Dữ liệu
```json
{
  "id": "pa1",
  "planId": "p1",
  "planTitle": "Kế hoạch đào tạo Q4/2025",
  "type": "add",
  "reason": "Bổ sung khóa học mới theo yêu cầu từ ban lãnh đạo",
  "impact": { "budget": 50000000, "time": 14 },
  "requester": "Nguyễn Thị F",
  "requestedAt": "2025-10-01",
  "dueDate": "2025-10-05",
  "status": "pending",
  "approvals": [
    { "level": "L1", "approver": "Trần Văn A", "status": "approved", "timestamp": "2025-10-02", "comment": "Phê duyệt" },
    { "level": "L2", "approver": "Lê Thị B", "status": "pending", "dueAt": "2025-10-04" },
    { "level": "L3", "approver": "Phạm Văn C", "status": "waiting", "dueAt": "2025-10-05" }
  ],
  "comments": [
    { "id": "c1", "user": "Trần Văn A", "content": "Kế hoạch hợp lý", "timestamp": "2025-10-02" },
    { "id": "c2", "user": "Nguyễn Thị F", "content": "Cảm ơn anh đã phê duyệt", "timestamp": "2025-10-02" }
  ],
  "versions": [
    { "id": "v1", "timestamp": "2025-10-01", "author": "Nguyễn Thị F", "description": "Phiên bản ban đầu" },
    { "id": "v2", "timestamp": "2025-10-02", "author": "Nguyễn Thị F", "description": "Cập nhật ngân sách" }
  ]
}
```

## Quyền truy cập
- Quản lý: Phê duyệt/từ chối kế hoạch theo cấp được phân công
- HR: Xem trạng thái phê duyệt, gửi nhắc nhở, điều chỉnh kế hoạch nếu bị yêu cầu
- Admin: Xem tất cả kế hoạch và trạng thái phê duyệt

## Quy tắc và hạn chế
- Mỗi cấp chỉ được phê duyệt/từ chối một lần
- Bắt buộc nhập lý do khi từ chối hoặc yêu cầu điều chỉnh
- Kế hoạch chỉ được coi là đã phê duyệt khi tất cả các cấp đều phê duyệt
- SLA được áp dụng cho mỗi cấp phê duyệt với các mức cảnh báo:
  - Bình thường: còn trên 24h
  - Sắp hết hạn: còn dưới 24h
  - Quá hạn: đã vượt quá thời hạn

## Trạng thái kế hoạch
- **pending**: Đang chờ phê duyệt
- **approved**: Đã được phê duyệt đầy đủ
- **rejected**: Đã bị từ chối
- **on_hold**: Đang tạm hoãn
- **in_adjustment**: Đang điều chỉnh theo yêu cầu

## Trạng thái phê duyệt
- **waiting**: Chưa đến lượt
- **pending**: Đang chờ phê duyệt
- **approved**: Đã phê duyệt
- **rejected**: Đã từ chối
