# SCR_SURVEY_FORM - Form tạo/chỉnh sửa khảo sát

## 1. Metadata
- **Screen ID**: SCR_SURVEY_FORM
- **Screen Name**: Form khảo sát (Wizard)
- **Module**: Survey Management
- **Routes**: `/surveys/new`, `/surveys/:id/edit`
- **Component**: `SurveyForm.jsx`
- **Permission**: ADMIN, HR_MANAGER

## 2. Purpose
Wizard 3 bước để tạo mới hoặc chỉnh sửa khảo sát nhu cầu đào tạo, bao gồm thông tin cơ bản, câu hỏi, và đối tượng tham gia.

## 3. Layout & Components

### Header Section
- **Back Button**: Quay về danh sách surveys
- **Page Title**: "Tạo khảo sát mới" / "Chỉnh sửa khảo sát"
- **Description**: "Tạo khảo sát theo 3 bước đơn giản"

### Steps Navigation
**3-step wizard với progress indicator:**
1. **Thông tin cơ bản** (📋): Tên, mô tả, thời gian
2. **Câu hỏi** (❓): Tạo các câu hỏi khảo sát  
3. **Đối tượng** (👥): Chọn người tham gia

### Step Content Areas
**Dynamic content dựa trên current step**

### Action Bar (Sticky)
- **Left**: Button "Quay lại" (nếu không phải step đầu)
- **Right**: "Lưu nháp" + "Tiếp theo"/"Phát hành khảo sát"

## 4. Step 1: Thông tin cơ bản

### Form Fields
- **Tên khảo sát*** (required): Text input
- **Mô tả*** (required): Textarea (4 rows)
- **Thời gian thực hiện*** (required): Date range picker
- **Danh mục** (optional): Select dropdown

### Validation Rules
- Tên khảo sát: Bắt buộc, min 10 chars
- Mô tả: Bắt buộc, min 20 chars
- Thời gian: Bắt buộc, start date < end date
- End date phải > current date

## 5. Step 2: Câu hỏi

### Question Builder Interface
- **Import Question Button**: Import câu hỏi từ template/survey khác
- **Add Question Button**: Thêm câu hỏi mới
- **Question Cards**: Danh sách các câu hỏi đã tạo

### Question Types Supported
- **Trắc nghiệm** (☑️): Multiple choice, multiple answers
- **Chọn một** (⚪): Single choice, radio buttons
- **Đánh giá** (⭐): Rating scale (1-3, 1-5, 1-10)
- **Văn bản** (📝): Free text input
- **Số** (🔢): Number input

### Question Card Components
- **Type Selector**: Dropdown chọn loại câu hỏi
- **Question Text**: Input nhập nội dung câu hỏi
- **Required Toggle**: Checkbox bắt buộc trả lời
- **Options Builder**: Cho multiple/single choice
- **Scale Selector**: Cho rating questions
- **Delete Button**: Xóa câu hỏi (nếu > 1 câu)

### Options Management (Choice Questions)
- **Add Option**: Thêm lựa chọn mới
- **Remove Option**: Xóa lựa chọn (nếu > 1)
- **Reorder Options**: Drag & drop (future)

### Question Import System
**3 nguồn import:**

#### 1. Template câu hỏi
- **Nhu cầu đào tạo**: 2 câu hỏi chuẩn
- **Hài lòng nhân viên**: 2 câu hỏi đánh giá
- **Expandable**: Dễ thêm templates mới

#### 2. Khảo sát có sẵn
- **Browse existing surveys**: Danh sách surveys đã tạo
- **Copy questions**: Sao chép câu hỏi từ survey khác
- **Metadata display**: Tên, người tạo, số câu hỏi

#### 3. Import từ file (Future)
- **Excel/CSV support**: Upload file có cấu trúc
- **Template download**: Cung cấp template file
- **Validation**: Kiểm tra format trước khi import

### Import Workflow
1. **Click "Import câu hỏi"** → Modal chọn nguồn
2. **Chọn template/survey** → Preview questions
3. **Confirm import** → Questions được thêm vào form
4. **Auto-assign IDs** → Tránh conflict với existing questions

### Validation Rules
- Ít nhất 1 câu hỏi
- Mỗi câu hỏi phải có nội dung
- Choice questions phải có ít nhất 2 options
- Options không được trống
- Imported questions validate như manual questions

## 6. Step 3: Đối tượng

### Audience Selection
- **Phòng ban*** (required): Multi-select dropdown
- **Vị trí** (optional): Multi-select dropdown  
- **Người dùng cụ thể** (optional): Multi-select với search

### Department Options
- Ban Giám đốc (5 người)
- Phòng Nhân sự (15 người)
- Phòng Kỹ thuật (45 người)
- Phòng Kinh doanh (30 người)
- Phòng Tài chính (10 người)

### Position Options
- Nhân viên
- Trưởng nhóm
- Trưởng phòng
- Phó phòng
- Giám đốc

