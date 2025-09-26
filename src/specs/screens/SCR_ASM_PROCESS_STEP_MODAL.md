# SCR_ASM_PROCESS_STEP_MODAL — Modal cấu hình các bước trong quy trình đánh giá

## 0) Metadata
- Route: `/assessment/process/steps`
- Design: UI mẫu ảnh modal steps
- Role access: Admin only

## 1) Purpose
Cho phép HR/Admin cấu hình từng bước trong quy trình đánh giá: tên bước, thứ tự, quyền thực hiện.

## 2) Layout
- **Form fields**:
  - Tên bước thực hiện (input text, bắt buộc)
  - Thứ tự thực hiện (spinner/number)
  - Radio chọn phân quyền:
    - Quản lý trực tiếp
    - Quản lý gián tiếp
    - Quản lý phòng ban trực thuộc
    - Quản lý phòng ban cấp trên
    - Nhân sự đánh giá
    - Nhóm phê duyệt kết quả
  - Checkbox: Chế độ xem
  - Checkbox: Bước trong quy trình thiết lập mục tiêu
- **Footer**: Bỏ qua / Đồng ý

## 3) Actions
- Thêm mới bước
- Sửa bước hiện có
- Sắp xếp lại thứ tự
- Lưu cấu hình quy trình

## 4) APIs
- `GET /api/asm/process/:id/steps`
- `POST /api/asm/process/:id/steps`
- `PUT /api/asm/process/:id/steps/:stepId`
- `DELETE /api/asm/process/:id/steps/:stepId`

## 5) Rules / Validation
- Tên bước bắt buộc, không trùng lặp trong cùng quy trình
- Thứ tự thực hiện là số nguyên dương
- Một quy trình tối thiểu 2 bước (self + manager)
