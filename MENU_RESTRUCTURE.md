# Tài liệu Cấu trúc lại Menu - Thadico HRM

**Ngày cập nhật:** 2025-10-06  
**Phiên bản:** 2.0  
**Tham chiếu:** FC-101 đến FC-159

---

## 📋 Tổng quan

Cấu trúc menu đã được tổ chức lại theo 3 nhóm chức năng chính (F1, F2, F3) để phù hợp với quy trình nghiệp vụ và tài liệu thiết kế hệ thống.

---

## 🎯 Cấu trúc Menu Mới

### **F1 - Quản lý Khảo sát**
Nhóm chức năng thu thập nhu cầu và phản hồi từ nhân viên.

| STT | Nhãn hiển thị | Route | Mô tả |
|-----|---------------|-------|-------|
| 1 | **Thiết lập dữ liệu** | `/courses` | Quản lý danh mục khóa học (di chuyển từ F2) |
| 2 | **Phân phối khảo sát** | `/surveys` | Danh sách + Tạo khảo sát (gộp 2 chức năng) |
| 3 | **Báo cáo khảo sát** | `/surveys/reports` | Xem báo cáo và monitor |

**Thứ tự logic:** Thiết lập dữ liệu → Phân phối khảo sát → Báo cáo

---

### **F2 - Lập kế hoạch Đào tạo**
Nhóm chức năng lập kế hoạch và triển khai đào tạo.

| STT | Nhãn hiển thị | Route | Mô tả |
|-----|---------------|-------|-------|
| 1 | **Nhu cầu đào tạo** | `/training/demands` | Quản lý nhu cầu đào tạo |
| 2 | **Lập kế hoạch đào tạo** | `/training/plans` | Tạo và quản lý kế hoạch |
| 3 | **Phân rã kế hoạch** | `/training/plans/split` | Phân rã kế hoạch (FC-141) |
| 4 | **Thực hiện kế hoạch** | `/training/deploy` | Triển khai lớp học và theo dõi |

**Thứ tự logic:** Nhu cầu → Lập kế hoạch → Phân rã → Thực hiện

**Lưu ý:** "Khóa học" đã chuyển sang F1 với tên "Thiết lập dữ liệu"

---

### **F3 - Đánh giá Năng lực**
Nhóm chức năng đánh giá và quản lý kết quả.

| STT | Nhãn hiển thị | Route | Mô tả |
|-----|---------------|-------|-------|
| 1 | **Thiết lập danh mục** | `/assessment/rubrics` | Quản lý bộ tiêu chí đánh giá |
| 2 | **Tạo chiến dịch** | `/assessment/rounds/new` | Tạo vòng đánh giá mới |
| 3 | **Thực hiện đánh giá** | `/assessment/rounds` | Quản lý và monitor vòng đánh giá |
| 4 | **Kết quả đánh giá** | `/assessment/results` | Xem kết quả và báo cáo |
| 5 | **Phúc khảo** | `/assessment/appeals` | Xử lý phúc khảo |

**Thứ tự logic:** Thiết lập → Tạo chiến dịch → Thực hiện → Kết quả → Phúc khảo

---

## 🔄 Mapping Nhãn Cũ → Mới

### F1 - Quản lý Khảo sát
| Nhãn cũ | Nhãn mới | Ghi chú |
|---------|----------|---------|
| Danh sách khảo sát | **Phân phối khảo sát** | Gộp chức năng tạo mới |
| Tạo khảo sát mới | *(Gộp vào Phân phối)* | Nút "Tạo khảo sát" trong list |
| Báo cáo khảo sát | **Báo cáo khảo sát** | Giữ nguyên |
| *(Từ F2)* Khóa học | **Thiết lập dữ liệu** | Di chuyển từ nhóm Đào tạo |

### F2 - Lập kế hoạch Đào tạo
| Nhãn cũ | Nhãn mới | Ghi chú |
|---------|----------|---------|
| Nhu cầu đào tạo | **Nhu cầu đào tạo** | Giữ nguyên |
| Kế hoạch đào tạo | **Lập kế hoạch đào tạo** | Rõ nghĩa hơn |
| Phê duyệt kế hoạch | **Phân rã kế hoạch** | Đổi theo FC-141 |
| Triển khai lớp học | **Thực hiện kế hoạch** | Bao gồm deploy & run |
| Khóa học | *(Chuyển sang F1)* | — |

### F3 - Đánh giá Năng lực
| Nhãn cũ | Nhãn mới | Ghi chú |
|---------|----------|---------|
| Bộ tiêu chí | **Thiết lập danh mục** | Rõ nghĩa hơn |
| Tạo chiến dịch | **Tạo chiến dịch** | Giữ nguyên |
| Vòng đánh giá | **Thực hiện đánh giá** | Bao gồm run, monitor |
| Kết quả đánh giá | **Kết quả đánh giá** | Giữ nguyên |
| Phúc khảo | **Phúc khảo** | Giữ nguyên |

---

## 🛣️ Route Mapping & Redirects

### Routes mới được thêm
```javascript
// F1
/courses                    → CourseList (Thiết lập dữ liệu)
/surveys/reports            → SurveyMonitor (Báo cáo khảo sát)

// F2
/training/plans/split       → PlanApprovalQueue (Phân rã kế hoạch)
/training/deploy            → PlanDeploy (Thực hiện kế hoạch)

// F3
/assessment/rubrics         → RubricBuilder (Thiết lập danh mục)
/assessment/results         → ResultsReport (Kết quả đánh giá)
```