### Audience Summary
**Real-time calculation:**
- Ước tính số người tham gia
- Số phòng ban được chọn
- Phạm vi vị trí

### Validation Rules
- Phải chọn ít nhất 1 phòng ban
- Tổng ước tính > 0 người

## 7. Actions & Navigation

### Step Navigation
- **Next**: Validate current step → Move to next
- **Previous**: Move to previous step (no validation)
- **Step Click**: Direct navigation (with validation)

### Form Actions
- **Lưu nháp**: Save as draft status
- **Phát hành khảo sát**: Save and publish immediately
- **Cancel**: Navigate back with confirmation

### Auto-save (Future)
- Tự động lưu draft mỗi 30 giây
- Restore từ draft khi quay lại

## 8. Business Rules

### Creation Rules
- Chỉ ADMIN/HR_MANAGER mới tạo được
- Draft surveys có thể edit unlimited
- Published surveys không thể edit

### Publishing Rules
- Phải complete tất cả 3 steps
- Validation pass cho tất cả fields
- Tự động tính toán total invitations
- Gửi notifications (future)

### Data Persistence
- Form data được lưu trong state
- Sync với backend khi save/publish
- Handle browser refresh (future)

## 9. Data Model

### Form Data Structure
```json
{
  "name": "string",
  "description": "string", 
  "dateRange": ["start_date", "end_date"],
  "category": "string",
  "questions": [
    {
      "id": "number",
      "type": "multiple_choice|single_choice|rating|text|number",
      "text": "string",
      "options": ["string"], // for choice types
      "scale": "number", // for rating type
      "required": "boolean"
    }
  ],
  "audience": {
    "departments": ["string"],
    "positions": ["string"], 
    "specificUsers": ["string"]
  }
}
```

## 10. API Integration

### Endpoints Used
- `POST /api/surveys` - Tạo survey mới
- `PUT /api/surveys/:id` - Update survey
- `GET /api/surveys/:id` - Load survey for edit
- `GET /api/departments` - Load departments list
- `GET /api/users` - Load users for specific selection

### Request Flow
1. **Load Data**: Departments, positions, users (if edit)
2. **Validate Steps**: Client-side validation
3. **Save Draft**: POST/PUT với status = 'draft'
4. **Publish**: POST/PUT với status = 'published'

## 11. UI/UX Features

### Design System
- **Step-by-step wizard** với clear progress
- **Form validation** với real-time feedback
- **Responsive design** cho mobile
- **Smooth transitions** giữa các steps
- **Professional styling** với gradients

### User Experience
- **Progressive disclosure**: Chỉ show relevant fields
- **Smart defaults**: Pre-fill common values
- **Validation feedback**: Inline error messages
- **Confirmation dialogs**: Cho destructive actions
- **Loading states**: Cho async operations

### Accessibility
- **Keyboard navigation** giữa các fields
- **Screen reader support** với proper labels
- **Focus management** trong wizard
- **Error announcements** cho validation

## 12. Technical Implementation

### State Management
- `currentStep`: Current wizard step (0-2)
- `formData`: Complete form data object
- `loading`: Loading states cho API calls
- `errors`: Validation errors per field

### Form Handling
- **Ant Design Form** cho validation
- **Controlled components** cho all inputs
- **Dynamic form fields** cho questions
- **Real-time validation** với debouncing

### Performance Optimization
- **Lazy loading** cho heavy dropdowns
- **Memoized components** để tránh re-render
- **Debounced search** cho user selection
- **Optimistic updates** cho better UX

## 13. Error Handling

### Validation Errors
- **Field-level validation**: Real-time feedback
- **Step-level validation**: Before navigation
- **Form-level validation**: Before submit
- **Server validation**: Handle API errors

### Network Errors
- **Retry mechanisms** cho failed requests
- **Offline support** với local storage
- **Error boundaries** cho component crashes
- **User-friendly messages** cho all errors

## 14. Future Enhancements

### Advanced Features
- **Question import system**: ✅ Import từ templates/surveys khác
- **Question templates**: ✅ Pre-built question sets
- **File import**: 🚧 Import từ Excel/CSV (planned)
- **Logic branching**: Conditional questions
- **File uploads**: Attach documents
- **Preview mode**: Preview before publish

### Integration Features
- **Template library**: Save/reuse question sets
- **Collaboration**: Multi-user editing
- **Version control**: Track changes
- **Approval workflow**: Review before publish

## 15. Testing Scenarios

### Functional Tests
- ✅ Wizard step navigation
- ✅ Form validation per step
- ✅ Question builder functionality
- ✅ Audience selection logic
- ✅ Save draft vs publish

### Edge Cases
- ✅ Browser refresh handling
- ✅ Network interruption
- ✅ Large question sets
- ✅ Complex audience selection
- ✅ Validation error recovery

---

**Last Updated**: 2025-09-26  
**Version**: 1.0  
**Status**: ✅ Implemented
