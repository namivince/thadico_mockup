# Hướng dẫn Demo Thadico - Đánh giá tay nghề

## Giới thiệu

Demo này trình bày các luồng chính của hệ thống đánh giá tay nghề, bao gồm:
1. Tạo & Thiết lập chiến dịch
2. Học viên làm bài
3. Giảng viên chấm bài (với SLA đếm ngược)
4. Xử lý phúc khảo
5. Dashboard tổng quan

## Cách chạy demo

### Bước 1: Khởi động ứng dụng
```bash
npm start
```

### Bước 2: Truy cập trang demo
Mở trình duyệt và truy cập: http://localhost:3000/

### Bước 3: Chọn luồng demo
Từ trang demo, bạn có thể chọn một trong các luồng để trải nghiệm:

## Các luồng demo

### Luồng 1: Tạo & Thiết lập chiến dịch
- **Mô tả**: Demo luồng tạo chiến dịch đánh giá tay nghề, thiết lập SLA chấm và cửa sổ phúc khảo
- **Màn hình**: SCR_ASM_CAMPAIGN_FORM
- **Quyền**: Super Admin, Admin
- **Điểm nhấn**:
  - Form wizard 4 bước
  - Import Excel đề thi
  - Thiết lập SLA chấm bài và cảnh báo
  - Cấu hình cửa sổ phúc khảo

### Luồng 2: Học viên làm bài
- **Mô tả**: Demo luồng học viên làm bài thi (trắc nghiệm + tự luận)
- **Màn hình**: SCR_TEST_RUNNER
- **Quyền**: CBNV (được mời), Super Admin (xem/giám sát)
- **Điểm nhấn**:
  - Focus mode với đếm ngược thời gian
  - Hỗ trợ câu hỏi trắc nghiệm và tự luận
  - Auto-save mỗi 30s
  - Banner xác nhận sau khi nộp bài

### Luồng 3: Giảng viên chấm bài
- **Mô tả**: Demo luồng chấm bài với SLA đếm ngược và cảnh báo quá hạn
- **Màn hình**: SCR_GRADING_CONSOLE
- **Quyền**: Super Admin, Admin, Giảng viên
- **Điểm nhấn**:
  - Countdown SLA chấm bài
  - Cảnh báo bài quá hạn
  - Quick rubric (Chưa đạt/Đạt/Vượt mong đợi)
  - Auto-score cho câu hỏi trắc nghiệm

### Luồng 4: Xử lý phúc khảo
- **Mô tả**: Demo luồng tiếp nhận và xử lý phúc khảo
- **Màn hình**: SCR_ASM_APPEAL_LIST, SCR_APPEAL_DETAIL_MODAL
- **Quyền**: Super Admin, Admin
- **Điểm nhấn**:
  - Badge hiển thị thời gian còn lại của cửa sổ phúc khảo
  - Xem lý do và minh chứng phúc khảo
  - Cập nhật điểm và ghi lịch sử
  - Từ chối phúc khảo

### Luồng 5: Dashboard tổng quan
- **Mô tả**: Dashboard tổng quan với các KPI của 3 luồng chính
- **Màn hình**: AdminDashboard
- **Quyền**: Super Admin, Admin
- **Điểm nhấn**:
  - Card KPI cho 3 luồng chính
  - Cảnh báo SLA chấm bài quá hạn
  - Cảnh báo phúc khảo đang mở
  - Liên kết giữa 3 luồng

## Lưu ý

- Demo sử dụng dữ liệu mẫu (mock data) để minh họa các tính năng
- Super Admin có các quyền đặc biệt trong mỗi màn hình
- Các chức năng API được mô phỏng bằng timeout để tạo trải nghiệm thực tế

## Các file spec tham khảo

- SCR_ASM_CAMPAIGN_FORM.md
- SCR_TEST_RUNNER.md
- SCR_GRADING_CONSOLE.md
- SCR_ASM_APPEAL_LIST.md
- SCR_APPEAL_DETAIL_MODAL.md
- FLOW_ASSESSMENT_LIFECYCLE.md
