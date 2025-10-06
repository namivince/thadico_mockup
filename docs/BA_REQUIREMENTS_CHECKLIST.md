# ✅ BA Requirements Checklist - Hoàn thiện Hệ thống

**Ngày:** 2025-10-06  
**Mức độ khớp hiện tại:** 80-90%  
**Mục tiêu:** 100%

---

## 📊 Tổng quan

### Mức độ khớp:
- ✅ **F1 - Đánh giá Năng lực:** 85-90%
- ✅ **F2 - Khảo sát & Phân tích:** 80-85%
- ⚠️ **Dashboard KPI:** Cần bổ sung 6 KPI theo BA note

---

## 🎯 PHẦN 1: F1 - ĐÁNH GIÁ NĂNG LỰC (Cần bổ sung)

### ❌ Thiếu 1: SLA Chấm bài + Countdown
**Yêu cầu BA:**
- Hiển thị countdown timer: `02:13:54` với màu sắc:
  - 🟢 Xanh: > 24h còn lại
  - 🟠 Cam: 6-24h còn lại
  - 🔴 Đỏ: < 6h còn lại
- Khi quá hạn: Warning pill + nút "Gia hạn"

**File cần sửa:**
- `src/components/assessment/GradingConsole.jsx`
- Thêm component `CountdownTimer.jsx`

**Mock data:**
```javascript
{
  sla_deadline: "2025-10-07T14:30:00Z",
  sla_status: "warning", // normal, warning, overdue
  can_extend: true
}
```

---

### ❌ Thiếu 2: Popup sau khi Submit bài
**Yêu cầu BA:**
```
"Bài thi đã được ghi nhận. 
Kết quả sẽ được công bố trước ngày dd/mm/yyyy.
Bạn sẽ nhận thông báo qua email."
```

**File cần sửa:**
- `src/pages/assessment/SelfEvalForm.jsx`
- Thêm Modal sau khi submit

---

### ❌ Thiếu 3: Giới hạn Phúc khảo
**Yêu cầu BA:**
- Cấu hình khi tạo chiến dịch:
  - `appealWindowDays`: Số ngày được phúc khảo (ví dụ: 7 ngày)
  - `appealMaxAttempts`: Số lần tối đa (ví dụ: 3 lần)
- Hiển thị trong danh sách phúc khảo:
  - Cột "Số lần/Giới hạn": `1/3`
  - Cột "Deadline": `15/10/2025`

**File cần sửa:**
- `src/components/assessment/CampaignForm.jsx` - Thêm config
- `src/pages/assessment/AppealsList.jsx` - Thêm cột

**Mock data:**
```javascript
{
  appeal_window_days: 7,
  appeal_max_attempts: 3,
  appeals: [
    {
      user: "Nguyễn Văn A",
      attempt: 1,
      max_attempts: 3,
      deadline: "2025-10-15"
    }
  ]
}
```

---

### ❌ Thiếu 4: Import Câu hỏi từ Excel
**Yêu cầu BA:**
- Button "Import câu hỏi (.xlsx)" tại trang "Thiết lập danh mục"
- Upload Excel → Parse → Preview → Confirm

**File cần sửa:**
- `src/pages/assessment/RubricBuilder.jsx`
- Thêm button + modal import

---

### ❌ Thiếu 5: Chỉ hiển thị cho người được assign
**Yêu cầu BA:**
- Rule: Học viên chỉ thấy kỳ thi nếu được chỉ định trong danh sách

**File cần sửa:**
- `src/pages/assessment/RoundList.jsx`
- Filter campaigns theo `assigned_users`

---

## 🎯 PHẦN 2: F2 - KHẢO SÁT & PHÂN TÍCH (Cần bổ sung)

### ❌ Thiếu 1: Nút "Từ chối" Khảo sát
**Yêu cầu BA:**
- Thêm nút "Từ chối" trong danh sách CBNV
- Modal bắt buộc nhập lý do
- Lý do được đẩy vào Report

**File cần sửa:**
- `src/pages/surveys/SurveyList.jsx`
- Thêm button "Từ chối" + DeclineModal

**Mock data:**
```javascript
{
  declined_users: [
    {
      user: "Nguyễn Văn B",
      reason: "Đang bận dự án khẩn cấp",
      declined_at: "2025-10-05T10:00:00Z"
    }
  ]
}
```

---

### ❌ Thiếu 2: Realtime Badge
**Yêu cầu BA:**
- Thêm badge "🟢 Realtime" + timestamp "Synced 1m ago"

**File cần sửa:**
- `src/pages/surveys/SurveyMonitor.jsx`
- Thêm RealtimeBadge component

---

### ❌ Thiếu 3: AI Gợi ý từ Survey
**Yêu cầu BA:**
- Ghi rõ nguồn input: "Survey ID: #123"
- Link đến survey analytics

**File cần sửa:**
- `src/pages/training/PlanAutoSuggest.jsx`
- Thêm "Based on Survey #123"

---

## 🎯 PHẦN 3: F3 - LẬP KẾ HOẠCH ĐÀO TẠO (Cần bổ sung)