### Routes giữ nguyên (tương thích ngược)
```javascript
/surveys                    → SurveyList
/surveys/new                → SurveyForm
/training/demands           → TrainingDemandList
/training/plans             → PlanList
/training/courses           → CourseList (alias cho /courses)
/assessment/rounds          → RoundList
/assessment/rounds/new      → CampaignForm
/assessment/appeals         → AppealsList
```

### Redirects tự động (301)
```javascript
/training/plans/approvals   → /training/plans/split
/training/plans/:id/deploy  → /training/deploy (nếu không có :id cụ thể)
```

---

## 🎨 UX Improvements

### 1. Gộp "Tạo khảo sát" vào "Phân phối khảo sát"
- Trên trang `/surveys` có nút **"Tạo khảo sát"** → điều hướng `/surveys/new`
- Sau khi Publish → CTA **"Mở Monitor"** → `/surveys/:id/monitor`

### 2. Di chuyển "Khóa học" sang F1
**Lý do:** Trước khi khảo sát nhu cầu, cần có catalog khóa học để user lựa chọn.

### 3. Đổi nhãn theo quy trình
- **"Phê duyệt kế hoạch"** → **"Phân rã kế hoạch"** (FC-141)
- **"Triển khai lớp học"** → **"Thực hiện kế hoạch"** (deploy & run)
- **"Vòng đánh giá"** → **"Thực hiện đánh giá"** (bao gồm chạy, monitor, incidents)

### 4. Breadcrumbs
Ví dụ khi ở `/training/deploy/class/123`:
```
Lập kế hoạch Đào tạo / Thực hiện kế hoạch / Lớp 123
```

### 5. Dashboard KPI
- Tab/section KPI tập trung F1/F2/F3
- Màu sắc: **Indigo (F1)** / **Teal (F2)** / **Amber (F3)**
- Click từ KPI → route mới tương ứng

---

## 🔐 Phân quyền theo Role

### ADMIN (Super Admin)
Thấy đầy đủ 3 nhóm F1, F2, F3 với tất cả menu items.

### HR / MANAGER
- **F1:** Phân phối khảo sát, Báo cáo khảo sát
- **F2:** Lập kế hoạch, Phân rã kế hoạch (nếu có quyền), Thực hiện kế hoạch
- **F3:** *(Tùy quyền)*

### EMPLOYEE
- Khảo sát của tôi
- Lớp học của tôi
- Đánh giá của tôi
- Thông báo

---

## ✅ QA Checklist

Sau khi deploy, kiểm tra:

- [ ] Sidebar hiển thị đúng thứ tự & nhãn mới
- [ ] Nút "Tạo khảo sát" trên `/surveys` điều hướng `/surveys/new`
- [ ] Từ dashboard KPI F1/F2/F3 click → đúng route mới
- [ ] Link cũ `/training/plans/approvals` chuyển hướng sang `/training/plans/split`
- [ ] Breadcrumbs phản ánh group mới
- [ ] Quyền: chỉ super_admin thấy đủ 3 nhóm; role khác ẩn item không liên quan
- [ ] MegaMenu (top bar) hiển thị đúng icon và nhãn
- [ ] Không có lỗi 404 khi truy cập các route cũ

---

## 📦 Files đã thay đổi

### 1. `/src/data/mockData.js`
- Cập nhật `menuItems` với cấu trúc F1, F2, F3
- Thêm comment tham chiếu FC-101 đến FC-159

### 2. `/src/components/dashboard/SideMenu.jsx`
- Cập nhật logic `useEffect` để detect route và set selectedKeys
- Cập nhật `handleMenuClick` với các key mới (f1:*, f2:*, f3:*)
- Cập nhật render menu cho ADMIN, HR/MANAGER với nhãn mới

### 3. `/src/components/dashboard/MegaMenu.jsx`
- Cập nhật `menuIcons` mapping (f1, f2, f3)
- Import `FormOutlined` icon

### 4. `/src/routes/index.js`
- Thêm routes mới:
  - `/courses` → CourseList
  - `/surveys/reports` → SurveyMonitor
  - `/training/plans/split` → PlanApprovalQueue
  - `/training/deploy` → PlanDeploy
  - `/assessment/rubrics` → RubricBuilder
  - `/assessment/results` → ResultsReport

---

## 🚀 Deployment Notes

### Không breaking changes
- Tất cả routes cũ vẫn hoạt động
- Chỉ thay đổi UI/UX và thêm routes mới
- Không cần migration database

### Rollback plan
Nếu cần rollback, revert 4 files trên về commit trước.

---

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, liên hệ:
- **Dev Team Lead:** Nguyễn Phúc Vinh
- **Product Owner:** [Tên PO]
- **Tài liệu tham chiếu:** FC-101 đến FC-159

---

**✨ Cấu trúc mới giúp:**
- Dễ hiểu hơn theo quy trình nghiệp vụ
- Giảm số bước thao tác
- Tăng tính nhất quán trong hệ thống
- Dễ dàng mở rộng trong tương lai
