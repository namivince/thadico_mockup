# Tài liệu đặc tả hệ thống Thadico

## Giới thiệu
Thư mục này chứa tất cả các tài liệu đặc tả kỹ thuật cho hệ thống quản lý nhân sự Thadico, bao gồm đặc tả màn hình và luồng nghiệp vụ.

## Cấu trúc thư mục

### 1. Screens (`/screens`)
Chứa đặc tả chi tiết cho từng màn hình trong hệ thống, được đặt tên theo cú pháp `SCR_[TÊN_MÀN_HÌNH].md`. Mỗi file đặc tả màn hình bao gồm:
- Metadata (route, design, role access)
- Mục đích của màn hình
- Layout và các thành phần UI
- Các hành động người dùng
- API endpoints
- Các quy tắc và validation

### 2. Flows (`/flows`)
Chứa đặc tả các luồng nghiệp vụ chính của hệ thống, được đặt tên theo cú pháp `FLOW_[TÊN_LUỒNG].md`. Mỗi file đặc tả luồng bao gồm:
- Metadata (module, routes, entities)
- Mục đích của luồng
- Các trạng thái và chuyển đổi trạng thái
- Chi tiết từng bước trong luồng
- API endpoints
- Phân quyền
- Thông báo và SLA
- Quy tắc nghiệp vụ
- Mô hình dữ liệu

## Danh sách màn hình
1. SCR_ADMIN_DASHBOARD — Dashboard quản trị
2. SCR_ORG_BUILDER_TREE — Xây dựng cây tổ chức
3. SCR_ORG_JOB_POSITION_SIDEPANEL — Thông tin vị trí công việc
4. SCR_COMPETENCY_DICTIONARY — Từ điển năng lực
5. SCR_ASM_PROCESS_STEP_MODAL — Modal cấu hình quy trình đánh giá
6. SCR_ASM_ROUND_LIST — Danh sách vòng đánh giá
7. SCR_SELF_EVAL_FORM — Form tự đánh giá
8. SCR_ASM_APPROVAL_LIST — Danh sách phê duyệt kết quả
9. SCR_DEMAND_LIST — Danh sách nhu cầu đào tạo
10. SCR_DEMAND_FORM — Form tạo nhu cầu đào tạo
11. SCR_PLAN_LIST — Danh sách kế hoạch đào tạo
12. SCR_PLAN_FORM — Form tạo kế hoạch đào tạo
13. SCR_ASM_ROUND_BOARD — Board kanban theo dõi đánh giá
14. SCR_EMP_PROFILE_COMPETENCY — Hồ sơ năng lực cá nhân
15. SCR_JOB_COMPETENCY_STANDARD_MODAL — Modal tiêu chuẩn năng lực theo vị trí

## Danh sách luồng nghiệp vụ
1. FLOW_SURVEY_LIFECYCLE — Vòng đời khảo sát
2. FLOW_TRAINING_PLAN_LIFECYCLE — Vòng đời kế hoạch đào tạo
3. FLOW_ASSESSMENT_LIFECYCLE — Vòng đời đánh giá năng lực
4. FLOW_SYSTEM_SETUP_POLICIES — Thiết lập hệ thống & chính sách

## Quy ước đặt tên
- Màn hình: `SCR_[TÊN_MÀN_HÌNH]`
- Luồng: `FLOW_[TÊN_LUỒNG]`
- API endpoints: RESTful, `/api/[module]/[resource]`

## Cập nhật tài liệu
Khi có thay đổi về thiết kế hoặc yêu cầu, cần cập nhật tài liệu đặc tả tương ứng và ghi chú phiên bản thay đổi.