### ❌ Thiếu 1: Change Request Modal
**Yêu cầu BA:**
- Modal chọn: Hoãn / Hủy / Thay thế
- Bắt buộc nhập lý do
- Upload file đính kèm (mock)
- Hiển thị Version timeline

**File cần sửa:**
- `src/pages/training/PlanApprovalQueue.jsx`
- Thêm ChangeRequestModal

**Mock data:**
```javascript
{
  change_type: "postpone", // postpone, cancel, replace
  reason: "Giảng viên bận",
  attachments: ["file1.pdf"],
  version: 2,
  created_by: "HR Manager",
  created_at: "2025-10-05T14:00:00Z"
}
```

---

### ❌ Thiếu 2: Sync LMS/Calendar Badges
**Yêu cầu BA:**
- Badge trạng thái:
  - 🟢 Synced
  - 🔴 Failed
  - 🟡 Retry
- Timestamp: "Last sync at 14:30"

**File cần sửa:**
- `src/pages/training/PlanDeploy.jsx`
- Thêm SyncStatusBadge

---

## 🎯 PHẦN 4: DASHBOARD KPI (Cần bổ sung)

### ❌ Thiếu: 6 KPI theo BA Note

**File cần sửa:**
- `src/pages/dashboard/SuperAdminDashboard.jsx`

#### KPI 1: Khóa học
```javascript
{
  deployed: 15,
  postponed: 3,
  cancelled: 2,
  chart: "stacked_bar" // Theo tháng/quý
}
```

#### KPI 2: Nhân sự
```javascript
{
  participated: 180,
  not_participated: 50,
  declined: 20,
  chart: "pie"
}
```

#### KPI 3: Giảng viên
```javascript
{
  participated: 12,
  not_participated: 3,
  replaced: 2,
  chart: "bar"
}
```

#### KPI 4: Bộ môn
```javascript
{
  completed: 8,
  in_progress: 4,
  not_started: 3,
  chart: "table"
}
```

#### KPI 5: Chi phí
```javascript
{
  planned_budget: 1000000000,
  actual_cost: 950000000,
  variance: 50000000,
  chart: "bar" // Theo quý
}
```

#### KPI 6: Tổng quan
```javascript
{
  total_courses: 20,
  total_participants: 250,
  total_instructors: 15,
  completion_rate: 85
}
```

---

## 📝 IMPLEMENTATION PLAN

### Phase 1: F1 - Đánh giá Năng lực (2-3 giờ)
- [ ] SLA Countdown Timer
- [ ] Submit Popup
- [ ] Appeal Config & Limits
- [ ] Import Excel Button
- [ ] Visibility Rule

### Phase 2: F2 - Khảo sát (1-2 giờ)
- [ ] Decline Button + Modal
- [ ] Realtime Badge
- [ ] Survey Source Link

### Phase 3: F3 - Kế hoạch (2-3 giờ)
- [ ] Change Request Modal
- [ ] Sync Status Badges
- [ ] Version Timeline

### Phase 4: Dashboard (2-3 giờ)
- [ ] 6 KPI Cards
- [ ] 5 Charts
- [ ] Click-to-filter

### Phase 5: Testing & Polish (1 giờ)
- [ ] Test tất cả flows
- [ ] Fix bugs
- [ ] Polish UI

**Tổng thời gian ước tính: 8-12 giờ**

---

## 🎨 UI/UX Guidelines

### Colors:
- 🟢 Success/Normal: `#52c41a`
- 🟡 Warning: `#faad14`
- 🔴 Error/Overdue: `#ff4d4f`
- 🔵 Info: `#1890ff`

### Countdown Timer:
```jsx
<Tag color={getColor(timeLeft)}>
  <ClockCircleOutlined /> {formatTime(timeLeft)}
</Tag>
```

### Realtime Badge:
```jsx
<Badge status="processing" text="Realtime" />
<Text type="secondary">Synced 1m ago</Text>
```

### Sync Status:
```jsx
<Tag icon={<CheckCircleOutlined />} color="success">
  Synced
</Tag>
<Text type="secondary">Last sync at 14:30</Text>
```

---

## ✅ ACCEPTANCE CRITERIA

### F1 - Đánh giá:
- [ ] Countdown timer hiển thị đúng màu sắc
- [ ] Popup xuất hiện sau submit
- [ ] Appeal config hoạt động
- [ ] Import Excel button có sẵn
- [ ] Chỉ người được assign mới thấy

### F2 - Khảo sát:
- [ ] Decline modal bắt buộc lý do
- [ ] Realtime badge + timestamp
- [ ] Survey source rõ ràng

### F3 - Kế hoạch:
- [ ] Change request đầy đủ
- [ ] Sync badges hiển thị
- [ ] Version timeline rõ ràng

### Dashboard:
- [ ] 6 KPI hiển thị đúng
- [ ] 5 charts đẹp và chính xác
- [ ] Click KPI → filter list

---

## 📞 Contact

**Nếu có thắc mắc:**
- BA: [BA Name]
- Dev Lead: Nguyễn Phúc Vinh
- Slack: #thadico-dev

---

**Status:** 🟡 In Progress  
**Last Updated:** 2025-10-06 22:27
