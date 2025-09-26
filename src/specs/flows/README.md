# Luồng nghiệp vụ hệ thống Thadico

## Giới thiệu
Thư mục này chứa các đặc tả luồng nghiệp vụ chính của hệ thống quản lý nhân sự Thadico. Mỗi luồng mô tả một chu trình hoạt động hoàn chỉnh, từ khởi tạo đến hoàn thành, bao gồm các trạng thái, chuyển đổi, quy tắc và API endpoints.

## Cấu trúc đặc tả luồng
Mỗi file đặc tả luồng tuân theo cấu trúc sau:

1. **Metadata**: Module, routes, entities
2. **Purpose**: Mục đích của luồng
3. **States**: Các trạng thái và chuyển đổi trạng thái
4. **Flow chi tiết**: Các bước thực hiện
5. **APIs**: Các endpoint API để thực hiện luồng
6. **Roles**: Phân quyền theo vai trò
7. **Notifications & SLA**: Thông báo và thời gian cam kết
8. **Rules**: Các quy tắc nghiệp vụ
9. **Data model**: Mô hình dữ liệu

## Danh sách luồng nghiệp vụ

### 1. FLOW_SURVEY_LIFECYCLE — Vòng đời khảo sát
- **Module**: Khảo sát/Nhu cầu đào tạo
- **Trạng thái**: draft → published → running → closed → archived
- **Mô tả**: Tạo & phát hành khảo sát; nhắc hạn; theo dõi tiến độ; đóng; phân tích & export → feed sang đề xuất/kế hoạch đào tạo.

### 2. FLOW_TRAINING_PLAN_LIFECYCLE — Vòng đời kế hoạch đào tạo
- **Module**: Đào tạo
- **Trạng thái**: draft → waiting_approval → approved → deployed → completed → archived
- **Mô tả**: Lập kế hoạch đào tạo năm/đợt; phê duyệt đa cấp; triển khai lớp; xử lý thay đổi; theo dõi hoàn thành & xuất báo cáo.

### 3. FLOW_ASSESSMENT_LIFECYCLE — Vòng đời đánh giá năng lực
- **Module**: Đánh giá năng lực/KPI
- **Trạng thái**: draft → published → running → grading → results_published → appeal_open → finalized → archived
- **Mô tả**: Tạo chiến dịch đánh giá, chạy, chấm điểm, công bố, khiếu nại & tổng hợp.

### 4. FLOW_SYSTEM_SETUP_POLICIES — Thiết lập hệ thống & chính sách
- **Module**: Quản trị hệ thống
- **Phạm vi**: Thiết lập ban đầu (org, SSO, role); tích hợp; chính sách bảo mật; audit & cảnh báo; xuất/nhập cấu hình.

## Mối quan hệ giữa các luồng

1. **FLOW_SURVEY_LIFECYCLE** → **FLOW_TRAINING_PLAN_LIFECYCLE**: Kết quả khảo sát được sử dụng để auto-suggest các nội dung cho kế hoạch đào tạo.

2. **FLOW_ASSESSMENT_LIFECYCLE** → **FLOW_TRAINING_PLAN_LIFECYCLE**: Kết quả đánh giá năng lực và skill gaps được sử dụng để đề xuất nội dung đào tạo.

3. **FLOW_SYSTEM_SETUP_POLICIES** là tiền đề cho việc vận hành các luồng khác, vì nó thiết lập các cấu hình cơ bản và phân quyền.

## Hướng dẫn phát triển

1. Khi thêm một luồng mới, cần tuân thủ cấu trúc đặc tả đồng nhất.
2. Mỗi luồng cần có sơ đồ trạng thái rõ ràng và các chuyển đổi trạng thái.
3. API endpoints phải tuân theo chuẩn RESTful.
4. Mỗi luồng cần có mô hình dữ liệu rõ ràng để hỗ trợ việc phát triển.
5. Các luồng có thể liên kết với nhau thông qua các API integration points.