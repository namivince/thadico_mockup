# Đặc tả màn hình hệ thống Thadico

## Giới thiệu
Thư mục này chứa các đặc tả chi tiết cho từng màn hình trong hệ thống quản lý nhân sự Thadico. Mỗi file đặc tả một màn hình cụ thể với các thành phần UI, hành động, API và quy tắc nghiệp vụ.

## Cấu trúc đặc tả màn hình
Mỗi file đặc tả màn hình tuân theo cấu trúc sau:

1. **Metadata**: Route, Design, Role access
2. **Purpose**: Mục đích của màn hình
3. **Layout**: Cấu trúc và các thành phần UI
4. **Actions**: Các hành động người dùng
5. **APIs**: Các endpoint API để hỗ trợ màn hình
6. **Rules / Validation**: Các quy tắc và validation

## Phân loại màn hình

### 1. Quản trị hệ thống
- **SCR_ADMIN_DASHBOARD**: Dashboard quản trị tổng quan

### 2. Quản lý tổ chức
- **SCR_ORG_BUILDER_TREE**: Xây dựng cây tổ chức
- **SCR_ORG_JOB_POSITION_SIDEPANEL**: Thông tin vị trí công việc
- **SCR_JOB_COMPETENCY_STANDARD_MODAL**: Modal tiêu chuẩn năng lực theo vị trí

### 3. Đánh giá năng lực
- **SCR_COMPETENCY_DICTIONARY**: Từ điển năng lực
- **SCR_ASM_PROCESS_STEP_MODAL**: Modal cấu hình quy trình đánh giá
- **SCR_ASM_ROUND_LIST**: Danh sách vòng đánh giá
- **SCR_ASM_ROUND_BOARD**: Board kanban theo dõi đánh giá
- **SCR_SELF_EVAL_FORM**: Form tự đánh giá
- **SCR_ASM_APPROVAL_LIST**: Danh sách phê duyệt kết quả
- **SCR_EMP_PROFILE_COMPETENCY**: Hồ sơ năng lực cá nhân

### 4. Đào tạo
- **SCR_DEMAND_LIST**: Danh sách nhu cầu đào tạo
- **SCR_DEMAND_FORM**: Form tạo nhu cầu đào tạo
- **SCR_PLAN_LIST**: Danh sách kế hoạch đào tạo
- **SCR_PLAN_FORM**: Form tạo kế hoạch đào tạo

## Mối quan hệ giữa các màn hình

### Luồng đánh giá năng lực
1. **SCR_ASM_ROUND_LIST** → Tạo vòng đánh giá mới
2. **SCR_ASM_PROCESS_STEP_MODAL** → Cấu hình các bước đánh giá
3. **SCR_SELF_EVAL_FORM** → Nhân viên tự đánh giá
4. **SCR_ASM_APPROVAL_LIST** → Manager phê duyệt kết quả
5. **SCR_ASM_ROUND_BOARD** → HR theo dõi tiến độ
6. **SCR_EMP_PROFILE_COMPETENCY** → Xem hồ sơ năng lực sau đánh giá

### Luồng đào tạo
1. **SCR_DEMAND_LIST** → Quản lý danh sách nhu cầu
2. **SCR_DEMAND_FORM** → Tạo nhu cầu mới
3. **SCR_PLAN_LIST** → Quản lý kế hoạch đào tạo
4. **SCR_PLAN_FORM** → Tạo kế hoạch mới

## Hướng dẫn phát triển

1. Khi thêm màn hình mới, cần tuân thủ cấu trúc đặc tả đồng nhất.
2. Tên file phải theo cú pháp `SCR_[TÊN_MÀN_HÌNH].md`.
3. Mỗi màn hình cần có route và role access rõ ràng.
4. API endpoints phải tuân theo chuẩn RESTful.
5. Các quy tắc validation cần được liệt kê đầy đủ.